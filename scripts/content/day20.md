# AI Spreadsheet Automation

## Learning Objectives
- Master AI-powered spreadsheet workflows for data processing and analysis
- Learn to automate repetitive spreadsheet tasks with AI formulas and scripts
- Build dashboards and reports using AI-assisted formulas
- Understand when to use spreadsheets vs. databases vs. BI tools

---

## Why Spreadsheets Still Matter

Spreadsheets are the most widely used data tool in business. AI makes them dramatically more powerful by automating formula creation, data cleaning, and analysis.

### AI Spreadsheet Capabilities
- **Formula generation:** Describe what you want in plain English, get the formula
- **Data cleaning:** Automate deduplication, formatting, and validation
- **Analysis:** Generate pivot tables, summaries, and statistical analysis
- **Visualization:** Create charts and dashboards from data
- **Automation:** Build macros and scripts without coding

## AI Formula Generation

### ChatGPT/Claude for Formulas
```
I have a Google Sheet with:
- Column A: Order Date (MM/DD/YYYY)
- Column B: Product Name
- Column C: Revenue ($)
- Column D: Customer Region

I need a formula that:
1. Calculates total revenue for "Electronics" products in "North America" region
   for orders placed in the last 30 days

Write the formula and explain each part.
```

### Common Formula Requests
```
1. SUMIFS with date range:
   =SUMIFS(C:C, B:B, "Electronics", D:D, "North America", A:A, ">="&(TODAY()-30))

2. VLOOKUP with error handling:
   =IFERROR(VLOOKUP(E2, Sheet2!A:B, 2, FALSE), "Not Found")

3. Dynamic date grouping:
   =TEXT(A2, "YYYY-MM")

4. Conditional formatting formula:
   =AND(C2>1000, D2="VIP")

5. Array formula for entire column:
   =ARRAYFORMULA(IF(A2:A<>"", UPPER(B2:B), ""))
```

## Data Cleaning with AI

### Automated Cleaning Script
```
I need to clean this dataset in Google Sheets:

[paste data or describe structure]

Tasks:
1. Remove duplicate rows based on columns A and B
2. Standardize all text in column C to title case
3. Convert column D from text to numbers (remove "$" and ",")
4. Fill empty cells in column E with the value above
5. Split column F into two columns at the "/" delimiter
6. Remove leading/trailing whitespace from all text columns

Write the formulas or Apps Script code for each task.
```

### Data Validation Rules
```
Create data validation for this spreadsheet:

Columns:
A: Date (must be within last 90 days)
B: Email (must be valid email format)
C: Amount (must be positive number, max 10,000)
D: Status (must be one of: Pending, Active, Completed, Cancelled)
E: Phone (must be format: XXX-XXX-XXXX)

Write data validation rules and conditional formatting for invalid entries.
```

## Building Dashboards with AI

### Sales Dashboard
```
I have sales data with columns:
Date, Salesperson, Product, Revenue, Quantity, Region, Customer Type

Build a dashboard that shows:
1. Total revenue by month (line chart)
2. Revenue by product (pie chart)
3. Top 5 salespersons (horizontal bar chart)
4. Revenue by region (map or bar chart)
5. Key metrics: total revenue, avg order value, total transactions
6. Month-over-month growth rate

Include formulas for each metric and suggest chart types.
```

### KPI Tracking Dashboard
```
Design a KPI dashboard for [business type]:

Key metrics to track:
- [list 5-8 metrics with their targets]

Include:
1. Scorecard with current value, target, and status indicator
2. Trend chart for each metric (last 12 months)
3. Traffic light system (green/yellow/red) based on performance
4. Month-over-month and year-over-year comparisons
5. Forecast for next month based on current trend

Write the formulas and layout structure.
```

## Google Sheets Apps Script Automation

### Automated Report Generator
```
Write an Apps Script that:
1. Pulls data from a specific sheet range
2. Calculates summary statistics (sum, average, count, min, max)
3. Creates a new sheet with the formatted report
4. Adds a timestamp of when the report was generated
5. Sends an email with the report attached (PDF)

Include error handling and comments.
```

### Data Sync Automation
```
Write an Apps Script that:
1. Connects to an API endpoint: [URL]
2. Fetches new data every hour (using triggers)
3. Appends new records to the bottom of a sheet
4. Skips duplicates based on a unique ID column
5. Logs how many new records were added
6. Sends a Slack notification if more than 100 new records

Include authentication handling and rate limiting.
```

## Advanced Techniques

### ArrayFormulas for Entire Columns
```
Instead of dragging formulas down, use ARRAYFORMULA:

# Calculate tax for entire column
=ARRAYFORMULA(IF(A2:A<>"", C2:C * 0.08, ""))

# Concatenate first and last names
=ARRAYFORMULA(IF(A2:A<>"", A2:A & " " & B2:B, ""))

# Conditional calculations
=ARRAYFORMULA(IF(D2:D="VIP", C2:C * 0.9, C2:C))
```

### Query Function for Dynamic Analysis
```
# Filter and sort with QUERY
=QUERY(A1:E100, "SELECT A, C, E WHERE D = 'Active' ORDER BY C DESC", 1)

# Group and aggregate
=QUERY(A1:E100, "SELECT A, SUM(C) GROUP BY A ORDER BY SUM(C) DESC", 1)

# Filter with date range
=QUERY(A1:E100, "SELECT A, C WHERE A >= date '2026-01-01' AND A <= date '2026-01-31'", 1)
```

## When to Graduate from Spreadsheets

Spreadsheets are powerful but have limits:
- **Rows:** Google Sheets caps at 10 million cells; Excel at ~1 million rows
- **Collaboration:** Real-time editing breaks down with 5+ simultaneous users
- **Complexity:** Nested formulas become unmaintainable
- **Security:** Limited access controls and audit trails

Consider databases when:
- You exceed row limits
- You need multi-user concurrent editing
- Data relationships become complex
- You need robust access controls and audit trails

## Key Takeaways

- AI makes spreadsheet work faster: describe what you want, get the formula
- Use Apps Script to automate repetitive tasks and create custom workflows
- Dashboard design follows a pattern: KPIs at top, trends in middle, details at bottom
- ARRAYFORMULA and QUERY are the most powerful functions for scalable spreadsheets
- Know when to graduate from spreadsheets to databases

## Practice Challenge

1. Take a messy dataset and use AI to generate cleaning formulas
2. Build a KPI dashboard with 5 metrics and trend charts
3. Write an Apps Script that automates a repetitive task
4. Use ARRAYFORMULA to replace 50+ rows of copied formulas
