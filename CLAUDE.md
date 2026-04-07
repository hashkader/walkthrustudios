# Walkthru Studios — Claude Code Project Rules

## Project Overview
Walkthru Studios is a premium virtual tours company focused on luxury real estate.
The website must feel cinematic, dramatic, and premium — think high-end property film meets editorial magazine.

## Tech Stack
- Next.js 16 (App Router, `app/` directory)
- React 19
- TypeScript
- Tailwind CSS v4 (CSS-first config — NO tailwind.config.js, all config in CSS via @theme)
- GSAP 3.13+ with @gsap/react (useGSAP hook only — never use useEffect for GSAP)
- Framer Motion (route transitions and micro-interactions)

## Tailwind v4 Rules — CRITICAL
- Tailwind v4 uses CSS-first configuration. ALL custom tokens go in `app/globals.css` inside `@theme {}`
- Do NOT create or reference a `tailwind.config.js` or `tailwind.config.ts` file
- Do NOT use `@apply` with Tailwind v4 — write CSS directly instead
- Custom colors, fonts, spacing are defined as CSS variables inside `@theme {}` in globals.css
- Import Tailwind with `@import "tailwindcss"` at the top of globals.css

## Design System — NON-NEGOTIABLE

### Color Palette
- Background primary: #080808 (near-black)
- Background secondary: #0f0f0f
- Background elevated: #161616
- Text primary: #f5f0eb (warm off-white)
- Text secondary: #a09890 (warm muted)
- Text tertiary: #5a5450
- Accent: #c9a96e (warm gold)
- Accent muted: #8a7248
- Border: rgba(255,255,255,0.08)
- Border hover: rgba(255,255,255,0.15)

### Typography
- Display font: "Cormorant Garamond" (Google Fonts) — headlines, hero text
- Body font: "DM Sans" (Google Fonts) — all body copy, UI
- Mono font: "DM Mono" (Google Fonts) — labels, tags, small caps

### Typography Scale
- Hero headline: clamp(4rem, 10vw, 9rem), weight 300, Cormorant Garamond, tight tracking
- Section headline: clamp(2.5rem, 5vw, 4.5rem), weight 300, Cormorant Garamond
- Subheading: 0.75rem, DM Mono, uppercase, letter-spacing 0.2em, gold color
- Body: 1rem, DM Sans, weight 300, line-height 1.8
- Small: 0.8125rem, DM Sans

### Aesthetic Rules
- Dark backgrounds only. Never white or light backgrounds.
- Gold (#c9a96e) is the ONLY accent color. Use it sparingly — one element per section maximum.
- Thin borders (1px, rgba white 8%) — never thick borders
- No box shadows — use subtle borders and layered backgrounds instead
- Images: always use object-fit: cover, never distort
- No rounded corners on major layout elements (cards, sections) — use rx=0 or at most 2px
- Subtle grain texture overlay on hero section
- Cursor: consider a custom subtle cursor dot

### Animation Rules
- Use GSAP useGSAP hook exclusively for all GSAP animations
- Register all GSAP plugins at the top of the component file that uses them
- Always use ScrollTrigger with `markers: false` in production
- Entrance animations: opacity 0→1, y: 40→0, duration 1s, ease "power3.out"
- Stagger on lists/cards: 0.1s between items
- SplitText for headline reveals — split by "chars" for hero, "words" for sections
- Scroll scrub animations: scrub: 1.5 (smooth, not instant)
- Never animate layout properties (width, height, padding) — only transform and opacity
- Page transitions via Framer Motion layoutId

### Component Patterns
- All animated components must be client components ("use client")
- Static/layout components can be server components
- Image components: always use next/image with proper width/height
- Never use inline styles for colors — use CSS variables defined in globals.css

## File Structure
```
app/
  layout.tsx          # Root layout, fonts, metadata
  page.tsx            # Home page — assembles sections
  globals.css         # Tailwind v4 config + CSS variables
components/
  sections/           # Full-page sections (Hero, Services, etc.)
  ui/                 # Reusable UI components (Button, Tag, etc.)
  layout/             # Nav, Footer
lib/
  gsap.ts             # GSAP plugin registration (import this once in layout)
public/
  images/             # Property images
```

## Copy & Tone
- Tagline: "Step inside before you arrive."
- Brand voice: confident, minimal, no hyperbole. Short sentences. Never say "stunning" or "amazing".
- Headlines should feel like editorial captions — evocative, not salesy.
- CTA text: "Request a Tour", "View Properties", "Begin" — never "Click here" or "Learn more"

## What NOT to do
- No purple, blue, or generic gradient color schemes
- No Inter, Roboto, or system fonts
- No card shadows or glassmorphism
- No border-radius > 4px on cards or sections
- No placeholder lorem ipsum — write real copy in the brand voice
- No generic stock-photo style descriptions — be specific
- Do not install additional UI libraries (no shadcn, no Radix) — build from scratch