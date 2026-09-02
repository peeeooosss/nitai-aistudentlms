/**
 * Real educational content for Days 1-15 of the Nitai 90-Day AI Program.
 * Theory content is loaded from scripts/content/day{N}.md files.
 * Quizzes, AI contexts, and assignments are defined inline.
 */

import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

// ─────────────────────────────────────────────
// Theory content — loaded from markdown files
// ─────────────────────────────────────────────

const contentDir = path.join(__dirname, 'content')

function loadDayContent(day: number): string | null {
  const filePath = path.join(contentDir, `day${day}.md`)
  if (!fs.existsSync(filePath)) return null
  return fs.readFileSync(filePath, 'utf-8')
}

// ─────────────────────────────────────────────
// QUIZ QUESTIONS
// ─────────────────────────────────────────────

const day5Quiz: QuizQuestion[] = [
  {
    question: "What is the purpose of few-shot prompting?",
    options: [
      "To make the model respond faster",
      "To provide examples that guide the model toward consistent, desired output format and quality",
      "To reduce the cost of API calls",
      "To prevent the model from hallucinating"
    ],
    correctIndex: 1,
    explanation: "Few-shot prompting provides 3-5 examples of the desired input-output pattern. This helps the model understand exactly what format, tone, and quality you expect, leading to much more consistent outputs than zero-shot prompting."
  },
  {
    question: "When should you use a low temperature (0.0-0.2)?",
    options: [
      "When brainstorming creative marketing copy",
      "When generating poetry or fiction",
      "When writing code or answering factual questions where accuracy matters",
      "When you want maximum variety in responses"
    ],
    correctIndex: 2,
    explanation: "Low temperature makes the model more deterministic and focused on the most likely tokens. This is ideal for code generation, factual Q&A, and any task where accuracy and consistency are more important than creativity."
  },
  {
    question: "What does chain-of-thought (CoT) prompting do?",
    options: [
      "Makes the model write longer responses",
      "Asks the model to show its reasoning step by step before arriving at an answer",
      "Forces the model to cite sources",
      "Prevents the model from making assumptions"
    ],
    correctIndex: 1,
    explanation: "Chain-of-thought prompting asks the model to explain its reasoning process before giving a final answer. This step-by-step approach significantly improves accuracy on math, logic, and multi-step reasoning tasks."
  },
  {
    question: "You need to classify customer support tickets by urgency. False negatives (missing urgent tickets) are very costly. Which metric should you prioritize?",
    options: [
      "Accuracy — overall correctness of all classifications",
      "Precision — making sure predicted urgent tickets are actually urgent",
      "Recall — making sure all truly urgent tickets are caught",
      "F1 score — the harmonic mean of precision and recall"
    ],
    correctIndex: 2,
    explanation: "When false negatives are costly (missing urgent tickets), you should prioritize recall. Recall measures how many of the actual positive cases (truly urgent tickets) your model catches. You would accept more false alarms (lower precision) to avoid missing any critical tickets."
  },
  {
    question: "Which delimiter is MOST effective for separating instructions from user-provided content that might contain text resembling instructions?",
    options: [
      "Commas",
      "Bullet points",
      "XML tags like <instructions> and <input>",
      "Exclamation marks"
    ],
    correctIndex: 2,
    explanation: "XML tags provide clear, explicit boundaries that the model recognizes as structural markers. They are less likely to be confused with the content itself, especially when the user content contains numbered lists, colons, or other punctuation that could be mistaken for instructions."
  }
]

const day7Quiz: QuizQuestion[] = [
  {
    question: "In the PRIME framework, what does the 'M' stand for?",
    options: [
      "Message — the main content of the prompt",
      "Method — which prompting technique to use (CoT, few-shot, etc.)",
      "Model — which AI model to use",
      "Metrics — how to evaluate the output"
    ],
    correctIndex: 1,
    explanation: "PRIME stands for Purpose, Role, Input, Method, Expectation. Method refers to which prompting technique you apply — chain-of-thought, few-shot, zero-shot, multi-persona, etc."
  },
  {
    question: "You ask an LLM to summarize a 5000-word research paper. The summary contains a statistic not present in the original paper. What is this called?",
    options: [
      "Data leakage",
      "Hallucination",
      "Overfitting",
      "Mode collapse"
    ],
    correctIndex: 1,
    explanation: "Hallucination is when an LLM generates plausible-sounding but fabricated or incorrect information. It is a common issue that can be mitigated by grounding prompts in provided data, asking for confidence levels, and using verification prompts."
  },
  {
    question: "Which scenario BEST justifies using a multi-step AI workflow instead of a single prompt?",
    options: [
      "You want a faster response",
      "You want to save on token costs",
      "The task requires gathering information, analyzing it, and generating a structured report with consistent formatting",
      "You want to use the simplest possible approach"
    ],
    correctIndex: 2,
    explanation: "Multi-step workflows shine when a task involves multiple distinct operations (research, analysis, generation, formatting). Each step can be optimized independently, errors are easier to debug, and the overall output quality is higher than a single complex prompt."
  },
  {
    question: "What is the FIRST thing you should do when a prompt gives a poor output?",
    options: [
      "Switch to a different AI model",
      "Make the prompt much longer with more instructions",
      "Diagnose what specifically is wrong (format, content, tone, accuracy) and fix one issue at a time",
      "Give up and write the content manually"
    ],
    correctIndex: 2,
    explanation: "Iterative refinement starts with diagnosing the specific failure mode. Trying to fix everything at once usually introduces new problems. Identify one issue, refine the prompt to address it, and re-test. This systematic approach is faster than random changes."
  },
  {
    question: "A social media manager needs to generate 30 different Instagram captions for product launches. Each caption must follow the same format but be unique. Which prompting approach is most efficient?",
    options: [
      "Write 30 separate single-prompt requests",
      "Create a template prompt with variables for product name, key feature, and CTA, then run it 30 times with different inputs",
      "Ask the model to generate all 30 at once in one long prompt",
      "Use a spreadsheet instead of AI"
    ],
    correctIndex: 1,
    explanation: "A templatized prompt with variables is the most efficient approach. You write and refine the prompt once, then reuse it with different inputs. This ensures consistent format across all 30 captions while allowing each one to be unique."
  },
  {
    question: "What is the key difference between supervised and unsupervised learning?",
    options: [
      "Supervised learning is faster; unsupervised learning is slower",
      "Supervised learning uses labeled training data; unsupervised learning discovers patterns in unlabeled data",
      "Supervised learning works with text; unsupervised learning works with images",
      "Supervised learning requires neural networks; unsupervised learning does not"
    ],
    correctIndex: 1,
    explanation: "The fundamental difference is data labeling. Supervised learning trains on labeled examples (input-output pairs), while unsupervised learning finds hidden structure in data without predefined labels. Both can use various algorithms and work with different data types."
  }
]

// ─────────────────────────────────────────────
// AI CONTEXT
// ─────────────────────────────────────────────

interface RAGChunk {
  id: string
  content: string
  source: string
  relevance: number
}

function makeRAGChunks(day: number, content: string, source: string): RAGChunk[] {
  const paragraphs = content.split('\n\n').filter(p => p.trim().length > 50)
  const chunks: RAGChunk[] = []
  for (let i = 0; i < Math.min(paragraphs.length, 8); i++) {
    chunks.push({
      id: `day${day}_chunk${i}`,
      content: paragraphs[i].substring(0, 500),
      source,
      relevance: parseFloat((1.0 - i * 0.1).toFixed(1))
    })
  }
  return chunks
}

function getDay1AIContext(day: number, content: string) {
  return {
    systemPrompt: `You are the Nitai AI Tutor, helping a student on Day 1 of their 90-day AI learning journey. Today's lesson is "Welcome to Nitai — AI Student Kickoff."

Your role is to:
1. Welcome the student warmly and build excitement for the program
2. Explain what AI is, the different types (narrow, general), and real-world applications
3. Help them understand the 3-phase roadmap (Foundation -> Automation -> Scale)
4. Answer questions about the program structure and what to expect
5. Encourage them to set up their learning environment (notebook, AI tool access, Python, GitHub)

Keep responses encouraging and focused. Today is about orientation, not deep technical content. Use concrete examples of AI in everyday life.
If a student asks about something outside Day 1 scope, gently redirect them to today's topic or suggest they ask in the appropriate live session.`,
    ragChunks: makeRAGChunks(day, content, 'day_1_content')
  };
}

function getDay2AIContext(day: number, content: string) {
  return {
    systemPrompt: `You are the Nitai AI Tutor, helping a student on Day 2 of their 90-day AI learning journey. Today's lesson is "Understanding AI — Types, Capabilities & Use Cases."

Your role is to:
1. Explain the three ML paradigms: supervised, unsupervised, and reinforcement learning with practical examples
2. Help students understand NLP, computer vision, and generative AI — what each does and when to use it
3. Guide students in matching AI types to real-world problems
4. Answer questions about AI capabilities and limitations
5. Help with the assignment: setting up an AI development environment and running a first API call

Use analogies and real-world examples. Connect concepts to what they learned on Day 1.
If they ask about advanced topics beyond today's scope, acknowledge the question and suggest saving it for later days.`,
    ragChunks: makeRAGChunks(day, content, 'day_2_content')
  };
}

function getDay3AIContext(day: number, content: string) {
  return {
    systemPrompt: `You are the Nitai AI Tutor, helping a student on Day 3 of their 90-day AI learning journey. Today's lesson is "AI Fundamentals — Machine Learning, NLP & Computer Vision Deep Dive."

Your role is to:
1. Explain neural network architecture: layers, weights, activation functions, and backpropagation in plain language
2. Walk through the ML pipeline: data collection -> preprocessing -> feature engineering -> model selection -> evaluation
3. Help students understand evaluation metrics (accuracy, precision, recall, F1) and when to use each
4. Discuss bias and fairness in AI systems with real examples
5. Help with the assignment: analyzing a dataset using basic ML concepts

Use code examples where helpful but always explain the intuition first. If a student is struggling with the math, relate it back to practical applications.`,
    ragChunks: makeRAGChunks(day, content, 'day_3_content')
  };
}

function getDay4AIContext(day: number, content: string) {
  return {
    systemPrompt: `You are the Nitai AI Tutor, helping a student on Day 4 of their 90-day AI learning journey. Today's lesson is "Getting Started with Prompt Engineering."

Your role is to:
1. Teach the 5 components of a well-structured prompt: Role, Task, Input, Output Format, Constraints
2. Explain zero-shot vs. few-shot prompting with examples
3. Help students understand temperature and top-p parameters
4. Show how system prompts set long-term model behavior
5. Help with the assignment: rewriting 5 bad prompts into well-structured ones

This is the most immediately practical day so far. Encourage students to experiment with real prompts in ChatGPT/Claude.
When students share their prompts, give specific, constructive feedback on structure, clarity, and completeness.`,
    ragChunks: makeRAGChunks(day, content, 'day_4_content')
  };
}

function getDay5AIContext(day: number, content: string) {
  return {
    systemPrompt: `You are the Nitai AI Tutor, helping a student on Day 5 of their 90-day AI learning journey. Today's lesson is "Crafting Effective Prompts."

Your role is to:
1. Teach chain-of-thought prompting and when to use it
2. Explain role prompting and multi-persona techniques
3. Show how delimiters (XML tags, markdown, triple quotes) improve prompt clarity
4. Help students prevent hallucinations by grounding prompts in provided data
5. Teach output formatting: JSON, tables, numbered lists
6. Help with the assignment: building a prompt template library

Encourage iterative refinement — treat prompts like versioned code.
When reviewing student prompts, use the PRIME framework to identify what is missing.`,
    ragChunks: makeRAGChunks(day, content, 'day_5_content')
  };
}

function getDay6AIContext(day: number, content: string) {
  return {
    systemPrompt: `You are the Nitai AI Tutor, helping a student on Day 6 of their 90-day AI learning journey. Today is a live interactive session about "Building AI-Powered Workflows."

Your role is to:
1. Help students consolidate their Week 1 learning
2. Explain how AI workflows chain multiple prompt-response steps together
3. Guide students through the hands-on exercises: research/summarize, multi-persona analysis, and code review pipelines
4. Help prepare questions and topics for the live session
5. Preview what is coming in Week 2

Today is about practice and integration, not new concepts. Encourage students to try the exercises and bring their workflow attempts to the live session.`,
    ragChunks: makeRAGChunks(day, content, 'day_6_content')
  };
}

function getDay7AIContext(day: number, content: string) {
  return {
    systemPrompt: `You are the Nitai AI Tutor, helping a student on Day 7 of their 90-day AI learning journey. Today's lesson is "Prompt Engineering Mastery & Week 1 Quiz."

Your role is to:
1. Review the PRIME framework (Purpose, Role, Input, Method, Expectation)
2. Teach advanced patterns: templates with variables, chain of verification, comparative analysis, content transformation
3. Guide students through the Week 1 self-assessment
4. Help with the Week 1 quiz
5. Preview Week 2 and the transition from using AI tools to building AI systems

This is a consolidation day. Help students identify gaps in their knowledge and address them before moving to Phase 2.`,
    ragChunks: makeRAGChunks(day, content, 'day_7_content')
  };
}

// ─────────────────────────────────────────────
// ASSIGNMENTS
// ─────────────────────────────────────────────

const day2Assignment = `**Project: Set Up Your AI Development Environment**

Complete this hands-on project to apply what you learned about AI types and set up your workspace.

**Requirements:**
1. Create a free account on at least one AI platform (OpenAI, Anthropic, or Google AI Studio)
2. Write and run a simple Python script that sends a prompt to an AI API and prints the response
3. Experiment with 3 different prompts of increasing complexity
4. Document the AI types you identified in your own work/studies (from the practice challenge)
5. Write a 100-word reflection: What surprised you about AI capabilities?

**Deliverables:**
- Screenshot or copy of your API response
- Your 3 test prompts and the outputs
- Written reflection (100 words)

**Evaluation Criteria:**
- Working API connection (50 points)
- Quality of prompt experimentation (25 points)
- Reflection depth (25 points)`

const day3Assignment = `**Project: Analyze a Dataset Using Basic ML Concepts**

Complete this project to practice data analysis and ML thinking.

**Requirements:**
1. Find a small public dataset (CSV file, 100-500 rows) — try Kaggle, data.gov, or use the sample dataset provided in the resources
2. Load and explore the data: how many rows/columns, what types, any missing values?
3. Create 3 visualizations that reveal patterns in the data
4. Identify which ML paradigm (supervised, unsupervised, reinforcement) would be most appropriate for this data and why
5. Write a 200-word analysis: What patterns did you find? What would a business do with this insight?

**Deliverables:**
- Your analysis notebook or script
- 3 visualizations with descriptions
- Written analysis (200 words)

**Evaluation Criteria:**
- Data exploration quality (25 points)
- Visualization insight (25 points)
- ML paradigm justification (25 points)
- Written analysis depth (25 points)`

const day4Assignment = `**Project: Transform 5 Weak Prompts Into Effective Ones**

Complete this project to master the 5 components of prompt engineering.

**Requirements:**
1. Take these 5 weak prompts and rewrite each using the full prompt structure (Role, Task, Input, Output Format, Constraints):
   - "Write about dogs"
   - "Help me with my resume"
   - "Explain this code"
   - "Make a business plan"
   - "Summarize this meeting"
2. For each rewrite, identify which of the 5 components was missing from the original
3. Test your improved prompts in an AI tool and compare the outputs
4. Document before/after results

**Deliverables:**
- 5 rewritten prompts with component labels
- Before/after comparison for each
- Written reflection: Which component makes the biggest difference? (100 words)

**Evaluation Criteria:**
- Prompt structure completeness (40 points)
- Quality of before/after comparison (30 points)
- Reflection depth (30 points)`

const day5Assignment = `**Project: Build a Prompt Template Library**

Create reusable prompt templates for 3 real-world use cases.

**Requirements:**
1. Choose 3 use cases from your own work or life (e.g., email drafting, code review, research summary)
2. For each use case, create a prompt template using the PRIME framework with variables
3. Include at least one technique from each: chain-of-thought, role prompting, few-shot examples, delimiters
4. Test each template with 3 different inputs to verify it produces consistent, quality output
5. Version each prompt (v1, v2, v3) showing your refinement process

**Deliverables:**
- 3 complete prompt templates with variables filled for 3 test cases each
- Version history showing refinement for at least one template
- Written reflection: How do templates compare to writing prompts from scratch? (150 words)

**Evaluation Criteria:**
- Template quality and completeness (35 points)
- Technique variety (25 points)
- Consistency across test cases (20 points)
- Reflection depth (20 points)`

// ─────────────────────────────────────────────
// DAY 12 QUIZ — AI Image Generation Fundamentals
// ─────────────────────────────────────────────

const day12Quiz: QuizQuestion[] = [
  {
    question: "What is the primary technology behind modern AI image generation tools like Midjourney and DALL-E?",
    options: [
      "Neural networks that copy existing images",
      "Diffusion models that progressively denoise random noise guided by text",
      "Rule-based systems that combine clip art",
      "Generative Adversarial Networks that only use photo databases"
    ],
    correctIndex: 1,
    explanation: "Diffusion models work by learning to reverse a gradual noising process. Starting from random noise, they progressively refine it guided by your text prompt until a coherent image emerges."
  },
  {
    question: "Which platform is BEST for generating images with readable text overlaid?",
    options: [
      "Midjourney",
      "DALL-E 3",
      "Stable Diffusion (default settings)",
      "All are equally good at text rendering"
    ],
    correctIndex: 1,
    explanation: "DALL-E 3 is significantly better at rendering readable text in images compared to other platforms. It follows text prompts more literally and handles typography more accurately."
  },
  {
    question: "In Midjourney, what does the --style raw parameter do?",
    options: [
      "Makes the image lower resolution",
      "Reduces Midjourney's default aesthetic, producing more literal interpretations",
      "Adds a vintage film grain effect",
      "Enables transparent backgrounds"
    ],
    correctIndex: 1,
    explanation: "The --style raw parameter reduces Midjourney's default artistic interpretation, making the output more literal and closer to your exact prompt description."
  },
  {
    question: "What is the recommended image prompt formula for consistent, high-quality results?",
    options: [
      "Just describe the main subject in one sentence",
      "Subject + Action + Setting + Style + Lighting + Composition + Quality modifiers",
      "Use as many adjectives as possible",
      "Copy prompts from other users exactly"
    ],
    correctIndex: 1,
    explanation: "A structured prompt with subject, action, setting, style, lighting, composition, and quality modifiers gives the model clear guidance and produces more predictable, higher-quality results."
  },
  {
    question: "You need to create 20 social media graphics with consistent brand styling. What is the most efficient approach?",
    options: [
      "Generate each one individually with different prompts",
      "Establish a brand visual style guide with prompt templates, then batch-generate using consistent parameters and seeds",
      "Use the same exact prompt for all 20 images",
      "Download stock photos and add text overlays manually"
    ],
    correctIndex: 1,
    explanation: "A brand style guide with prompt templates ensures visual consistency. Using the same parameters and seed numbers produces cohesive imagery. Batching saves time while maintaining quality."
  }
]

// ─────────────────────────────────────────────
// DAY 14 ASSIGNMENT — Creating Visual Brand Assets
// ─────────────────────────────────────────────

const day14Assignment = `**Project: Create a Complete Brand Visual Identity Package**

Design a full brand identity for a fictional business using AI image generation tools.

**Requirements:**
1. Define the fictional business: name, industry, target audience, brand personality
2. Design a complete logo system:
   - Primary logo (icon + wordmark)
   - Icon-only version
   - Horizontal wordmark
   - Dark and light versions
3. Create a brand color palette (3-5 colors with hex codes)
4. Generate 5 social media post templates using consistent brand elements
5. Create a LinkedIn banner and Instagram profile picture
6. Write a 1-page brand guidelines document summarizing your visual system

**Deliverables:**
- Logo system (6 variations minimum)
- Brand color palette with hex codes
- 5 social media templates
- LinkedIn banner + profile picture
- 1-page brand guidelines PDF

**Evaluation Criteria:**
- Logo system completeness and versatility (30 points)
- Visual consistency across all assets (25 points)
- Brand guidelines clarity (20 points)
- Creative quality and originality (25 points)`

// ─────────────────────────────────────────────
// AI CONTEXTS FOR DAYS 8-15
// ─────────────────────────────────────────────

function getDay8AIContext(day: number, content: string) {
  return {
    systemPrompt: `You are the Nitai AI Tutor, helping a student on Day 8 of their 90-day AI learning journey. Today's lesson is "AI Content Creation Basics."

Your role is to:
1. Explain the 5-stage AI content creation pipeline: ideation, research, drafting, editing, optimization
2. Help students understand where AI excels (speed, consistency) and where human input is essential (voice, judgment, facts)
3. Guide students through using AI for brainstorming, drafting, and editing workflows
4. Help with practice exercises on content creation prompts
5. Introduce the concept of building a repeatable content system

This is the first day of Week 2, focused on practical content creation skills. Connect back to Week 1 prompting fundamentals.
Encourage students to experiment with real content they want to create.`,
    ragChunks: makeRAGChunks(day, content, 'day_8_content')
  };
}

function getDay9AIContext(day: number, content: string) {
  return {
    systemPrompt: `You are the Nitai AI Tutor, helping a student on Day 9 of their 90-day AI learning journey. Today's lesson is "Blog Writing with AI Assistants."

Your role is to:
1. Teach the 5-step AI blog writing workflow: research, outline, draft, human edit, SEO polish
2. Help students maintain authentic voice while using AI assistance
3. Explain different blog post formats: how-to, listicle, case study, comparison
4. Guide students through the quality checklist for published content
5. Help with the practice exercise: writing a complete blog post

Emphasize that AI handles the heavy lifting but human editing adds voice, stories, and accuracy.
Review student blog drafts and give feedback on voice and quality.`,
    ragChunks: makeRAGChunks(day, content, 'day_9_content')
  };
}

function getDay10AIContext(day: number, content: string) {
  return {
    systemPrompt: `You are the Nitai AI Tutor, helping a student on Day 10 of their 90-day AI learning journey. Today's lesson is "Social Media Content Strategy."

Your role is to:
1. Teach the content pillar framework and platform-specific content creation
2. Explain the AI content batching system for weekly content production
3. Help students create platform-specific content: LinkedIn posts, Twitter threads, Instagram captions
4. Guide students through content repurposing: one idea across multiple platforms
5. Help with the practice exercise: creating a 7-day content calendar

Focus on practical, actionable social media skills. Help students understand platform differences.
Review student content plans and suggest improvements.`,
    ragChunks: makeRAGChunks(day, content, 'day_10_content')
  };
}

function getDay11AIContext(day: number, content: string) {
  return {
    systemPrompt: `You are the Nitai AI Tutor, helping a student on Day 11 of their 90-day AI learning journey. Today's lesson is "Email Marketing with AI."

Your role is to:
1. Explain email marketing fundamentals: welcome sequences, newsletters, promotional emails
2. Teach AI prompts for email writing: subject lines, body copy, calls-to-action
3. Help students understand email automation and sequence design
4. Guide students through measuring email performance: open rates, CTR, conversions
5. Help with the practice exercise: writing a welcome email sequence

Email marketing has the highest ROI of any channel. Help students see its value.
Review student email drafts and give feedback on subject lines and conversion elements.`,
    ragChunks: makeRAGChunks(day, content, 'day_11_content')
  };
}

function getDay12AIContext(day: number, content: string) {
  return {
    systemPrompt: `You are the Nitai AI Tutor, helping a student on Day 12 of their 90-day AI learning journey. Today's lesson is "AI Image Generation Fundamentals." This is a QUIZ day.

Your role is to:
1. Explain how AI image generation works: diffusion models, training, and generation
2. Help students understand the key platforms: Midjourney, DALL-E, Stable Diffusion
3. Teach the image prompt formula: Subject + Action + Setting + Style + Lighting + Composition
4. Guide students through the practice exercises on image generation
5. Help students prepare for and understand the quiz questions

Today includes a quiz on image generation concepts. Help students review before taking it.
If they ask about advanced techniques, mention that Day 13 covers Midjourney and DALL-E in depth.`,
    ragChunks: makeRAGChunks(day, content, 'day_12_content')
  };
}

function getDay13AIContext(day: number, content: string) {
  return {
    systemPrompt: `You are the Nitai AI Tutor, helping a student on Day 13 of their 90-day AI learning journey. Today's lesson is "Midjourney & DALL-E Prompting." This is a LIVE INTERACTIVE session.

Your role is to:
1. Teach advanced Midjourney parameters: --ar, --style, --v, --q, --s, --no, --seed
2. Explain DALL-E 3's strengths: text rendering, prompt adherence, ChatGPT integration
3. Help students choose the right platform for each task
4. Guide students through building a personal prompt library
5. Help prepare questions and topics for the live session

Today is a live session focused on hands-on practice. Encourage students to bring their best and worst image generations to discuss.
Help students experiment with different parameters and techniques.`,
    ragChunks: makeRAGChunks(day, content, 'day_13_content')
  };
}

function getDay14AIContext(day: number, content: string) {
  return {
    systemPrompt: `You are the Nitai AI Tutor, helping a student on Day 14 of their 90-day AI learning journey. Today's lesson is "Creating Visual Brand Assets." This is a PROJECT day.

Your role is to:
1. Teach brand identity fundamentals: logo, colors, typography, imagery, layout
2. Guide students through logo design with AI: prompt frameworks, variations, iterations
3. Help students create social media templates and marketing materials
4. Explain brand guidelines documentation and delivery packages
5. Support students with their project: creating a complete brand visual identity package

This is a hands-on project day. Students will create a full brand identity for a fictional business.
Help students through each stage: strategy, logo design, templates, guidelines.`,
    ragChunks: makeRAGChunks(day, content, 'day_14_content')
  };
}

function getDay15AIContext(day: number, content: string) {
  return {
    systemPrompt: `You are the Nitai AI Tutor, helping a student on Day 15 of their 90-day AI learning journey. Today's lesson is "AI Video Script Writing." This is the first day of Week 3.

Your role is to:
1. Explain video script structures for different platforms: short-form, medium-form, long-form
2. Teach AI video scripting prompts: YouTube scripts, TikTok/Reels, explainer videos
3. Help students understand the script-to-screen workflow
4. Guide students through video content repurposing
5. Connect this to previous content creation skills from Week 2

Week 3 builds on content creation skills. Video is the dominant content format.
Help students write their first video scripts using AI assistance.`,
    ragChunks: makeRAGChunks(day, content, 'day_15_content')
  };
}

// ─────────────────────────────────────────────
// DAY 19 QUIZ — Data Interpretation with AI
// ─────────────────────────────────────────────

const day19Quiz: QuizQuestion[] = [
  {
    question: "What is the correct order of the data interpretation pipeline?",
    options: [
      "Visualize -> Analyze -> Clean -> Interpret",
      "Clean -> Analyze -> Visualize -> Interpret -> Communicate",
      "Interpret -> Visualize -> Clean -> Analyze",
      "Analyze -> Clean -> Interpret -> Visualize"
    ],
    correctIndex: 1,
    explanation: "The data interpretation pipeline follows: Raw Data -> Clean & Prepare -> Analyze -> Visualize -> Interpret -> Communicate -> Act. Cleaning must come before analysis, and interpretation comes after visualization."
  },
  {
    question: "A correlation coefficient of 0.85 between advertising spend and sales means:",
    options: [
      "Advertising spend causes sales to increase",
      "There is a strong positive relationship between advertising spend and sales",
      "Reducing advertising will definitely reduce sales",
      "The data is unreliable"
    ],
    correctIndex: 1,
    explanation: "A correlation coefficient of 0.85 indicates a strong positive relationship — as one variable increases, the other tends to increase too. However, correlation does not prove causation; other factors may be involved."
  },
  {
    question: "You have survey data with 500 responses. 3% of responses are outliers with extremely high values. What should you do?",
    options: [
      "Delete all outliers immediately",
      "Keep them because they are real data points",
      "Investigate whether they are errors or genuine extreme values, then decide",
      "Replace them all with the median value"
    ],
    correctIndex: 2,
    explanation: "Outliers should be investigated, not automatically deleted or kept. They may be data entry errors (should be fixed), genuine extreme values (should be preserved), or indicators of an important pattern (should be highlighted)."
  },
  {
    question: "Which visualization is BEST for showing how a metric changes over time?",
    options: [
      "Pie chart",
      "Bar chart",
      "Line chart",
      "Scatter plot"
    ],
    correctIndex: 2,
    explanation: "Line charts are the standard for time-series data because they clearly show trends, patterns, and changes over continuous time periods. The connected lines make it easy to see direction and magnitude of change."
  },
  {
    question: "What is the SOAR framework for data storytelling?",
    options: [
      "Statistics, Observations, Analysis, Reports",
      "Situation, Observation, Analysis, Recommendation",
      "Summary, Overview, Action, Results",
      "Survey, Opinion, Assessment, Review"
    ],
    correctIndex: 1,
    explanation: "SOAR stands for Situation (current state), Observation (what the data shows), Analysis (why it is happening), and Recommendation (what to do about it). It structures data insights into actionable business stories."
  }
]

// ─────────────────────────────────────────────
// DAY 21 ASSIGNMENT — Building AI Chatbots
// ─────────────────────────────────────────────

const day21Assignment = `**Project: Build a Customer Support Chatbot**

Design and prototype a customer support chatbot for a fictional business.

**Requirements:**
1. Define the fictional business and its products/services
2. Create a knowledge base with 20 Q&A pairs covering:
   - Product information (5 questions)
   - Pricing and billing (5 questions)
   - Technical support (5 questions)
   - Policies and procedures (5 questions)
3. Design a conversation flow with 5 scenarios:
   - Simple FAQ resolution
   - Complex question requiring clarification
   - Complaint handling with escalation path
   - Bot does not understand (fallback)
   - Human handoff with context transfer
4. Build a working prototype using Chatbase, Voiceflow, or Botpress (free tier)
5. Test with 5 different user scenarios and document results
6. Write a 300-word reflection on what worked and what needs improvement

**Deliverables:**
- Knowledge base document (20 Q&A pairs)
- Conversation flow diagram (5 scenarios)
- Working chatbot prototype (link or screenshot)
- Test results for 5 scenarios
- Written reflection (300 words)

**Evaluation Criteria:**
- Knowledge base completeness and accuracy (25 points)
- Conversation flow quality and edge case handling (25 points)
- Working prototype functionality (25 points)
- Test documentation and reflection depth (25 points)`

// ─────────────────────────────────────────────
// AI CONTEXTS FOR DAYS 16-25
// ─────────────────────────────────────────────

function getDay16AIContext(day: number, content: string) {
  return {
    systemPrompt: `You are the Nitai AI Tutor, helping a student on Day 16 of their 90-day AI learning journey. Today's lesson is "Voiceovers & AI Audio Production."

Your role is to:
1. Explain AI voice generation technology and platforms (ElevenLabs, Play.ht, WellSaid Labs)
2. Teach script structure for voiceover: natural speech patterns, pause markers, emphasis cues
3. Guide students through the 4-step audio production workflow: script, generate, edit, synchronize
4. Help students write voiceover scripts for different platforms (YouTube, TikTok, podcasts)
5. Emphasize the importance of captions for accessibility

This is the second day of Week 3. Connect to previous content creation skills from Week 2.
Help students experiment with AI voice generation tools.`,
    ragChunks: makeRAGChunks(day, content, 'day_16_content')
  };
}

function getDay17AIContext(day: number, content: string) {
  return {
    systemPrompt: `You are the Nitai AI Tutor, helping a student on Day 17 of their 90-day AI learning journey. Today's lesson is "Editing with AI Tools."

Your role is to:
1. Explain AI-powered video editing: text-based editing, auto-transcription, smart captions
2. Teach the 30-minute video editing pipeline for talking-head content
3. Help students understand image and audio editing with AI tools
4. Guide students through batch processing for efficiency
5. Emphasize quality checking — AI handles 90%, humans handle the final 10%

Focus on practical tools: Descript, Runway ML, CapCut.
Help students understand when automation helps vs. when human judgment is needed.`,
    ragChunks: makeRAGChunks(day, content, 'day_17_content')
  };
}

function getDay18AIContext(day: number, content: string) {
  return {
    systemPrompt: `You are the Nitai AI Tutor, helping a student on Day 18 of their 90-day AI learning journey. Today's lesson is "AI for Research & Analysis."

Your role is to:
1. Teach the 4-step AI research workflow: define, gather, synthesize, output
2. Help students use AI for competitive intelligence and market analysis
3. Guide students through data analysis with AI assistance
4. Emphasize the "trust but verify" rule — cross-reference AI findings with primary sources
5. Help students avoid common research biases amplified by AI

AI accelerates research from weeks to hours, but human verification is essential.
Help students practice with real research questions they care about.`,
    ragChunks: makeRAGChunks(day, content, 'day_18_content')
  };
}

function getDay19AIContext(day: number, content: string) {
  return {
    systemPrompt: `You are the Nitai AI Tutor, helping a student on Day 19 of their 90-day AI learning journey. Today's lesson is "Data Interpretation with AI." This is a QUIZ day.

Your role is to:
1. Explain the data interpretation pipeline: clean, analyze, visualize, interpret, communicate
2. Teach statistical concepts needed for data interpretation: correlation, distributions, outliers
3. Help students understand data visualization: chart selection, dashboard design, storytelling
4. Guide students through the SOAR framework for business insights
5. Help students prepare for and understand the quiz questions

Today includes a quiz on data interpretation concepts. Help students review before taking it.
Connect this to the research skills from Day 18.`,
    ragChunks: makeRAGChunks(day, content, 'day_19_content')
  };
}

function getDay20AIContext(day: number, content: string) {
  return {
    systemPrompt: `You are the Nitai AI Tutor, helping a student on Day 20 of their 90-day AI learning journey. Today's lesson is "AI Spreadsheet Automation." This is a LIVE INTERACTIVE session.

Your role is to:
1. Teach AI-powered spreadsheet workflows: formula generation, data cleaning, dashboards
2. Explain Google Sheets Apps Script automation for repetitive tasks
3. Help students understand ARRAYFORMULA and QUERY for scalable spreadsheets
4. Guide students through building KPI dashboards with AI assistance
5. Discuss when to graduate from spreadsheets to databases

Today is a live session focused on hands-on spreadsheet skills.
Help students practice with real spreadsheet challenges they face.`,
    ragChunks: makeRAGChunks(day, content, 'day_20_content')
  };
}

function getDay21AIContext(day: number, content: string) {
  return {
    systemPrompt: `You are the Nitai AI Tutor, helping a student on Day 21 of their 90-day AI learning journey. Today's lesson is "Building AI Chatbots." This is a PROJECT day.

Your role is to:
1. Explain chatbot types: rule-based, retrieval-based, and generative
2. Teach conversational design: flow mapping, greeting, intent identification, response delivery
3. Guide students through no-code chatbot platforms: Chatbase, Botpress, Voiceflow
4. Help students build a working chatbot prototype
5. Support students with their project: building a customer support chatbot

This is a hands-on project day. Students will create a complete chatbot with knowledge base, conversation flows, and working prototype.
Help students through each stage of the project.`,
    ragChunks: makeRAGChunks(day, content, 'day_21_content')
  };
}

function getDay22AIContext(day: number, content: string) {
  return {
    systemPrompt: `You are the Nitai AI Tutor, helping a student on Day 22 of their 90-day AI learning journey. Today's lesson is "Customer Service Automation." This is the first day of Week 4.

Your role is to:
1. Explain the customer service automation spectrum: what to automate vs. what to keep human
2. Teach the tiered support model: self-service (60-70%), AI bot (20-30%), human (10-15%)
3. Help students design automated response templates and ticket routing logic
4. Guide students through bot-to-human handoff design
5. Teach quality assurance metrics: CSAT, resolution rate, escalation rate

Week 4 focuses on business applications of AI. This lesson connects to the chatbot project from Day 21.
Help students understand the balance between efficiency and customer experience.`,
    ragChunks: makeRAGChunks(day, content, 'day_22_content')
  };
}

function getDay23AIContext(day: number, content: string) {
  return {
    systemPrompt: `You are the Nitai AI Tutor, helping a student on Day 23 of their 90-day AI learning journey. Today's lesson is "AI for Sales & Lead Generation."

Your role is to:
1. Explain where AI helps in sales: lead research, personalization, qualification, follow-up
2. Teach AI-powered lead research: prospect profiles, competitor intelligence
3. Help students write personalized cold emails and LinkedIn outreach using AI
4. Guide students through lead qualification with BANT scoring
5. Discuss ethical AI sales practices: transparency, personalization vs. creepiness

AI transforms sales from a numbers game into a precision game.
Help students practice with real sales scenarios.`,
    ragChunks: makeRAGChunks(day, content, 'day_23_content')
  };
}

function getDay24AIContext(day: number, content: string) {
  return {
    systemPrompt: `You are the Nitai AI Tutor, helping a student on Day 24 of their 90-day AI learning journey. Today's lesson is "Building Your AI Portfolio."

Your role is to:
1. Explain the 5-project framework: content, automation, data, customer-facing, capstone
2. Teach project documentation: problem statement, solution, process, results
3. Help students build portfolio assets: case studies, website copy, GitHub READMEs
4. Guide students through personal brand building on LinkedIn and other platforms
5. Help students prepare their 60-second portfolio pitch

A portfolio demonstrates practical skills more effectively than a resume.
Help students select and document their best work from this program.`,
    ragChunks: makeRAGChunks(day, content, 'day_24_content')
  };
}

function getDay25AIContext(day: number, content: string) {
  return {
    systemPrompt: `You are the Nitai AI Tutor, helping a student on Day 25 of their 90-day AI learning journey. Today's lesson is "Portfolio Review & Optimization."

Your role is to:
1. Teach the 5-criteria review framework: clarity, impact, relevance, quality, differentiation
2. Help students conduct honest self-assessment of their portfolio
3. Guide students through AI-powered optimization of headlines, bios, and project descriptions
4. Help students quantify results and metrics for all projects
5. Prepare students for portfolio presentations and common review questions

This is a consolidation day — reviewing and polishing work done so far.
Help students identify and fix their top 3 portfolio weaknesses.`,
    ragChunks: makeRAGChunks(day, content, 'day_25_content')
  };
}

// ─────────────────────────────────────────────
// PUBLIC EXPORTS
// ─────────────────────────────────────────────

import { phase1Quizzes, phase1Assignments } from './data-phase1'
import { phase2Quizzes, phase2Assignments } from './data-phase2'
import { phase3Quizzes, phase3Assignments } from './data-phase3'

const allQuizzes: Record<number, QuizQuestion[]> = {
  ...phase1Quizzes,
  ...phase2Quizzes,
  ...phase3Quizzes,
}

allQuizzes[12] = day12Quiz
allQuizzes[19] = day19Quiz

const allAssignments: Record<number, string> = {
  ...phase1Assignments,
  ...phase2Assignments,
  ...phase3Assignments,
}

export function getWeek1Theory(day: number): string | null {
  return loadDayContent(day)
}

export function getWeek1Quiz(day: number): QuizQuestion[] | null {
  return allQuizzes[day] ?? null
}

function getLessonSentence(day: number, title: string): string {
  const phase = day <= 30 ? 'Foundation' : day <= 60 ? 'Automation Agency' : 'Enterprise'
  return `You are the Nitai AI Tutor, helping a student on Day ${day} of their 90-day AI learning journey. Today's lesson is "${title}" (${phase} phase).`
}

function titleFromContent(content: string): string {
  if (!content) return `Lesson`
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : 'Lesson'
}

export function getWeek1AIContext(day: number, content: string): { systemPrompt: string; ragChunks: RAGChunk[] } | null {
  if (day >= 1 && day <= 25) {
    switch (day) {
      case 1: return getDay1AIContext(day, content);
      case 2: return getDay2AIContext(day, content);
      case 3: return getDay3AIContext(day, content);
      case 4: return getDay4AIContext(day, content);
      case 5: return getDay5AIContext(day, content);
      case 6: return getDay6AIContext(day, content);
      case 7: return getDay7AIContext(day, content);
      case 8: return getDay8AIContext(day, content);
      case 9: return getDay9AIContext(day, content);
      case 10: return getDay10AIContext(day, content);
      case 11: return getDay11AIContext(day, content);
      case 12: return getDay12AIContext(day, content);
      case 13: return getDay13AIContext(day, content);
      case 14: return getDay14AIContext(day, content);
      case 15: return getDay15AIContext(day, content);
      case 16: return getDay16AIContext(day, content);
      case 17: return getDay17AIContext(day, content);
      case 18: return getDay18AIContext(day, content);
      case 19: return getDay19AIContext(day, content);
      case 20: return getDay20AIContext(day, content);
      case 21: return getDay21AIContext(day, content);
      case 22: return getDay22AIContext(day, content);
      case 23: return getDay23AIContext(day, content);
      case 24: return getDay24AIContext(day, content);
      case 25: return getDay25AIContext(day, content);
    }
  }

  return {
    systemPrompt: `${getLessonSentence(day, titleFromContent(content))}

Your role is to:
1. Explain today's concepts clearly and concisely using the lesson content
2. Provide practical examples relevant to the student's current skill level and phase
3. Connect today's content to previous lessons when relevant
4. Encourage the student and celebrate their progress
5. Be encouraging but honest about areas needing improvement

Keep responses focused and actionable. Use bullet points for clarity when explaining multiple concepts. Ground your answers in the day's lesson material.`,
    ragChunks: makeRAGChunks(day, content, `day_${day}_content`)
  };
}

export function getWeek1Assignment(day: number): string | null {
  return allAssignments[day] ?? null
}

// Retain legacy day-level quiz constants for backward reference
export { day5Quiz, day7Quiz, day12Quiz, day19Quiz }
