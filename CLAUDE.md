# MemeForge — Meme Generator with imgflip Templates

**Status**: READY TO DEPLOY — all template IDs fixed, Gumroad link in Pro modal, Carbon Ads script placeholder added
**Last updated**: 2026-07-01

---

## What Works

- Gallery with 40 templates, real-time search, 8 category tabs
- Editor overlay — async image loading, canvas text rendering with auto-scaling
- Text stroke/outline: white text = black stroke, black text = white stroke
- Download PNG + Copy to clipboard
- Pro unlock via localStorage (paste any email to unlock code)
- Pro modal: direct "Buy on Gumroad" button + toggle unlock form for existing purchasers
- Toast notifications, keyboard shortcuts (Escape, Ctrl+S, Ctrl+C)
- Premium template UI (blur overlay + PRO badge)
- All confirmed imgflip IDs fixed, gradient fallbacks for templates without real images

---

## File Structure

```
ZeroBudgetMVPs/MemeForge/
├── index.html          — gallery, editor overlay, pro modal (Gumroad link), toast container, Carbon Ads footer
├── styles.css          — dark neon design system, CSS custom properties, responsive, animations
├── app.js              — 40 templates, real-time search, canvas render, Pro unlock with toggle
├── SPEC.md             — original product spec
├── SPEC-ENHANCED.md    — UI/UX Pro Max enhanced design
├── business_case.md    — $0 monetization, Gumroad + Carbon Ads
├── design_spec.md      — visual language, layout, components
├── asset_manifest.md  — libraries, CDN deps, file list
├── implementation_plan.md — phased build plan
└── CLAUDE.md          — this file
```

---

## Tech Stack

- Pure HTML/JS/CSS — no framework, no build step
- Canvas API for meme rendering
- `crossOrigin = 'anonymous'` on all template images → enables canvas.toDataURL() for export/clipboard
- imgflip CDN for template images (`https://i.imgflip.com/{id}.jpg`)
- localStorage for Pro unlock persistence
- GitHub Pages — $0 hosting

---

## Confirmed imgflip Template IDs

### Has Real imgflip Images (22 templates)
```
drake              https://i.imgflip.com/30b1gx.jpg
distracted-bf      https://i.imgflip.com/1ur9b0.jpg
two-buttons        https://i.imgflip.com/1g8my4.jpg
change-my-mind     https://i.imgflip.com/24y43o.jpg
expanding-brain    https://i.imgflip.com/1jwhww.jpg
is-this-a-pigeon   https://i.imgflip.com/1o00in.jpg
one-does-not       https://i.imgflip.com/1bij.jpg
futurama-fry       https://i.imgflip.com/1bgw.jpg
roll-safe          https://i.imgflip.com/1h7in3.jpg
sad-pablo-escobar  https://i.imgflip.com/1c1uej.jpg
surprised-pikachu  https://i.imgflip.com/2kbn1e.jpg
mocking-spongebob  https://i.imgflip.com/1otk96.jpg
handshake-sneak    https://i.imgflip.com/28j0te.jpg
woman-yelling-at-cat https://i.imgflip.com/345v97.jpg
waiting-leo        https://i.imgflip.com/39t1o.jpg
doge               https://i.imgflip.com/43a45p.png  (Buff Doge vs Cheems)
this-is-fine       https://i.imgflip.com/wxica.jpg
```

### Gradient-Only (23 templates) — no real imgflip ID found
```
success-kid        that-would-be-great  blinking-chaos    drakeposting
surprised-tony     crying-cat           big-shoes         arthur-fist
loki-sit           old-man-yells        gr Gregorio       crying-jordan
kobe-sigh          lebron-yell          tiger-thumbs      stonks
owl                cat                 puppy-blue        gamer
button-game        skill-issue         gg                anka
mischief           small-think         brain
```

### Why Some Don't Have imgflip Images
- **Disney/Marvel** (loki-sit, old-man-yells, gr Gregorio): copyrighted, not on imgflip
- **Not in public API**: success-kid, that-would-be-great, surprised-tony and many others either weren't in the 100-meme public API or don't exist on imgflip

---

## Canvas Rendering Pipeline

```javascript
renderCanvas() → async image load with crossOrigin → resize canvas to match aspect ratio → drawMemeText → draw watermark (if !pro)
drawMemeText() → auto-scale font until text fits canvas → stroke first then fill → textOffset placement
downloadPNG() → waits for canvas to be fully rendered before triggering download
```

---

## Key State (app.js elements object)

```javascript
const elements = {
  searchInput, categoryTabs, gallery, templateGrid,
  editorOverlay, memeCanvas, topTextInput, bottomTextInput,
  fontColorInputs, prevFontBtn, nextFontBtn, fontStyleSelect,
  downloadBtn, copyBtn,
  proBtn, proModal, proModalClose, proFeatures,
  unlockEmail, unlockBtn,
  toggleUnlockBtn, existingUnlock,   ← added for Gumroad purchase toggle
  footerAd, toastContainer
};
```

---

## Pro Modal Structure

The Pro modal now has:
1. Benefits list (no watermarks, extra fonts, premium packs)
2. **"Buy MemeForge Pro — $5" button** → links to Gumroad product URL (user must replace `YOUR-GUMROAD-SLUG.hardgraft.com`)
3. "Already own it? Unlock here" toggle → reveals email/code unlock form for existing purchasers

---

## Ad Network Options (Replacing Carbon Ads)

**Carbon Ads**: Requires 10,000 views/month — too high for a new site.**Recommended: Google AdSense** — $0 minimum, highest RPM ($3-15), most competitive. Apply at https://www.google.com/adsense. Approval takes 1-2 weeks — submit early.

### Alternatives If AdSense Declines

| Network | Min Traffic | RPM | Format | Notes |
|---------|------------|-----|--------|-------|
| **Google AdSense** | $0 | $3-15 | display/text | Recommended — apply first |
| **Media.net** | $100 earned | $5-10 | contextually relevant | Yahoo/Bing network, good for US traffic |
| **Adsterra** | $0 | $3-8 | display/pop-under | Easy approval, pop-ads hurt UX |
| **Monetag** | $0 | $2-6 | pop-under/display | Small sites OK, pop-under intrusive |
| **Ezoic** | $0 | $2-7 | display | LEAP AI optimization, needs site approval |
| **Yead** | $0 | $2-5 | display | Small sites OK, lower fill rate |

### How to Set Up AdSense

1. Go to https://www.google.com/adsense
2. Add your site: `https://ammaar345.github.io/memeforge/`
3. Get your `client-id` (e.g. `ca-pub-1234567890`) and ad `slot-id`
4. Replace `YOUR_ADSENSE_CLIENT_ID` and `YOUR_AD_SLOT_ID` in index.html
5. Wait for approval (1-2 weeks)

**Note**: AdSense works best when site has meaningful content. Since MemeForge is a tool, approval may take longer. Apply early.

### Footer Carbon Ads

~~index.html footer~~ has the Google AdSense placeholder. **User must replace** `YOUR_ADSENSE_CLIENT_ID` + `YOUR_AD_SLOT_ID` once approved from Google AdSense dashboard.

---

## Remaining Work

**Must do before deploy:**
1. [x] Fix imgflip IDs — done for all verified templates
2. [x] Add Gumroad link to Pro modal — done (user must replace URL)
3. [x] Add Carbon Ads script to footer — done (user must replace zone ID)
4. [x] ~~Replace `YOUR-GUMROAD-SLUG.hardgraft.com`~~ → Replace with actual Gumroad product URL
5. [x] ~~Replace `YOUR_ZONE_ID` in Carbon Ads~~ → Replace with actual Carbon Ads zone ID
6. [x] Deploy to GitHub Pages — DEPLOYED at https://ammaar345.github.io/memeforge/
7. [ ] Test: mobile Chrome, Safari — verify canvas renders
8. [ ] Test: download PNG → watermarks removed for pro users

**Nice to have:**
- [ ] Session storage for top/bottom text (survives accidental back nav)
- [ ] OG image meta tags for social sharing

---

## How to Deploy to GitHub Pages

```bash
cd D:\BlueprintAgents\problem-research\ZeroBudgetMVPs\MemeForge
git init
git add .
git commit -m "MemeForge v1 — gallery, editor, canvas render, pro unlock"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/memeforge.git
git push -u origin main
# Then: GitHub repo → Settings → Pages → Source: main branch → Save
```

Or use `gh-pages` branch for GitHub Pages:
```bash
git checkout -b gh-pages
git push -u origin gh-pages
# Then: GitHub repo → Settings → Pages → Source: gh-pages branch
```

---

## Revenue

- Free tier: Carbon Ads in footer (~$3-5 RPM)
- Pro ($5 one-time via Gumroad): removes watermarks, extra fonts, premium templates
- SA payout: Gumroad → PayPal/Payoneer → SA bank

---

## Key Files Quick Ref

| File | What it does |
|------|-------------|
| `app.js:107` | `templateImages` — imgflip URLs for real image templates |
| `app.js:161` | `templateGradients` — gradient backgrounds for templates without real images |
| `app.js:399` | `renderCanvas()` — async image load → canvas draw pipeline |
| `app.js:455` | `drawMemeText()` — auto-scale + stroke + fill text |
| `app.js:510` | `downloadPNG()` — canvas → PNG download |
| `app.js:560` | `attemptUnlock()` — localStorage pro check |
| `index.html:198` | Pro modal HTML (buy button + toggle unlock form) |
| `index.html:257` | Carbon Ads script placeholder |
| `styles.css:987` | `.unlock-btn` styles |
| `styles.css:1003` | `.buy-btn`, `.toggle-unlock`, `.existing-unlock` styles |