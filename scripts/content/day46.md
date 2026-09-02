# Data Extraction Pipelines

## Learning Objectives

- Understand the architecture of AI data extraction pipelines (unstructured → structured)
- Master the core techniques: LLM extraction, regex/pattern matching, and OCR
- Build a pipeline that ingests documents, extracts fields, validates, and stores result
- Design schemas and handle ambiguous or incomplete data
- Build error handling and confidence scoring into the pipeline

## What Is Data Extraction?

Data extraction is the process of turning **unstructured or semi-structured data** (PDFs, emails, images, web pages, free text) into **structured data** (rows, fields, JSON) that systems can use.

This is one of the highest-value automation services because:
- Businesses have huge volumes of unstructured documents (invoices, contracts, forms, resumes)
- Manual data entry is slow, error-prone, and expensive
- The extracted data feeds CRMs, ERPs, analytics, and workflows

## The Extraction Pipeline Architecture

```
┌──────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐
│ INGEST   │  │ NORMALIZE  │  │ EXTRACT    │  │ VALIDATE   │  │ DELIVER    │
│ PDF, img, │─▶│ text/image │──▶│ AI + rules │─▶│ + confident│─▶│ store / api│
│ email     │  │ to workable│  │ to schema  │  │ + fix     │  │ + log     │
└──────────┘  └────────────┘  └────────────┘  └────────────┘  └────────────┘
```

### Stages:
1. **Ingest** — bring in the document (PDF, scanned image, email, HTML)
2. **Normalize** — convert to text (OCR for scans) and clean it
3. **Extract** — pull structured fields using AI + patterns
4. **Validate** — check completeness/correctness, score confidence
5. **Deliver** — write to DB/API with audit logging

## Core Extraction Techniques

### 1. LLM-Based Extraction (the workhorse)
Use an LLM to read text and return structured JSON according to a schema. This handles the vast majority of cases.

```python
import json
from openai import OpenAI

client = OpenAI()

INVOICE_SCHEMA = {
    "type": "object",
    "properties": {
        "invoice_number": {"type": "string"},
        "vendor_name": {"type": "string"},
        "vendor_address": {"type": "string"},
        "invoice_date": {"type": "string"},
        "due_date": {"type": "string"},
        "line_items": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "description": {"type": "string"},
                    "quantity": {"type": "number"},
                    "unit_price": {"type": "number"},
                    "amount": {"type": "number"}
                },
                "required": ["description", "amount"]
            }
        },
        "total_amount": {"type": "number"},
        "tax_amount": {"type": "number"},
        "currency": {"type": "string"}
    },
    "required": ["invoice_number", "vendor_name", "total_amount"]
}


def extract_invoice(text: str) -> dict:
    """Extract structured invoice data from raw text via LLM."""
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": f"""You extract structured data from invoices.
                Follow this JSON schema exactly: {json.dumps(INVOICE_SCHEMA)}.
                Set a field to null if it is not present. Do not guess 
                amounts — only extract what you can read."""
            },
            {"role": "user", "content": text}
        ],
        response_format={"type": "json_object"},
        temperature=0
    )
    return json.loads(resp.choices[0].message.content)
```

### 2. Regex / Pattern Matching (for well-known formats)
For fields with predictable formats (dates, emails, phone numbers, IDs), regex is cheap and deterministic.

```python
import re

def extract_with_regex(text: str):
    email = re.search(r"[\w.+-]+@[\w-]+\.[\w.]+", text)
    phone = re.search(r"\+?\d[\d\s().-]{8,}\d", text)
    date = re.search(r"\d{4}-\d{2}-\d{2}", text)
    return {
        "email": email.group(0) if email else None,
        "phone": phone.group(0) if phone else None,
        "date": date.group(0) if date else None,
    }
```

### 3. OCR (for scanned images/PDFs)
For non-text documents, extract text first with OCR (Tesseract, or cloud services):

```python
# Requires: pip install pytesseract pillow + tesseract binary
from PIL import Image
import pytesseract
import io


def ocr_image(image_bytes: bytes) -> str:
    """Extract text from a scanned image using OCR."""
    img = Image.open(io.BytesIO(image_bytes))
    return pytesseract.image_to_string(img)


def extract_pdf_text(pdf_bytes: bytes) -> str:
    """Extract text from a PDF."""
    # For text-based PDFs use pypdf/pdfplumber; 
    # for scanned PDFs render pages to images then OCR.
    import io
    from pypdf import PdfReader
    reader = PdfReader(io.BytesIO(pdf_bytes))
    text = "\n".join(page.extract_text() or "" for page in reader.pages)
    return text
```

## Combining Techniques: A Hybrid Extractor

The best pipelines use a **hybrid**: regex for known formats, LLM for semantic fields and the final full schema.

```python
def extract_document(document_text: str, schema: dict) -> dict:
    """Hybrid extraction: LLM primary + regex post-processing."""
    data = extract_with_llm(document_text, schema)
    
    # Post-process known-format fields deterministically
    if "email" in data.get("properties", {}):
        match = re.search(r"[\w.+-]+@[\w-]+\.[\w.]+", document_text)
        if match:
            data["values"]["email"] = match.group(0)
    
    return data


def extract_with_llm(text: str, schema: dict) -> dict:
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": f"Extract data per schema: {json.dumps(schema)}. "
                                          f"Null if absent, don't guess."},
            {"role": "user", "content": text}
        ],
        response_format={"type": "json_object"},
        temperature=0,
    )
    return json.loads(resp.choices[0].message.content)
```

## Validation & Confidence Scoring

After extraction, validate before storing. Never trust the LLM blindly.

```python
def validate_and_score(extracted: dict, schema: dict) -> dict:
    """Check required fields, confidence, and consistency."""
    required = schema.get("required", [])
    issues = []
    
    # 1. Required fields present?
    for field in required:
        if extracted.get(field) in (None, ""):
            issues.append(f"missing required field: {field}")
    
    # 2. Data type checks
    if extracted.get("total_amount") is not None:
        try:
            float(extracted["total_amount"])
        except (TypeError, ValueError):
            issues.append("total_amount is not a number")
    
    # 3. Cross-field consistency (e.g., line items sum ~ total)
    if extracted.get("line_items") and extracted.get("total_amount") is not None:
        line_sum = sum(item.get("amount", 0) for item in extracted["line_items"])
        total = float(extracted["total_amount"])
        if abs(line_sum - total) > 1.0:
            issues.append(f"line item sum {line_sum} != total {total}")
    
    # 4. Confidence from completeness
    known = sum(1 for f in required if extracted.get(f) not in (None, ""))
    confidence = known / len(required) if required else 1.0
    
    return {
        "data": extracted,
        "confidence": round(confidence, 2),
        "issues": issues,
        "status": "ok" if confidence >= 0.8 and not issues else "needs_review",
    }
```

## The Full Pipeline with Routing

```python
class ExtractionPipeline:
    def __init__(self, schema: dict):
        self.schema = schema
    
    def process(self, raw_input: bytes, input_type: str) -> dict:
        # 1. Ingest + normalize
        if input_type == "image":
            text = ocr_image(raw_input)
        elif input_type == "pdf":
            text = extract_pdf_text(raw_input)
        else:
            text = raw_input.decode("utf-8", errors="ignore")
        
        # 2. Extract (hybrid)
        extracted = extract_document(text, self.schema)
        
        # 3. Validate
        result = validate_and_score(extracted, self.schema)
        
        # 4. Route by status
        if result["status"] == "ok":
            # store to DB / API
            status = self._store(result["data"])
            result["delivered"] = status
        else:
            # send to human review queue
            result["delivered"] = "needs_human_review"
        
        return result
    
    def _store(self, data: dict) -> str:
        # In production, insert into database
        print(f"[STORE] Record ready: {json.dumps(data)[:200]}...")
        return "stored"
```

## Handling Ambiguity & Edge Cases

Real data is messy. Handle these cases:

| Case | Strategy |
|---|---|
| Missing field | Set null, flag `needs_review` if required |
| Conflicting values | Prefer regex/structured source; flag conflict |
| OCR errors | Note low OCR confidence; ask for re-scan |
| Multiple line items | Extract as array; validate sum |
| Unknown currency | Default, flag for confirmation |
| Duplicates | Dedup by key field (e.g., invoice number) |

## Agency Use Cases

| Use Case | Input → Output |
|---|---|
| Invoice processing | PDF invoice → structured AP entry |
| Resume screening | Resume PDF → candidate profile |
| Contract analysis | Contract → key clauses + dates |
| Receipt management | Receipt image → expense record |
| Form intake | Scanned form → CRM fields |
| Email parsing | Email body → intent + entities |

## Key Takeaways

- Data extraction converts unstructured/semi-structured data into usable structured records
- Five stages: Ingest, Normalize, Extract, Validate, Deliver
- Use LLM extraction for the schema, regex for known formats, OCR for scans — hybrid is best
- Define a clear schema (fields, types, required) and have the LLM follow it exactly
- Never trust LLM output blindly — validate required fields, types, and cross-field consistency
- Score confidence and route low-confidence/flagged items to human review
- Invoice, resume, contract, receipt, and form processing are all sellable services

## Practice Challenge

**Objective:** Build a complete data extraction pipeline.

1. Build the `ExtractionPipeline` for **invoice extraction**
   - Create a schema with: invoice_number, vendor_name, invoice_date, due_date, line_items, total_amount, tax, currency
   - Test with at least 3 real or realistic invoice texts (you can write them)
   - Validate: required fields, line-item sum consistency, numeric types
   - Score confidence and route accordingly
2. Add OCR support for a sample scanned image (or simulate an image path with text)
3. Add regex post-processing for email, phone, and date formats
4. Handle edge cases: missing field, conflicting total, empty invoice
5. Write a one-page document explaining the value of invoice automation to a client (time saved, error reduction, ROI)

**Deliverable:** `extraction_pipeline.py`, test results for 3+ invoices (including scores and routing), demonstration of OCR + regex, edge case handling, and the client value document.
