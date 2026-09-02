# AI Image Generation Fundamentals

## Learning Objectives
- Understand how AI image generation works (diffusion models, GANs)
- Master prompt engineering for image generation
- Compare and choose between Midjourney, DALL-E, and Stable Diffusion
- Build a workflow for producing consistent brand visuals

---

## How AI Image Generation Works

AI image generation has evolved rapidly. The dominant approach today is **diffusion models** — the same technology behind Midjourney, DALL-E 3, and Stable Diffusion.

### The Diffusion Process
1. **Training:** The model learns by gradually adding noise to images, then learning to reverse the process
2. **Generation:** Starting from random noise, the model progressively denoises it guided by your text prompt
3. **Result:** A coherent image that matches your description emerges from the noise

### Key Concepts
- **Prompt:** The text description that guides image generation
- **Negative prompt:** Things you want to exclude from the image
- **Seed:** A number that controls the random generation — same seed + same prompt = same image
- **Steps:** How many denoising iterations (more = higher quality, slower)
- **CFG Scale:** How closely the model follows your prompt (higher = more strict)
- **Aspect ratio:** The shape of the output image

## The Big Three: Platform Comparison

### Midjourney
- **Style:** Artistic, polished, aesthetically superior
- **Best for:** Brand visuals, illustrations, creative concepts
- **Interface:** Discord bot or web app
- **Pricing:** $10-60/month
- **Strengths:** Consistently beautiful output, strong with people and scenes
- **Weaknesses:** Less control over specifics, can be too "artistic"

### DALL-E 3 (via ChatGPT)
- **Style:** Realistic, accurate, well-composed
- **Best for:** Blog images, presentations, accurate representations
- **Interface:** ChatGPT (built-in)
- **Pricing:** Included with ChatGPT Plus ($20/month)
- **Strengths:** Excellent text rendering, follows prompts precisely
- **Weaknesses:** Less artistic flair, can be "too clean"

### Stable Diffusion
- **Style:** Highly customizable, open-source
- **Best for:** Technical users, batch generation, fine-tuned models
- **Interface:** Web UI (Automatic1111, ComfyUI) or API
- **Pricing:** Free (self-hosted) or pay-per-use (API)
- **Strengths:** Full control, custom models, no content restrictions
- **Weaknesses:** Steeper learning curve, requires technical setup

## Prompt Engineering for Images

### The Image Prompt Formula
```
[Subject] + [Action/Pose] + [Setting/Background] + [Style] + [Lighting] + [Camera/Composition] + [Quality Modifiers]
```

### Basic Prompt Structure
```
A professional photograph of [subject], [doing something],
in [setting], [lighting style], [camera angle],
[quality modifiers]
```

### Example Progression

**Vague:** "A coffee shop"
**Better:** "A cozy coffee shop interior with warm lighting"
**Detailed:** "A cozy Scandinavian coffee shop interior, warm morning sunlight streaming through large windows, wooden tables, potted plants, a barista behind the counter, shot on 35mm film, soft depth of field, editorial photography style"

### Style Keywords That Work
```
Photography styles:
- Editorial photography, product photography, portrait photography
- Shot on 35mm film, shot on Hasselblad, Kodak Portra 400
- Natural lighting, golden hour, studio lighting

Art styles:
- Oil painting, watercolor, digital art, vector illustration
- Flat design, isometric, 3D render, pixel art
- Minimalist, retro, futuristic, Art Deco

Moods:
- Warm and inviting, moody and dramatic, clean and modern
- Vibrant and energetic, soft and dreamy, bold and striking
```

### Negative Prompts
Tell the model what NOT to include:

```
Negative prompt:
blurry, low quality, distorted, deformed, watermark,
text, logo, oversaturated, cartoonish, amateur
```

## Practical Use Cases

### Blog Featured Images
```
Create a featured image for a blog post about [topic].

Style: Clean, modern, editorial photography
Mood: Professional but approachable
Colors: [your brand colors]
Composition: Subject centered, plenty of negative space for text overlay
Dimensions: 1200x630 pixels (social media optimized)
```

### Social Media Graphics
```
Design a social media graphic for [platform] about [topic].

Style: Bold, attention-grabbing, thumb-stopping
Colors: [brand palette]
Text area: Leave space for [text placement]
Mood: [energetic/calm/professional]
Dimensions: [platform-specific: 1080x1080 for Instagram, 1200x628 for LinkedIn]
```

### Product Mockups
```
Create a realistic mockup of [product] in a [setting].

Product: [describe your product]
Setting: [where it would be used]
Lighting: Natural, soft, flattering
Style: Clean product photography
Background: [specific or minimal]
```

## Batch Generation Workflow

### Creating Visual Consistency
For brand consistency, establish a visual style guide:

```
Brand Visual Guidelines:
- Primary colors: [hex codes]
- Photography style: [editorial/candid/structured]
- Lighting: [warm/cool/natural]
- Mood: [professional/casual/luxury]
- Typography style (for any text overlays): [font, weight, size]
```

### The 10-Image Batch Process
```
1. Choose 2-3 content themes for the week
2. Create base prompt templates for each theme
3. Generate 3-4 variations per theme (change lighting, angle, composition)
4. Select the best 1-2 from each batch
5. Edit for brand consistency (colors, text overlays)
6. Export in platform-specific dimensions
```

## Ethical Considerations

- **Copyright:** AI-generated images may resemble copyrighted works — be cautious with commercial use
- **Disclosure:** Some platforms and jurisdictions require disclosure of AI-generated content
- **Representation:** Ensure generated people and scenes are diverse and inclusive
- **Authenticity:** Do not pass off AI images as real photographs when honesty matters

## Key Takeaways

- AI image generation uses diffusion models to create images from text prompts
- Midjourney excels at artistry, DALL-E at accuracy, Stable Diffusion at customization
- Detailed prompts with subject, style, lighting, and composition produce better results
- Establish a brand visual style guide for consistency across all generated images
- Always consider ethical implications of AI-generated visuals

## Practice Challenge

1. Generate 5 different images of the same subject using progressively more detailed prompts
2. Compare outputs from two different platforms for the same prompt
3. Create a mini brand style guide and generate 3 consistent images for a fictional brand
4. Experiment with negative prompts to see how they affect output quality
