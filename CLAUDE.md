# MemeForge — Meme Generator with imgflip Templates

**Status**: Adding 20 more modern templates (53 → 73 total), then Cloudflare deploy + Gumroad setup
**Last updated**: 2026-07-07

---

## What Works

- Gallery with 53 templates, real-time search, 8 category tabs
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
├── app.js              — 53 templates (adding 20 more), real-time search, canvas render, Pro unlock with toggle
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

## Current Template Inventory (53 total)

### Real imgflip Images (32 templates)
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
sad-pablo          https://i.imgflip.com/1c1uej.jpg
surprised-pikachu  https://i.imgflip.com/2kbn1e.jpg
mocking-spongebob  https://i.imgflip.com/1otk96.jpg
handshake-sneak    https://i.imgflip.com/28j0te.jpg
woman-yelling-at-cat https://i.imgflip.com/345v97.jpg
waiting-leo        https://i.imgflip.com/39t1o.jpg
doge               https://i.imgflip.com/43a45p.png
this-is-fine       https://i.imgflip.com/wxica.jpg
uno-draw-25        https://i.imgflip.com/3lmzyx.jpg
hide-pain-harold   https://i.imgflip.com/gk5el.jpg
gru-plan           https://i.imgflip.com/26jxvz.jpg
trade-offer        https://i.imgflip.com/54hjww.jpg
tuxedo-pooh        https://i.imgflip.com/2ybua0.png
all-my-homies      https://i.imgflip.com/3kwur5.jpg
monkey-puppet      https://i.imgflip.com/2gnnjh.jpg
waiting-skeleton   https://i.imgflip.com/2fm6x.jpg
spiderman-pointing https://i.imgflip.com/1tkjq9.jpg
absolute-cinema    https://i.imgflip.com/8d317n.png
```

### Gradient-Only (21 templates) — no real imgflip ID
```
success-kid        that-would-be-great  drakeposting     surprised-tony
crying-cat         big-shoes            arthur-fist       loki-sit
old-man-yells      gr-gregorio          crying-jordan     kobe-sigh
lebron-yell        tiger-thumbs         stonks            owl
cat                puppy-blue           gamer             button-game
skill-issue        gg                   anka              mischief
small-think        brain
```

## Upcoming: 20 Modern Templates to Add

Adding from imgflip API top 100. All real images.

### Classic (4)
| ID | Name | URL |
|----|------|-----|
| anakin-padme | Anakin Padme 4 Panel | `5c7lwq.png` |
| always-has-been | Always Has Been | `46e43q.png` |
| mother-ignoring | Mother Ignoring Kid | `46hhvr.jpg` |
| soldier-sleeping | Soldier/Sleeping Child | `2tzo2k.jpg` |

### Reactions (12)
| ID | Name | URL |
|----|------|-----|
| bell-curve | Bell Curve | `8tw3vb.png` |
| panik-kalm | Panik Kalm Panik | `3qqcim.png` |
| they-dont-know | They Don't Know | `4pn1an.png` |
| two-guys-bus | Two Guys on a Bus | `5v6gwj.jpg` |
| where-monkey | Where Monkey | `58eyvu.png` |
| clown-makeup | Clown Applying Makeup | `38el31.jpg` |
| gus-fring | Gus Fring (Not Same) | `5o32tt.png` |
| empire-climbers | Empire State Climbers | `avnxpz.png` |
| zero-days | 0 Days Without (Lenny) | `72epa9.png` |
| two-paths | Two Paths | `54d9lj.png` |
| grant-gustin | Grant Gustin Over Grave | `3nx72a.png` |
| george-bush | George Bush 9/11 | `3gdsh1.jpg` |

### Movies (5)
| ID | Name | URL |
|----|------|-----|
| megamind-peeking | Megamind Peeking | `64sz4u.png` |
| spiderman-triple | Spider-Man Triple | `3eqjd8.jpg` |
| laughing-leo | Laughing Leo | `4acd7j.png` |
| megamind-bitches | Megamind No Bitches | `65939r.jpg` |
| anime-terminator | Anime Girl Hiding | `3po4m7.jpg` |

### Implementation Order (for each template):
1. Add `{ id, name, category, topArea, botArea, premium }` to `templates[]` array
2. Add `'id': 'https://i.imgflip.com/FILE.EXT'` to `templateImages{}` object
3. Add `'id': 'linear-gradient(...)'` to `templateGradients{}` object
4. Repeat × 20 → total becomes 73 templates

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

**Phase 1 — Templates (NEXT):**
1. [ ] Add 20 modern imgflip templates (real images) — see table above
   - Update `templates[]` array + `templateImages{}` + `templateGradients{}`
   - Total goes 53 → 73

**Phase 2 — Cloudflare Deploy:**
1. [ ] Fix build command in Cloudflare dashboard: `echo "static"`, output dir: `.`
2. [ ] Trigger manual deploy from dashboard

**Phase 3 — Monetization:**
1. [ ] Create Gumroad product → replace `YOUR-GUMROAD-SLUG.hardgraft.com` in index.html:252
2. [ ] Apply for Google AdSense → replace IDs in index.html footer
3. [ ] (Optional) Add Gumroad License API verification in `attemptUnlock()` in app.js

**Phase 4 — Polish:**
1. [ ] Test: mobile Chrome, Safari — verify canvas renders
2. [ ] Test: download PNG → watermarks removed for pro users
3. [ ] OG image meta tags for social sharing
4. [ ] Session storage for top/bottom text

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