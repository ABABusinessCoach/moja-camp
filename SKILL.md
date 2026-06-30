---
name: moja-branding
description: >
  Complete brand guidelines for Moja Behavioral Services (also called Moja Kids),
  an ABA therapy clinic. Use this skill ANY time you are creating, designing, or
  editing anything for Moja — including staff documents, parent-facing materials,
  offer letters, HR forms, social media posts, slide decks, internal communications,
  kiosk forms, or any other visual or written deliverable. Trigger on any mention
  of "Moja", "Moja Kids", "Moja Behavioral", "the clinic", or when the user asks
  for something warm/family-facing for their ABA clinic. Never guess at brand
  colors or fonts — always consult this skill first.
---

# Moja Behavioral Services — Brand Guidelines

Use these guidelines exactly. Do not substitute colors, fonts, or layout patterns.

---

## Color Palette

| Name   | Hex       | Usage                                                          |
|--------|-----------|----------------------------------------------------------------|
| Blue   | `#355574` | Primary color — dominant in headers, backgrounds, anchor text  |
| Aqua   | `#6dccc2` | Secondary — supporting panels, dividers, highlights, icons     |
| Pink   | `#df76b6` | Accent — warmth, child-facing elements, celebration moments    |
| Orange | `#e66d38` | Accent only — CTAs, small pops of energy, never backgrounds    |
| Yellow | `#efd35c` | Accent only — small decorative use, never backgrounds          |

**Color rules:**
- Blue (`#355574`) is the primary anchor — use it for headers, key backgrounds, and dominant text
- Aqua (`#6dccc2`) is the go-to secondary — fills panels, dividers, icon backgrounds
- Pink (`#df76b6`) adds warmth and is especially appropriate for family/child-facing materials
- Orange and Yellow are **accent-only** — small pops, icons, highlights — never use as a main or background color
- Never give all five colors equal weight in one design — pick 2–3 and let the rest accent

---

## Typography

| Role             | Font         | Notes                                     |
|------------------|--------------|-------------------------------------------|
| Headers / Body   | Quicksand    | Primary font for all text                 |
| Handwriting accent | Mango AC   | Accent only — headlines, pull quotes, warmth moments |

**Typography rules:**
- **Quicksand** is the workhorse — use for all body copy, labels, subheads, and most headlines
- **Mango AC** is a handwriting accent font — use sparingly for warmth (e.g., a tagline, a pull quote, a section name). Never use as body copy or the dominant type on a page
- Preferred weights for Quicksand: Bold (700) for headers, SemiBold (600) for body
- PPTX/Word fallbacks: use **Trebuchet MS** for Quicksand, **Comic Sans MS** (or omit) for Mango AC

---

## Logo & Brand Mark

**Logo:** The Moja wordmark features a fluid, rounded "Moja" in Blue (`#355574`) with a distinctive looping M mark above the letters, with colored dot accents (Pink and Yellow preferred; Orange and Aqua also exist as variants).

**Brand Mark (M only):** The looping M icon used standalone in compact spaces — headers, favicons, avatars. Always use the version with colored dots on top; never use the M alone without dots.

**Logo file guide — always embed the actual file, never recreate in CSS:**

| Use case | File | Notes |
|----------|------|-------|
| M mark only, on white bg | `MOJABrand_Shadow.png` | Pink + yellow dots, blue M. Remove black bg + shadow pixels in code before embedding |
| Full wordmark, on white bg | `MOJATransparentBG.png` | Remove black bg before embedding |
| Full wordmark, on dark bg | `MOJA_White_Transparent_BG.png` | White mark, remove black bg before embedding |
| M mark, white version | `MOJAMarkWhite.png` | For dark/blue backgrounds |

**Shadow removal:** The `_Shadow` files have a drop shadow baked in that looks too dark on white backgrounds. Strip it by filtering out near-black pixels (keep only pixels that are clearly pink, yellow, blue, or aqua).

**Logo rules:**
- Always use the version with colored dots — never the bare M without dots
- Maintain aspect ratio — never stretch
- Minimum width: 140px digital / 1.25" print
- On white backgrounds: blue M mark with pink + yellow dots (`MOJABrand_Shadow` with shadow removed)
- On dark/blue backgrounds: white M mark (`MOJAMarkWhite` with black bg removed)

---

## Brand Accents

The signature Moja decorative element is **irregular circles (blobs) at 35% transparency**, layered in brand colors. These appear throughout Moja materials as background texture and warmth.

**Blob rules:**
- Use 2–3 overlapping blobs in a composition — not more
- Colors: Aqua, Pink, and/or Yellow at 35% opacity
- Shapes are organic and irregular (not perfect circles)
- Used as background accents, not foreground elements — never obscure text
- In HTML/SVG, simulate with `border-radius: 60% 40% 70% 30% / 50% 60% 40% 70%` and low opacity

---

## Voice & Tone

Moja's voice is **warm, inclusive, and family-forward** — reflecting neurodiversity-affirming values.

| Attribute        | Description                                                              |
|------------------|--------------------------------------------------------------------------|
| Warm             | Speak to families and staff like people, not patients or employees       |
| Inclusive        | Neurodiversity-affirming language — avoid deficit-framing                |
| Clear            | Accessible to non-clinical audiences (parents, community members)        |
| Mission-driven   | Grounded in genuine care for kids and families                           |
| Professional     | Still polished and credible — not overly casual                          |

**Voice examples:**
- ✅ "We're so glad you're here." / "Our team is here for your family."
- ✅ "Moja Kids is a place where every child belongs."
- ❌ Avoid cold clinical language: "the patient presents with…"
- ❌ Avoid corporate-speak: "synergizing outcomes for client stakeholders"

---

## Do / Don't

| ✅ Do                                                   | ❌ Don't                                             |
|--------------------------------------------------------|-----------------------------------------------------|
| Use Blue as the primary/dominant color                 | Use Orange or Yellow as backgrounds or main colors  |
| Use Aqua and Pink as warm secondaries                  | Give all five colors equal weight                   |
| Use Quicksand for all body and most headline text      | Use Mango AC as the primary or body font            |
| Add organic blob accents at 35% opacity for warmth     | Use hard geometric shapes as accent elements        |
| Write in warm, family-forward, inclusive language      | Use deficit-based or overly clinical language       |
| Embed the actual logo image file                       | Recreate the logo in CSS or text                    |
| Use 2–3 colors per composition                         | Use all 5 brand colors at full weight in one design |

---

## Quick-Start for Common Deliverables

### Internal Staff Document (e.g., offer letter, HR policy, form)
- White background, Blue (`#355574`) headers in Quicksand Bold
- Aqua (`#6dccc2`) horizontal rule or accent bar after the header
- Body in Quicksand SemiBold, dark gray or Blue text
- Optional: small Moja logo top-left or top-right
- Tone: warm but professional; mission-driven language in preambles

### Parent-Facing Document (e.g., welcome letter, intake form, handbook)
- White background with Aqua or Pink accent elements
- Mango AC acceptable for a headline or tagline (not body)
- Blob accents in header area at 35% opacity
- Warm, welcoming language — speak directly to families
- Include Moja logo prominently

### Social Media Post
- Blue or Aqua dominant background
- Bold Quicksand headline (1–2 lines max)
- Optional Mango AC accent word for warmth
- Pink or Yellow blob accent in a corner
- Keep copy brief and uplifting
- Moja logo or brand mark in a corner

### Slide Deck (16:9)
- Title slides: Blue (`#355574`) background, white Quicksand headline, Aqua accent bar
- Content slides: White background, Blue headers, Aqua divider lines
- Use Pink sparingly for highlight callouts
- Blob shapes optional in corner of title slides
- Avoid Orange/Yellow except as small icons or data highlights

### HTML Form / Kiosk Interface
- White background, Blue (`#355574`) for structural text (labels, headings, org name)
- **Blue is NOT for buttons** — Blue is text/structure only in HTML contexts
- Aqua (`#6dccc2`) for buttons, active states, focus rings, submit CTAs, border accents
- Pink (`#df76b6`) for Moja Moment mode buttons, celebration/success states
- Orange and Yellow for priority chips or small accent icons only — never buttons or backgrounds
- Quicksand font via CDN: `https://cdn.jsdelivr.net/npm/@fontsource/quicksand@5/index.css`
- Blob accents in header at ~18% opacity on white bg (35% is too heavy on light backgrounds)
- Tone: friendly and clear — staff should feel welcomed by the interface
