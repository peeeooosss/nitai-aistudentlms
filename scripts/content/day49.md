# AI Analytics Dashboards

## Learning Objectives

- Understand how to build automated analytics dashboards powered by AI
- Learn the architecture of a data pipeline that feeds a live dashboard
- Add AI-generated insights, alerts, and natural language queries to dashboards
- Prepare for the live interactive session on AI analytics dashboards

## Live Session Overview

This is a **LIVE_INTERACTIVE** day:

1. **Recap** — reporting (Day 40) + SEO automation (15 min)
2. **Lecture/Demo** — building a dashboard + AI insights layer (45 min)
3. **Hands-on exercises** — build your own dashboard (60 min)
4. **Discussion** — from dashboards to decisions (15 min)
5. **Q&A** (15 min)

## From Static Reports to Live Dashboards

Day 40 covered **scheduled reports** — the "push" model. Dashboards flip this to a **"pull" model**: a live, always-available view that stakeholders access on demand. AI elevates dashboards from data displays into **insight engines** that:

1. **Explain anomalies** — "Why did conversions spike yesterday?"
2. **Predict trends** — "with current pace, you'll hit your target in 18 days"
3. **Alert on issues** — "Spend is 30% over budget"
4. **Answer questions** — natural language queries against the data

## The Dashboard Architecture

```
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ DATA     │  │ PIPELINE │  │ STORAGE  │  │ BACKEND  │  │ FRONTEND │
│ SRCS     │─▶│ (ETL)    │─▶│ (DB)     │─▶│ API + AI │─▶│ dashboard│
│ APIs,    │  │ clean    │  │ (tables, │  │ insights │  │ charts + │
│ DBs      │  │ combine  │  │  stored) │  │ queries  │  │ alerts   │
└──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘
```

### Option A: No-Code Dashboard (Fastest for Clients)
Tools like **Airtable Interfaces**, **Google Looker Studio**, **Metabase**, or **Grafana** connect to your data and provide a visual dashboard with little code. Great for client handoff.

### Option B: Custom (Streamlit/Dash)
Python frameworks build interactive dashboards with AI integration — more control, great for demos and custom insight features.

## Building a Dashboard with Streamlit

Let's build an AI-powered dashboard using Python + Streamlit. Streamlit turns a Python script into a live web app.

```python
# pip install streamlit pandas plotly openai
import streamlit as st
import pandas as pd
import plotly.express as px
from openai import OpenAI

client = OpenAI()


# ---- Load / generate data ----
@st.cache_data
def load_metrics() -> pd.DataFrame:
    """Simulate loading metrics from a data source."""
    import numpy as np
    dates = pd.date_range(end=pd.Timestamp.today(), periods=30, freq="D")
    df = pd.DataFrame({
        "date": dates,
        "revenue": np.round(np.random.uniform(5000, 15000, len(dates)), 2),
        "orders": np.random.randint(50, 200, len(dates)),
        "traffic": np.random.randint(5000, 20000, len(dates)),
        "ad_spend": np.round(np.random.uniform(500, 2000, len(dates)), 2),
    })
    df["conversion_rate"] = df["orders"] / df["traffic"] * 100
    df["roas"] = df["revenue"] / df["ad_spend"]
    return df


df = load_metrics()

st.set_page_config(page_title="AI Business Dashboard", layout="wide")
st.title("AI Business Performance Dashboard")


# ---- KPI cards ----
col1, col2, col3, col4 = st.columns(4)
col1.metric("Total Revenue", f"${df['revenue'].sum():,.0f}")
col2.metric("Total Orders", f"{df['orders'].sum():,}")
col3.metric("Avg Conversion", f"{df['conversion_rate'].mean():.2f}%")
col4.metric("Avg ROAS", f"{df['roas'].mean():.2f}x")


# ---- Charts ----
st.subheader("Revenue Trend")
fig = px.line(df, x="date", y="revenue", title="Daily Revenue")
st.plotly_chart(fig, use_container_width=True)

st.subheader("Revenue vs Ad Spend")
fig2 = px.line(df, x="date", y=["revenue", "ad_spend"], title="Revenue & Spend")
st.plotly_chart(fig2, use_container_width=True)
```

## The AI Insights Layer

Add a button that generates an AI executive insight from the current data:

```python
def generate_ai_insights(df: pd.DataFrame) -> str:
    """Generate data-backed insights + a recommended action."""
    recent = df.tail(7)
    summary = f"""
    Last 7 days:
    - Revenue: min {recent['revenue'].min():.0f}, max {recent['revenue'].max():.0f}, 
      avg {recent['revenue'].mean():.0f}
    - Orders: total {recent['orders'].sum()}
    - Conversion rate: avg {recent['conversion_rate'].mean():.2f}%
    - ROAS: avg {recent['roas'].mean():.2f}x
    - Ad spend: total {recent['ad_spend'].sum():.0f}
    """
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": """You are a data analyst. Analyze the provided
            metrics and produce:
            1. The single most important observation
            2. Any anomalies or worrying trends
            3. One concrete recommended action
            Be specific with numbers. Do not invent metrics not provided.
            Max 150 words, professional.""",
             "role": "system"},
            {"role": "user", "content": summary}
        ],
        temperature=0.4,
    )
    return resp.choices[0].message.content


if st.button("Generate AI Insights"):
    with st.spinner("Analyzing your data..."):
        insights = generate_ai_insights(df)
    st.markdown("### AI-Generated Insights")
    st.write(insights)
```

## Natural Language Querying

Let users ask questions about the data in plain English (Text-to-SQL) and get an answer:

```python
def text_to_sql(question: str, schema: str) -> str:
    """Convert a natural language question into a SQL query."""
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content":
             f"Convert the user's question into a SQL SELECT query for this schema:\n{schema}\n"
             "Return only the SQL, no explanation."},
            {"role": "user", "content": question}
        ],
        temperature=0,
    )
    return resp.choices[0].message.content.strip().rstrip(";")


def nl_query_to_answer(question: str, df: pd.DataFrame) -> str:
    """Answer a natural language question by executing generated SQL."""
    schema = "table metrics(date DATE, revenue FLOAT, orders INT, traffic INT, " \
             "ad_spend FLOAT, conversion_rate FLOAT, roas FLOAT)"
    sql = text_to_sql(question, schema)
    try:
        import sqlite3
        conn = sqlite3.connect(":memory:")
        df.to_sql("metrics", conn, index=False, if_exists="replace")
        result = pd.read_sql(sql, conn)
        conn.close()
        return f"SQL: {sql}\n\nResult:\n{result.to_string()}"
    except Exception as e:
        return f"Could not run query. Error: {e}\nSQL was: {sql}"
```

## Automated Alerts

The dashboard can also monitor and alert when anomalies occur:

```python
def detect_anomalies(df: pd.DataFrame) -> list[dict]:
    """Simple statistical anomaly detection (z-score method)."""
    import numpy as np
    anomalies = []
    for col in ["revenue", "traffic", "conversion_rate", "roas"]:
        values = df[col]
        mean = values.mean()
        std = values.std()
        if std == 0:
            continue
        last = values.iloc[-1]
        z = (last - mean) / std
        if abs(z) > 2:  # more than 2 std devs from mean
            anomalies.append({
                "metric": col, "value": round(last, 2),
                "mean": round(mean, 2), "z-score": round(z, 2),
                "direction": "up" if z > 0 else "down"
            })
    return anomalies


def generate_alert_message(anomalies: list[dict]) -> str:
    """Turn detected anomalies into a clear alert + recommendation."""
    if not anomalies:
        return "No significant anomalies detected in the last data point."
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Explain the detected anomalies clearly and "
                                          "suggest a possible cause and a recommended action "
                                          "for each. Be practical."},
            {"role": "user", "content": str(anomalies)}
        ],
        temperature=0.4,
    )
    return resp.choices[0].message.content
```

## No-Code Alternative for Clients

For a maintained, client-friendly deliverable, consider this split:
- **Data pipeline + AI insights** in Python (your code)
- **Visual dashboard** in Looker Studio / Metabase / Airtable Interfaces (connect to your storage)

Show the chart + the AI insight text side by side. This gives clients a polished, maintainable dashboard without you maintaining a web app.

## Live Session Exercises

### Exercise 1: KPI Cards + Charts
Build the Streamlit dashboard with 4 KPI cards and 2 charts (revenue trend, revenue vs spend). Run it locally with `streamlit run dashboard.py`.

### Exercise 2: AI Insights Button
Add the "Generate AI Insights" button so it produces a data-backed analysis on demand.

### Exercise 3: Natural Language Querying
Add a text input where the user types a question and gets an answer (Text-to-SQL). Test with: "What was the highest revenue day?" and "Total ad spend for last 7 days."

### Exercise 4: Anomaly Alerts
Add anomaly detection that flags any metric deviating >2 std devs, and generate an AI explanation.

### Exercise 5: Make It a Client Deliverable
Explain how you'd hand this to a non-technical client. Would you use Streamlit or a no-code dashboard? Justify your choice.

## Discussion Topics

1. Why do many dashboards go unused? How do you design one people actually use daily?
2. Where's the line between "useful insight" and "AI hallucination" in dashboard text?
3. What data quality issues break a dashboard, and how do you handle them?
4. Should AI dashboards recommend actions or just show facts? Why does it matter?
5. How do you avoid overwhelming the user with too many metrics and alerts?

## Key Takeaways

- Dashboards are the "pull" model of reporting — always-available, on-demand
- Architecture: data sources → pipeline → storage → backend/API + AI → frontend dashboard
- Python + Streamlit is a fast way to build interactive AI dashboards for demos
- The AI insights layer turns data into narrative, anomaly detection, and recommendations
- Text-to-SQL enables natural language querying of the data
- Automated alerts (z-score anomaly detection) keep stakeholders informed
- For production clients, consider combining your Python pipeline with a no-code dashboard tool (Looker Studio, Metabase, Airtable Interfaces)

## Practice Challenge

**Objective:** Deliver a working AI analytics dashboard.

1. Complete all five exercises
2. Build a complete `dashboard.py` that includes: KPI cards, charts, AI insights, NL querying, and anomaly alerts
3. Run it and capture a screenshot or describe the output
4. Write a client handoff plan: how the non-technical client would use it, refresh the data, and interpret the AI insights
5. Compare in writing: Streamlit vs a no-code dashboard for this use case (pros/cons each)
6. Prepare a 5-minute demo for the live session

**Deliverable:** `dashboard.py` (working AI dashboard), a demo/screenshot, the client handoff plan, and the Streamlit vs no-code comparison.
