# Moja Summer Camp Enrollment Hub — Design Ideas

## Approach 1: Warm Organic Playfulness
<response>
<text>
**Design Movement:** Organic Modernism — inspired by nature, movement, and child-centered joy

**Core Principles:**
- Asymmetric blob shapes as structural layout elements, not just accents
- Layered depth through overlapping cards and soft shadows
- Warm, inviting whitespace that breathes and guides the eye

**Color Philosophy:** Blue (#355574) anchors trust and professionalism; Aqua (#6dccc2) carries the lightness and energy of summer; Pink (#df76b6) adds warmth for family-facing moments. Orange and Yellow appear only as small sparks of delight.

**Layout Paradigm:** A flowing, vertical single-page hub with a large illustrated hero, then three distinct "pathway cards" that fan out horizontally. Each card has its own accent color (Aqua, Pink, Orange) to visually differentiate the three enrollment tracks.

**Signature Elements:**
- Oversized blob shapes as section dividers (not just background accents)
- Handwritten Mango AC font for section taglines ("Which path is right for you?")

**Interaction Philosophy:** Gentle hover lifts on pathway cards; smooth scroll-into-view animations for form sections.

**Animation:** Cards entrance with staggered fade-up (80ms delay each). Blob shapes slowly morph on hover using CSS keyframes.

**Typography System:** Mango AC for hero tagline; Quicksand Bold 700 for all section headers; Quicksand SemiBold 600 for body and labels.
</text>
<probability>0.08</probability>
</response>

## Approach 2: Clean Clinical-Warmth Hybrid
<response>
<text>
**Design Movement:** Warm Minimalism — clinical clarity softened with brand warmth

**Core Principles:**
- Clean white backgrounds with Blue structural elements
- Aqua as the primary interactive color (buttons, focus states, dividers)
- Generous vertical rhythm and clear typographic hierarchy

**Color Philosophy:** Primarily white and Blue (#355574) for structure; Aqua (#6dccc2) for all interactive elements; Pink (#df76b6) only for success/celebration states.

**Layout Paradigm:** A top-navigation hub page with three clearly labeled sections. Each section is a full-width panel with a left-aligned heading, a brief description, and a prominent CTA button.

**Signature Elements:**
- Thin Aqua horizontal rules between sections
- Small Moja M mark watermark in section backgrounds at 8% opacity

**Interaction Philosophy:** Immediate, responsive. No unnecessary animation — forms feel fast and trustworthy.

**Animation:** Subtle fade-in on page load (200ms). Button press scale(0.97) feedback.

**Typography System:** Quicksand Bold 700 for all headers; Quicksand SemiBold 600 for body.
</text>
<probability>0.05</probability>
</response>

## Approach 3: Illustrated Summer Camp Energy (CHOSEN)
<response>
<text>
**Design Movement:** Joyful Editorial — the visual energy of a summer camp brochure, elevated with modern web craft

**Core Principles:**
- Blue (#355574) hero section with white text — bold and confident
- Three pathway cards as distinct, colorful "lanes" (Aqua, Pink, Orange-tinted)
- Blob accents at 18% opacity on white sections; 35% on colored sections
- Mango AC used for the hero tagline and pathway card labels

**Color Philosophy:** The hero is Blue — authoritative and welcoming. Below it, the three pathways each have their own warm accent color so families can immediately identify their lane. The overall palette stays within 2–3 colors per section.

**Layout Paradigm:** Full-width Blue hero → three-column pathway selector → individual form pages (each with their own accent color header). The hub page is a single scroll; forms are separate routes.

**Signature Elements:**
- Mango AC handwriting for the hero tagline ("A summer for every kid.")
- Blob shapes in the hero background at 35% opacity (Aqua + Pink)
- Pathway cards with a top-colored accent bar matching their track color

**Interaction Philosophy:** Pathway cards have a warm hover lift (translateY -4px, shadow deepens). Form fields have Aqua focus rings. Submit buttons use Aqua background with white text.

**Animation:** Hero text fades in from below (300ms ease-out). Pathway cards stagger in (80ms delay each). Form sections slide in from the right when a pathway is selected.

**Typography System:** Mango AC for hero tagline only; Quicksand Bold 700 for all section headers; Quicksand SemiBold 600 for body, labels, and form fields.
</text>
<probability>0.09</probability>
</response>

---

**Selected Approach: #3 — Illustrated Summer Camp Energy**

Rationale: This approach best balances Moja's brand identity (Blue authority, warm accents) with the family-forward, celebratory nature of a summer camp enrollment experience. The three distinct pathway colors help families self-select quickly, reducing confusion and support burden.
