# Lead Scoring with AI

## Learning Objectives

- Understand what lead scoring is and why it drives sales efficiency
- Compare traditional rule-based scoring with AI/ML-based scoring
- Build a lead scoring model using AI and machine learning
- Combine intent signals, demographic fit, and behavioral data into a composite score
- Apply scoring to automate prioritization and follow-up strategy
- Learn how to implement and validate a scoring system

## What Is Lead Scoring?

Lead scoring is the process of **ranking leads by their likelihood to become customers**. Instead of treating every lead the same, scoring lets a sales team focus effort (and budget) on the leads most likely to convert.

The classic analogy: a salesperson has limited time. Do they call the person who just downloaded one low-tier ebook, or the person from a large company who visited the pricing page 5 times and emailed sales? Lead scoring answers that.

## Why AI Lead Scoring Beats Rules

### Traditional Rule-Based Scoring

A simple approach assigns points manually:

```python
def rule_based_score(lead: dict) -> int:
    score = 0
    # Demographic fit
    if lead.get("industry") in ("technology", "finance"):
        score += 20
    if lead.get("company_size") and lead["company_size"] > 50:
        score += 15
    if lead.get("role") in ("CTO", "Director", "VP"):
        score += 25
    
    # Behavioral signals
    if lead.get("pricing_page_views", 0) > 3:
        score += 20
    if lead.get("downloaded_high_value_asset"):
        score += 15
    if lead.get("requested_demo"):
        score += 30
    if lead.get("email_opened"):
        score += 5
    if lead.get("call_attended"):
        score += 20
    
    # Recency
    if lead.get("days_since_last_activity", 999) < 1:
        score += 10
    
    return min(100, score)
```

**Limitations of rules:**
- Weight choices are guesswork, not data-driven
- Doesn't capture complex interactions ("a CTO who viewed pricing is worth more than the sum of the parts")
- Doesn't adapt as your business changes
- Can't handle many signals simultaneously

### AI/ML Lead Scoring

A machine learning model learns the relationship between lead features and actual conversion outcomes from **historical data**. It finds the weights automatically.

```
Historical data:
  Feature matrix X (demographics + behaviors)
  Target y (did they become a customer: 0 or 1)

Model learns: P(customer | features)
```

## The Scoring Model in Python

Let's build a realistic lead scoring model. Start with feature engineering and a scikit-learn model:

```python
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, roc_auc_score


# ---- Synthetic historical data for demonstration ----
# In production this comes from your CRM's conversion history.
def generate_leads(n: int = 1000) -> pd.DataFrame:
    np.random.seed(42)
    data = {
        "pricing_page_views": np.random.poisson(2, n),
        "email_clicks": np.random.poisson(1.5, n),
        "webinars_attended": np.random.poisson(0.4, n),
        "content_downloads": np.random.poisson(3, n),
        "requested_demo": np.random.binomial(1, 0.25, n),
        "email_replied": np.random.binomial(1, 0.4, n),
        "company_size": np.random.choice([5, 20, 50, 100, 500, 1000], n, p=[.2,.3,.2,.15,.1,.05]),
        "role_seniority": np.random.choice([0, 1, 2], n, p=[.5,.35,.15]),
    }
    df = pd.DataFrame(data)
    
    # Latent "true propensity" that our model should learn
    # (weighted combination + noise)
    prop = (
        0.02 * df["pricing_page_views"]
        + 0.03 * df["email_clicks"]
        + 0.05 * df["webinars_attended"]
        + 0.02 * df["content_downloads"]
        + 0.30 * df["requested_demo"]
        + 0.15 * df["email_replied"]
        + 0.002 * df["company_size"]
        + 0.06 * df["role_seniority"]
    )
    prob = 1 / (1 + np.exp(-(prop - 2.5)))
    df["converted"] = np.random.binomial(1, prob)
    
    # Add noise/signal strength
    df["converted"] = np.where(df["converted"] == 1, 1, 0)
    return df


# ---- Build training data ----
leads = generate_leads(2000)
X = leads.drop(columns=["converted"])
y = leads["converted"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

# ---- Train a model ----
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# ---- Evaluate ----
y_pred = model.predict(X_test)
y_prob = model.predict_proba(X_test)[:, 1]

print(f"Accuracy:  {accuracy_score(y_test, y_pred):.3f}")
print(f"AUC-ROC:   {roc_auc_score(y_test, y_prob):.3f}")

# ---- Feature importance (which signals matter most?) ----
importances = sorted(
    zip(X.columns, model.feature_importances_),
    key=lambda x: x[1], reverse=True
)
print("\nFeature importance:")
for feat, imp in importances:
    print(f"  {feat}: {imp:.3f}")


# ---- Score a new lead ----
def score_lead(model, lead_features: dict) -> float:
    row = pd.DataFrame([lead_features])
    return float(model.predict_proba(row)[:, 1][0])


new_lead = {
    "pricing_page_views": 5,
    "email_clicks": 3,
    "webinars_attended": 1,
    "content_downloads": 4,
    "requested_demo": 1,
    "email_replied": 1,
    "company_size": 200,
    "role_seniority": 1,
}
print(f"\nNew lead conversion probability: {score_lead(model, new_lead):.3f}")
```

## From Probability to Actionable Tiers

A raw probability is not directly actionable. Convert it into a **tier or bucket** that drives the sales playbook:

```python
def assign_tier(probability: float) -> str:
    """Map probability to a sales action tier."""
    if probability >= 0.70:
        return "hot"        # Contact immediately, VIP handling
    elif probability >= 0.40:
        return "warm"       # Follow up within 24h, nurture
    elif probability >= 0.15:
        return "cool"       # Add to nurture sequence
    else:
        return "cold"       # Low-cost nurture, auto sequence only
```

| Probability | Tier | Sales Action |
|---|---|---|
| ≥ 0.70 | Hot | Immediate outreach, call, demo request |
| 0.40-0.69 | Warm | Follow up within 24h, personalized email |
| 0.15-0.39 | Cool | Add to automated nurture sequence |
| < 0.15 | Cold | Low-cost automated content drip |

## Combining AI Probability with Explicit Signals

A hybrid approach often works best: use the ML probability as the backbone, then **override** with strong explicit intent signals (e.g., anyone who requests a demo or fills a form saying "urgent budget" is auto-promoted to hot regardless of model probability).

```python
def final_score(lead: dict, model_prediction: float) -> dict:
    tier = assign_tier(model_prediction)
    reasons = []
    
    # Explicit override rules
    if lead.get("requested_demo"):
        tier = "hot"
        reasons.append("Requested a demo (explicit intent)")
    if lead.get("budget_confirmed"):
        tier = "hot"
        reasons.append("Confirmed budget (explicit intent)")
    if lead.get("competitor_looking"):
        tier = "warm"
        reasons.append("Actively evaluating competitors")
    
    return {
        "probability": round(model_prediction, 3),
        "tier": tier,
        "reasons": reasons,
        "next_action": NEXT_ACTIONS[tier]
    }

NEXT_ACTIONS = {
    "hot": {"action": "call", "within": "1 hour", "channel": "phone + email"},
    "warm": {"action": "email_sequence", "within": "24 hours", "channel": "email"},
    "cool": {"action": "nurture_drip", "within": "3 days", "channel": "email"},
    "cold": {"action": "long_term_drip", "within": "1 week", "channel": "email"},
}
```

## The Lead Scoring Feedback Loop

A scoring system must be **kept in sync with reality**:

```
1. Score leads from your lowest-cost channel
2. Record actual conversions
3. Feed conversion data back into the model (retrain)
4. Re-score and validate using AUC / lift
5. Adjust tiers and overrides as the business changes
```

**Validation metric:** AUC-ROC. A model with AUC > 0.7 is meaningfully better than random. You want to see improvement over baseline rules.

Also measure **business impact**, not just model accuracy:
- Conversion rate of hot tier vs. cold tier (should be dramatically different)
- Time-to-first-outreach for hot leads
- Revenue generated per tier
- Cost per acquisition

## The Agency Angle

Selling lead scoring to clients is about framing:

- **The pain:** "Your sales team is wasting time on unqualified leads and missing the hot ones."
- **The promise:** "We'll rank your entire pipeline by conversion likelihood and build an automated follow-up system so reps always know exactly who to call first."
- **The proof:** show a demo where a hot lead surfaced that would have been ignored.

This is usually a **proven ROI** sale because you can (in principle) estimate the value of not missing a high-value deal.

## Key Takeaways

- Lead scoring ranks leads by conversion likelihood so sales focuses where it counts
- Rule-based scoring is simple but guessy; ML scoring learns weights from real conversion data
- Use a classification model (e.g., RandomForest) on demographics + behavioral signals
- Convert probability into actionable tiers (hot/warm/cool/cold) that drive the sales playbook
- Combine ML probability with explicit-intent overrides (demo requests, confirmed budget)
- Maintain a feedback loop: retrain on actual conversions and validate with AUC-ROC
- Validate business impact, not just model accuracy

## Practice Challenge

**Objective:** Build and evaluate an AI lead scoring system.

1. Use the synthetic data generator to create a training dataset
2. Train a `RandomForestClassifier` and report accuracy + AUC-ROC
3. Identify and list the three most important features from the model
4. Create a `score_lead` function that returns tier + reason + next action
5. Test at least 5 different combinations of lead signals and record the tier each produces
6. Build the feedback loop skeleton: add a `retrain()` function that takes new conversion data and retrains the model
7. Write a client pitch (3-4 paragraphs) explaining the ROI of AI lead scoring, including how you'd estimate the value of each "hot" lead to the business

**Deliverable:** `lead_scoring.py` (model training, evaluation, scoring, and retrain loop), test results for 5 leads, and a client pitch document.
