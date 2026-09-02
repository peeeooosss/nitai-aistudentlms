export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export const phase2Quizzes: Record<number, QuizQuestion[]> = {
  33: [
    {
      question: "Which no-code platform is specifically designed for connecting web apps through conditional trigger-action workflows?",
      options: [
        "Airtable",
        "Zapier",
        "Canva",
        "Notion",
      ],
      correctIndex: 1,
      explanation:
        "Zapier is built specifically for connecting apps via trigger-action workflows called Zaps. Airtable is a database-spreadsheet hybrid, Canva is a design tool, and Notion is a workspace/wiki tool.",
    },
    {
      question: "In Zapier terminology, what is a 'Zap'?",
      options: [
        "A pricing tier for premium automations",
        "An automated workflow consisting of a trigger and one or more actions",
        "A webhook endpoint that receives external data",
        "A compiled JavaScript bundle used for edge deployment",
      ],
      correctIndex: 1,
      explanation:
        "A Zap is an automated workflow where a trigger event in one app causes one or more action events in other apps. It is the fundamental unit of automation in Zapier.",
    },
    {
      question: "You want to automatically save every new Gmail attachment to Google Drive. What should the trigger be in Zapier?",
      options: [
        "New Email in Gmail",
        "New Attachment in Gmail",
        "New File in Google Drive",
        "Updated Label in Gmail",
      ],
      correctIndex: 1,
      explanation:
        "The 'New Attachment in Gmail' trigger fires specifically when an email arrives with an attachment. 'New Email' fires for all emails regardless of attachments, which would create unnecessary Zap runs.",
    },
    {
      question: "What is a key limitation of no-code automation tools that an agency owner should communicate to clients?",
      options: [
        "They cannot integrate with any external APIs",
        "They only work on desktop browsers",
        "They have execution time limits and may struggle with complex conditional branching or heavy data transformations",
        "They require the client to install local server software",
      ],
      correctIndex: 2,
      explanation:
        "No-code tools typically have per-task execution time limits (e.g., 1–10 minutes), and deeply nested conditional logic or large data transformations can become unwieldy or hit plan limits. They do integrate with APIs, run in the cloud, and require no local installs.",
    },
    {
      question: "When building a Zap that processes a spreadsheet row and needs to look up a related record in Airtable before taking action, which Zapier feature should you use?",
      options: [
        "A Formatter step",
        "A Filter by Zapier step",
        "A Find Record step in Airtable",
        "A Webhooks by Zapier step",
      ],
      correctIndex: 2,
      explanation:
        "The Airtable 'Find Record' action searches for a record matching specific criteria and returns its data. This is the correct way to look up related data before proceeding with subsequent actions.",
    },
  ],

  37: [
    {
      question: "What is the primary advantage of using a social media scheduling tool like Buffer or Hootsuite over posting manually?",
      options: [
        "They guarantee higher engagement rates on every post",
        "They allow batch content creation and publish at optimal times without real-time manual effort",
        "They automatically write all your captions for you",
        "They replace the need for a content calendar entirely",
      ],
      correctIndex: 1,
      explanation:
        "Scheduling tools let you batch-create and queue posts to publish at pre-selected or algorithmically-optimal times. They do not guarantee engagement, auto-generate all captions, or eliminate the need for a content strategy.",
    },
    {
      question: "When setting up a cross-platform scheduling bot, why is it important to customize each post for the native format of each platform?",
      options: [
        "Because scheduling tools block identical content across platforms",
        "Because each platform has different character limits, image ratios, hashtag norms, and audience expectations",
        "Because the bot will automatically duplicate-delete one copy",
        "Because API rate limits only allow one post per platform per hour",
      ],
      correctIndex: 1,
      explanation:
        "Instagram favors square images and hashtags, Twitter/X has character limits, LinkedIn uses professional tone and longer-form text, and TikTok is vertical video. Native formatting improves reach and engagement. Scheduling tools do not block duplicates, and rate limits are not the primary reason.",
    },
    {
      question: "A client wants to auto-post every new WordPress blog entry to LinkedIn, Twitter, and Facebook. What is the most reliable trigger in a scheduling automation?",
      options: [
        "A manual RSS feed check every hour",
        "A WordPress webhook or RSS feed trigger that fires on new post publication",
        "A cron job that scrapes the sitemap every day",
        "A Google Sheets row that manually tracks blog URLs",
      ],
      correctIndex: 1,
      explanation:
        "A WordPress webhook fires immediately when a post is published, providing real-time distribution. An RSS feed trigger is also reliable. Scraping sitemaps is slow and brittle, and a manual Google Sheet adds unnecessary manual steps.",
    },
    {
      question: "What does 'content batching' mean in the context of social media scheduling?",
      options: [
        "Posting the same content to multiple accounts simultaneously",
        "Dedicating a focused block of time to create a large volume of content that is then scheduled over days or weeks",
        "Compressing image files before uploading them to a scheduling tool",
        "Merging multiple tweets into a single thread automatically",
      ],
      correctIndex: 1,
      explanation:
        "Content batching is the practice of setting aside dedicated time to create many posts at once, then loading them into a scheduler to drip out over time. This improves efficiency and consistency compared to creating one post at a time daily.",
    },
    {
      question: "A scheduling bot fails to post to Instagram because the access token expired. What is the correct remediation?",
      options: [
        "Restart the server hosting the bot",
        "Re-authenticate the Instagram Business API connection and refresh or regenerate the token",
        "Switch to a different scheduling platform entirely",
        "Delete the Instagram account and create a new one",
      ],
      correctIndex: 1,
      explanation:
        "Instagram API access tokens expire and must be refreshed or regenerated through the Meta Developer Portal or the scheduling tool's re-authentication flow. This is a normal maintenance task, not a reason to switch platforms or restart infrastructure.",
    },
  ],

  40: [
    {
      question: "In an automated reporting pipeline, what is the role of a data transformation step between extraction and visualization?",
      options: [
        "To encrypt the raw data for compliance",
        "To clean, aggregate, and reshape raw data into a format suitable for charts and KPIs",
        "To delete older data that is no longer relevant",
        "To send the report via email before visualization",
      ],
      correctIndex: 1,
      explanation:
        "Transformation steps clean missing values, aggregate metrics (e.g., sum revenue by month), pivot data, and compute KPIs. This makes the data suitable for visualization tools like Looker Studio or Retool dashboards.",
    },
    {
      question: "A client wants a weekly Google Analytics report emailed every Monday at 9 AM. Which automation approach is most appropriate?",
      options: [
        "A manual export-and-email workflow each Monday",
        "A scheduled Zapier/Make scenario or n8n workflow that queries the GA4 API, formats results, and sends an email via SMTP or Gmail",
        "A browser extension that auto-prints the GA4 dashboard",
        "A Slack bot that DMs the client a screenshot",
      ],
      correctIndex: 1,
      explanation:
        "A scheduled automation (Zapier, Make, or n8n) can query the GA4 API on a cron schedule, transform the data into a summary, and send a formatted email. This is fully automated, reliable, and scalable. Manual workflows defeat the purpose, and screenshots are not data-rich.",
    },
    {
      question: "What is a key advantage of using Google Looker Studio (formerly Data Studio) for automated client reporting?",
      options: [
        "It can write data back to source databases automatically",
        "It connects to multiple data sources, auto-refreshes on schedule, and provides interactive shareable dashboards",
        "It eliminates the need for any data connectors or APIs",
        "It replaces the need for Google Analytics entirely",
      ],
      correctIndex: 1,
      explanation:
        "Looker Studio connects to GA4, BigQuery, Sheets, and many third-party sources. It can be configured to refresh data on schedule and generates shareable, interactive dashboards. It does not write back to databases or replace analytics tools.",
    },
    {
      question: "When building a monthly ad spend report that pulls from both Meta Ads and Google Ads, why is a data warehouse or central spreadsheet important?",
      options: [
        "It is required by Meta's advertising terms of service",
        "It provides a unified schema to normalize and compare metrics across platforms that use different naming conventions",
        "It reduces the cost of ad spend directly",
        "It automatically pauses underperforming ads",
      ],
      correctIndex: 1,
      explanation:
        "Meta and Google Ads use different column names, metric definitions, and date granularities. A central warehouse or normalized spreadsheet (e.g., BigQuery or Google Sheets) provides a consistent schema so dashboards can compare impressions, clicks, and CPA side by side.",
    },
    {
      question: "A report automation sends a client an email with a broken chart image every Monday. What is the most likely cause?",
      options: [
        "The client's email provider blocks all images",
        "The chart rendering depends on a data source URL or API token that has changed or expired since the last run",
        "Charts cannot be embedded in emails under any circumstances",
        "The email subject line is too long",
      ],
      correctIndex: 1,
      explanation:
        "Automated chart generation often relies on live data URLs or authenticated API connections. If a token expires, a URL changes, or a sheet is moved, the rendering pipeline breaks. The fix is to audit the data source connection and refresh credentials.",
    },
  ],

  44: [
    {
      question: "What distinguishes a tool-using AI agent from a standard LLM chatbot?",
      options: [
        "A tool-using agent has a larger parameter count",
        "A tool-using agent can invoke external functions, APIs, or scripts as part of its reasoning loop to take real-world actions",
        "A tool-using agent does not use natural language",
        "A tool-using agent runs on a different hardware architecture",
      ],
      correctIndex: 1,
      explanation:
        "The key differentiator is that a tool-using agent can decide to call external tools (APIs, databases, code interpreters, web browsers) based on the user's request, execute them, and incorporate results into its response. Parameter size and hardware are not the defining features.",
    },
    {
      question: "In the ReAct (Reasoning + Acting) pattern for AI agents, what happens after the LLM generates a 'Thought' and decides on an 'Action'?",
      options: [
        "The conversation ends immediately",
        "The action is executed by an external tool, the observation/result is fed back, and the LLM reasons again",
        "The user must manually approve every action before execution",
        "A second LLM is called to verify the first LLM's action",
      ],
      correctIndex: 1,
      explanation:
        "In ReAct, the loop is: Thought → Action → Observation. The LLM reasons, selects a tool call, the tool executes and returns a result (observation), and the LLM uses that result to reason toward the next step or final answer. Manual approval is optional depending on implementation.",
    },
    {
      question: "You are building an AI agent that needs to search the web, read a page, and then summarize it. Which combination of tools would be most appropriate?",
      options: [
        "A text-to-image generator and a speech-to-text API",
        "A web search API, a web page fetching/scraping tool, and an LLM summarization call",
        "A database INSERT tool and a file upload tool",
        "A calendar API and an email sending tool",
      ],
      correctIndex: 1,
      explanation:
        "The agent needs a search tool to find relevant pages, a fetch/scrape tool to retrieve page content, and an LLM call to summarize the text. The other combinations do not match the task requirements.",
    },
    {
      question: "What is a critical safety consideration when deploying a tool-using AI agent with access to external APIs?",
      options: [
        "Ensuring the agent uses the GPT-4 model instead of GPT-3.5",
        "Implementing permission scoping, rate limiting, and confirmation gates to prevent unintended or destructive actions",
        "Using a monospace font in the agent's output",
        "Storing API keys in the agent's system prompt for easy access",
      ],
      correctIndex: 1,
      explanation:
        "Agents with API access can perform real-world actions (sending emails, deleting records, spending money). Permission scoping limits what tools the agent can use, rate limiting prevents runaway loops, and confirmation gates require user approval for high-impact actions. API keys should never be in system prompts.",
    },
    {
      question: "In a multi-step agent workflow, what is 'memory' in the context of agentic systems?",
      options: [
        "The RAM allocated to the server hosting the agent",
        "A mechanism that lets the agent retain and reference information from earlier steps in the conversation or from external stores across turns",
        "The temperature parameter of the LLM",
        "A backup copy of the training data",
      ],
      correctIndex: 1,
      explanation:
        "Agent memory refers to short-term (conversation context) or long-term (vector stores, databases) mechanisms that allow the agent to recall prior interactions, intermediate results, and learned facts across multiple reasoning steps or sessions.",
    },
  ],

  47: [
    {
      question: "What is 'content repurposing' in the context of an AI-powered content system?",
      options: [
        "Copying competitor content verbatim to save time",
        "Transforming a single piece of long-form content into multiple derivative formats tailored for different platforms and audiences",
        "Deleting old content and replacing it with AI-generated alternatives",
        "Translating content into a single foreign language",
      ],
      correctIndex: 1,
      explanation:
        "Content repurposing takes one source asset (e.g., a blog post or video) and reworks it into tweets, LinkedIn posts, email newsletters, infographics, short-form video scripts, and more — maximizing reach from a single content investment.",
    },
    {
      question: "A client has a 45-minute YouTube video they want to turn into a multi-platform content campaign. Which pipeline is most effective?",
      options: [
        "Upload the same video file to every platform unchanged",
        "Transcribe with Whisper, use LLM to extract key insights, then generate platform-specific posts, clips, and a blog summary",
        "Post the YouTube link everywhere and hope for organic reach",
        "Delete the video and start over with a shorter one",
      ],
      correctIndex: 1,
      explanation:
        "Transcription extracts the spoken content, an LLM can identify key themes and insights, and then platform-specific content (tweets, blog posts, short clips) can be generated. This maximizes the value of the original asset across channels.",
    },
    {
      question: "When using AI to generate social media posts from a blog article, why should you always add a human review step?",
      options: [
        "AI cannot generate text at all",
        "LLMs may hallucinate facts, lose brand voice nuance, or produce off-topic content that requires editorial judgment",
        "Social media platforms detect AI text and auto-delete it",
        "AI-generated text uses too many tokens to be cost-effective",
      ],
      correctIndex: 1,
      explanation:
        "LLMs can introduce factual errors, misinterpret the source material, or produce content that does not match the client's brand tone. A human review step catches these issues before publication, maintaining quality and trust.",
    },
    {
      question: "What is the benefit of storing repurposed content outputs in a structured database or content calendar (e.g., Airtable or Notion)?",
      options: [
        "It makes the content legally copyrighted automatically",
        "It enables tracking, scheduling, status management, and reuse of content assets across campaigns",
        "It is required by social media platform APIs",
        "It eliminates the need for any human review",
      ],
      correctIndex: 1,
      explanation:
        "A structured content database lets you track publication status, assign team members, schedule posts, tag content by topic or campaign, and maintain a reusable library of approved assets. It does not confer copyright or remove the need for editorial oversight.",
    },
    {
      question: "A repurposed Instagram carousel about '5 AI Tools for Agencies' generated by an LLM includes a tool that was discontinued last month. What process failure does this reveal?",
      options: [
        "The LLM model was too small for the task",
        "There was no factual verification or knowledge-cutoff check in the content review pipeline",
        "Instagram does not support carousel posts about tools",
        "The image generation step failed",
      ],
      correctIndex: 1,
      explanation:
        "LLMs have training data cutoffs and may reference outdated information. A robust repurposing pipeline includes a fact-checking step where a human or web-search tool verifies current status of any claims, tools, or statistics before publishing.",
    },
  ],

  51: [
    {
      question: "What is an 'agency stack' in the context of an AI automation business?",
      options: [
        "A physical server rack in a data center",
        "The collection of software tools, platforms, APIs, and workflows an agency uses to deliver services to clients at scale",
        "A single all-in-one software that handles everything",
        "A hiring framework for onboarding new employees",
      ],
      correctIndex: 1,
      explanation:
        "An agency stack is the curated set of tools (e.g., CRM, project management, AI models, automation platforms, reporting dashboards) that work together to enable the agency to deliver services efficiently and consistently across multiple clients.",
    },
    {
      question: "Which of the following is the most important criterion when selecting a tool for your agency stack?",
      options: [
        "It must be the cheapest option available",
        "It must integrate well with your existing tools and scale with your client base",
        "It must be built by a Fortune 500 company",
        "It must offer unlimited free-tier usage",
      ],
      correctIndex: 1,
      explanation:
        "Integration compatibility (APIs, webhooks, native connectors) and scalability (pricing tiers, performance under load) are the most critical factors. Cheap or free tools that do not integrate create more manual work and limit growth.",
    },
    {
      question: "A solo agency owner is spending 3 hours per day on manual client onboarding. Which part of the agency stack should be automated first?",
      options: [
        "The office coffee machine",
        "The client onboarding workflow — intake forms, account provisioning, welcome emails, and task assignment in the project management tool",
        "The agency's internal team meetings",
        "The physical filing cabinet organization",
      ],
      correctIndex: 1,
      explanation:
        "Manual onboarding is repetitive, rule-based, and time-consuming — ideal for automation. An intake form (Typeform/Tally) triggers a workflow (Zapier/Make) that creates a CRM record, sends a welcome email sequence, and generates a project board with templated tasks.",
    },
    {
      question: "Why is it better to use a modular agency stack (best-of-breed tools connected via APIs) rather than a single monolithic platform?",
      options: [
        "Modular stacks are always free",
        "Modular stacks allow you to swap individual tools as needs change, negotiate better pricing, and avoid vendor lock-in",
        "Monolithic platforms do not exist",
        "Modular stacks require no technical knowledge to set up",
      ],
      correctIndex: 1,
      explanation:
        "A modular approach lets you replace any single tool (e.g., switch from HubSpot to Pipedrive) without rebuilding your entire workflow. This flexibility avoids vendor lock-in, lets you optimize cost per tool, and adapts to changing client needs.",
    },
    {
      question: "What role does a centralized project management tool (e.g., ClickUp, Asana, or Linear) play in an agency stack?",
      options: [
        "It replaces the need for client contracts and invoices",
        "It serves as the single source of truth for task tracking, deadlines, responsibilities, and project status across all clients",
        "It is only useful for agencies with more than 20 employees",
        "It handles all AI inference tasks automatically",
      ],
      correctIndex: 1,
      explanation:
        "A project management tool centralizes task ownership, deadlines, status, and documentation so nothing falls through the cracks. It is essential for any team size — even a solo agency benefits from structured task tracking across multiple clients.",
    },
  ],

  54: [
    {
      question: "When using AI to draft a client proposal, what should always be generated by you (the human) rather than the LLM?",
      options: [
        "The entire proposal including pricing and scope",
        "The client-specific strategy, pricing, and unique value proposition based on discovery call insights",
        "The company logo and branding assets",
        "The file format (PDF vs. DOCX)",
      ],
      correctIndex: 1,
      explanation:
        "LLMs lack context from discovery calls, client relationships, and competitive nuances. Strategy, pricing, and value propositions must come from your expertise. AI can help draft, format, and polish, but the core substance must reflect real client understanding.",
    },
    {
      question: "What is an effective prompt engineering technique when asking an LLM to write a proposal section?",
      options: [
        "Say 'write a proposal' with no additional context",
        "Provide the target audience, pain points, desired outcomes, tone, and specific deliverables in the prompt",
        "Use the shortest possible prompt to save tokens",
        "Ask the LLM to guess the client's budget",
      ],
      correctIndex: 1,
      explanation:
        "Detailed prompts with context (audience pain points, desired outcomes, tone, deliverables, constraints) produce far more relevant and usable proposal drafts. Vague prompts require extensive rewriting and waste time.",
    },
    {
      question: "A proposal needs to explain how your AI automation service will reduce the client's manual workload. Which structure works best?",
      options: [
        "A wall of text describing your company history",
        "A clear before/after comparison: current state (manual process, time spent, error rate) vs. future state (automated workflow, time saved, accuracy)",
        "A list of every AI tool you have ever used",
        "A copy-paste of the client's website content",
      ],
      correctIndex: 1,
      explanation:
        "Before/after comparisons are concrete and persuasive. They quantify the value proposition (e.g., '8 hours/week → 30 minutes/week') and help the client visualize the transformation. Tool lists and company history do not address the client's specific problem.",
    },
    {
      question: "What is the biggest risk of sending an AI-drafted proposal without human editing?",
      options: [
        "The proposal file will be too small to open",
        "It may contain generic language, factual inaccuracies, or misaligned scope that erodes client trust and loses the deal",
        "The client's email will reject the attachment",
        "AI-generated proposals are legally invalid",
      ],
      correctIndex: 1,
      explanation:
        "Unedited AI drafts often contain boilerplate language that feels impersonal, may overpromise deliverables, or include inaccurate assumptions. A thorough human edit ensures the proposal reflects the client's actual needs and your real capabilities.",
    },
    {
      question: "After drafting a proposal with AI, what final step should you take before sending it to the client?",
      options: [
        "Remove all formatting to make it plain text",
        "Read it aloud or have a colleague review it to ensure it sounds natural, is error-free, and accurately reflects the agreed scope",
        "Add as many pages as possible to make it look comprehensive",
        "Send it immediately without review to appear responsive",
      ],
      correctIndex: 1,
      explanation:
        "Reading aloud catches awkward phrasing, and a colleague can spot assumptions or errors you missed. Overly long proposals lose reader attention, and sending without review risks presenting inaccurate information that damages credibility.",
    },
  ],

  58: [
    {
      question: "In AI-powered quality assurance for automation workflows, what does a 'regression test' check?",
      options: [
        "Whether the AI model's training data is still current",
        "Whether a recent change to the workflow has broken previously working functionality",
        "The spelling and grammar of output text",
        "The total cost of API calls per month",
      ],
      correctIndex: 1,
      explanation:
        "Regression testing verifies that new code changes, tool updates, or workflow modifications have not introduced bugs in previously working parts of the system. This is critical when updating automations that multiple clients depend on.",
    },
    {
      question: "You have an AI agent that auto-replies to customer support tickets. What is the most important QA practice before deploying it to production?",
      options: [
        "Launch it immediately and fix issues as customers complain",
        "Run it against a labeled test dataset of real tickets, measure accuracy, hallucination rate, and escalation appropriateness",
        "Only test it with simple 'hello world' messages",
        "Disable the agent's ability to respond to any message",
      ],
      correctIndex: 1,
      explanation:
        "Testing against a realistic, labeled dataset lets you measure key metrics (accuracy, false-positive rate, escalation correctness) before real users are affected. Launching untested risks damaging client relationships and brand reputation.",
    },
    {
      question: "What is a 'hallucination' in the context of an AI automation that generates client-facing content?",
      options: [
        "A visual glitch in the output dashboard",
        "The AI generating plausible-sounding but factually incorrect or fabricated information",
        "The AI refusing to answer a question",
        "The AI running slower than expected",
      ],
      correctIndex: 1,
      explanation:
        "Hallucination occurs when an LLM generates text that sounds fluent and confident but contains fabricated facts, incorrect statistics, or invented references. In client-facing content, this can cause legal, reputational, and trust issues if not caught by QA.",
    },
    {
      question: "A client's automation workflow sometimes processes a CSV file correctly and sometimes drops rows silently. What QA approach would best diagnose this?",
      options: [
        "Ask the client to reformat the CSV manually each time",
        "Create a test suite with edge-case CSV files (missing columns, extra whitespace, mixed date formats) and validate output row counts against expected results",
        "Switch to a different client to avoid the issue",
        "Add a sleep() call between processing steps",
      ],
      correctIndex: 1,
      explanation:
        "Edge-case testing with varied input formats reveals silent failures. Testing files with missing columns, encoding issues, or format variations helps you identify and fix the parsing logic. Sleep calls and manual reformatting do not address the root cause.",
    },
    {
      question: "When building a QA checklist for an AI-powered client reporting pipeline, which item is most critical?",
      options: [
        "The report uses a consistent font throughout",
        "All data sources are queried, numbers are validated against source systems, and calculated metrics match expected formulas",
        "The report is exactly 10 pages long",
        "The report includes a table of contents",
      ],
      correctIndex: 1,
      explanation:
        "Data accuracy is the foundation of reporting trust. Validating that all sources are queried (no missing data), numbers match source systems, and formulas calculate correctly ensures the report is reliable. Formatting matters but does not override data integrity.",
    },
  ],
};

export const phase2Assignments: Record<number, string> = {
  31: `# Introduction to AI Automation — Build Your First Workflow

## Overview
In this assignment, you will design and implement your first end-to-end AI automation workflow. You will identify a repetitive task in your daily work and automate it using a no-code or low-code tool.

## Requirements
- **Identify a Task**: Document a repetitive, rule-based task you perform at least 3 times per week (e.g., forwarding emails with attachments to cloud storage, copying data between spreadsheets, posting the same update across platforms).
- **Select a Tool**: Choose an appropriate automation platform (Zapier, Make, n8n, or Pipedream) and justify your selection in 3–5 sentences.
- **Build the Workflow**: Create a working automation with at least one trigger and two actions. The workflow must handle real data (not test/mock data in production).
- **Document the Process**: Write a step-by-step walkthrough (with screenshots) showing how the trigger fires, how data flows between steps, and what the final output looks like.
- **Measure Impact**: Estimate the time saved per week if this automation runs instead of the manual process. Show your calculation.

## Deliverables
1. A link to or screenshots of your live automation workflow
2. A written walkthrough document (800–1200 words) covering trigger logic, action steps, data flow, and error handling considerations
3. A time-savings calculation table (manual time × frequency vs. automated time × frequency)

## Evaluation Criteria
- **Correctness (30%)**: The workflow runs without errors and produces the expected output
- **Completeness (25%)**: All required components (trigger, two actions, documentation, calculation) are present
- **Clarity of Documentation (25%)**: Walkthrough is easy to follow, screenshots are annotated, and the explanation assumes no prior knowledge of the tool
- **Practical Impact (20%)**: Time-savings calculation is realistic and the chosen task demonstrates genuine productivity improvement

## Hints
- Start with the simplest version of the workflow, verify it works, then add complexity.
- Most no-code tools have free tiers sufficient for this assignment.
- If your automation involves email, use a dedicated test email account rather than your primary inbox.`,

  38: `# AI CRM Integration — Connect, Automate, and Enrich

## Overview
This assignment requires you to build an AI-enhanced CRM integration that automatically captures lead information, enriches it with AI-generated insights, and triggers follow-up actions. You will connect a CRM (or CRM-like tool) with an AI model and an automation platform.

## Requirements
- **CRM Setup**: Set up a CRM system (HubSpot free tier, Pipedrive, Airtable as a CRM, or a Google Sheet structured as a CRM) with at least 5 sample lead records including name, email, company, and inquiry type.
- **AI Enrichment**: Build an automation that, when a new lead is added, uses an LLM API (OpenAI, Anthropic, or similar) to generate a personalized outreach email draft and a lead scoring assessment based on the lead's inquiry.
- **Automated Follow-Up**: Create a second automation that sends the AI-drafted email to the lead's email address (use a test account for the lead) within 5 minutes of lead creation.
- **Error Handling**: Implement at least two error-handling steps (e.g., retry on API failure, flag leads with invalid email formats, log API errors to a separate sheet).
- **Dashboard View**: Create a view (in your CRM or a connected tool) that shows each lead's status: New → Enriched → Email Sent → Followed Up.

## Deliverables
1. A live CRM with at least 5 lead records and the automation connected
2. Screenshots showing the end-to-end flow: lead creation → AI enrichment → email sent → status updated
3. A technical writeup (800–1200 words) explaining your data model, API choices, error-handling logic, and how you tested the flow
4. A summary table showing at least 2 error scenarios you handled and how the system behaves in each case

## Evaluation Criteria
- **Integration Quality (30%)**: CRM, AI model, and email tool are connected with clean data flow between them
- **AI Utilization (25%)**: The LLM is used meaningfully (not just echo input) — enrichment adds genuine value like personalized messaging or scoring logic
- **Error Handling (25%)**: At least 2 failure modes are handled gracefully with retries, flags, or logging — not silent failures
- **Documentation (20%)**: Writeup clearly explains architecture decisions, and the status dashboard is intuitive and functional

## Hints
- Use Airtable's built-in automations or Zapier's built-in error handling for quick error flagging.
- For AI enrichment, provide the LLM with a system prompt that defines the output format (JSON with fields like \`score\`, \`outreach_email\`, \`reasoning\`).
- Test with intentionally invalid data (missing fields, bad email formats) to validate your error handling.`,

  45: `# Web Research Agents — Build an Automated Research Pipeline

## Overview
You will build an AI agent or automation pipeline that takes a research topic or question as input, searches the web for relevant sources, extracts key information, and produces a structured research brief. This assignment tests your ability to chain AI tool-use steps into a coherent workflow.

## Requirements
- **Input**: Accept a research query (e.g., "What are the top 5 challenges facing AI agencies in 2026?") either via a form, API endpoint, or manual trigger.
- **Web Search Step**: Use a web search API (SerpAPI, Google Custom Search, Tavily, or a browser-based scraping approach) to retrieve at least 5 relevant URLs.
- **Content Extraction**: For each URL, extract the main text content (using a fetch/scrape tool or API). Filter out navigation, ads, and boilerplate.
- **AI Synthesis**: Pass the extracted content to an LLM with a structured prompt that asks it to produce: (a) a 150-word executive summary, (b) a bullet-point list of 5–8 key findings, (c) a list of sources with URLs.
- **Output**: Save the final research brief to a Google Doc, Notion page, or Markdown file. The output must be well-formatted and ready to share with a client.

## Deliverables
1. A working pipeline (live automation or agent script) that accepts a query and produces a research brief
2. A sample output document for a real research query you ran
3. A technical writeup (800–1200 words) covering: search strategy, extraction method, LLM prompt design, and output formatting
4. A reflection (200–300 words) on what the AI got right, what it missed, and where human review was essential

## Evaluation Criteria
- **Pipeline Completeness (30%)**: All four steps (search → extract → synthesize → output) are implemented and connected
- **Output Quality (25%)**: The research brief is accurate, well-organized, and cites sources with URLs
- **Prompt Engineering (25%)**: The LLM prompt produces structured, relevant output — not generic or off-topic text
- **Critical Reflection (20%)**: The reflection demonstrates awareness of AI limitations in research (hallucination, source bias, knowledge cutoffs)

## Hints
- For content extraction, Readability or Newspaper3k libraries work well for cleaning HTML.
- Use a structured output format (JSON or Markdown with headers) so the LLM's output is consistently formatted.
- Test with a query that has both well-established facts and recent/uncertain claims to see how the system handles ambiguity.`,

  52: `# Service Packaging for Clients — Design Your AI Automation Offerings

## Overview
In this assignment, you will create a complete, professional service packaging document for your AI automation agency. This includes defining your service tiers, pricing model, scope of work, and delivery timelines. The goal is to produce a document you could actually send to prospective clients.

## Requirements
- **Define Three Service Tiers**: Create a Starter, Growth, and Enterprise tier with clear scope differences (number of automations, complexity, support level, reporting frequency).
- **Pricing Model**: Set realistic pricing for each tier. Justify your pricing with a cost analysis (your time, API costs, tool subscriptions, margin). Include both one-time setup fees and recurring monthly retainers.
- **Scope of Work Documents**: Write a one-page Scope of Work (SOW) template for the Growth tier that includes: deliverables, timeline, acceptance criteria, revision policy, and what is explicitly out of scope.
- **Client-Facing One-Pager**: Design a single-page service overview (text-based layout is acceptable) that a prospect could receive in an email — it should communicate value, show the three tiers, and include a clear call to action.
- **Competitive Analysis**: Briefly analyze 2–3 competitors or alternative solutions (in-house hiring, freelance marketplaces, other agencies) and articulate why your packaged service is the better choice for your target client.

## Deliverables
1. A complete service packaging document (2000–3000 words) including all three tiers with descriptions and pricing
2. A one-page Scope of Work template for the Growth tier
3. A client-facing one-pager with tier comparison and CTA
4. A competitive analysis section (400–600 words) with a positioning statement

## Evaluation Criteria
- **Strategic Clarity (30%)**: Tiers are logically differentiated, pricing is justified, and the value proposition is clear for each level
- **Professional Quality (25%)**: The SOW template is thorough, the one-pager is client-ready, and the document demonstrates business communication skills
- **Market Awareness (25%)**: Competitive analysis shows real understanding of alternatives and articulates a genuine differentiation
- **Practical Feasibility (20%)**: Pricing and scope are realistic for a solo or small agency — not aspirational fiction

## Hints
- Research what established AI/automation agencies charge (look at agency websites, Clutch.co profiles) to ground your pricing in reality.
- Your SOW should protect you from scope creep — be specific about what "5 automations" means (e.g., number of steps, integrations, triggers).
- The one-pager should answer the client's first question: "What will this do for my business and how much does it cost?"`,

  59: `# Revenue Milestone: First \$1K — Document Your Path to Revenue

## Overview
This is a reflection and documentation assignment. You will create a comprehensive case study of your journey to your first \$1,000 in revenue from AI automation services. If you have not yet reached \$1K, create a detailed execution plan with milestones and a timeline for how you will get there within 30 days.

## Requirements
- **Revenue Documentation**: Record the total revenue earned to date, broken down by client and service. Include the date each project started, the service delivered, and the amount charged. If you have not earned revenue yet, document your plan to acquire your first paying client.
- **Client Acquisition Story**: For each paying client (or your first target client if pre-revenue), document: how they found you (or how you found them), the initial conversation, what problem they had, how you proposed a solution, and how you closed the deal.
- **Pricing Retrospective**: Reflect on your pricing decisions. Did you undercharge? Overcharge? What would you change? What pricing model worked best (hourly, project-based, retainer)?
- **Service Delivery Lessons**: Document the most important lessons learned during delivery — what went well, what broke, what you would automate differently next time.
- **Financial Breakdown**: Create a table showing: total revenue, total tool/API costs, total hours worked, effective hourly rate, and net profit after costs.

## Deliverables
1. A case study document (2000–3000 words) covering your revenue journey with specific data and anecdotes
2. A financial breakdown table with revenue, costs, hours, hourly rate, and net profit
3. A "Lessons Learned" section (500–800 words) with at least 5 specific, actionable takeaways
4. A "Next 30 Days" plan (400–600 words) with specific client targets, revenue goals, and service improvements

## Evaluation Criteria
- **Honesty and Specificity (30%)**: The case study includes real numbers, real challenges, and avoids generic platitudes — specificity demonstrates actual experience
- **Financial Literacy (25%)**: The financial breakdown is accurate and reveals understanding of true costs (not just revenue) and effective hourly rate
- **Reflective Depth (25%)**: Lessons learned go beyond surface observations — they address pricing psychology, client management, technical debt, and scaling considerations
- **Forward-Looking Plan (20%)**: The 30-day plan is concrete with specific targets, not vague aspirations — it shows you can set and pursue measurable goals

## Hints
- If you have not earned revenue yet, that is acceptable — the assignment rewards honest planning and strategic thinking over fabricated results.
- Include screenshots of invoices, payment confirmations, or CRM records if available (redact sensitive details).
- Your most valuable lesson is probably about scope creep or underpricing — do not skip the uncomfortable reflections.`,
};
