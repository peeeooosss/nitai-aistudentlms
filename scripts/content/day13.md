# Midjourney & DALL-E Prompting

## Learning Objectives
- Master advanced Midjourney prompting techniques including parameters and style commands
- Understand DALL-E 3's strengths for accurate, text-heavy, and realistic imagery
- Learn to switch between platforms based on the task at hand
- Build a personal prompt library for repeatable results

---

## Advanced Midjourney Prompting

### Midjourney Parameters
Parameters modify how Midjourney interprets your prompt:

```
/imagine [prompt] --ar 16:9 --style raw --v 6.1 --q 2
```

**Key parameters:**
- `--ar 16:9` — Aspect ratio (16:9, 1:1, 9:16, 4:3)
- `--v 6.1` — Model version (latest produces best results)
- `--style raw` — Reduces Midjourney's default aesthetic (more literal)
- `--q 2` — Quality level (1=default, 2=higher detail, slower)
- `--s 750` — Stylize (0-1000, higher = more artistic interpretation)
- `--no [keyword]` — Negative prompt (exclude elements)
- `--chaos 30` — Variation (0-100, higher = more unexpected results)

### Midjourney Style Techniques

**Photorealistic:**
```
A professional headshot of a young woman in her 30s,
smiling naturally, wearing a navy blazer, soft studio lighting,
neutral gray background, shot on Canon EOS R5, 85mm lens,
f/2.8, shallow depth of field --style raw --ar 1:1 --v 6.1
```

**Brand Illustration:**
```
Flat vector illustration of a person working on a laptop,
surrounded by floating icons of charts, gears, and lightbulbs,
minimal color palette: teal, coral, cream,
clean lines, modern corporate illustration style,
white background --ar 16:9 --v 6.1
```

**Product Photography:**
```
A premium wireless headphone floating on a gradient
background, soft studio lighting with subtle reflections,
product photography, clean minimal composition,
black and gold colorway, commercial quality --ar 1:1 --q 2
```

### Midjourney Workflow Tips
1. Start with `/imagine` and a basic prompt
2. Use U1-U4 buttons to upscale favorites
3. Use V1-V4 buttons to create variations
4. Remix mode lets you modify prompts between generations
5. Use `--seed [number]` to maintain consistency across generations

## DALL-E 3 Prompting

### DALL-E 3 Strengths
- **Text rendering:** DALL-E 3 is significantly better at rendering readable text in images
- **Prompt adherence:** Follows complex, detailed prompts more literally
- **Composition:** Better at arranging multiple elements in a scene
- **ChatGPT integration:** Conversational refinement of prompts

### DALL-E 3 Prompt Best Practices

**Be Specific About What You Want:**
```
Instead of: "A logo for a tech company"
Use: "A minimalist logo for a tech company called 'NexaFlow',
featuring an abstract flowing line that forms the letter N,
using teal and white colors on a dark background,
flat design, no gradients"
```

**Describe the Scene Like a Director:**
```
A wide shot of a modern open-plan office at sunset,
large floor-to-ceiling windows showing a city skyline,
warm golden light streaming in, people collaborating at
standing desks, one person presenting at a whiteboard,
plants throughout the space, architectural photography style
```

**Request Specific Formats:**
```
Create an infographic-style image showing the steps of
the marketing funnel: Awareness at the top (wide),
Consideration in the middle, Conversion at the bottom (narrow).
Use a gradient from blue (top) to green (bottom).
Include icons for each stage. Clean, professional design.
```

### ChatGPT Prompt Refinement
One of DALL-E 3's advantages is conversational refinement:

```
User: Generate an image of a cozy coffee shop

DALL-E: [generates image]

User: Make it warmer — more amber lighting, add rain
outside the windows, and put a cat on the counter

DALL-E: [refines the image]

User: Perfect. Now create a version optimized for
Instagram stories (9:16 aspect ratio)

DALL-E: [creates vertical version]
```

## Platform Selection Guide

| Task | Best Platform | Why |
|------|--------------|-----|
| Blog featured image | DALL-E 3 | Accurate composition, text if needed |
| Social media graphics | Midjourney | More eye-catching, artistic |
| Product mockups | DALL-E 3 | Precise, realistic |
| Brand illustrations | Midjourney | More stylistic control |
| Infographics with text | DALL-E 3 | Better text rendering |
| Creative concepts | Midjourney | More artistic interpretation |
| Photo-realistic scenes | Either | Both handle this well |
| Batch generation | Midjourney | Faster iteration loop |

## Building a Prompt Library

### Organizing Prompts
Create a Notion, Google Doc, or spreadsheet with categorized prompts:

```
Category: Blog Images
Prompt: A [style] image of [subject], [mood], [lighting],
[composition], [quality modifiers] --ar 16:9 --v 6.1

Category: Social Media
Prompt: A [style] graphic for [platform], featuring [subject],
[colors], [layout], [text area placement]

Category: Product Photography
Prompt: A [product] on [surface/background], [lighting],
[angle], [style], commercial quality --ar 1:1 --q 2
```

### Iterating on Winners
When you get a great result:
1. Note the exact prompt and parameters used
2. Save the seed number for reproduction
3. Create variations by changing one element at a time
4. Build a "swipe file" of your best outputs

## Key Takeaways

- Midjourney excels at artistic, aesthetically polished imagery; DALL-E 3 excels at accuracy and text rendering
- Master platform-specific parameters for control over output
- Be specific: describe subjects, styles, lighting, composition, and quality
- Build a prompt library organized by use case for consistent, repeatable results
- Choose the platform based on the task, not loyalty to one tool

## Practice Challenge

1. Create 3 different versions of the same concept using both Midjourney and DALL-E 3
2. Master 5 Midjourney parameters by testing each one in isolation
3. Build a personal prompt library with at least 10 categorized prompts
4. Generate a complete set of branded visuals for a fictional business using one platform
