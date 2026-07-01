# MemeForge

## UI & Graphics Assets
- **favicon.ico**: 32x32 laughing emoji or "MF" monogram.
- **logo.svg**: Bold "MemeForge" wordmark in Impact font style.
- **templates/**: 30+ free meme template images (use public domain / CC0 images: famous movie stills from Wikipedia, well-known reaction images). Source: Wikipedia commons, imgflip.com (check license).
- **font-impact.svg, font-comic.svg, font-arial.svg, font-roboto.svg, font-oswald.svg**: Font preview thumbnails.
- **icon-search.svg, icon-filter.svg, icon-download.svg, icon-copy.svg, icon-add.svg**: Feather Icons.
- **watermark-default.png**: "made with MemeForge" small text overlay (removed in pro version).
- **ad-banner.png**: 728x90 Carbon Ads placeholder.

## Audio & Media Assets
- None. Image + text tool. Option: subtle "pop" sound when text box is tapped (CSS animation covers this).

## Code Module Breakdown
- **index.html**: Grid homepage (template gallery), editor overlay/modal, ad container.
- **styles.css**: CSS Grid masonry for gallery, editor centering, font-family overrides, mobile breakpoints, watermark overlay styling.
- **gallery.js**:
  - `templates[]`: Array of {id, name, category, imgUrl, topTextOffset, bottomTextOffset} objects.
  - `renderGallery(filter)`: Render filtered grid from templates array.
  - `search(query)`: Filter templates by name.
- **editor.js**:
  - `loadTemplate(id)`: Swap active template image, reset text inputs.
  - `renderPreview()`: Canvas-based rendering — draw image, overlay text with Impact font + black stroke.
  - `downloadPNG()`: `canvas.toDataURL('image/png')` → trigger download via `<a download>`.
  - `copyToClipboard()`: Write canvas to clipboard via `Clipboard.write()`.
  - `addCustomImage(file)`: `FileReader.readAsDataURL` → set as template.
- **fonts.js**: Load Google Fonts async (Impact, Comic Neue, Oswald). Serve Impact from local font file or fallback.
- **store.js**: Gumroad links for Premium Pack ($5) and No-Watermark Bundle ($3). Pro flag stored in localStorage to disable watermark.
- **service-worker.js**: Cache template images for offline editing + gallery browsing.
- **manifest.webmanifest**: PWA installability.