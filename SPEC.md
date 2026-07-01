# MemeForge — Full Product Spec

> Tags: `game`, `browser`, `casual`, `gumroad-packs`, `build 1-2 weeks`

---

## 1. Concept & Vision

A no-friction meme generator that loads instantly, has zero watermarks on paid, and makes the funniest part of the internet accessible to anyone. The vibe is "arcade machine in a browser" — bold, fast, unapologetically internet-native. Not a startup product. A tool built by someone who actually uses memes.

The core tension: most meme tools either add watermarks, require accounts, or look like they were built in 2008. MemeForge breaks all three with zero friction and premium polish.

---

## 2. Design Language

### Aesthetic Direction
**"Neon Internet Arcade"** — dark backdrop, hot accent colors, bold Impact font, instant gratification at every click. Think Discord dark mode meets 9gag's energy but with clean UI discipline.

### Color Palette
```
--bg-primary:    #0A0A0F   (deep black-purple)
--bg-secondary:  #1A1A2E   (panel backgrounds)
--bg-card:       #12121A   (card surfaces)
--text-primary:  #FAFAFA
--text-secondary:#A0A0B0
--accent-cyan:   #00D4FF   (primary CTA buttons)
--accent-pink:   #FF6B9D   (highlights, active states)
--accent-warning:#FFB800   (hover states, warnings)
--error:         #FF4444
--success:       #10B981
```

### Typography
- **Meme text**: Impact (system, no CDN needed — most OS have it) or fallback to Arial Black
- **UI labels**: `'Poppins', sans-serif` — Google Fonts
- **Code/meta**: `'JetBrains Mono', monospace` — Google Fonts
- **Scale**: 12px meta, 14px body, 16px labels, 24px headings, 48px hero

### Spatial System
- **Base unit**: 8px
- **Card radius**: 12px
- **Button radius**: 8px
- **Max content width**: 1200px
- **Grid gap**: 16px

### Motion Philosophy
- **Immediate feedback**: All button presses scale down 2% on mousedown (50ms), spring back on release
- **Template grid**: Cards lift on hover (translateY -4px, box-shadow increase, 150ms ease-out)
- **Editor entrance**: Slides up from bottom (300ms ease-out) when template is selected
- **Download**: Button pulses cyan glow once on successful save
- **No motion for motion's sake**: Every animation communicates state, not decoration

### Visual Assets
- **Icons**: Inline SVG only (no CDN dependency). Custom-drawn in a consistent 2px stroke style matching the neon aesthetic.
- **No placeholder images**: Every template thumbnail is a real generated meme at 200x200px

---

## 3. Layout & Structure

### Homepage (Gallery)
```
┌─────────────────────────────────────────────────────┐
│  LOGO              SEARCH [________]     [PRO ⚡]  │
├─────────────────────────────────────────────────────┤
│  [ALL] [CLASSIC] [REACTIONS] [MOVIES] [SPORTS]     │
│         [ANIMALS] [GAMING] [TEXT] [UPLOAD]          │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐     │
│  │ tmpl │ │ tmpl │ │ tmpl │ │ tmpl │ │ tmpl │     │
│  │      │ │      │ │      │ │      │ │      │     │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘     │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐     │
│  │ tmpl │ │ tmpl │ │ tmpl │ │ tmpl │ │ tmpl │     │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘     │
│                                                     │
├─────────────────────────────────────────────────────┤
│  [AD BANNER — 728x90, footer]                       │
└─────────────────────────────────────────────────────┘
```

### Editor (Overlay)
```
┌─────────────────────────────────────────────────────┐
│  [←BACK]     TEMPLATE NAME            [DOWNLOAD ↓]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│              ┌─────────────────────┐                │
│              │                     │                │
│              │   [MEME IMAGE]      │                │
│              │   TOP TEXT HERE     │                │
│              │                     │                │
│              │   BOTTOM TEXT HERE  │                │
│              │                     │                │
│              └─────────────────────┘                │
│                                                     │
│  TOP TEXT:    [________________________]            │
│  BOTTOM TEXT: [________________________]            │
│                                                     │
│  FONT COLOR: [■WHITE ■BLACK]  FONT SIZE: [──●──]  │
│  FONT STYLE: [Impact ▼]                             │
│                                                     │
│  [💎 PRO: No Watermark] [💎 PRO: Extra Styles]     │
└─────────────────────────────────────────────────────┘
```

### Responsive Strategy
- **Desktop (>1024px)**: Gallery 5-column grid, editor full overlay
- **Tablet (768-1024px)**: Gallery 3-column grid, editor scrollable overlay
- **Mobile (<768px)**: Gallery 2-column grid, editor full-screen takeover, sticky download button at bottom

---

## 4. Features & Interactions

### Gallery
- **Search**: Real-time filter on template name/category. Debounce 150ms. Empty state: "No memes found for '[query]' — try 'drake' or 'surprised pikachu'"
- **Category tabs**: Filter by category. Active tab gets cyan underline. Scroll horizontally on mobile.
- **Template hover**: Card lifts, shows "Click to edit" tooltip. Thumbnail is a real rendered preview.
- **"Upload your own" card**: Dashed border card at end of grid → opens file picker → crop tool → adds to template list (stored in localStorage, not server).

### Editor
- **Live preview**: Every keystroke in top/bottom text input updates the meme image preview instantly (<16ms, no debounce needed)
- **Font size slider**: Range 20-72px, default 40px. Updates preview on every input event.
- **Font color toggle**: White/Black toggle. White = white text with black stroke. Black = inverse.
- **Font style**: Dropdown. Impact (default), Comic Neue, Arial Black, Oswald Bold. Live preview switches immediately.
- **Download PNG**: Renders to canvas at template's original resolution → `canvas.toDataURL('image/png')` → download trigger. Free users: preview image + subtle "made with MemeForge" text in bottom corner (low-opacity, removable in PRO). PRO: completely clean.
- **Copy to clipboard**: Same canvas → `Clipboard.write()` → success toast "Copied!"
- **Auto-save**: On every change, save text inputs to sessionStorage (survive accidental back navigation).

### Pro Features (Gumroad unlock)
- **No watermark**: Pro flag read from localStorage. If set → download canvas without watermark overlay.
- **Premium template packs**: Separate gallery section "PREMIUM". Locked with blur overlay + "Get Premium" CTA linking to Gumroad.
- **Extra font styles**: Adds 5 more fonts (Bangers, Bebas Neue, Permanent Marker, Lobster, Satisfy).
- **Unlock flow**: User pastes purchase email or unlock code → verified against a simple localStorage key → unlocks pro features. No server-side verification (manual trust-based, works for Gumroad's email receipt workflow).

### Empty / Edge States
- **No templates in category**: Show illustrated empty state with "No memes in this category yet — [upload your own]"
- **Upload fail**: Toast error "Couldn't read that image — try a JPG or PNG"
- **Download fail** (rare): Toast error "Download failed — try again or copy to clipboard instead"
- **Very long text**: Scale down font size automatically when text width exceeds image width. Min font size 16px. If still too wide, truncate with "..."

### Keyboard Shortcuts
- `Ctrl+V` (when on gallery): Paste image from clipboard directly into editor as custom template
- `Escape`: Close editor, return to gallery
- `Ctrl+S` / `Cmd+S`: Download PNG
- `Ctrl+C` / `Cmd+C` (in editor): Copy PNG to clipboard

---

## 5. Component Inventory

### TemplateCard
- **Default**: Dark card (#12121A), 12px radius, thumbnail image, template name below in 14px JetBrains Mono
- **Hover**: Lift (-4px translateY), cyan glow shadow, "Click to edit" tooltip fades in
- **Premium locked**: Blur filter overlay (backdrop-filter: blur(4px)), lock icon centered, "PRO" badge top-right
- **Loading**: Skeleton pulse animation while thumbnail loads

### TextInput (meme)
- **Default**: Dark input (#1A1A2E), no border, 16px Poppins, placeholder text in gray
- **Focus**: Cyan border glow (box-shadow: 0 0 0 2px #00D4FF40)
- **Content**: Live, no debounce. Updates canvas preview immediately.

### DownloadButton
- **Default**: Solid cyan (#00D4FF), white text, "DOWNLOAD PNG", rounded 8px, bold Poppins
- **Hover**: Lighten background 10%, scale 1.02
- **Active**: Darken background 5%, scale 0.98 (press effect)
- **Loading**: Spinner replaces text, disabled, "RENDERING..."
- **Success**: Brief green pulse, checkmark icon, returns to normal after 1.5s
- **PRO badge variant**: Additional small cyan diamond icon

### CategoryTab
- **Default**: Text only, #A0A0B0 color, 14px Poppins
- **Hover**: Text lightens to #FAFAFA
- **Active**: #00D4FF text color, 2px cyan underline, bold weight
- All tabs scroll horizontally on mobile. Active tab always fully visible.

### ProBadge
- Small diamond shape, cyan fill, "PRO" text inside. Used on premium templates and pro-only feature buttons. 24px height.

### Toast
- Slide in from top-right. Auto-dismiss after 3s. Close button (X). Types: success (green left border), error (red), info (cyan).

### SearchInput
- Icon left (magnifying glass SVG). Full-width. Dark background. Clear button (X) appears when there's text. Rounded 8px.

---

## 6. Technical Approach

### Stack
- **Pure HTML/JS/CSS**. No framework, no build step. One `index.html` + `styles.css` + `app.js`.
- **Hosting**: GitHub Pages ($0). Custom domain optional (`memes.page` or similar, ~$10/yr).
- **No backend**: All state in localStorage. All templates as inline JSON.

### Architecture
```
src/
  index.html          — single page, all sections
  styles.css          — all styles, CSS custom properties
  app.js              — all logic
  templates.json      — template data (id, name, category, imageUrl, topOffset, bottomOffset)
```

### Template System
```javascript
const templates = [
  { id: "drake", name: "Drake Hotline Bling", category: "reactions", src: "drake.png", topArea: "above", botArea: "below" },
  // 50+ templates embedded as base64 or inline references to hosted images
];
```

Template images hosted on:
- **Free tier**: Imgur anonymous upload API or GitHub Pages `assets/` folder (max 1GB free)
- **Better approach**: Embed a curated set of ~50 CC0/public domain templates directly as compressed base64 strings in templates.json. Avoids CDN dependency entirely. Total size: ~2-5MB for 50 small-to-medium images (use 800px max width).

### Canvas Rendering Pipeline
```
1. Create offscreen canvas at template's native resolution
2. Draw template image (from cached Image object)
3. Draw top text (Impact font, centered, scaled to fit width)
4. Draw bottom text (same)
5. Apply watermark only if not PRO
6. Return canvas.toDataURL('image/png')
```

### Text Scaling Algorithm
```
1. Start at requested font size
2. Measure text width with canvas.measureText()
3. If width > imageWidth * 0.9: reduce font by 2px and repeat
4. Stop at minFontSize (16px) or if text fits
```

### Pro Unlock via Gumroad
```
1. User buys product on Gumroad
2. Gumroad sends email receipt with order details
3. User pastes email address or manually copies unlock code from Gumroad purchase page
4. app.js saves { pro: true, email: "user@email.com" } to localStorage
5. On load, check localStorage for pro flag → render accordingly
Weakness: bypassable by editing localStorage. Accept for v1.
```

### Gumroad Integration
- All Gumroad links are simple `<a>` anchor tags to Gumroad product pages
- Pro features gated by localStorage flag only
- For more secure unlock: Gumroad's webhook → Firebase Function → store verified purchase. But that requires backend. Skip for now.

### SEO
- `<title>MemeForge — Free Meme Generator, No Watermark</title>`
- `<meta name="description" content="Create memes instantly. No signup, no watermark, no watermarks.">`
- Open Graph tags for social sharing: preview meme image + shareable URL
- Sitemap for template pages (if using separate route per template)

### Performance Targets
- **First paint**: <500ms (no framework, minimal assets)
- **TTI**: <1s (all inline)
- **Lighthouse score**: >90 across all categories
- **No layout shift** on template load (fixed aspect ratio containers always)

---

## 7. Launch Checklist

- [ ] 50 templates sourced (CC0 + public domain verified)
- [ ] All fonts load (Impact fallback, Google Fonts preload)
- [ ] Watermark system correct (free = has it, PRO = no)
- [ ] Gumroad links live and redirecting correctly
- [ ] Carbon Ads script in footer, renders without errors
- [ ] Mobile layout tested on Chrome, Safari
- [ ] Keyboard shortcuts work on desktop
- [ ] Copy-to-clipboard works on Chrome (HTTPS required, localhost passes)
- [ ] GitHub Pages deploy confirmed
- [ ] Social share tags verified with og:image