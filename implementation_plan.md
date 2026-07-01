# MemeForge — 25-Day Build Plan

## Week 1: Gallery + Editor Core
**Day 1-2**: Project scaffold, gallery grid layout, 10 initial templates (public domain images).
**Day 3-4**: Canvas-based editor — load image, render text with Impact font, stroke/outline, two text boxes.
**Day 5-7**: Download PNG, copy-to-clipboard, search + category filters on gallery.

## Week 2: Templates + Polish
**Day 8-10**: Add 20 more meme templates. Source from Wikipedia Commons (verify CC0/public domain). Build template JSON array.
**Day 11-12**: Font style selector (Impact, Comic Neue, Oswald, Arial). Font size + color pickers.
**Day 13-14**: Add "upload your own image" (FileReader API). Mobile responsive layout. Watermark overlay on free exports.

## Week 3: Premium + Gumroad
**Day 15-18**: Build 50 "premium template" images (sourced from royalty-free stock photo sites: Pexels, Unsplash). Package as monthly drop.
**Day 19-20**: Gumroad integration. Pro features (no watermark, premium templates) gated behind localStorage flag set after Gumroad purchase confirmation email or manual unlock code.
**Day 21**: Carbon Ads integration (banner on free tier only).

## Week 4: Launch
**Day 22-23**: Deploy to GitHub Pages. PWA manifest and service worker.
**Day 24-25**: Post to r/dankmemes, r/memes, Imgur, Twitter/X. Target keywords: "free meme generator no watermark" on Google SEO.

## Tech Stack
- Pure HTML/JS/CSS. No framework.
- Canvas API for rendering.
- Google Fonts (Impact fallback to Arial Black).
- Feather Icons (SVG inline).
- JSZip if adding template pack ZIP downloads (optional CDN library).

## Revenue Milestones
| Month | Visitors/mo | Premium Pack Sales | No-Watermark Sales | Revenue |
|-------|------------|-------------------|-------------------|---------|
| 1 | 1,000 | 10 ($50) | 20 ($60) | $110 + ads |
| 2 | 5,000 | 40 ($200) | 80 ($240) | $440 + ads |
| 3 | 15,000 | 80 ($400) | 100 ($300) | $700 + ads |

## Template Sourcing (Free / Legal)
- Wikipedia Commons: Search specific movie scenes, historical photos.
- imgflip (check terms — link to their API for popular templates: https://api.imgflip.com/get_memes).
- Pexels / Unsplash for premium pack: royalty-free photos styled as reaction memes.
- NEVER use copyrighted meme images (Twitter screenshots, magazine covers).

## Legal Notes
- No user-generated content storage (everything local in browser).
- No privacy policy required (no data collection).
- Gumroad handles tax forms automatically.