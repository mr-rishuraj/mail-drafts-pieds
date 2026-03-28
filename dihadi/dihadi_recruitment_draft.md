# PRD: Dihadi Internship Hiring Email — HTML Draft
**Document Version:** 1.0  
**Author:** Srijan Sahay (CTO, Dihadi)  
**Purpose:** Product Requirements Document for developing an on-brand HTML email to recruit BITSian interns across Research, Marketing, UI/UX Design, and Social Media Design roles.  
**Target Developer:** Frontend / Email HTML developer  
**Output File:** `dihadi-intern-email.html`

---

## 1. Overview & Objective

Build a **single-file HTML email** that:
- Announces open internship roles at Dihadi
- Reflects Dihadi's brand identity exactly as seen on [dihadi.co.in](https://dihadi.co.in)
- Is optimised for **email clients** (Gmail, Outlook, Apple Mail) — meaning table-based layout, inline CSS, no JavaScript
- Includes all four open roles with role-specific descriptions
- Highlights mentors and institutional credibility
- Ends with a clear CTA linking to the application form

---

## 2. Design System (Sourced from dihadi.co.in)

### 2.1 Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--brand-yellow` | `#F5C518` / `#FACC15` | Primary brand accent — headers, buttons, highlights, section dividers |
| `--brand-yellow-light` | `#FEF9C3` / `#FEFCE8` | Card backgrounds, soft section fills |
| `--brand-dark-green` | `#1A3A2E` / `#14532D` | Text on yellow, footer backgrounds, section titles |
| `--brand-black` | `#111111` | Body text, headings on white |
| `--brand-white` | `#FFFFFF` | Primary background, card backgrounds |
| `--brand-gray-light` | `#F9FAFB` | Alternating section backgrounds |
| `--brand-gray-text` | `#6B7280` | Secondary/supporting text, meta info |
| `--brand-yellow-border` | `#EAB308` | Card borders, dividers |

> **Primary brand contrast:** Yellow (`#FACC15`) on Dark Green (`#14532D`) — used for the logo bar, CTA buttons, and section headers. This is the most distinctive visual element of the Dihadi brand.

### 2.2 Typography

| Element | Font | Weight | Size (desktop) | Notes |
|---|---|---|---|---|
| Primary font | `Inter` | 400–700 | — | Google Font, used site-wide |
| Fallback stack | `system-ui, -apple-system, sans-serif` | — | — | For email clients |
| Email headline (H1) | Inter | 800 / ExtraBold | 28–32px | Dark green or black on yellow bg |
| Section heading (H2) | Inter | 700 / Bold | 20–22px | Dark green |
| Role title (H3) | Inter | 700 | 16–18px | Dark green or black |
| Body / description | Inter | 400 | 14–15px | `#374151` (gray-700) |
| Label / tag | Inter | 600 | 12px | Uppercase, letter-spacing |
| CTA button text | Inter | 700 | 15px | White on dark green OR dark green on yellow |

### 2.3 Spacing & Layout

- **Max email width:** `600px` — standard email safe width
- **Outer padding:** `0` on the container table; inner content padding `24px` horizontal
- **Section vertical padding:** `32px` top/bottom
- **Card padding:** `20px` all sides
- **Border radius:** `12px` on cards (use `border-radius` inline — supported in most modern email clients; add `mso-` fallbacks for Outlook)
- **Card gap:** `16px` between role cards

### 2.4 Visual Motifs (from site)

- **Yellow top bar / header band** — full-width `#FACC15` background with logo centred
- **Dark green text on yellow** — signature contrast pattern
- **Soft yellow card backgrounds** (`#FEFCE8`) — used for info boxes and role cards
- **Yellow left border accent on cards** — `border-left: 4px solid #FACC15`
- **Bold stat callouts** — large bold numbers in dark green on cream/yellow bg
- **Pill/badge labels** — small rounded tags for role types (e.g. "Research", "Marketing")
- **Horizontal divider** — `1px solid #FDE68A` between sections
- **Footer** — dark green background (`#14532D`), white/cream text, yellow logo

---

## 3. Asset URLs

All assets are hosted on `https://www.dihadi.co.in`. Use absolute URLs in the HTML email — **do not use relative paths**.

| Asset | Absolute URL | Usage in Email |
|---|---|---|
| Dihadi Logo (SVG) | `https://www.dihadi.co.in/brand/dihadi_logo.svg` | Header, footer |
| BITS Pilani logo | `https://www.dihadi.co.in/brand/BITS.svg` | Credentials section |
| IIM Kashipur logo | `https://www.dihadi.co.in/brand/IIMKashipur.svg` | Credentials section |
| MeitY logo | `https://www.dihadi.co.in/brand/MEITY.svg` | Credentials section |
| FIED logo | `https://www.dihadi.co.in/brand/FIED.svg` | Credentials section |
| YMF logo | `https://www.dihadi.co.in/brand/YMP.svg` | Credentials section |
| Swasti Dubey (CEO) | `https://www.dihadi.co.in/team/Swasti_CEO.svg` | Team section |
| Himanshu Harshit (COO) | `https://www.dihadi.co.in/team/Himanshu_COO.svg` | Team section |
| Srijan Sahay (CTO) | `https://www.dihadi.co.in/team/Srijan_CTO.svg` | Team section |

> **Note for developer:** SVG images may not render in Outlook. Provide `width` and `height` attributes on all `<img>` tags. If SVG fallback is needed for Outlook, consider converting logos to PNG and hosting separately. For now, use SVGs with appropriate dimensions and `alt` text.

---

## 4. Email Structure — Section-by-Section

### SECTION 1 — Header / Logo Bar

**Purpose:** Brand identification, trust signal  
**Background:** `#FACC15` (yellow)  
**Layout:** Full-width table row, centred content

**Content:**
- Dihadi logo: `https://www.dihadi.co.in/brand/dihadi_logo.svg`
  - `width="140"`, `alt="Dihadi"`
- Tagline below logo (optional, small): `"India's AI-Powered Labour Platform"`
  - Font: Inter 11px, `#14532D`, centered

**HTML Pattern:**
```html
<table width="600" bgcolor="#FACC15">
  <tr>
    <td align="center" style="padding: 24px 24px 20px;">
      <img src="https://www.dihadi.co.in/brand/dihadi_logo.svg" width="140" alt="Dihadi" />
      <p style="margin:8px 0 0; font-size:11px; color:#14532D; font-family:Inter,sans-serif;">
        India's AI-Powered Labour Platform
      </p>
    </td>
  </tr>
</table>
```

---

### SECTION 2 — Hero Banner

**Purpose:** Hook the reader, establish mission context  
**Background:** `#FFFFFF`  
**Top accent:** `4px solid #FACC15` top border on the section container

**Content:**
- **Eyebrow label** (badge): `"We're Hiring"` — small pill, `bg: #FACC15`, `color: #14532D`, `font-weight: 700`, `font-size: 12px`, `border-radius: 20px`, `padding: 4px 14px`
- **Headline (H1):**
  > "Intern with Dihadi — Build What Matters"
  - Font: Inter 28px, weight 800, `#111111`
- **Sub-headline:**
  > "We're a BITS Pilani-founded, IIM Kashipur-incubated startup fixing India's broken informal labour market with Agentic AI. Join us — and work on something real."
  - Font: Inter 15px, `#374151`, line-height 1.6
- **Credential badges row** (inline, horizontally spaced):
  - 🏆 `INR 10L Funded`
  - 🏛️ `IIM Kashipur Incubated`
  - 🎓 `BITS Pilani Founded`
  - Style: small pill badges, `bg: #F9FAFB`, `border: 1px solid #E5E7EB`, `font-size: 12px`, `color: #374151`, `border-radius: 20px`, `padding: 4px 12px`

**Spacing:** `padding: 32px 24px`

---

### SECTION 3 — About Dihadi (One-liner mission)

**Purpose:** Context for candidates unfamiliar with Dihadi  
**Background:** `#FEFCE8` (light yellow)  
**Border:** `border-left: 4px solid #FACC15`  
**Border-radius:** `12px`  
**Padding:** `20px 24px`  
**Margin:** `0 24px`

**Content:**
> **What we're building:** Dihadi is India's first Agentic AI platform for daily wage workers and contractors. Every day, 8–12 million workers remain unemployed while contractors scramble to fill vacancies. We fix this — via WhatsApp, Voice, and a Mobile App — matching the right worker to the right job in minutes.
> 
> 🌐 [dihadi.co.in](https://dihadi.co.in)

- Font: Inter 14px, `#374151`
- "What we're building:" in bold (`#111111`)
- Link styled: `color: #14532D`, underline

---

### SECTION 4 — Open Roles

**Purpose:** Core content — the four internship roles  
**Background:** `#FFFFFF`  
**Section heading:**
- Label pill: `"Open Positions"` — `bg: #FACC15`, `color: #14532D`, bold, 12px
- H2: `"4 Roles. Real Ownership."` — Inter 22px, `#111111`, bold

**Layout:** Stacked single-column cards (email-safe — no CSS grid, no flexbox)  
**Card style per role:**
- `background: #FEFCE8`
- `border-radius: 12px`
- `border-left: 4px solid #FACC15`
- `padding: 20px`
- `margin-bottom: 16px`

**Role Cards — Full Content:**

#### Role Card 1 — Research Intern
- **Role badge:** `🔍 Research` — `bg: #14532D`, `color: #FACC15`, `font-size: 11px`, `border-radius: 20px`, `padding: 3px 10px`
- **Title:** `Research Intern`
- **Description:** Help us map the informal labour market — policy landscape, regulatory environment, competitor intelligence, and on-ground insights from labour chowks and contractors. Ideal for someone who loves digging deep and turning data into sharp, actionable narratives.
- **You'll work on:**
  - Haryana & national labour law & welfare policy research
  - Competitor landscape analysis (Apna, Vahan.ai, WorkIndia, etc.)
  - Market sizing and TAM/SAM validation
  - On-ground survey design and synthesis

#### Role Card 2 — Marketing Intern
- **Role badge:** `📣 Marketing` — same badge style, dark green bg
- **Title:** `Marketing Intern`
- **Description:** Own Dihadi's growth story. Run acquisition campaigns, build contractor and worker funnels, and help us hit 1,000+ users in our pilot city. We need hustle, creativity, and a bias for action.
- **You'll work on:**
  - GTM strategy for pilot city launch
  - WhatsApp broadcast campaigns and content
  - Contractor onboarding outreach
  - Performance tracking and campaign iterations

#### Role Card 3 — App UI/UX Designer
- **Role badge:** `📱 Design · UI/UX` — same badge style
- **Title:** `App UI/UX Designer`
- **Description:** Design the product that millions of daily wage workers will actually use — clean, accessible, multilingual, and built for low-literacy users. You'll shape how India's informal workforce sees their first digital job platform.
- **You'll work on:**
  - Worker-facing app screens (job alerts, OTP verification, profile)
  - Contractor dashboard UI (multi-site management, attendance)
  - Figma prototypes and design system components
  - Accessibility and vernacular language UI considerations

#### Role Card 4 — Social Media Designer
- **Role badge:** `🎨 Design · Social` — same badge style
- **Title:** `Social Media Designer`
- **Description:** Tell Dihadi's story in a way that stops the scroll. Create visuals for Instagram, LinkedIn, and WhatsApp that blend impact storytelling with sharp design. If you can make a daily wage worker's story feel urgent and human — we want you.
- **You'll work on:**
  - Instagram reels thumbnails and carousel posts
  - LinkedIn announcement and traction posts
  - WhatsApp broadcast visuals
  - Brand consistency across all channels

**Below all cards, internship details table:**

| | |
|---|---|
| 💰 Stipend | Negotiable — we pay fairly |
| 📅 Duration | Minimum 2 months (flexible) |
| 🌐 Mode | Remote-friendly; occasional on-ground |
| 🚀 Start | Rolling — apply ASAP |

Style: `font-size: 13px`, `color: #374151`, alternating row bg `#F9FAFB` / `#FFFFFF`, inside a `border: 1px solid #E5E7EB`, `border-radius: 8px` wrapper

---

### SECTION 5 — Mentor Network

**Purpose:** Social proof, key differentiator vs. other internships  
**Background:** `#14532D` (dark green)  
**Text color:** `#FFFFFF` and `#FACC15`

**Section heading:**
- Label: `"Mentorship"` — `color: #FACC15`, bold, 12px uppercase
- H2: `"You'll be mentored by the best."` — white, 20px bold

**Supporting copy:**
> "As a Dihadi intern, you get direct access to mentors who've built and scaled category-defining companies in India."

**Mentor cards — 3 items, stacked (single column for email):**

Each mentor card:
- `background: rgba(255,255,255,0.08)` (subtle white overlay on dark green)
- `border: 1px solid rgba(250,204,21,0.3)` (faint yellow border)
- `border-radius: 10px`
- `padding: 16px 20px`
- `margin-bottom: 12px`

**Content:**

| Name | Org | Description |
|---|---|---|
| Dinesh Katiyar & Subrata Mitra | Accel Partners | One of India's most storied early-stage VC firms, backing Flipkart, Swiggy, and more. |
| Abhishek Ballabh | ExtraaEdge | Founder of ExtraaEdge, a leading EdTech CRM, with deep SaaS and product expertise. |
| Avinash Raghava | SaaSBoomi | Founder of SaaSBoomi, India's largest SaaS community, connecting thousands of founders. |

- Name: `color: #FACC15`, Inter 15px bold
- Org label: `color: #FFFFFF`, Inter 13px, `opacity: 0.85`
- Description: `color: #D1FAE5`, Inter 13px

---

### SECTION 6 — Credentials / Institutional Backing

**Purpose:** Trust and authority — incubation, funding, institution logos  
**Background:** `#F9FAFB`  
**Section heading:** `"Backed by India's best institutions."` — Inter 16px, `#111111`, bold, centred

**Logo row** — horizontal, centred, evenly spaced:
- BITS Pilani: `https://www.dihadi.co.in/brand/BITS.svg` — `height="36"`
- IIM Kashipur: `https://www.dihadi.co.in/brand/IIMKashipur.svg` — `height="36"`
- MeitY: `https://www.dihadi.co.in/brand/MEITY.svg` — `height="36"`
- FIED: `https://www.dihadi.co.in/brand/FIED.svg` — `height="36"`
- YMF: `https://www.dihadi.co.in/brand/YMP.svg` — `height="36"`

> **Email layout note:** Since flexbox doesn't work universally in email, use a `<table>` with one `<td>` per logo, `align="center"`, `valign="middle"`, with `padding: 0 10px`. Wrap in a containing table with `width="600"`.

**Supporting stat row** (3 columns):

| 400+ Workers Surveyed | INR 10L Funded | IIM Kashipur Incubated |
|---|---|---|
| Pre-traction validation | GENESIS EIR Award | Startup incubation |

Style: each stat in a `<td>` with `text-align: center`, bold large number in `#14532D`, label in `#6B7280` 12px

---

### SECTION 7 — Founding Team

**Purpose:** Faces behind the startup, humanise the brand  
**Background:** `#FFFFFF`  
**Section heading:** `"You'll work directly with us."` — Inter 20px bold, `#111111`

**Layout:** 3-column table (each column = one founder)

**Founder cards — 3 items:**

Each card:
- `text-align: center`
- `padding: 16px 8px`

| Field | Swasti Dubey | Himanshu Harshit | Srijan Sahay |
|---|---|---|---|
| Image | `https://www.dihadi.co.in/team/Swasti_CEO.svg` | `https://www.dihadi.co.in/team/Himanshu_COO.svg` | `https://www.dihadi.co.in/team/Srijan_CTO.svg` |
| Image size | `width="80" height="80"` | `width="80" height="80"` | `width="80" height="80"` |
| Image style | `border-radius: 50%; border: 3px solid #FACC15` | same | same |
| Name | Swasti Dubey | Himanshu Harshit | Srijan Sahay |
| Role | CEO & Co-Founder | COO & Co-Founder | CTO & Co-Founder |
| Background | MSc Economics, BITS Pilani | BE Civil, BITS Pilani | MSc Chemistry + BE Mech, BITS Pilani |

- Name: Inter 14px bold, `#111111`
- Role: Inter 12px, `#14532D`, bold, `background: #FEFCE8`, `border-radius: 20px`, `padding: 2px 10px` (inline pill)
- Background: Inter 12px, `#6B7280`

---

### SECTION 8 — CTA Block

**Purpose:** Drive application clicks — primary conversion goal  
**Background:** `#FACC15` (yellow)  
**Layout:** Centred, full-width

**Content:**
- **Headline:** `"Ready to build something that actually matters?"` — Inter 22px, weight 800, `#14532D`
- **Subtext:** `"Applications are rolling. The sooner you apply, the better."` — Inter 14px, `#14532D`, opacity 0.8
- **CTA Button:**
  - Text: `"Apply Now →"`
  - Background: `#14532D`
  - Text color: `#FFFFFF`
  - Font: Inter 15px, bold
  - `border-radius: 8px`
  - `padding: 14px 36px`
  - Link: `https://dihadi.co.in/intern` *(replace with live form URL)*
  - Implemented as `<a>` inside a `<td>` with `bgcolor="#14532D"` (Outlook-safe button technique)
- **Secondary link:** `"Learn more about Dihadi → dihadi.co.in"` — Inter 13px, `#14532D`, underline

**Spacing:** `padding: 40px 24px`

---

### SECTION 9 — Footer

**Purpose:** Branding close, legal, contact info  
**Background:** `#14532D` (dark green)  
**Text color:** `#D1FAE5` (light green/white)

**Layout:** 3 stacked rows within a centred `<table>`

**Row 1 — Logo:**
- Dihadi logo: `https://www.dihadi.co.in/brand/dihadi_logo.svg`
- `width="100"`, centred

**Row 2 — Contact:**
- `founders@dihadi.co.in` — `color: #FACC15`, 13px
- `+91 79764 88439` — `color: #FFFFFF`, 13px
- `dihadi.co.in` — linked, `color: #FACC15`, 13px

**Row 3 — Legal / sign-off:**
- `© 2026 Dihadi. All rights reserved.`
- `Built at BITS Pilani. Incubated at IIM Kashipur.`
- Font: 11px, `color: rgba(255,255,255,0.5)`
- `text-align: center`

---

## 5. Full Email Section Order

```
[1] Header / Logo Bar          — Yellow bg, Dihadi logo
[2] Hero Banner                — Hook headline, credential badges
[3] About Dihadi               — Yellow card, mission one-liner
[4] Open Roles                 — 4 stacked role cards
[5] Mentor Network             — Dark green section, 3 mentors
[6] Credentials / Logos        — Institution logos + stats
[7] Founding Team              — 3 founders with photos
[8] CTA Block                  — Yellow bg, Apply Now button
[9] Footer                     — Dark green, contact + legal
```

---

## 6. Technical Specifications for HTML Email

### 6.1 Boilerplate & DOCTYPE

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Intern with Dihadi</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
</head>
```

### 6.2 Layout Rules

- **Outer wrapper:** `<table width="100%" bgcolor="#F3F4F6">` — light gray page background
- **Inner container:** `<table width="600" align="center" bgcolor="#FFFFFF">` — centred email body
- **All layout:** `<table>` based — no `<div>` layout, no CSS Grid, no Flexbox
- **All CSS:** Inline `style=""` attributes — no `<style>` block (Gmail strips `<head>` styles)
- **Images:** All must have `width`, `height`, `alt`, `display:block`, `border:0`
- **Links:** All `<a>` tags must have explicit `color` and `text-decoration` styles inline

### 6.3 Font Loading

```html
<!-- In <head> only — may not render in all clients, always use fallback -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
```

Inline font-family on all text elements:
```
font-family: 'Inter', system-ui, -apple-system, Arial, sans-serif;
```

### 6.4 Outlook-Safe Button

```html
<table cellspacing="0" cellpadding="0">
  <tr>
    <td bgcolor="#14532D" style="border-radius: 8px; padding: 14px 36px;">
      <a href="https://dihadi.co.in/intern"
         style="font-family:'Inter',Arial,sans-serif; font-size:15px;
                font-weight:700; color:#FFFFFF; text-decoration:none;
                display:inline-block;">
        Apply Now →
      </a>
    </td>
  </tr>
</table>
```

### 6.5 Image Alt Text Requirements

| Image | Alt Text |
|---|---|
| Dihadi logo (header) | `Dihadi` |
| Dihadi logo (footer) | `Dihadi` |
| BITS Pilani logo | `BITS Pilani` |
| IIM Kashipur logo | `IIM Kashipur` |
| MeitY logo | `Ministry of MeitY` |
| FIED logo | `FIED` |
| YMF logo | `Young Minds Fellowship` |
| Swasti Dubey photo | `Swasti Dubey, CEO & Co-Founder` |
| Himanshu Harshit photo | `Himanshu Harshit, COO & Co-Founder` |
| Srijan Sahay photo | `Srijan Sahay, CTO & Co-Founder` |

### 6.6 Responsive Considerations

Add in `<head>` `<style>` block (for clients that support it — Gmail app, Apple Mail):
```css
@media only screen and (max-width: 600px) {
  .email-container { width: 100% !important; }
  .col-3 { display: block !important; width: 100% !important; }
  .hide-mobile { display: none !important; }
  .stack-mobile { display: block !important; width: 100% !important; }
}
```

On mobile:
- 3-column founder section collapses to single column
- Logo row wraps to 2×3 grid
- Role cards remain full-width (already single column)

---

## 7. Email Subject Line & Preview Text

| | |
|---|---|
| **Subject** | `Intern with Dihadi — India's AI-Powered Labour Platform \| Open Roles for BITSians` |
| **Preview text** | `We're hiring Research, Marketing, Design & Social Media interns. Mentored by Accel, ExtraaEdge & SaaSBoomi founders.` |

Add preview text as hidden text in HTML:
```html
<span style="display:none; font-size:1px; color:#FFFFFF; max-height:0; overflow:hidden;">
  We're hiring Research, Marketing, Design & Social Media interns. Mentored by Accel, ExtraaEdge & SaaSBoomi founders.
</span>
```

---

## 8. Content Copy Reference

### Email Full Copy (in order)

**Hero:**
> Hey fellow BITSian 👋
> 
> We're Dihadi — India's first Agentic AI platform for daily wage workers and contractors. We're hiring interns across four roles, and we want you to build something that actually matters.

**About Dihadi card:**
> Every day, 8–12 million daily wage workers go without work while contractors scramble to fill vacancies. Dihadi fixes this — via WhatsApp, Voice, and a Mobile App — matching the right worker to the right job in minutes, using hyperlocal, skill-based, reputation-scored AI.

**Roles intro:**
> We have four open internship roles. Each comes with real ownership, direct founder access, and mentorship from some of the best in the Indian startup ecosystem.

**Role 1 — Research Intern:**
> Help us map the informal labour market — policy landscape, regulatory environment, competitor intelligence, and on-ground insights. Ideal for someone who loves digging deep and turning data into sharp, actionable narratives.

**Role 2 — Marketing Intern:**
> Own Dihadi's growth story. Run campaigns, build contractor and worker acquisition funnels, and help us hit 1,000+ users in our pilot city. Hustle, creativity, and a bias for action are all you need.

**Role 3 — App UI/UX Designer:**
> Design the product that millions of daily wage workers will actually use — clean, accessible, multilingual, and built for low-literacy users. Experience with Figma and an eye for inclusive design is a big plus.

**Role 4 — Social Media Designer:**
> Create content and visuals that tell Dihadi's story across Instagram, LinkedIn, and WhatsApp. From carousels to motion graphics — if you can make it scroll-stopping and human, we want you.

**Mentor intro:**
> As a Dihadi intern, you don't just work for a startup — you get access to a network that most early-career folks spend years trying to reach.

**CTA:**
> Ready to build something that actually matters? Applications are rolling — apply now before the spots fill up.

**Footer sign-off:**
> Swasti, Himanshu & Srijan  
> Co-Founders, Dihadi  
> founders@dihadi.co.in | +91 79764 88439

---

## 9. QA Checklist (for developer)

- [ ] All images use absolute URLs (`https://www.dihadi.co.in/...`)
- [ ] All images have `width`, `height`, `alt`, `display:block`, `border:0`
- [ ] All CSS is inline (`style=""`) — no external stylesheets, no `<link>` in body
- [ ] Font fallback stack present on all text elements
- [ ] CTA button uses table-based approach (Outlook safe)
- [ ] Preview text hidden span is present in `<body>` before content
- [ ] No JavaScript anywhere in the file
- [ ] No CSS `position: absolute/fixed/relative`
- [ ] No Flexbox or CSS Grid in layout
- [ ] Tested in: Gmail (web), Gmail (iOS), Apple Mail, Outlook 2016+
- [ ] Mobile: 3-column founder section collapses correctly on `<600px`
- [ ] All links are `https://` and open in new tab (`target="_blank"`)
- [ ] CTA button link: `https://dihadi.co.in/intern` — **update to live form URL before send**
- [ ] `© 2026 Dihadi` in footer
- [ ] No placeholder `[REPLACE]` text remaining in final output

---

## 10. Files to Deliver

| File | Description |
|---|---|
| `dihadi-intern-email.html` | Final single-file HTML email |
| `dihadi-intern-email-preview.png` *(optional)* | Screenshot preview at 600px width |

---

*PRD prepared for internal dev use. All brand assets sourced from dihadi.co.in. Application form URL `https://dihadi.co.in/intern` is a placeholder — replace before deployment.*
