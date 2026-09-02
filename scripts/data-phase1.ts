export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

// ─── DAY 2 — What is AI? Foundations & Core Concepts ─────────────────────────

export const day2Quiz: QuizQuestion[] = [
  {
    question:
      "Which of the following best describes 'machine learning'?",
    options: [
      "A programming language designed for building websites",
      "A subset of AI where systems learn patterns from data without being explicitly programmed for each rule",
      "A hardware component that makes computers run faster",
      "A database management technique for storing user information",
    ],
    correctIndex: 1,
    explanation:
      "Machine learning is a branch of AI in which algorithms improve their performance on a task by learning from data, rather than following only hard-coded rules. This is what powers recommendation engines, image classifiers, and many AI writing tools.",
  },
  {
    question:
      "What is the difference between Artificial Intelligence (AI) and a Large Language Model (LLM)?",
    options: [
      "They are the exact same thing; the terms are interchangeable",
      "LLM is a broader field that includes robotics and computer vision",
      "AI is the broad field of simulating human intelligence; an LLM is a specific type of AI model trained on text data to generate and understand language",
      "LLMs only work on desktop computers while AI works on mobile devices",
    ],
    correctIndex: 2,
    explanation:
      "AI is the umbrella concept of machines performing tasks that normally require human intelligence. An LLM (like GPT-4) is one specific implementation — a neural network trained on massive text datasets to predict and generate language. Not all AI is LLM-based, and not all LLMs cover the full scope of AI.",
  },
  {
    question:
      "You ask an AI assistant to summarise a 2,000-word article in three bullet points. What AI capability are you primarily using?",
    options: [
      "Computer vision",
      "Natural Language Understanding (NLU) and text summarisation",
      "Reinforcement learning",
      "Generative adversarial networking",
    ],
    correctIndex: 1,
    explanation:
      "Summarising text requires the AI to understand the meaning of the input (NLU) and then generate a condensed version. This is distinct from computer vision (image processing), reinforcement learning (learning through trial and reward), and GANs (generative image models).",
  },
  {
    question:
      "Which statement about current AI assistants (like ChatGPT, Claude, Gemini) is TRUE?",
    options: [
      "They have genuine personal feelings and opinions about topics",
      "They retrieve exact verifiable facts from a live, always-up-to-date internet connection by default",
      "They generate responses by predicting statistically likely next tokens based on training data, and can sometimes produce incorrect information",
      "They can only respond with pre-written answers stored in a lookup table",
    ],
    correctIndex: 2,
    explanation:
      "Modern LLMs generate text by predicting the most probable next token given the input context. They don't 'look up' answers in a database. This means they can produce plausible-sounding but incorrect information ('hallucinations'), which is why human review is essential.",
  },
  {
    question:
      "What does 'prompt engineering' refer to in the context of using AI tools?",
    options: [
      "Installing and configuring AI software on a server",
      "The practice of crafting and refining input instructions to get more accurate and useful outputs from an AI model",
      "Reverse-engineering the source code of an AI system",
      "Building physical circuits that power AI processors",
    ],
    correctIndex: 1,
    explanation:
      "Prompt engineering is the skill of writing clear, specific, and well-structured instructions for AI models. Good prompts lead to better outputs; poor prompts lead to vague or irrelevant results. This is one of the most practical skills you'll develop in this course.",
  },
  {
    question:
      "A freelance designer uses an AI tool to generate five logo concepts for a client, then selects and refines the best one. In this workflow, who holds creative responsibility?",
    options: [
      "The AI tool, because it generated the concepts",
      "No one — AI-generated work cannot be attributed to any party",
      "The designer, who directed the AI, evaluated the outputs, and made the final creative decision",
      "The client, because they requested the logo",
    ],
    correctIndex: 2,
    explanation:
      "Even when AI generates initial concepts, the human professional who directs the tool, curates results, and applies final judgment retains creative ownership and professional responsibility. This is a key principle for freelancers using AI ethically.",
  },
]

// ─── DAY 5 — Crafting Effective Prompts ─────────────────────────────────────

export const day5Quiz: QuizQuestion[] = [
  {
    question:
      "Which of the following is an example of a VAGUE prompt that will likely produce poor results?",
    options: [
      '"Write a 300-word blog post intro for a vegan bakery in Dublin targeting health-conscious parents, using a warm and friendly tone"',
      '"Make me something about food"',
      '"Draft a professional email to a client explaining a two-week project delay, apologise sincerely, and propose a revised timeline"',
      '"Rewrite this paragraph to be shorter, remove jargon, and keep the key statistics intact"',
    ],
    correctIndex: 1,
    explanation:
      '"Make me something about food" lacks context, audience, format, tone, length, and purpose. The other examples all provide specific constraints (word count, audience, tone, format) that guide the AI toward a useful output.',
  },
  {
    question:
      "You want an AI to write product descriptions for a sustainable clothing brand. Which prompt structure will produce the BEST results?",
    options: [
      '"Write descriptions"',
      '"You are a copywriter for a sustainable fashion brand. Write a 60-word product description for our organic cotton t-shirt. Tone: casual and eco-conscious. Audience: women aged 25-40 who value ethical fashion. Include one key material fact and end with a soft call-to-action."',
      '"Write a really good description that sounds amazing and sells the thing"',
      '"Generate 50 product descriptions right now"',
    ],
    correctIndex: 1,
    explanation:
      "The best prompt assigns a role, specifies length, tone, audience, content requirements, and a structural instruction. This layered approach (sometimes called a 'prompt stack') gives the AI everything it needs to produce targeted, usable copy on the first attempt.",
  },
  {
    question:
      "What is a 'system prompt' or 'system message' in AI chat interfaces?",
    options: [
      "A prompt that the AI generates automatically without user input",
      "An instruction set given to the AI that defines its role, boundaries, and behaviour before the conversation begins",
      "A technical error message displayed when the AI fails to respond",
      "The final output the AI produces at the end of a conversation",
    ],
    correctIndex: 1,
    explanation:
      "A system prompt sets the AI's persona, constraints, and guidelines at the start of a session. For example: 'You are a patient tutor who explains concepts using analogies.' This steers all subsequent responses without the user needing to repeat instructions each time.",
  },
  {
    question:
      "When an AI gives you a long, rambling response when you wanted something concise, which prompting technique should you use?",
    options: [
      "Ask the same question again with more exclamation marks",
      "Add constraints: specify word count, format (e.g., 'bullet points only'), and phrase like 'Keep your response under 100 words'",
      "Switch to a completely different AI model instead",
      "Remove all context from the prompt and start over",
    ],
    correctIndex: 1,
    explanation:
      "Specifying length constraints, output format, and brevity instructions directly controls verbosity. Saying 'In 3 bullet points, under 50 words...' gives the AI clear structural guardrails. Repeating or adding emphasis doesn't change how the model interprets instructions.",
  },
  {
    question:
      "You are prompting an AI to generate a social media caption. You get a great first draft but want it improved. What is the best approach?",
    options: [
      "Start a brand new chat and repeat the original prompt exactly",
      "Use follow-up refinement prompts: 'Great — now shorten this to 2 sentences, replace the emoji with a period, and make the tone more professional'",
      "Tell the AI 'that's wrong, try again' without specifying what to change",
      "Give up and write it manually from scratch",
    ],
    correctIndex: 1,
    explanation:
      "Iterative refinement is a core prompt engineering technique. The AI retains context in the conversation, so targeted follow-up instructions ('shorten', 'change tone', 'replace X with Y') let you sculpt the output precisely without starting over.",
  },
  {
    question:
      "Which of the following is an example of using 'few-shot prompting'?",
    options: [
      "Asking the AI to write without providing any examples or context",
      "Providing 2-3 example inputs and outputs in your prompt so the AI learns the exact format and style you want before generating its own response",
      "Telling the AI to write exactly 100 words",
      "Using the AI to count how many shots are in a photograph",
    ],
    correctIndex: 1,
    explanation:
      "Few-shot prompting means including example pairs (input → desired output) in your prompt. For instance: 'Input: Monday → Output: 🌤️ Monday: Fresh start, big energy. #MondayMotivation'. The AI then mirrors that pattern for your actual request. It's one of the most effective techniques for consistent, on-brand content.",
  },
]

// ─── DAY 9 — Blog Writing with AI Assistants ────────────────────────────────

export const day9Quiz: QuizQuestion[] = [
  {
    question:
      "What is the most effective first step when using AI to help write a blog post?",
    options: [
      "Ask the AI to write the entire post from start to finish in one prompt",
      "Use AI to brainstorm an outline, then refine the structure before generating section-by-section content",
      "Copy-paste a competitor's blog post and ask the AI to rewrite it",
      "Ask the AI to write 10 different blog posts and pick one at random",
    ],
    correctIndex: 1,
    explanation:
      "A structured workflow — outline first, then section-by-section drafting — gives you control over the direction and quality. Asking for a full post in one go often produces generic, unfocused content. AI excels as a collaborative drafting partner, not a replacement for planning.",
  },
  {
    question:
      "You've used AI to draft a 1,200-word blog post about '5 Productivity Tips for Remote Workers.' Before publishing, what is the MOST critical review step?",
    options: [
      "Nothing — AI-generated content is always accurate and ready to publish",
      "Proofread for factual accuracy, check that any statistics or claims are verified, ensure the voice matches your brand, and remove generic filler",
      "Only check the spelling, since AI never makes factual errors",
      "Add more AI-generated paragraphs to make it longer",
    ],
    correctIndex: 1,
    explanation:
      "AI can produce factual errors, hallucinated statistics, and generic language. Every claim needs verification, every statistic needs a source check, and the tone needs to sound authentically like your (or your client's) brand — not like a generic AI voice.",
  },
  {
    question:
      "When using AI to generate blog topic ideas, which prompt approach will produce the most relevant and actionable results?",
    options: [
      '"Give me blog ideas"',
      '"I run a small accounting firm in Cork targeting self-employed freelancers. Generate 10 blog post titles that address their common tax concerns, using a conversational tone. Each title should be under 60 characters for SEO."',
      '"Write me the most popular blog post on the internet"',
      '"List every topic that has ever been written about"',
    ],
    correctIndex: 1,
    explanation:
      "Effective ideation prompts include your niche, audience, geographic context, tone, and constraints (like character count). This produces ideas you can actually use, rather than a generic list that could apply to any business in any market.",
  },
  {
    question:
      "AI often produces blog introductions that start with generic filler phrases. Which technique helps eliminate this?",
    options: [
      "Accept the filler — readers expect long introductions",
      "Add a prompt instruction like: 'Skip the introduction fluff. Start with a bold statement or surprising statistic. Get to the value in the first two sentences.'",
      "Delete the first paragraph every time without re-prompting",
      "Only use AI for conclusions, never introductions",
    ],
    correctIndex: 1,
    explanation:
      "Explicitly instructing the AI to avoid clichés and providing a structural pattern ('bold opening → context → promise of value') trains it to skip the padding. You can also include a 'do NOT' list in your prompt to preempt common AI tendencies.",
  },
  {
    question:
      "You are writing a 1,500-word blog post and want AI to help with the 'Benefits of Email Marketing' section. What is the best prompting strategy?",
    options: [
      "Ask for the entire 1,500-word post focused on email marketing",
      "Provide your outline, specify the section's word count (e.g., 250 words), give the target audience and tone, and ask for that section only",
      "Tell the AI: 'Write something about email marketing'",
      "Ask for 500 words and plan to delete half",
    ],
    correctIndex: 1,
    explanation:
      "Chunking your blog into sections and prompting for one at a time (with context about the overall post) gives you granular control. You can review, edit, and steer each section before moving on, ensuring quality and consistency across the full piece.",
  },
  {
    question:
      "Which of the following best describes the concept of 'human-in-the-loop' content creation?",
    options: [
      "The AI works completely independently and only shows the human the final result",
      "The human writes everything manually without any AI assistance",
      "A collaborative workflow where the AI generates drafts or suggestions, but a human reviews, edits, fact-checks, and approves every piece before publication",
      "A technique where multiple AI systems check each other's work without human involvement",
    ],
    correctIndex: 2,
    explanation:
      "Human-in-the-loop means the human remains the decision-maker and quality controller throughout the process. AI accelerates drafting and ideation, but the human ensures accuracy, tone, brand alignment, and ethical standards. This is the professional standard for AI-assisted content.",
  },
]

// ─── DAY 16 — Voiceovers & AI Audio Production ──────────────────────────────

export const day16Quiz: QuizQuestion[] = [
  {
    question:
      "What is text-to-speech (TTS) AI, and how is it commonly used by freelancers?",
    options: [
      "TTS AI is a tool that converts human voice recordings into written text for transcription only",
      "TTS AI converts written text into natural-sounding spoken audio, used by freelancers for voiceover narration, podcast intros, course modules, and accessibility content",
      "TTS AI is a music composition tool that creates background instrumentals",
      "TTS AI is exclusively used by large studios and is inaccessible to independent freelancers",
    ],
    correctIndex: 1,
    explanation:
      "Text-to-speech AI generates spoken audio from written input. Freelancers use it for e-learning narration, YouTube voiceovers, podcast segments, audiobook previews, and accessibility features. Modern TTS tools produce remarkably natural-sounding voices at a fraction of the cost of hiring a voice actor.",
  },
  {
    question:
      "When choosing an AI voice for a corporate training video, which factors should guide your selection?",
    options: [
      "Always pick the cheapest voice option available regardless of quality",
      "Select a voice whose tone, pace, accent, and formality match the audience and context — e.g., a clear, professional, moderately paced voice for corporate learners",
      "Use the most dramatic, movie-trailer voice for every project",
      "Randomly select a voice since all AI voices sound identical",
    ],
    correctIndex: 1,
    explanation:
      "Voice selection is a creative decision. A corporate training video needs clarity, professionalism, and appropriate pacing. A children's story needs warmth and energy. Matching voice characteristics to context dramatically impacts how the content is received.",
  },
  {
    question:
      "What is a 'voice clone' in AI audio production?",
    options: [
      "A physical replica of a microphone made from plastic",
      "An AI model trained on a specific person's voice samples that can generate new spoken audio in that person's voice",
      "A backup copy of an audio file stored in the cloud",
      "A low-quality recording made with cheap equipment",
    ],
    correctIndex: 1,
    explanation:
      "Voice cloning uses machine learning to analyse a person's vocal characteristics (pitch, timbre, cadence, accent) from sample recordings and can then generate new speech in that voice. This has powerful applications for brand consistency but raises important ethical and consent considerations.",
  },
  {
    question:
      "You're producing a 5-minute podcast intro with AI voiceover. The output sounds slightly robotic in places. What is the best approach to improve it?",
    options: [
      "Add background music louder than the voice to hide the robotic quality",
      "Use a text normalisation step: adjust pronunciation of abbreviations, add pauses with punctuation or SSML tags, try a different voice model, and fine-tune speed/pitch settings",
      "Lower the audio quality so imperfections are less noticeable",
      "Give up and record yourself instead",
    ],
    correctIndex: 1,
    explanation:
      "Most TTS platforms offer fine-tuning: SSML (Speech Synthesis Markup Language) tags let you insert pauses, adjust emphasis, and control pronunciation. Choosing a higher-quality voice model and adjusting speed/pitch can also significantly improve naturalness.",
  },
  {
    question:
      "Which ethical consideration is MOST important when using AI voice technology for client work?",
    options: [
      "Whether the AI voice sounds exactly like a famous celebrity",
      "Ensuring you have proper consent and rights for voice cloning, being transparent with clients about AI-generated audio, and not using someone's voice without permission",
      "Making sure the file format is MP3 instead of WAV",
      "Using the longest possible audio clip to demonstrate quality",
    ],
    correctIndex: 1,
    explanation:
      "Ethical AI voice use requires informed consent (especially for cloning), transparency with clients about what is AI-generated versus human-recorded, and respecting intellectual property. Misusing someone's voice or misrepresenting AI audio as human-recorded can have legal and reputational consequences.",
  },
  {
    question:
      "What audio post-processing steps should you apply to AI-generated voiceovers before delivering to a client?",
    options: [
      "None — AI audio is always broadcast-ready",
      "At minimum: noise removal (if needed), consistent volume levelling (normalisation/compression), and format conversion to the client's required specs",
      "Only add background music, nothing else is necessary",
      "Re-record the AI audio using your own microphone",
    ],
    correctIndex: 1,
    explanation:
      "Even high-quality AI voiceovers benefit from basic mastering: volume normalisation ensures consistent loudness, compression evens out dynamic range, and format conversion ensures compatibility. These steps make the difference between amateur and professional delivery.",
  },
]

// ─── DAY 23 — Client Communication with AI ──────────────────────────────────

export const day23Quiz: QuizQuestion[] = [
  {
    question:
      "How should AI be used when drafting client-facing emails?",
    options: [
      "Send whatever the AI generates without reading it, to save maximum time",
      "Use AI to draft the initial version, then personalise it with specific project details, adjust the tone to match the relationship, and review for accuracy before sending",
      "Never use AI for client emails because it's dishonest",
      "Only use AI to write emails when the client explicitly asks you to",
    ],
    correctIndex: 1,
    explanation:
      "AI is excellent for overcoming blank-page paralysis and structuring professional emails. But every client email must be reviewed and personalised — you need to ensure accuracy, match the client's communication style, include specific project context, and maintain the trust-based relationship.",
  },
  {
    question:
      "A client sends an angry email about a missed deadline. You want to use AI to help craft a response. What is the best prompt approach?",
    options: [
      '"Write an email telling the client they are wrong"',
      '"I missed a deadline on a web design project for a small business client. Draft a professional, empathetic response that: 1) Acknowledges the delay without making excuses 2) Explains briefly what happened 3) Proposes a concrete revised timeline 4) Reassures them of the project quality. Tone: warm, accountable, professional."',
      '"Write an apology email"',
      '"Make the client feel bad for being upset"',
    ],
    correctIndex: 1,
    explanation:
      "The best prompts provide full context (what happened, with whom, what's at stake) and clear structural requirements. This lets the AI produce a response that addresses the client's concerns while maintaining professionalism. Vague prompts produce generic, unhelpful outputs.",
  },
  {
    question:
      "When creating a client proposal or scope of work with AI assistance, what is essential to verify before sending?",
    options: [
      "Nothing — AI proposals are always accurate and professionally formatted",
      "Verify all pricing figures, timeline estimates, deliverable descriptions, and terms — ensure they match your actual capacity, standard pricing, and any previously discussed details",
      "Just check the spelling and send it",
      "Remove all numbers and specifics to keep it vague",
    ],
    correctIndex: 1,
    explanation:
      "AI can hallucinate pricing, under- or over-estimate timelines, and generate deliverable descriptions that don't match your actual service offering. Every proposal needs human verification of facts, numbers, and alignment with what was actually discussed with the client.",
  },
  {
    question:
      "You manage multiple freelance clients and use AI to help track project updates. Which workflow is most professional?",
    options: [
      "Use AI to generate fake progress reports when you haven't done the work",
      "Use AI to help draft weekly status updates based on your actual work logs, then personalise each for the client's preferred communication style and detail level",
      "Send identical generic updates to every client without customisation",
      "Only communicate with clients when they explicitly request an update",
    ],
    correctIndex: 1,
    explanation:
      "AI can transform rough work notes into polished, professional updates — but the underlying information must be real and accurate. Personalising for each client's preferences (some want detail, others want brevity) demonstrates professionalism and strengthens relationships.",
  },
  {
    question:
      "What is the biggest risk of over-relying on AI for client communication?",
    options: [
      "Clients will be impressed by how fast you respond",
      "Responses can become generic, lose personal touch, and miss emotional nuances — potentially eroding the trust and rapport that professional relationships depend on",
      "AI will accidentally send emails to the wrong clients",
      "There is no risk — clients always prefer AI communication",
    ],
    correctIndex: 1,
    explanation:
      "Client relationships are built on trust, empathy, and personal connection. Over-automating communication can make interactions feel transactional and impersonal. AI should augment your communication skills, not replace the genuine human elements that clients value.",
  },
  {
    question:
      "You need to create a follow-up email sequence for a potential client who hasn't responded to your initial proposal. How can AI help effectively?",
    options: [
      "Send the same follow-up email 10 times until they respond",
      "Use AI to draft a 3-touch sequence with escalating value: a polite check-in (day 3), a case study or social proof (day 7), and a final 'is this still relevant?' message (day 14) — then personalise each with client-specific details",
      "Don't follow up — if they didn't reply, they're not interested",
      "Automatically call them using AI voice without their consent",
    ],
    correctIndex: 1,
    explanation:
      "AI excels at generating structured follow-up sequences with varied angles (check-in → value-add → deadline). The key is personalising each touch with the prospect's name, project details, and relevant proof. This systematic approach is far more effective than single follow-ups or mass emails.",
  },
]

// ─── DAY 26 — Building Your First AI Offer ──────────────────────────────────

export const day26Quiz: QuizQuestion[] = [
  {
    question:
      "What is an 'AI-enhanced service offer' in a freelance context?",
    options: [
      "A service where the AI does all the work and the freelancer takes full credit without disclosure",
      "A clearly defined service package where AI tools are used to increase speed, quality, or scope — with transparent pricing that reflects the value delivered, not the tools used",
      "Any service that mentions the word 'AI' in its marketing to seem trendy",
      "A free service given away to attract clients",
    ],
    correctIndex: 1,
    explanation:
      "An AI-enhanced offer is a professional service package where AI tools are part of your workflow to deliver better results faster. Pricing is based on value to the client (outcomes, time saved, quality), not on the fact that you use AI. Transparency about your methods builds trust.",
  },
  {
    question:
      "When pricing an AI-enhanced service, which approach is MOST sustainable?",
    options: [
      "Price extremely low because 'AI does the work, so it should be cheap'",
      "Charge based on the value and outcomes delivered to the client — e.g., time saved, revenue generated, quality improvement — not on the hourly time you personally spend",
      "Give the service away free and hope for referrals",
      "Charge the same as every other freelancer in your niche, regardless of your unique value",
    ],
    correctIndex: 1,
    explanation:
      "Value-based pricing reflects what the client gains, not how long you work. If AI helps you deliver a week's work in a day, the client still benefits from a week's value. Underpricing because 'AI made it easy' undervalues your expertise, strategy, and quality control.",
  },
  {
    question:
      "Which of the following is a well-structured AI service package?",
    options: [
      '"I do AI stuff for your business — contact me for pricing"',
      '"Social Media Content Package — 30 days of platform-optimised posts including captions, hashtag strategy, and a content calendar. 2 rounds of revisions. Delivered within 5 business days. Price: €450"',
      '"Cheapest AI content on the internet — guaranteed"',
      '"I will write things for you using ChatGPT"',
    ],
    correctIndex: 1,
    explanation:
      "A professional offer clearly states: what's included (deliverables), scope (30 days, platforms), process (revisions), timeline (5 days), and price. This eliminates ambiguity, sets expectations, and demonstrates professionalism — all of which build client confidence.",
  },
  {
    question:
      "How should you handle disclosure about using AI tools with potential clients?",
    options: [
      "Never mention AI — clients will think you did everything manually",
      "Be transparent that you use AI as part of your workflow, emphasise the value it adds (speed, quality, consistency), and focus on the outcomes they receive",
      "Tell clients you are an AI, not a human freelancer",
      "Only disclose AI use if the client asks directly",
    ],
    correctIndex: 1,
    explanation:
      "Transparency is a professional best practice. Position AI as a tool that enhances your expertise: 'I use AI tools to accelerate research and first drafts, then apply my expertise to ensure quality and strategy.' This builds trust and differentiates you from competitors who may over- or under-disclose.",
  },
  {
    question:
      "What makes an AI service offer stand out in a competitive freelance market?",
    options: [
      "Being the cheapest option available",
      "Combining AI efficiency with deep niche expertise, clear deliverables, proven results or testimonials, and a defined process that shows professional structure",
      "Using the most AI tools possible in every project",
      "Copying exactly what successful competitors are offering",
    ],
    correctIndex: 1,
    explanation:
      "The most successful AI-enhanced freelancers differentiate through niche expertise (understanding a specific industry), professional process (clear deliverables and timelines), and proof of results (testimonials, case studies). AI alone isn't a differentiator — how you combine it with expertise is.",
  },
  {
    question:
      "You're creating your first AI service package. Which step should come FIRST?",
    options: [
      "Immediately create a website and run ads",
      "Identify a specific problem you can solve for a defined audience, validate demand by researching what people already pay for similar solutions, and then design your offer around solving that problem",
      "Set your price as low as possible to attract initial clients",
      "Buy the most expensive AI tools available to seem professional",
    ],
    correctIndex: 1,
    explanation:
      "Start with the problem, not the tools. Identify who has a pain point you can solve, verify they're willing to pay for a solution, and design your offer to address that specific need. This market-first approach ensures demand before you invest time in packaging and marketing.",
  },
]

// ─── DAY 30 — Phase 1 Review & Certification ────────────────────────────────

export const day30Quiz: QuizQuestion[] = [
  {
    question:
      "Over the past 30 days, you've learned to use AI for writing, images, audio, data, and client work. What is the MOST important skill that ties all of these together?",
    options: [
      "Memorising every AI tool's interface and settings",
      "Prompt engineering — the ability to communicate clearly with AI systems to get accurate, useful, and on-brand outputs across any medium",
      "Using as many AI tools as possible simultaneously",
      "Replacing all human work with AI automation",
    ],
    correctIndex: 1,
    explanation:
      "Prompt engineering is the foundational skill that applies across every AI application. Whether you're generating blog copy, image concepts, voiceover scripts, or client proposals — the quality of your input determines the quality of the output. This skill compounds across every tool you use.",
  },
  {
    question:
      "You've completed Phase 1 and want to offer AI-enhanced services. Which combination of skills makes you most valuable to clients?",
    options: [
      "Only knowing how to use ChatGPT",
      "Combining AI tool proficiency with strategic thinking, client communication skills, niche market knowledge, and professional quality control",
      "Only knowing how to generate AI images",
      "Mastering every single AI tool that exists",
    ],
    correctIndex: 1,
    explanation:
      "The most valuable freelancers aren't just tool operators — they're strategists who understand client needs, can communicate effectively, bring niche expertise, and maintain quality standards. AI tools amplify these human skills; they don't replace the need for them.",
  },
  {
    question:
      "A potential client asks: 'Why should I hire you when I can just use AI tools myself?' What is the strongest response?",
    options: [
      "\"You're right, AI is easy -- you should just do it yourself\"",
      "\"AI tools are powerful, but knowing which tool to use, how to prompt it effectively, how to quality-check outputs, and how to align everything with your brand strategy requires expertise. I save you time, reduce your risk of errors, and deliver professional, results-focused outcomes.\"",
      "\"Because I'm cheaper than doing it yourself\"",
      '"AI tools are too complicated for normal people to use"',
    ],
    correctIndex: 1,
    explanation:
      "This response positions your value around expertise, not just tool access. Clients hire freelancers for judgement, quality, strategy, and reliability — not just tool access. Framing your value around outcomes and risk-reduction is far more compelling than competing on tool knowledge alone.",
  },
  {
    question:
      "Which of the following is a realistic and achievable goal for someone who has completed this 30-day Phase 1 programme?",
    options: [
      "Become the world's leading AI expert overnight",
      "Offer 2-3 defined AI-enhanced services (e.g., blog writing, social media content, basic voiceover production) to a specific target audience and land your first paying client within 60 days",
      "Replace your entire income with AI passive income immediately",
      "Stop learning because you now know everything about AI",
    ],
    correctIndex: 1,
    explanation:
      "Phase 1 gives you practical, foundational skills. A realistic next step is to specialise in 2-3 services, target a defined audience, and focus on landing paying clients. Mastery comes through practice and real-world projects, not from completing a course alone.",
  },
  {
    question:
      "How should you approach continuous learning after completing Phase 1?",
    options: [
      "Ignore AI developments — the tools you learned are all you'll ever need",
      "Follow a regular learning practice: experiment with new tools monthly, study what successful AI freelancers are doing, gather client feedback, and iterate on your service offerings",
      "Only learn new things if a client specifically asks you to",
      "Wait until AI completely changes before learning anything new",
    ],
    correctIndex: 1,
    explanation:
      "AI evolves rapidly. The professionals who thrive are those who maintain a learning habit: experimenting with new tools, studying best practices, listening to client feedback, and continuously refining their services. Phase 1 is a foundation — ongoing learning is what builds a career.",
  },
  {
    question:
      "What is the best definition of 'AI literacy' for a freelance professional?",
    options: [
      "Being able to write complex code that trains custom AI models from scratch",
      "Understanding what AI tools can and cannot do, knowing how to use them effectively and ethically, and being able to critically evaluate their outputs in a professional context",
      "Being able to name every AI company and product on the market",
      "Using AI for every single task without exception",
    ],
    correctIndex: 1,
    explanation:
      "AI literacy means understanding capabilities and limitations, using tools appropriately, maintaining ethical standards, and critically assessing outputs. You don't need to build AI — you need to use it wisely, evaluate its work, and understand when human judgement is essential.",
  },
]

// ─── Combined Quiz Export ─────────────────────────────────────────────────────

export const phase1Quizzes: Record<number, QuizQuestion[]> = {
  2: day2Quiz,
  5: day5Quiz,
  9: day9Quiz,
  16: day16Quiz,
  23: day23Quiz,
  26: day26Quiz,
  30: day30Quiz,
}

// ─── DAY 3 — Setting Up Your AI Workspace ────────────────────────────────────

const day3Assignment = `# Day 3 Assignment: Setting Up Your AI Workspace

## Overview
Set up a complete, organised AI workspace that you will use throughout this course. This includes creating accounts on key AI tools, configuring your browser and file system, and documenting your setup in a reference document.

## Requirements

### Tool Accounts (minimum)
Create free-tier accounts on the following platforms:
1. **ChatGPT** (OpenAI) — for text generation and conversational AI
2. **Claude** (Anthropic) — for alternative text generation and longer-context tasks
3. **Canva** (with AI features enabled) — for design and visual content
4. **One AI image generator** — choose from Midjourney (via Discord), Leonardo AI, or Microsoft Designer

### Workspace Setup
- Create a dedicated folder structure on your computer:
  \`\`\`
  AI-Workspace/
  ├── 01-Projects/
  ├── 02-Templates/
  ├── 03-Saved-Prompts/
  ├── 04-References/
  └── 05-Exports/
  \`\`\`
- Create a \`README.md\` inside the workspace root documenting: which tools you use, your login email for each, and any API keys (stored securely — never commit keys to a repo)

### Prompt Library Starter
- Create a Google Doc or Notion page titled **"My Prompt Library"**
- Write and save 3 customised prompts you can reuse:
  - One for writing a professional email
  - One for generating social media caption ideas
  - One for brainstorming blog topics for a niche of your choice

## Deliverables
- Screenshots (or screen recording) showing all tool accounts created and logged in
- A screenshot of your folder structure
- Your Prompt Library document shared via link (or exported as PDF)
- A short reflection (150-200 words): Which tool felt most intuitive? Which felt overwhelming? What are you most excited to use?

## Evaluation Criteria
| Criteria | Points |
|---|---|
| All required tool accounts created and accessible | 25 |
| Folder structure created with README documentation | 25 |
| Prompt library with 3 polished, reusable prompts | 30 |
| Reflection shows genuine engagement and self-awareness | 20 |
| **Total** | **100** |`

// ─── DAY 10 — Social Media Content Strategy ──────────────────────────────────

const day10Assignment = `# Day 10 Assignment: Social Media Content Strategy

## Overview
Develop a complete 2-week social media content plan for a real or realistic business using AI tools for ideation, drafting, and visual creation. This assignment combines everything you've learned about prompting, content creation, and strategic thinking.

## Requirements

### Business Brief
Choose (or create) one of the following business types:
- A local café or restaurant
- A freelance graphic designer's portfolio brand
- A small online skincare shop
- A personal fitness coaching business
- A local bookshop or independent retailer

Write a 100-word business brief including: business name, target audience, brand voice, and primary goal (e.g., increase followers, drive website traffic, promote a specific product).

### Content Plan
Using AI tools, generate and finalise:
1. **Content calendar** for 14 days across 2 platforms (e.g., Instagram + LinkedIn, or TikTok + Twitter/X)
2. **14 individual posts** — each including:
   - Platform and post type (carousel, reel, static image, text post)
   - AI-generated caption (edited by you for brand voice)
   - AI-generated or AI-assisted visual concept (description or actual image)
   - 3-5 relevant hashtags
   - Best posting time rationale (based on your target audience)
3. **3 content pillar themes** (e.g., "Behind the Scenes", "Educational Tips", "Customer Testimonials") with 2-3 post ideas under each

### AI Workflow Documentation
Write a 200-word section explaining:
- Which AI tools you used for which tasks
- How you edited AI outputs to match your brand voice
- What you learned about prompting for social media content specifically

## Deliverables
- Business brief (100 words)
- 14-day content calendar (table or spreadsheet format)
- 14 fully written posts with captions, hashtags, and visual descriptions
- AI workflow reflection (200 words)
- All AI-generated visuals saved in your workspace

## Evaluation Criteria
| Criteria | Points |
|---|---|
| Business brief is clear, specific, and realistic | 15 |
| Content calendar covers 14 days across 2 platforms with variety | 20 |
| Posts demonstrate strong brand voice consistency and creativity | 25 |
| AI workflow reflection shows critical thinking about tool use | 20 |
| Overall professionalism and attention to detail | 20 |
| **Total** | **100** |`

// ─── DAY 17 — Editing with AI Tools ──────────────────────────────────────────

const day17Assignment = `# Day 17 Assignment: Editing with AI Tools

## Overview
Demonstrate your ability to use AI as an editing and quality-assurance partner — not as a replacement for your own judgement. You will take a rough draft through multiple AI-assisted editing rounds and document your process.

## Requirements

### Part 1: The Raw Draft
Write a 400-500 word blog post draft on one of these topics:
- "Why small businesses should invest in email marketing in 2025"
- "5 mistakes freelancers make when pricing their services"
- "How to stay productive working from home"

Write this draft quickly and intentionally include:
- At least 2 grammatical errors
- 1 unclear or overly long paragraph
- 1 instance of jargon that a general audience wouldn't understand
- A weak or generic introduction

### Part 2: AI-Assisted Editing Rounds
Perform **3 separate editing passes** using AI tools:

**Pass 1 — Grammar & Clarity**
Prompt AI to check for grammar, spelling, punctuation, and sentence clarity. Accept changes selectively and explain why you kept or rejected each suggestion.

**Pass 2 — Tone & Readability**
Prompt AI to improve readability (aim for Grade 8-10 reading level), strengthen the introduction, and ensure consistent tone. Document what changed.

**Pass 3 — SEO & Structure**
Prompt AI to suggest SEO improvements (meta description, heading structure, keyword placement) and recommend structural changes. Apply those that make sense for the piece.

### Part 3: Final Version & Reflection
Compile your final polished version and write a 250-word reflection covering:
- How each editing pass improved the draft
- What you chose NOT to accept from AI suggestions and why
- How you maintained your own voice while using AI assistance

## Deliverables
- Original rough draft (unedited)
- 3 annotated editing rounds with prompts used and AI output
- Final polished version (600-700 words after editing)
- 250-word reflection

## Evaluation Criteria
| Criteria | Points |
|---|---|
| Original draft intentionally includes teachable errors | 10 |
| Each editing pass uses a distinct, well-crafted prompt | 25 |
| Reflection demonstrates critical thinking about AI suggestions | 30 |
| Final version is polished, well-structured, and reads naturally | 25 |
| Professional presentation and clear organisation | 10 |
| **Total** | **100** |`

// ─── DAY 24 — Freelancing with AI Tools ──────────────────────────────────────

const day24Assignment = `# Day 24 Assignment: Freelancing with AI Tools

## Overview
Create a complete freelance service listing for one AI-enhanced service you could realistically offer to paying clients. This includes defining your service, pricing it, writing the listing copy, and preparing a sample deliverable.

## Requirements

### Service Definition
Choose ONE of the following service types (or propose your own):
- Blog/content writing for a specific niche
- Social media content creation (monthly package)
- AI-assisted voiceover production for short-form video
- Email marketing sequence creation
- Product listing copywriting (for e-commerce)
- AI-enhanced presentation design

Write a **service definition document** (300 words) covering:
- **What the service is** (clear, specific deliverables)
- **Who it's for** (target client profile — industry, business size, budget range)
- **What problem it solves** for the client
- **Your unique approach** — how you combine AI tools with your expertise

### Pricing & Packaging
Create **3 pricing tiers** (e.g., Starter, Standard, Premium):
- Each tier must list specific deliverables, turnaround time, and number of revisions
- Include a clear price for each tier (research real market rates on Fiverr, Upwork, or similar)
- Write a 1-sentence value proposition for each tier

### Service Listing Copy
Write a **professional service listing** (250 words) as it would appear on your portfolio website or a freelancing platform. Include:
- A compelling headline
- A description that leads with the client's problem, not your tools
- 3 key benefits of working with you
- A clear call-to-action

### Sample Deliverable
Create **one complete sample** of your service deliverable using AI tools. For example:
- If your service is blog writing: write one 600-word blog post in your target niche
- If your service is social media: create a 7-day content sample
- If your service is voiceover: produce a 60-second AI voiceover script with delivery notes

## Deliverables
- Service definition document (300 words)
- 3-tier pricing table with descriptions
- Professional service listing copy (250 words)
- One complete sample deliverable
- A 150-word note on which AI tools you used in creating each deliverable

## Evaluation Criteria
| Criteria | Points |
|---|---|
| Service definition is specific, marketable, and realistic | 20 |
| Pricing tiers are competitive and clearly differentiated | 20 |
| Listing copy is persuasive, professional, and client-focused | 25 |
| Sample deliverable demonstrates high quality and AI proficiency | 25 |
| Overall cohesion — all parts work together as a professional package | 10 |
| **Total** | **100** |`

// ─── Combined Assignments Export ──────────────────────────────────────────────

export const phase1Assignments: Record<number, string> = {
  3: day3Assignment,
  10: day10Assignment,
  17: day17Assignment,
  24: day24Assignment,
}
