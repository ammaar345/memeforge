# MemeForge

## Core Loop
1. Browse or search meme templates (grid of thumbnails).
2. Click template → editor opens with image + text inputs.
3. Type top text + bottom text. Live preview updates instantly.
4. Click "Download PNG" → save to device. Optional: copy to clipboard.

## UI/UX Layout Ideas
- **Home**: Masonry grid of template thumbnails (3-4 columns). Search bar top. Category filters below (classic, reactions, sports, movie, animals).
- **Editor**: Full image preview centered. Two text inputs at top/bottom of image. Font size slider. Font style dropdown (Impact default, plus 5 alternatives). Color picker for text (white/black/auto). Download + share buttons.
- **Template upload**: "Add your own image" button for custom templates.
- **Mobile**: Single-column grid. Editor is full-screen overlay. Sticky download button at bottom.

## Visual Style Direction
- **Style**: Bold, playful, internet-culture-inspired. Loud but clean.
- **Colors**: `#121212` dark background (makes meme images pop). `#00D4FF` cyan accent. `#FF6B6B` alert/CTA. White text on images defaults to black outline (classic Impact style).
- **Typography**: Impact for default meme text (iconic). Comic Neue for UI buttons (playful contrast).
- **Interactions**: Bouncy button presses (CSS animation). Image "shake" on hover (CSS transform). Text preview updates with tiny scale animation.