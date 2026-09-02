# Understanding AI — Types, Capabilities & Use Cases

## Learning Objectives
- Learn the three main paradigms of machine learning
- Understand NLP, computer vision, and generative AI capabilities
- Match AI types to real-world problem statements
- Complete your first hands-on AI project

---

## Machine Learning Paradigms

Machine learning is the engine behind most modern AI. It breaks down into three fundamental paradigms:

### Supervised Learning
You provide the model with labeled examples — input-output pairs — and it learns the mapping function.

```python
# Example: Predicting house prices
from sklearn.linear_model import LinearRegression

# Training data: [square_footage, bedrooms, age] -> price
X_train = [[1400, 3, 10], [1600, 3, 5], [1700, 2, 15], [1900, 4, 8]]
y_train = [300000, 350000, 280000, 400000]

model = LinearRegression()
model.fit(X_train, y_train)

# Predict price for a new house
new_house = [[1800, 3, 7]]
predicted_price = model.predict(new_house)
print(f"Predicted price: ${predicted_price[0]:,.0f}")
# Output: Predicted price: $362,500
```

**Key characteristics:**
- Requires labeled data (expensive to collect)
- Tasks: classification (spam/not spam), regression (price prediction)
- Examples: email spam filters, medical diagnosis, price forecasting

### Unsupervised Learning
You provide unlabeled data and the model discovers hidden structure on its own.

```python
# Example: Customer segmentation
from sklearn.cluster import KMeans
import numpy as np

# Customer data: [annual_spend, visit_frequency, avg_basket_size]
customers = np.array([
    [5000, 12, 80],   # High-value frequent buyer
    [5200, 11, 85],   # Similar to above
    [800, 3, 25],     # Low-value occasional buyer
    [900, 2, 30],     # Similar to above
    [2500, 7, 50],    # Mid-range
    [2300, 8, 45],    # Similar to above
])

kmeans = KMeans(n_clusters=3, random_state=42)
segments = kmeans.fit_predict(customers)

for i, segment in enumerate(segments):
    print(f"Customer {i+1} -> Segment {segment}")
# Output:
# Customer 1 -> Segment 1  (high-value)
# Customer 2 -> Segment 1
# Customer 3 -> Segment 0  (low-value)
# Customer 4 -> Segment 0
# Customer 5 -> Segment 2  (mid-range)
# Customer 6 -> Segment 2
```

**Key characteristics:**
- No labels needed
- Tasks: clustering, anomaly detection, dimensionality reduction
- Examples: customer segmentation, fraud detection, topic modeling

### Reinforcement Learning
An agent learns by interacting with an environment, receiving rewards or penalties for its actions.

```
Agent observes state -> Takes action -> Environment returns reward + new state
```

**Real-world applications:**
- Game playing (AlphaGo, Dota 2 bots)
- Robotics (training robots to walk, grasp objects)
- Resource optimization (data center cooling, traffic routing)
- Recommendation systems (balancing exploration vs. exploitation)

## Natural Language Processing (NLP)

NLP gives machines the ability to read, understand, and generate human language.

### Core NLP Tasks
| Task | What It Does | Example |
|------|-------------|---------|
| Sentiment Analysis | Determines emotional tone | "This product is amazing!" -> Positive |
| Named Entity Recognition | Extracts entities from text | "Apple announced iPhone 16" -> Apple (ORG), iPhone 16 (PRODUCT) |
| Text Summarization | Condenses long text | 1000-word article -> 100-word summary |
| Translation | Converts between languages | English -> Spanish |
| Question Answering | Answers questions from context | "When was Python created?" -> "1991" |
| Text Generation | Produces new text | Given a prompt, write a story |

### Modern NLP: Transformers
The transformer architecture (introduced in 2017) revolutionized NLP. Models like GPT, BERT, and Claude are all transformer-based.

The key insight: **attention mechanism**. Instead of processing words sequentially (like RNNs), transformers process all words in parallel and learn which words are most relevant to each other.

```
"The cat sat on the mat because it was tired"
                      |
              Attention: "it" attends to "cat" (not "mat")
```

This parallelism enables training on massive datasets, producing models with deep language understanding.

## Computer Vision

Computer vision enables machines to interpret visual information from the world.

### Core Vision Tasks
- **Image Classification:** What is in this image? (cat, dog, car)
- **Object Detection:** Where are objects in this image? (bounding boxes around each car in a street scene)
- **Semantic Segmentation:** Label every pixel (road = blue, sky = gray, building = red)
- **Pose Estimation:** Where are body joints? (skeleton overlay on a person)
- **Image Generation:** Create new images from text descriptions (DALL-E, Midjourney)

### How Vision Models Learn
Convolutional Neural Networks (CNNs) scan images with filters that detect patterns:
- Layer 1: edges, colors, simple textures
- Layer 2: shapes, corners, patterns
- Layer 3: object parts (eyes, wheels, windows)
- Layer 4-5: complete objects (faces, cars, buildings)

Transfer learning is the standard practice — take a model pre-trained on millions of images and fine-tune it for your specific task. You do not need to train from scratch.

## Generative AI

Generative AI creates new content rather than analyzing existing content.

### Types of Generative Models
1. **Large Language Models (LLMs):** GPT-4, Claude, Llama — generate text, code, reasoning
2. **Image Generators:** DALL-E, Stable Diffusion, Midjourney — generate images from text
3. **Code Generators:** GitHub Copilot, Cursor — generate and complete code
4. **Video Generators:** Sora, Runway — generate video clips
5. **Audio Generators:** ElevenLabs, Suno — generate speech, music

### How LLMs Work (Simplified)
1. **Tokenization:** Text is broken into tokens (words or sub-words)
2. **Embedding:** Each token is converted to a numerical vector
3. **Transformer layers:** The model processes all tokens, learning relationships
4. **Next-token prediction:** The model predicts the most likely next token, then the next, generating text token by token

```
Input:  "The capital of France is"
Model:  Predicts "Paris" with 94% probability
Output: "The capital of France is Paris"
```

## Matching AI Types to Problems

| Problem | Best AI Type | Why |
|---------|-------------|-----|
| Classify emails as spam/not spam | Supervised learning | Labeled examples available |
| Find groups of similar customers | Unsupervised learning | No predefined labels |
| Play chess at grandmaster level | Reinforcement learning | Clear reward signal (win/lose) |
| Translate English to Spanish | NLP (sequence-to-sequence) | Text input/output |
| Detect tumors in X-rays | Computer vision | Image input |
| Write marketing copy | Generative AI (LLM) | Creative text generation |
| Optimize warehouse layout | Reinforcement learning + optimization | Complex decision space |

## Key Takeaways

- Machine learning has three paradigms: supervised (labeled data), unsupervised (find patterns), reinforcement (learn from rewards)
- NLP, computer vision, and generative AI are specialized branches solving different types of problems
- Transformers are the architecture behind modern NLP — attention is the key innovation
- Computer vision uses CNNs and transfer learning for practical image tasks
- Generative AI creates content; discriminative AI classifies content — know which one you need
- Matching the right AI type to the problem is the first skill in AI fluency

## Practice Challenge

Think about your own work or a business you know. For each task below, identify which AI type would be most useful:
1. Sorting customer support tickets by urgency
2. Generating product descriptions for 500 SKUs
3. Identifying which customers are likely to churn
4. Creating a chatbot that answers FAQs

Write your answers and reasoning in your notebook. We will discuss these in the next live session.
