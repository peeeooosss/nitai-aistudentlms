# Web Research Agents

## Learning Objectives

- Understand how web research agents use search, scraping, and synthesis tools
- Build an agent that searches the web, extracts relevant content, and synthesizes findings
- Learn to use search APIs and web scraping responsibly
- Structure research output into organized reports
- Deliver a working web research agent project

## Why Web Research Agents Are Valuable

Businesses constantly need research: competitor analysis, market trends, lead prospecting, content inspiration, due diligence. This is normally slow, manual work. A web research agent automates it by:

1. **Searching** — querying the web for relevant results
2. **Extracting** — fetching and reading pages
3. **Synthesizing** — combining findings into a coherent report
4. **Citing** — providing sources for credibility

This is a high-value agency deliverable because the research is both tedious AND needs judgment.

## The Research Agent Architecture

```
┌──────────┐  ┌──────────┐  ┌───────────┐  ┌─────────────┐
│ SEARCH   │  │ FETCH    │  │ EXTRACT   │  │ SYNTHESIZE  │
│ tool     │  │ content  │  │ relevant  │  │ + cite +    │
│ (API)    │  │ (scrape) │  │ info      │  │ report      │
└──────────┘  └──────────┘  └───────────┘  └─────────────┘
     │             │              │               │
     └─────────────┴──────────────┴───────────────┘
                          AGENT LOOP
```

## The Tools a Research Agent Needs

### 1. Search Tool
Query the web. Use a search API (SerpAPI, Tavily, Brave Search) rather than scraping Google directly (against ToS and fragile).

```python
import os
import json
import requests
from openai import OpenAI

client = OpenAI()


def web_search(query: str, num_results: int = 5) -> list[dict]:
    """Search the web using Tavily API (simplified example)."""
    api_key = os.getenv("TAVILY_API_KEY")
    response = requests.post(
        "https://api.tavily.com/search",
        json={
            "api_key": api_key,
            "query": query,
            "max_results": num_results,
            "search_depth": "advanced",
        }
    )
    if response.status_code != 200:
        return [{"error": f"search failed: {response.status_code}"}]
    data = response.json()
    return [
        {"title": r.get("title"), "url": r.get("url"), "content": r.get("content")}
        for r in data.get("results", [])
    ]
```

### 2. Extract Tool
Fetch and clean a specific page's content. Be respectful with rate limits and robots.txt.

```python
import re
import requests
from bs4 import BeautifulSoup


def fetch_page_text(url: str, max_chars: int = 5000) -> str:
    """Fetch a URL and extract readable text."""
    try:
        headers = {"User-Agent": "MyResearchAgent/1.0"}
        resp = requests.get(url, headers=headers, timeout=15)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "html.parser")
        # Remove scripts/styles
        for tag in soup(["script", "style", "nav", "footer"]):
            tag.decompose()
        text = re.sub(r"\s+", " ", soup.get_text(separator=" "))
        return text[:max_chars]
    except Exception as e:
        return f"[Error fetching page: {e}]"
```

### 3. Synthesis Tool
Generate a structured research report from the collected information.

## Building the Research Agent

```python
class WebResearchAgent:
    def __init__(self, max_steps: int = 6):
        self.max_steps = max_steps
        self.findings = []   # store scraped content as we go
    
    def research(self, research_question: str) -> str:
        """Main entry point: research a question and return a report."""
        # Turn the question into a list of sub-queries
        queries = self.plan_queries(research_question)
        
        for query in queries:
            results = web_search(query, num_results=4)
            for r in results[:2]:   # fetch top 2 per query
                url = r.get("url")
                if url:
                    text = fetch_page_text(url)
                    # Use AI to extract the most relevant facts
                    facts = self.extract_relevant_facts(text, research_question, url)
                    self.findings.extend(facts)
        
        # Synthesize into a final report
        return self.synthesize_report(research_question)
    
    def plan_queries(self, question: str) -> list[str]:
        """Break a research question into sub-queries."""
        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Break this research question into 3-4 "
                                              "targeted web search queries that would find "
                                              "the best sources. Return them as a JSON list."},
                {"role": "user", "content": question}
            ],
            response_format={"type": "json_object"}
        )
        data = json.loads(resp.choices[0].message.content)
        return data.get("queries", [question])
    
    def extract_relevant_facts(self, page_text: str, question: str, url: str) -> list[dict]:
        """Extract facts from a page relevant to the research question."""
        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Extract concise, factual, relevant "
                                              "bullet points that help answer the research "
                                              "question. Do not invent information. "
                                              "Return JSON: {facts: [string]}"},
                {"role": "user", "content": f"Question: {question}\n\nSource text: {page_text}"}
            ],
            response_format={"type": "json_object"}
        )
        data = json.loads(resp.choices[0].message.content)
        return [{"fact": f, "source": url} for f in data.get("facts", [])]
    
    def synthesize_report(self, question: str) -> str:
        """Combine all findings into a structured report with citations."""
        # Format findings for the LLM
        findings_text = "\n".join(
            f"- {f['fact']} (source: {f['source']})" for f in self.findings
        )
        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Write a well-structured research report "
                                              "answering the question. Organize by themes, "
                                              "point out areas of agreement/disagreement "
                                              "between sources, and note confidence. "
                                              "Cite sources inline like (SourceName). "
                                              "Max 600 words."},
                {"role": "user", "content": f"Question: {question}\n\nFindings:\n{findings_text}"}
            ],
            temperature=0.4,
        )
        return resp.choices[0].message.content
```

## Responsible Web Research

Since you're building agents that hit the web, follow these principles:

**Ethical scraping:**
- Respect the site's `robots.txt`
- Rate-limit requests (don't hammer a site)
- Identify yourself with a truthful User-Agent
- Cache results to avoid repeat fetches
- Only use content within legal/ToS boundaries (prefer informative summaries, not wholesale reproduction)

**Reducing hallucination:**
- Ground every claim in an actual crawled source
- Require the synthesizer to attach a source URL to each fact
- Flag low-confidence or conflicting information explicitly
- Never let the agent fabricate sources

## Report Structure Template

```
# Research Report: [Topic]
Prepared: [date] | By: [agent]

## Executive Summary
[2-3 sentence overview of key finding]

## Key Findings
- [Finding with inline source]
- [Finding with inline source]

## Detailed Analysis
### Theme 1: ...
### Theme 2: ...

## Points of Agreement & Disagreement
- [What sources agree on]
- [Where they differ]

## Confidence & Limitations
- [High confidence items]
- [Low confidence / uncertain items]

## Sources
1. [Title] — URL
2. [Title] — URL
```

## Live Project: Competitor Research Agent

Today is a **PROJECT day**. Deliver a working web research agent.

### Project: Competitor Intelligence Agent

**Context:** A client (a small SaaS business) wants to launch a new feature and needs competitive intelligence. Your job is to build a research agent that produces a structured competitive analysis.

#### Part 1: Build the Core Research Agent
Implement the `WebResearchAgent` above with search, fetch, extract, and synthesize capabilities.

#### Part 2: Competitor Analysis Use Case
Direct the agent to research and produce a report on **3 named competitors** of a real (or fictional) product, answering:
- What are each competitor's core features and pricing?
- Where do they position themselves?
- What are their apparent weaknesses or gaps?
- What is the overall market trend?

#### Part 3: Competitive Comparison Table
After the agent returns findings, produce a markdown comparison table:

```markdown
| Feature | Competitor A | Competitor B | Competitor C |
|---|---|---|---|
| Pricing model | | | |
| Key features | | | |
| Target audience | | | |
| Notable weakness | | | |
```

Generate this table by feeding the findings back to the LLM.

#### Part 4: Source Verification & Limitation Report
- List all sources used (URLs)
- Flag which findings are high-confidence vs low-confidence
- Note any conflicts between sources

#### Part 5: Error Handling
Test the agent's behavior when:
- A search returns no results
- A page fetch fails (404, timeout)
- A source contradicts another
Add graceful handling/logging for each.

### Extra Credit
Add a "lead prospecting" mode where the agent searches for companies matching a buyer persona and produces a prospect list with justification for each.

## Key Takeaways

- A web research agent = search + fetch/extract + synthesize + cite
- Use search APIs (Tavily, SerpAPI) rather than scraping search engines directly
- Ground every claim in an actual source URL to reduce hallucination
- Break a big question into sub-queries, fetch top sources, extract relevant facts
- Synthesize into a structured report with themes, agreement/disagreement, confidence, and citations
- Follow ethical scraping: respect robots.txt, rate-limit, cache, identify yourself
- Competitor research is a strong, sellable use case

## Practice Challenge

**Objective:** Complete and deliver the competitor research agent.

1. Complete Parts 1-5 (build the agent, run the competitor analysis, produce comparison table, source verification, error handling)
2. Run the agent on a real topic of your choosing and produce a genuine output report
3. If you don't have a search API key, implement a mock search layer (or use a free search endpoint) so the pipeline still works end-to-end
4. Sanity-check: for at least 3 facts in the report, manually verify the source URL actually supports the claim
5. Write the client-facing deliverable: the competitor report + comparison table + a short note on confidence

**Deliverable:** `research_agent.py` (full pipeline), a completed competitor analysis report with comparison table and sources, verified facts, and documented error handling.
