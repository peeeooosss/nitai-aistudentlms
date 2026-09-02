# Automated Reporting Systems

## Learning Objectives

- Understand the architecture of automated reporting systems
- Build a data pipeline that collects, transforms, and reports business data
- Generate AI-powered narrative reports and executive summaries
- Implement scheduled delivery (email, Slack, dashboards)
- Prepare thoroughly for the quiz on this topic

## What This Session Covers

This is a **QUIZ day**. Review the material, complete the self-assessment and practice problems, and make sure you can answer everything before the quiz.

## Why Automated Reporting Is a Core Agency Service

Reporting is one of the most tedious, repetitive tasks in any business. Every week/month, someone manually pulls numbers from 5 systems, pastes them into a spreadsheet, formats a deck, and emails it to management. This is:

- **Time-consuming** (hours per report)
- **Error-prone** (copy-paste mistakes)
- **Slow** (data goes stale before it's seen)
- **Reactive** (no forward-looking insight)

An automated reporting system collects data from multiple sources, transforms it, analyzes it, generates a narrative, and delivers it on a schedule — **with zero manual effort**. This is a highly scalable, recurring-revenue agency service because every business needs reports.

## The Reporting System Architecture

```
┌──────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐
│ SOURCES  │  │ EXTRACT   │  │ TRANSFORM │  │ ANALYZE   │  │ DELIVER   │
│ Google   │  │ pull data │  │ clean +   │  │ AI summary│  │ email/Slack│
│ Ads, Stripe│ │ from APIs │  │ aggregate │  │ + charts  │  │ + dashboard│
│ CRM, GA  │  │           │  │ & store   │  │           │  │           │
└──────────┘  └───────────┘  └───────────┘  └───────────┘  └───────────┘
```

## Building an Automated Reporting Pipeline in Python

### 1. Extraction Layer

Pull data from source APIs. Here's the general pattern:

```python
import json
import requests
from datetime import datetime, timedelta


class DataExtractor:
    """Collect data from various business APIs."""
    
    def __init__(self, config: dict):
        self.config = config  # contains API keys, endpoints
    
    def fetch_from_stripe(self, days: int = 7) -> list[dict]:
        """Example: fetch recent Stripe payments."""
        # In production use the Stripe SDK
        url = "https://api.stripe.com/v1/charges"
        headers = {"Authorization": f"Bearer {self.config['stripe_key']}"}
        params = {
            "created[gte]": int((datetime.now() - timedelta(days=days)).timestamp()),
            "limit": 100
        }
        response = requests.get(url, headers=headers, params=params)
        return response.json().get("data", [])
    
    def fetch_google_ads(self, days: int = 7) -> list[dict]:
        """Example stub for Google Ads metrics."""
        # In production use googleads client library
        return [
            {"date": (datetime.now() - timedelta(days=i)).date().isoformat(),
             "spend": 150 + i * 5, "clicks": 200 + i * 10, "impressions": 5000 + i * 100}
            for i in range(days)
        ]
```

### 2. Transformation & Aggregation

Clean, join, and aggregate into a reporting schema:

```python
import pandas as pd


def aggregate_metrics(sources: dict) -> pd.DataFrame:
    """Combine and aggregate data from multiple sources into one table."""
    # Example: build a daily performance table
    rows = []
    for i in range(7):
        date = (datetime.now() - timedelta(days=i)).date().isoformat()
        rows.append({
            "date": date,
            "revenue": sources["stripe_revenue"].get(date, 0),
            "ad_spend": sources["ads_spend"].get(date, 0),
            "clicks": sources["ads_clicks"].get(date, 0),
            "leads": sources["leads"].get(date, 0),
            "conversions": sources["conversions"].get(date, 0),
        })
    
    df = pd.DataFrame(rows).sort_values("date")
    
    # Derived metrics
    df["roas"] = df["revenue"] / df["ad_spend"].replace(0, 1)
    df["cpl"] = df["ad_spend"] / df["leads"].replace(0, 1)
    df["conversion_rate"] = df["conversions"] / df["clicks"].replace(0, 1)
    
    return df
```

### 3. AI Narrative Generation

The differentiation: instead of just a table of numbers, generate a **plain-English summary** that tells the "so what" story. This is what executives actually want.

```python
from openai import OpenAI

client = OpenAI()


def generate_executive_summary(df: pd.DataFrame) -> str:
    """Turn a metrics dataframe into a concise executive narrative."""
    # Compute key deltas for the current period vs previous
    latest = df.iloc[-1]
    prev = df.iloc[-2] if len(df) > 1 else df.iloc[-1]
    
    data_summary = f"""
    Reporting period metrics (latest vs previous):
    - Revenue: {latest['revenue']} vs {prev['revenue']}
    - Ad spend: {latest['ad_spend']} vs {prev['ad_spend']}
    - ROAS: {latest['roas']:.2f} vs {prev['roas']:.2f}
    - Leads: {latest['leads']} vs {prev['leads']}
    - Cost per lead: {latest['cpl']:.2f} vs {prev['cpl']:.2f}
    - Conversion rate: {latest['conversion_rate']:.2%} vs {prev['conversion_rate']:.2%}
    """
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": """You are an expert business analyst. Write an 
                executive summary (max 200 words) that:
                1. States the single most important trend
                2. Highlights what improved and what declined vs last period
                3. Identifies the most likely driver (based on correlations)
                4. Recommends ONE clear next action
                Be specific with numbers. Do not invent metrics not provided.
                Use professional, concise language."""
            },
            {"role": "user", "content": data_summary}
        ],
        temperature=0.4
    )
    return response.choices[0].message.content
```

### 4. Chart Generation

Generate visual charts to embed in reports:

```python
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

import io
import base64


def create_chart(df: pd.DataFrame, cols: list[str], title: str) -> str:
    """Create a chart and return it as a base64 encoded PNG."""
    plt.figure(figsize=(10, 5))
    for col in cols:
        plt.plot(df["date"], df[col], marker="o", label=col)
    plt.title(title)
    plt.xlabel("Date")
    plt.ylabel("Value")
    plt.legend()
    plt.xticks(rotation=45)
    plt.tight_layout()
    
    buf = io.BytesIO()
    plt.savefig(buf, format="png")
    buf.seek(0)
    encoded = base64.b64encode(buf.read()).decode()
    plt.close()
    
    return f"data:image/png;base64,{encoded}"
```

### 5. Delivery Layer

Compile everything into a report and deliver via email or Slack:

```python
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage


class ReportDeliverer:
    def __init__(self, smtp_config: dict):
        self.smtp_config = smtp_config
    
    def build_html_report(self, summary: str, chart_data: str) -> str:
        """Assemble the final HTML email body."""
        return f"""
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 700px;">
            <h2>Weekly Performance Report</h2>
            <h3>Executive Summary</h3>
            <p>{summary.replace(chr(10), '<br>')}</p>
            <h3>Trend Chart</h3>
            <img src="{chart_data}" style="max-width:100%;"/>
            <p style="color:#888; font-size:12px;">Generated automatically by your AI reporting system.</p>
        </body>
        </html>
        """
    
    def send_email(self, to: str, subject: str, html: str, image: str = None):
        msg = MIMEMultipart("related")
        msg["Subject"] = subject
        msg["To"] = to
        msg["From"] = self.smtp_config["from"]
        msg.attach(MIMEText(html, "html"))
        
        # In production, attach the actual image file as well
        print(f"[EMAIL] To: {to} | Subject: {subject}")
```

## Scheduling the Report

Use a scheduler (or Make.com/n8n) to run the pipeline on a schedule:

```python
import schedule
import time


def weekly_report_job():
    """The complete automated reporting task."""
    config = {"stripe_key": "sk_test_...", "google_ads_key": "gads_..."}
    
    extractor = DataExtractor(config)
    stripe_data = extractor.fetch_from_stripe(days=7)
    
    # Aggregate into a dataframe
    from pandas import DataFrame
    df = build_metrics_table(stripe_data)
    
    # Generate AI narrative
    summary = generate_executive_summary(df)
    
    # Create chart
    chart = create_chart(df, ["revenue", "ad_spend"], "Revenue vs Ad Spend")
    
    # Deliver
    deliverer = ReportDeliverer({"from": "reports@agency.com"})
    html = deliverer.build_html_report(summary, chart)
    deliverer.send_email("ceo@client.com", "Weekly Performance Report", html)


# Run every Monday at 8am
schedule.every().monday.at("08:00").do(weekly_report_job)

while True:
    schedule.run_pending()
    time.sleep(60)
```

> **Note:** If running the pipeline as a long-lived Python process is impractical, use a cron job or a no-code scheduler (Make.com scheduled scenario) to trigger the same script.

## KPI Report Types

| Report Type | Frequency | Key Metrics | Audience |
|---|---|---|---|
| Executive Dashboard | Weekly | Revenue, ROI, growth rate | CEO/management |
| Marketing Report | Weekly | Spend, leads, CPL, ROAS, conversion | Marketing team |
| Sales Pipeline | Weekly/Monthly | Pipeline value, win rate, cycle time | Sales management |
| Ad Performance | Daily/Weekly | Impressions, CTR, CPC, ROAS | Ad buyers |
| Client Status Report | Monthly | Deliverables, progress, results | Client stakeholders |

## Self-Assessment Questions

1. What are the five stages of an automated reporting pipeline?
2. Why is AI-generated narrative important beyond just showing numbers?
3. What is ROAS and why does it matter to an advertiser?
4. How could "correlation vs causation" mislead an AI narrative writer? Give an example.
5. What are the three main delivery methods for automated reports?
6. Why is scheduled delivery better than manual on-demand reporting?
7. What is derived (vs raw) metrics? Give two examples used in the report.
8. How does the AI summary guard against inventing metrics? (Hint: what rule is in the system prompt?)
9. When would you use cron/`schedule` in Python vs a no-code scheduler like Make.com?
10. What is the value proposition (ROI) of selling automated reporting to a client?

## Practice Problems

### Problem 1
Write an AI system prompt that generates a **sales pipeline** executive summary, listing the exact fields you'd include as input (pipeline value, win rate, open opportunities, etc.).

### Problem 2
Design the data schema (fields) for an aggregated daily marketing table that joins Google Ads spend and CRM leads. Include derived metrics like CPL and ROAS.

### Problem 3
Explain how you would send the same report to two different audiences (CEO vs marketing manager) with different levels of detail and different generated narratives.

### Problem 4
Identify three failure modes of an automated reporting system and how to handle each (e.g., an API returns an error, a metric is zero/missing, the AI narrative contradicts the data).

## Key Takeaways

- Automated reporting = extract → transform → analyze → generate → deliver, run on a schedule
- The AI narrative (executive summary) is the real differentiation — numbers alone aren't enough
- Derived metrics (ROAS, CPL, conversion rate) turn raw data into insight
- Delivery methods: email, Slack, dashboard — often combined
- The AI must be constrained to the provided data to avoid hallucination
- Reporting is a scalable recurring-revenue service every business needs

## Practice Challenge

**Objective:** Prepare for the quiz and build a working automated report.

1. Answer all 10 self-assessment questions from memory, then check
2. Complete all 4 practice problems
3. Build a Python script `reporting_pipeline.py` that:
   - Uses mock data (or a real API you have access to) for 7 days of metrics
   - Aggregates into a dataframe with derived metrics
   - Generates an AI executive summary grounded in the data
   - Creates a chart
   - Assembles and "sends" an HTML email (log it instead of actually emailing)
4. Test the script and produce one full sample report output
5. Write a one-paragraph client pitch for "automated weekly executive reporting"

**Deliverable:** Written answers to questions and problems, a working `reporting_pipeline.py`, one complete sample report, and the client pitch.
