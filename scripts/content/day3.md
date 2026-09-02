# AI Fundamentals — Machine Learning, NLP & Computer Vision Deep Dive

## Learning Objectives
- Understand neural network architecture and how layers learn
- Learn the machine learning pipeline from data to deployment
- Evaluate model performance with accuracy, precision, recall, and F1
- Recognize and mitigate bias in AI systems

---

## Neural Networks: The Building Blocks

A neural network is a mathematical function inspired by biological neurons. It consists of layers of interconnected nodes that transform input data into output predictions.

### Architecture
```
Input Layer          Hidden Layers         Output Layer
[Features]  -->  [Learned Weights]  -->  [Prediction]
```

- **Input layer:** Receives raw data (numbers, pixel values, token embeddings)
- **Hidden layers:** Learn increasingly abstract representations
- **Output layer:** Produces the final prediction (class label, probability, number)

### How a Neuron Works
```
Inputs: x1, x2, x3
Weights: w1, w2, w3
Bias: b

Sum = x1*w1 + x2*w2 + x3*w3 + b
Output = activation(Sum)
```

The **activation function** (ReLU, sigmoid, tanh) introduces non-linearity, allowing the network to learn complex patterns.

```python
import numpy as np

def simple_neuron(inputs, weights, bias):
    """A single neuron with ReLU activation."""
    weighted_sum = np.dot(inputs, weights) + bias
    return max(0, weighted_sum)  # ReLU: outputs 0 if negative

# Classifying: is this a good deal?
inputs = np.array([0.8, 0.6, 0.9])  # [price_score, quality_score, reviews_score]
weights = np.array([0.4, 0.35, 0.25])  # learned importance
bias = -0.1

score = simple_neuron(inputs, weights, bias)
print(f"Deal score: {score:.2f}")  # Deal score: 0.72
```

### Training: How Networks Learn
1. **Forward pass:** Input flows through the network, producing a prediction
2. **Loss calculation:** Compare prediction to actual answer (e.g., cross-entropy for classification)
3. **Backpropagation:** Calculate gradients — how much each weight contributed to the error
4. **Weight update:** Adjust weights to reduce the error (gradient descent)

```python
# Simplified training loop concept
for epoch in range(100):
    prediction = model.forward(data)       # Forward pass
    loss = cross_entropy(prediction, labels)  # Measure error
    gradients = compute_gradients(loss)     # Backpropagation
    model.update_weights(gradients, lr=0.01) # Gradient descent
```

This repeats thousands or millions of times until the model converges.

## The Machine Learning Pipeline

Real-world ML follows a structured pipeline:

### 1. Data Collection
- Gather data from databases, APIs, files, or web scraping
- Quality matters more than quantity — garbage in, garbage out
- Aim for representative data that covers edge cases

### 2. Data Preprocessing
```python
import pandas as pd
from sklearn.preprocessing import StandardScaler

# Load raw data
df = pd.read_csv('customer_data.csv')

# Handle missing values
df['age'].fillna(df['age'].median(), inplace=True)

# Normalize numerical features
scaler = StandardScaler()
df[['age', 'income', 'spending']] = scaler.fit_transform(
    df[['age', 'income', 'spending']]
)

# Encode categorical variables
df = pd.get_dummies(df, columns=['region', 'membership_tier'])
```

### 3. Feature Engineering
Creating meaningful inputs for your model:
- **Text:** TF-IDF, word embeddings, character n-grams
- **Images:** Resize, normalize pixel values, data augmentation (rotate, flip, crop)
- **Dates:** Extract day of week, month, is_weekend, time_since_event
- **Numerical:** Log transforms, polynomial features, binning

### 4. Model Selection
| Data Type | Recommended Models | When to Use |
|-----------|-------------------|-------------|
| Tabular + small dataset | Random Forest, XGBoost | Most business problems |
| Tabular + large dataset | Neural networks | 100k+ rows |
| Text | Transformer (BERT, GPT) | Classification, generation |
| Image | CNN (ResNet, EfficientNet) | Classification, detection |
| Time series | LSTM, Prophet, Temporal Fusion Transformer | Forecasting |

### 5. Model Evaluation

**Classification Metrics:**
```python
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

# Confusion matrix concept:
#                  Predicted Positive  Predicted Negative
# Actual Positive:       TP                 FN
# Actual Negative:       FP                 TN

accuracy  = (TP + TN) / (TP + TN + FP + FN)  # Overall correctness
precision = TP / (TP + FP)  # Of positive predictions, how many correct?
recall    = TP / (TP + FN)  # Of actual positives, how many found?
f1        = 2 * (precision * recall) / (precision + recall)  # Harmonic mean
```

**When to prioritize which metric:**
- **Accuracy:** Balanced datasets, equal cost of errors
- **Precision:** When false positives are costly (spam filter: marking legitimate email as spam)
- **Recall:** When false negatives are costly (medical screening: missing a cancer diagnosis)
- **F1:** Imbalanced datasets, when both errors matter

### 6. Overfitting and Underfitting

**Overfitting:** Model memorizes training data, performs poorly on new data.
- Symptoms: High training accuracy, low test accuracy
- Fixes: More data, regularization, simpler model, dropout, early stopping

**Underfitting:** Model is too simple to capture patterns.
- Symptoms: Low training accuracy AND low test accuracy
- Fixes: More features, more complex model, longer training

```python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model.fit(X_train, y_train)

train_acc = model.score(X_train, y_train)  # e.g., 0.98
test_acc = model.score(X_test, y_test)      # e.g., 0.72

if train_acc - test_acc > 0.15:
    print("Warning: likely overfitting. Consider regularization.")
```

## Bias and Fairness in AI

AI systems can perpetuate or amplify biases present in training data.

### Common Sources of Bias
1. **Historical bias:** Training data reflects past discrimination
2. **Representation bias:** Certain groups are underrepresented in data
3. **Measurement bias:** Features proxy for protected attributes
4. **Aggregation bias:** One model fits all when subgroups differ

### Real Examples
- Hiring algorithm penalized resumes with the word "women's" (e.g., "women's chess club") because training data reflected male-dominated hiring
- Facial recognition had error rates 10-100x higher for dark-skinned women than light-skinned men
- Credit scoring models used zip code as a feature, which correlated with race

### Mitigation Strategies
1. **Audit data for representation** before training
2. **Use fairness metrics** (demographic parity, equalized odds) alongside accuracy
3. **Remove or transform proxy features** that correlate with protected attributes
4. **Test model performance across subgroups** — not just overall accuracy
5. **Establish human oversight** for high-stakes decisions

## Key Takeaways

- Neural networks learn through forward pass, loss, backpropagation, and weight update cycles
- The ML pipeline is: collect, preprocess, engineer features, select model, evaluate, deploy
- Choose metrics based on your error costs: precision (avoid false alarms) vs. recall (avoid misses)
- Overfitting = memorization; underfitting = simplicity. Aim for the sweet spot.
- AI bias is a real engineering problem, not just an ethics discussion — audit, measure, mitigate

## Practice Challenge

1. Using the decision tree below, trace a prediction for a customer with: age=35, income=$75k, member=Yes
2. Calculate precision, recall, and F1 for a classifier with TP=80, FP=20, FN=15, TN=885
3. Identify which type of bias might affect a loan approval model trained on 10 years of historical data
