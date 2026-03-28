# mail_drafts — Email Campaign Workflow

This project produces HTML email campaigns. The delivery format is an **image-based email**: the design is rendered to a high-res PNG, hosted on GitHub, and embedded in a minimal HTML wrapper with a fallback CTA button.

---

## End-to-end Workflow

```
1. Receive input (HTML, PRD/brief, or Figma)
2. Build or finalize the HTML design (see conventions below)
3. Render to PNG:  node capture_email.js --input {campaign}.html --output assets/{campaign}/email_render.png
4. Push rendered PNG to GitHub repo: SrijanSahay05/dihadi-assets
5. Create final email wrapper using the raw GitHub URL
6. Hand off the wrapper HTML for sending
```

---

## Step 1 — Input Types

| Input | How to handle |
|-------|--------------|
| Full HTML file | Use as design source; render directly |
| PRD / design brief | Build table-based HTML from the brief (see conventions) |
| Figma / screenshot | Implement as HTML first, then render |
| Plain copy + brand colors | Build HTML using the brand palette provided |

---

## Step 2 — HTML Design Conventions

The design HTML is for **rendering only** (Puppeteer screenshots it). It does not need to be email-client-safe — that burden sits entirely on the final wrapper.

- Table-based layout with inline CSS (standard practice, but relaxed since it's being screenshotted)
- Standard email card width: **672px**
- Wrap the entire design in a single `<div>` as the first child of `<body>` — `capture_email.js` targets `body > div`
- External fonts are fine (Puppeteer waits for network idle + 800ms settle time)
- Use `background-color` on `<body>` to set the canvas color behind the card
- Keep all brand assets as external URLs (GitHub raw or CDN) — do not base64 embed

### Brand asset base URL
```
https://raw.githubusercontent.com/SrijanSahay05/dihadi-assets/main/
```

Common assets under that base:
- `assets/dihadi/brand/dihadi_logo.svg`
- `assets/dihadi/brand/iim_kashipur_logo.png`
- `assets/dihadi/brand/ymp_logo.svg`
- `assets/dihadi/team/swasti_ceo.png`, `himanshu_coo.png`, `srijan_cto.png`

---

## Step 3 — Rendering

### Full email card
```bash
node capture_email.js --input {campaign}.html --output assets/{campaign}/email_render.png
# optional: --width 672  (default, change if design uses a different card width)
```

Two-pass process: measures card height at 1x, then re-renders at 2x (retina) for the final PNG.

### CTA button only (for isolated button images)
```bash
node capture_cta.js --input {campaign}.html --output assets/{campaign}/cta.png
# optional: --width 600
```

Targets `.cta` element in the HTML; strips `.cta-n` footnote before capturing.

---

## Step 4 — Push to GitHub

The rendered PNG lives in two places: local `assets/{campaign}/` and the GitHub asset repo.

```bash
# From within the SrijanSahay05/dihadi-assets repo clone
git add assets/{campaign}/
git commit -m "Add {campaign} email render"
git push
```

Raw URL format after pushing:
```
https://raw.githubusercontent.com/SrijanSahay05/dihadi-assets/main/assets/{campaign}/email_render.png
```

Note: GitHub raw CDN can take ~30s to reflect a new push. Test the URL before sending.

---

## Step 5 — Final Email Wrapper

The wrapper is the actual HTML sent to recipients. Reference: `dihadi-intern-gemini-v2.html`.

Structure:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{Email subject line}</title>
</head>
<body style="margin:0;padding:0;background-color:{bg_color};font-family:Arial,sans-serif;">

  <!-- Preheader: shown in inbox preview, hidden in body -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
    {One-line preview text, ~90 chars}
    &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>

  <!-- Wrapper table -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:{bg_color};">
    <tr>
      <td align="center" style="padding:0;margin:0;">

        <!-- Main image embed -->
        <img src="https://raw.githubusercontent.com/SrijanSahay05/dihadi-assets/main/assets/{campaign}/email_render.png"
          alt="{Descriptive alt text — full email content summary for screen readers}"
          width="672"
          style="display:block;width:100%;height:auto;border:0;">

        <!-- Fallback CTA (always visible, works even if image is blocked) -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:672px;margin:0 auto;">
          <tr>
            <td align="center" style="padding:18px 0 8px;">
              <a href="{CTA_URL}" target="_blank"
                style="display:inline-block;padding:12px 48px;background-color:{btn_bg};color:{btn_text};font-family:Arial,sans-serif;font-size:16px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;text-decoration:none;border-radius:6px;">
                {CTA LABEL} →
              </a>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:6px 0 0;font-family:Arial,sans-serif;font-size:11px;color:#888888;">
              Trouble viewing? <a href="{CTA_URL}" style="color:#888888;">Click here</a>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>
```

Key values to fill per campaign:
- `{bg_color}` — body/wrapper background (should match the email design canvas color)
- `{campaign}` — folder name under `assets/` in the GitHub repo
- `{CTA_URL}` — the action link (form, page, etc.)
- `{btn_bg}` / `{btn_text}` — button colors matching the design
- `{CTA LABEL}` — button text (e.g. `APPLY NOW`, `REGISTER FREE`)

---

## File & Folder Conventions

```
mail_drafts/
  {campaign}/                  ← HTML design drafts, versioned (v1, v2, ...)
  assets/{campaign}/           ← Rendered PNGs (local mirror of GitHub)
  assets/{campaign}/brand/     ← Logos and brand assets
  assets/{campaign}/team/      ← Team/founder photos
  {campaign}-wrapper.html      ← Final email wrapper (the file that gets sent)
```

Campaign folder name examples: `dihadi`, `esummit`, `dropshipping`

Version HTML files with a suffix: `{campaign}-v2.html`, `{campaign}-v3.html`

---

## Pre-send Checklist

- [ ] Raw GitHub image URL is live and loads correctly in a browser
- [ ] `alt` text on the `<img>` summarizes full email content (accessibility + image-off fallback)
- [ ] Preheader text is set (~90 chars, no repeated words from subject)
- [ ] CTA URL is the correct final link (not a placeholder)
- [ ] Background color of wrapper matches the email design canvas
- [ ] Tested in at least one email client (Gmail web recommended)
- [ ] Image renders sharply at both desktop (672px) and mobile widths
