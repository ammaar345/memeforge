/**
 * MemeForge - Free Meme Generator
 * Core application logic
 */

// ============ STATE ============
const state = {
  templates: [],
  filteredTemplates: [],
  currentTemplate: null,
  currentCategory: 'all',
  searchQuery: '',
  pro: false,
  topText: '',
  bottomText: '',
  fontColor: 'white',
  fontSize: 40,
  fontStyle: 'Impact',
  isLoading: false
};

// ============ DOM ELEMENTS ============
const elements = {
  galleryGrid: document.getElementById('gallery-grid'),
  galleryEmpty: document.getElementById('gallery-empty'),
  emptyQuery: document.getElementById('empty-query'),
  searchInput: document.getElementById('search-input'),
  tabButtons: document.querySelectorAll('.tab-btn'),
  editorOverlay: document.getElementById('editor-overlay'),
  editorTitle: document.getElementById('editor-title'),
  editorBack: document.getElementById('editor-back'),
  editorXClose: document.getElementById('editor-x-close'),
  memeCanvas: document.getElementById('meme-canvas'),
  topTextInput: document.getElementById('top-text'),
  bottomTextInput: document.getElementById('bottom-text'),
  fontColorToggle: document.querySelectorAll('.color-btn'),
  fontSizeSlider: document.getElementById('font-size-slider'),
  fontSizeValue: document.getElementById('font-size-value'),
  fontStyleSelect: document.getElementById('font-style'),
  downloadBtn: document.getElementById('download-btn'),
  copyBtn: document.getElementById('copy-btn'),
  proBtn: document.getElementById('pro-btn'),
  proModal: document.getElementById('pro-modal'),
  proModalClose: document.getElementById('pro-modal-close'),
  proFeatures: document.getElementById('pro-features'),
  unlockEmail: document.getElementById('unlock-email'),
  unlockBtn: document.getElementById('unlock-btn'),
  toggleUnlockBtn: document.getElementById('toggle-unlock-btn'),
  existingUnlock: document.getElementById('existing-unlock'),
  footerAd: document.getElementById('footer-ad'),
  toastContainer: document.getElementById('toast-container')
};

// ============ TEMPLATES DATA ============
const templates = [
  // Classic memes
  { id: 'drake', name: 'Drake Hotline Bling', category: 'classic', topArea: 'yes', botArea: 'yes', premium: false },
  { id: 'distracted-bf', name: 'Distracted Boyfriend', category: 'classic', topArea: 'yes', botArea: 'yes', premium: false },
  { id: 'two-buttons', name: 'Two Buttons', category: 'classic', topArea: 'yes', botArea: 'yes', premium: false },
  { id: 'change-my-mind', name: 'Change My Mind', category: 'classic', topArea: 'yes', botArea: 'no', premium: false },
  { id: 'expanding-brain', name: 'Expanding Brain', category: 'classic', topArea: 'no', botArea: 'yes', premium: false },
  { id: 'is-this', name: 'Is This a...', category: 'classic', topArea: 'yes', botArea: 'yes', premium: false },
  { id: 'one-does-not', name: 'One Does Not Simply', category: 'classic', topArea: 'yes', botArea: 'no', premium: false },
  { id: 'futurama-fry', name: 'Not Sure If...', category: 'classic', topArea: 'yes', botArea: 'yes', premium: false },
  { id: 'roll-safe', name: 'Roll Safe', category: 'classic', topArea: 'yes', botArea: 'yes', premium: false },
  { id: 'sad-pablo', name: 'Sad Pablo Escobar', category: 'classic', topArea: 'yes', botArea: 'yes', premium: false },
  { id: 'success-kid', name: 'Success Kid', category: 'classic', topArea: 'yes', botArea: 'yes', premium: false },
  { id: 'that-would-be-great', name: 'That Would Be Great', category: 'classic', topArea: 'yes', botArea: 'yes', premium: false },
  // Reactions
  { id: 'surprised-pikachu', name: 'Surprised Pikachu', category: 'reactions', topArea: 'yes', botArea: 'yes', premium: false },
  { id: 'woman-yelling-at-cat', name: 'Woman Yelling at Cat', category: 'reactions', topArea: 'yes', botArea: 'yes', premium: false },
  { id: 'drakeposting', name: 'Drakeposting', category: 'reactions', topArea: 'yes', botArea: 'yes', premium: false },
  { id: 'surprised-tony', name: 'Surprised Tony Stark', category: 'reactions', topArea: 'yes', botArea: 'yes', premium: false },
  { id: 'mocking-spongebob', name: 'Mocking SpongeBob', category: 'reactions', topArea: 'yes', botArea: 'yes', premium: false },
  { id: 'crying-cat', name: 'Crying Cat', category: 'reactions', topArea: 'yes', botArea: 'yes', premium: false },
  { id: 'handshake-sneak', name: 'Handshake Sneak', category: 'reactions', topArea: 'yes', botArea: 'yes', premium: false },
  { id: 'big-shoes', name: 'Big Shoes', category: 'reactions', topArea: 'yes', botArea: 'yes', premium: false },
  // Movies
  { id: 'arthur-fist', name: 'Arthur Fist', category: 'movies', topArea: 'yes', botArea: 'yes', premium: false },
  { id: 'loki-sit', name: 'Loki Sit', category: 'movies', topArea: 'yes', botArea: 'yes', premium: true },
  { id: 'waiting-leo', name: 'Waiting Leonardo', category: 'movies', topArea: 'yes', botArea: 'yes', premium: false },
  { id: 'old-man-yells', name: 'Old Man Yells', category: 'movies', topArea: 'yes', botArea: 'yes', premium: false },
  { id: 'gr-gregorio', name: 'Gregorio', category: 'movies', topArea: 'yes', botArea: 'yes', premium: true },
  // Sports
  { id: 'crying-jordan', name: 'Crying Jordan', category: 'sports', topArea: 'yes', botArea: 'yes', premium: false },
  { id: 'kobe-sigh', name: 'Kobe Sigh', category: 'sports', topArea: 'yes', botArea: 'yes', premium: false },
  { id: 'lebron-yell', name: 'LeBron Yell', category: 'sports', topArea: 'yes', botArea: 'yes', premium: true },
  { id: 'tiger-thumbs', name: 'Tiger Thumbs', category: 'sports', topArea: 'yes', botArea: 'yes', premium: true },
  // Animals
  { id: 'doge', name: 'Doge', category: 'animals', topArea: 'yes', botArea: 'yes', premium: false },
  { id: 'stonks', name: 'Stonks', category: 'animals', topArea: 'yes', botArea: 'yes', premium: false },
  { id: 'owl', name: 'OWL', category: 'animals', topArea: 'yes', botArea: 'yes', premium: false },
  { id: 'cat', name: 'Blanket Cat', category: 'animals', topArea: 'yes', botArea: 'yes', premium: false },
  { id: 'this-is-fine', name: 'This Is Fine', category: 'animals', topArea: 'yes', botArea: 'yes', premium: false },
  { id: 'puppy-blue', name: 'Puppy in Blue', category: 'animals', topArea: 'yes', botArea: 'yes', premium: true },
  // Gaming
  { id: 'gamer', name: 'Gamer', category: 'gaming', topArea: 'yes', botArea: 'yes', premium: false },
  { id: 'button-game', name: 'Button Game', category: 'gaming', topArea: 'yes', botArea: 'yes', premium: false },
  { id: 'skill-issue', name: 'Skill Issue', category: 'gaming', topArea: 'yes', botArea: 'yes', premium: false },
  { id: 'gg', name: 'GG', category: 'gaming', topArea: 'yes', botArea: 'yes', premium: false },
  // Text Only
  { id: 'anka', name: 'anka', category: 'text', topArea: 'yes', botArea: 'yes', premium: false },
  { id: 'mischief', name: 'Mischief', category: 'text', topArea: 'yes', botArea: 'yes', premium: false },
  { id: 'small-think', name: 'The Smallthink', category: 'text', topArea: 'yes', botArea: 'yes', premium: false },
  { id: 'brain', name: 'Brainpower', category: 'text', topArea: 'yes', botArea: 'yes', premium: false }
];

// Template images — imgflip CDN URLs (https://i.imgflip.com/{id}.jpg)
// Premium templates and missing IDs use gradient fallback
const templateImages = {
  // Verified correct IDs from imgflip API response
  'drake': 'https://i.imgflip.com/30b1gx.jpg',
  'distracted-bf': 'https://i.imgflip.com/1ur9b0.jpg',
  'two-buttons': 'https://i.imgflip.com/1g8my4.jpg',
  'change-my-mind': 'https://i.imgflip.com/24y43o.jpg',
  'expanding-brain': 'https://i.imgflip.com/1jwhww.jpg',
  'is-this': 'https://i.imgflip.com/1o00in.jpg',
  'one-does-not': 'https://i.imgflip.com/1bij.jpg',
  'futurama-fry': 'https://i.imgflip.com/1bgw.jpg',
  'roll-safe': 'https://i.imgflip.com/1h7in3.jpg',
  'sad-pablo': 'https://i.imgflip.com/1c1uej.jpg',
  'success-kid': 'https://i.imgflip.com/mmm', // not on imgflip public API — use gradient
  'that-would-be-great': 'https://i.imgflip.com/mmm', // not on imgflip public API — use gradient
  // Reactions — confirmed via imgflip API
  'surprised-pikachu': 'https://i.imgflip.com/2kbn1e.jpg',
  'drakeposting': 'https://i.imgflip.com/mmm', // not on imgflip — no ID
  'surprised-tony': 'https://i.imgflip.com/mmm', // not on imgflip — no ID
  'mocking-spongebob': 'https://i.imgflip.com/1otk96.jpg',
  'crying-cat': 'https://i.imgflip.com/mmm', // not confirmed — no ID
  'handshake-sneak': 'https://i.imgflip.com/28j0te.jpg',
  'woman-yelling-at-cat': 'https://i.imgflip.com/345v97.jpg',
  'big-shoes': 'https://i.imgflip.com/mmm', // not on imgflip — no ID
  // Movies (most Disney/Marvel — use gradient fallbacks)
  'arthur-fist': 'https://i.imgflip.com/mmm', // not on imgflip — use gradient
  'loki-sit': 'https://i.imgflip.com/mmm', // Disney — use gradient
  'waiting-leo': 'https://i.imgflip.com/39t1o.jpg',
  'old-man-yells': 'https://i.imgflip.com/mmm', // not on imgflip — use gradient
  'gr-gregorio': 'https://i.imgflip.com/mmm', // not on imgflip — use gradient
  // Sports (not on imgflip public API — use gradient fallbacks)
  'crying-jordan': 'https://i.imgflip.com/mmm',
  'kobe-sigh': 'https://i.imgflip.com/mmm',
  'lebron-yell': 'https://i.imgflip.com/mmm',
  'tiger-thumbs': 'https://i.imgflip.com/mmm',
  // Animals
  'doge': 'https://i.imgflip.com/43a45p.png', // Buff Doge vs Cheems
  'stonks': 'https://i.imgflip.com/mmm', // unverified — may have ID
  'owl': 'https://i.imgflip.com/mmm',
  'cat': 'https://i.imgflip.com/mmm',
  'puppy-blue': 'https://i.imgflip.com/mmm',
  'this-is-fine': 'https://i.imgflip.com/wxica.jpg',
  // Gaming (not on imgflip — use gradient fallbacks)
  'gamer': 'https://i.imgflip.com/mmm',
  'button-game': 'https://i.imgflip.com/mmm',
  'skill-issue': 'https://i.imgflip.com/mmm',
  'gg': 'https://i.imgflip.com/mmm',
  // Text Only (not on imgflip — use gradient fallbacks)
  'anka': 'https://i.imgflip.com/mmm',
  'mischief': 'https://i.imgflip.com/mmm',
  'small-think': 'https://i.imgflip.com/mmm',
  'brain': 'https://i.imgflip.com/mmm',
};

// Gradient fallbacks for templates without real imgflip images
// (marked "mmm" in templateImages = no real ID found on imgflip)
const templateGradients = {
  // Now has real images — keep gradient as onerror fallback
  'drake': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'distracted-bf': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'two-buttons': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'change-my-mind': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'expanding-brain': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'is-this': 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'one-does-not': 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
  'futurama-fry': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  'roll-safe': 'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)',
  'sad-pablo': 'linear-gradient(135deg, #2d2d2d 0%, #4a4a4a 100%)',
  'success-kid': 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
  'doge': 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)',
  'this-is-fine': 'linear-gradient(135deg, #f093fb 0%, #4facfe 100%)',
  'surprised-pikachu': 'linear-gradient(135deg, #fff720 0%, #fa709a 100%)',
  'mocking-spongebob': 'linear-gradient(135deg, #4facfe 0%, #43a0f5 100%)',
  'handshake-sneak': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'waiting-leo': 'linear-gradient(135deg, #c471ed 0%, #f64f59 100%)',
  'woman-yelling-at-cat': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  // Templates not on imgflip — gradient is primary display
  'drakeposting': 'linear-gradient(135deg, #000428 0%, #004e92 100%)',
  'surprised-tony': 'linear-gradient(135deg, #536976 0%, #292e49 100%)',
  'crying-cat': 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
  'big-shoes': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  'arthur-fist': 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)',
  'loki-sit': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
  'old-man-yells': 'linear-gradient(135deg, #ff8c00 0%, #ffd700 100%)',
  'gr-gregorio': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'crying-jordan': 'linear-gradient(135deg, #0f0c29 0%, #302b63 100%)',
  'kobe-sigh': 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)',
  'lebron-yell': 'linear-gradient(135deg, #6d2e84 0%, #4facfe 100%)',
  'tiger-thumbs': 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)',
  'stonks': 'linear-gradient(135deg, #00b09b 0%, #96c93d 100%)',
  'owl': 'linear-gradient(135deg, #4a3f35 0%, #8b7355 100%)',
  'cat': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'puppy-blue': 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
  'gamer': 'linear-gradient(135deg, #1a1a2e 0%, #4a00e0 100%)',
  'button-game': 'linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)',
  'skill-issue': 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
  'gg': 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)',
  'anka': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'mischief': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'small-think': 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'brain': 'linear-gradient(135deg, #fff720 0%, #00d2ff 100%)',
};

// ============ UTILITIES ============
function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-message">${escapeHtml(message)}</span>
    <button class="toast-close" aria-label="Dismiss">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  `;

  toast.querySelector('.toast-close').addEventListener('click', () => {
    toast.remove();
  });

  elements.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 5000);
}

// ============ PRO UNLOCK ============
function loadProStatus() {
  const saved = localStorage.getItem('memeforge_pro');
  if (saved) {
    state.pro = true;
    updateProUI();
  }
}

function updateProUI() {
  // Update nav button
  if (state.pro) {
    elements.proBtn.textContent = 'PRO';
    elements.proBtn.style.background = 'var(--pro-badge)';
    elements.proBtn.style.color = '#000';
  }

  // Hide footer ad for pro
  if (state.pro) {
    elements.footerAd.classList.add('hidden');
  }

  // Update pro feature buttons
  const proBtns = elements.proFeatures.querySelectorAll('.pro-feature-btn');
  proBtns.forEach(btn => {
    if (!state.pro) {
      btn.classList.add('locked');
    }
  });

  // Update font style options
  const fontSelect = elements.fontStyleSelect;
  if (state.pro) {
    // Pro fonts already available in dropdown
  } else {
    // Remove pro font options
    Array.from(fontSelect.options).forEach(opt => {
      if (['Bangers', 'Oswald Bold'].includes(opt.value)) {
        opt.disabled = true;
      }
    });
  }
}

function attemptUnlock(emailOrCode) {
  // In production, this would verify against Gumroad's API
  // For demo, accept any non-empty input
  if (emailOrCode && emailOrCode.trim().length > 0) {
    state.pro = true;
    localStorage.setItem('memeforge_pro', JSON.stringify({
      email: emailOrCode.trim(),
      unlockDate: new Date().toISOString()
    }));
    updateProUI();
    showToast('Pro unlocked! Welcome to MemeForge Pro.', 'success');
    elements.proModal.hidden = true;
    return true;
  }
  showToast('Please enter a valid email or unlock code.', 'error');
  return false;
}

// ============ GALLERY RENDERING ============
function filterTemplates() {
  let filtered = [...templates];

  // Category filter
  if (state.currentCategory !== 'all') {
    filtered = filtered.filter(t => t.category === state.currentCategory);
  }

  // Search filter
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    filtered = filtered.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    );
  }

  state.filteredTemplates = filtered;
  renderGallery();
}

function renderGallery() {
  const templates = state.filteredTemplates;

  if (templates.length === 0 && state.currentCategory !== 'upload') {
    elements.galleryGrid.hidden = true;
    elements.galleryEmpty.hidden = false;
    elements.emptyQuery.textContent = state.searchQuery;
    return;
  }

  elements.galleryGrid.hidden = false;
  elements.galleryEmpty.hidden = true;

  // Prepend Upload card when upload tab is active
  let html = '';
  if (state.currentCategory === 'upload') {
    html += `
      <article class="template-card upload-card" tabindex="0" role="button" aria-label="Upload your own image">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
        <span>Upload Image</span>
      </article>
    `;
  }

  html += templates.map((template, index) => {
    const imgUrl = templateImages[template.id];
    const gradient = templateGradients[template.id];
    const style = gradient
      ? `background: ${gradient};`
      : `background-image: url('${imgUrl}'); background-size: cover; background-position: center;`;
    const isLocked = template.premium && !state.pro;

    return `
      <article
        class="template-card ${isLocked ? 'locked' : ''}"
        data-id="${template.id}"
        data-category="${template.category}"
        tabindex="0"
        role="listitem"
        aria-label="${escapeHtml(template.name)}${isLocked ? ' - Pro template' : ''}"
        style="animation-delay: ${index * 50}ms"
      >
        ${isLocked ? '<div class="pro-badge"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>' : ''}
        <img class="template-card-img" src="${imgUrl}" alt="${escapeHtml(template.name)}" loading="lazy" style="${style}" onerror="this.style.background='linear-gradient(135deg,#333,#555)'; this.removeAttribute('src');">
        <div class="template-card-info">
          <div class="template-card-name">${escapeHtml(template.name)}</div>
          <div class="template-card-category">${template.category}</div>
        </div>
      </article>
    `;
  }).join('');

  // Add click handlers
  elements.galleryGrid.querySelectorAll('.template-card:not(.locked)').forEach(card => {
    card.addEventListener('click', () => openEditor(card.dataset.id));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openEditor(card.dataset.id);
      }
    });
  });
}

// ============ EDITOR ============
function openEditor(templateId) {
  const template = templates.find(t => t.id === templateId);
  if (!template) return;

  state.currentTemplate = template;
  state.topText = '';
  state.bottomText = '';

  elements.editorTitle.textContent = template.name;
  elements.topTextInput.value = '';
  elements.bottomTextInput.value = '';

  // Reset to defaults
  state.fontColor = 'white';
  state.fontSize = 40;
  state.fontStyle = 'Impact';
  elements.fontSizeSlider.value = 40;
  elements.fontSizeValue.textContent = '40px';

  // Update color button states
  elements.fontColorToggle.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.color === 'white');
    btn.setAttribute('aria-pressed', btn.dataset.color === 'white');
  });

  // Show overlay
  elements.editorOverlay.hidden = false;
  document.body.style.overflow = 'hidden';

  // Render initial canvas
  renderCanvas();

  // Focus top text input
  setTimeout(() => elements.topTextInput.focus(), 100);
}

function closeEditor() {
  elements.editorOverlay.hidden = true;
  document.body.style.overflow = '';
  state.currentTemplate = null;
}

// ============ IMAGE UPLOAD ============
function triggerFileUpload() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    handleImageUpload(file);
  };
  input.click();
}

function handleImageUpload(file) {
  // Validate file
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    showToast('Image too large. Max 5MB.', 'error');
    return;
  }
  if (!file.type.startsWith('image/')) {
    showToast('Please select a valid image file.', 'error');
    return;
  }

  showToast('Loading image...', 'info');

  const reader = new FileReader();
  reader.onload = (loadEvent) => {
    const dataUrl = loadEvent.target.result;
    const uploadId = '__upload__' + Date.now();
    const name = file.name.replace(/\.[^.]+$/, '') || 'Custom Image';

    // Add to templates list
    templates.unshift({
      id: uploadId,
      name: name,
      category: 'upload',
      topArea: 'yes',
      botArea: 'yes',
      premium: false
    });

    // Store data URL as the image source
    templateImages[uploadId] = dataUrl;

    // Add a generic gradient fallback
    templateGradients[uploadId] = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

    // Rerender gallery first
    filterTemplates();

    // Switch to upload tab
    elements.tabButtons.forEach(b => b.classList.remove('active'));
    const uploadTab = document.querySelector('[data-category="upload"]');
    if (uploadTab) {
      uploadTab.classList.add('active');
    }
    state.currentCategory = 'upload';
    filterTemplates();

    // Open editor after brief delay for animation
    setTimeout(() => openEditor(uploadId), 300);

    showToast('Image loaded!', 'success');
  };

  reader.onerror = () => {
    showToast('Failed to load image. Try another file.', 'error');
  };

  reader.readAsDataURL(file);
}

// ============ CANVAS RENDERING ============
function renderCanvas() {
  const template = state.currentTemplate;
  if (!template) return;

  const canvas = elements.memeCanvas;
  const ctx = canvas.getContext('2d');
  const imgUrl = templateImages[template.id];

  // Use a loading placeholder while image loads
  canvas.width = 500;
  canvas.height = 500;

  // Draw dark placeholder while image loads
  ctx.fillStyle = '#1A1A2E';
  ctx.fillRect(0, 0, 500, 500);

  // Draw template name as loading state
  ctx.fillStyle = '#3A3A4E';
  ctx.font = '16px Poppins, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Loading template...', 250, 250);

  // Load and draw template image
  const img = new Image();
  img.crossOrigin = 'anonymous'; // Enable CORS for canvas export
  img.onload = () => {
    const canvas = elements.memeCanvas;
    const ctx = canvas.getContext('2d');

    // Size canvas to match image aspect ratio
    const maxW = 600;
    const maxH = 500;
    let drawW = img.width;
    let drawH = img.height;

    if (drawW > maxW) {
      drawH = (maxW / drawW) * drawH;
      drawW = maxW;
    }
    if (drawH > maxH) {
      drawW = (maxH / drawH) * drawW;
      drawH = maxH;
    }

    canvas.width = drawW;
    canvas.height = drawH;

    // Draw template image
    ctx.drawImage(img, 0, 0, drawW, drawH);

    // Draw meme text overlay
    drawMemeText(ctx, drawW, drawH);

    // Watermark (free tier)
    if (!state.pro) {
      ctx.font = `${Math.round(drawW * 0.025)}px Poppins, sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      ctx.fillText('MemeForge', drawW - 4, drawH - 4);
    }
  };

  img.onerror = () => {
    // Fallback: draw gradient + placeholder if image fails
    const canvas = elements.memeCanvas;
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;

    const gradient = ctx.createLinearGradient(0, 0, 500, 500);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 500, 500);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.font = '20px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(template.name, 250, 240);

    drawMemeText(ctx, 500, 500);

    if (!state.pro) {
      ctx.font = '12px Poppins, sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.textAlign = 'right';
      ctx.fillText('MemeForge', 496, 490);
    }
  };

  img.src = imgUrl;
}

function drawMemeText(ctx, width, height) {
  const topText = state.topText.toUpperCase();
  const bottomText = state.bottomText.toUpperCase();
  const fontStyle = state.fontStyle;
  const scale = width / 600; // Normalize to 600px wide canvas
  const baseFontSize = state.fontSize * scale;
  const textOffset = Math.max(12, baseFontSize * 0.5);
  let fontSize = baseFontSize;

  // Helper to set font
  const setFont = (size) => {
    ctx.font = `${size}px "${fontStyle}", Impact, sans-serif`;
  };

  // Set default text alignment
  ctx.textAlign = 'center';

  // Top text
  ctx.textBaseline = 'top';
  if (topText) {
    setFont(fontSize);
    const maxWidth = width * 0.92;
    while (ctx.measureText(topText).width > maxWidth && fontSize > baseFontSize * 0.35) {
      fontSize -= 2;
      setFont(fontSize);
    }

    // Draw stroke (outline) for contrast
    ctx.strokeStyle = state.fontColor === 'white' ? '#000' : '#fff';
    ctx.lineWidth = Math.max(2, fontSize / 10);
    ctx.lineJoin = 'round';
    ctx.strokeText(topText, width / 2, textOffset);

    // Draw fill
    ctx.fillStyle = state.fontColor === 'white' ? '#ffffff' : '#000000';
    ctx.fillText(topText, width / 2, textOffset);
  }

  // Bottom text
  if (bottomText) {
    fontSize = baseFontSize;
    ctx.textBaseline = 'bottom';

    setFont(fontSize);
    const maxWidth = width * 0.92;
    while (ctx.measureText(bottomText).width > maxWidth && fontSize > baseFontSize * 0.35) {
      fontSize -= 2;
      setFont(fontSize);
    }

    // Draw stroke
    ctx.strokeStyle = state.fontColor === 'white' ? '#000' : '#fff';
    ctx.lineWidth = Math.max(2, fontSize / 10);
    ctx.lineJoin = 'round';
    ctx.strokeText(bottomText, width / 2, height - textOffset);

    // Draw fill
    ctx.fillStyle = state.fontColor === 'white' ? '#ffffff' : '#000000';
    ctx.fillText(bottomText, width / 2, height - textOffset);
  }
}

// ============ DOWNLOAD ============
async function downloadPNG() {
  const btn = elements.downloadBtn;
  const originalText = btn.querySelector('.btn-text').textContent;

  btn.disabled = true;
  btn.querySelector('.btn-text').textContent = 'RENDERING...';

  try {
    // Small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 100));

    // Get canvas data URL
    const canvas = elements.memeCanvas;
    const dataUrl = canvas.toDataURL('image/png');

    // Create download link
    const link = document.createElement('a');
    link.download = `${state.currentTemplate?.id || 'meme'}-meme.png`;
    link.href = dataUrl;
    link.click();

    // Success feedback
    btn.classList.add('success');
    btn.querySelector('.btn-text').textContent = '✓ SAVED';

    showToast('Meme saved!', 'success');

    // Reset after 1.5s
    setTimeout(() => {
      btn.classList.remove('success');
      btn.querySelector('.btn-text').textContent = originalText;
      btn.disabled = false;
    }, 1500);

  } catch (err) {
    showToast('Download failed. Try again.', 'error');
    btn.querySelector('.btn-text').textContent = originalText;
    btn.disabled = false;
  }
}

async function copyToClipboard() {
  try {
    const canvas = elements.memeCanvas;
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob })
    ]);

    showToast('Copied to clipboard!', 'success');
  } catch (err) {
    showToast('Copy failed. Download instead.', 'error');
  }
}

// ============ EVENT HANDLERS ============
function initEventListeners() {
  // Search
  elements.searchInput.addEventListener('input', debounce((e) => {
    state.searchQuery = e.target.value.trim();
    filterTemplates();
  }, 150));

  // Category tabs
  elements.tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      elements.tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentCategory = btn.dataset.category;
      filterTemplates();
    });
  });

  // Editor back / X close
  elements.editorBack.addEventListener('click', closeEditor);
  if (elements.editorXClose) {
    elements.editorXClose.addEventListener('click', closeEditor);
  }

  // Editor overlay click outside to close
  elements.editorOverlay.addEventListener('click', (e) => {
    if (e.target === elements.editorOverlay) {
      closeEditor();
    }
  });

  // Text inputs
  elements.topTextInput.addEventListener('input', (e) => {
    state.topText = e.target.value;
    renderCanvas();
  });

  elements.bottomTextInput.addEventListener('input', (e) => {
    state.bottomText = e.target.value;
    renderCanvas();
  });

  // Font color
  elements.fontColorToggle.forEach(btn => {
    btn.addEventListener('click', () => {
      elements.fontColorToggle.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      state.fontColor = btn.dataset.color;
      renderCanvas();
    });
  });

  // Font size
  elements.fontSizeSlider.addEventListener('input', (e) => {
    state.fontSize = parseInt(e.target.value, 10);
    elements.fontSizeValue.textContent = `${state.fontSize}px`;
    renderCanvas();
  });

  // Font style
  elements.fontStyleSelect.addEventListener('change', (e) => {
    state.fontStyle = e.target.value;
    renderCanvas();
  });

  // Download
  elements.downloadBtn.addEventListener('click', downloadPNG);

  // Copy
  elements.copyBtn.addEventListener('click', copyToClipboard);

  // Pro button
  elements.proBtn.addEventListener('click', () => {
    elements.proModal.hidden = false;
  });

  // Pro modal close
  elements.proModalClose.addEventListener('click', () => {
    elements.proModal.hidden = true;
  });

  // Pro modal overlay click
  elements.proModal.addEventListener('click', (e) => {
    if (e.target === elements.proModal) {
      elements.proModal.hidden = true;
    }
  });

  // Unlock button
  elements.unlockBtn.addEventListener('click', () => {
    attemptUnlock(elements.unlockEmail.value);
  });

  elements.unlockEmail.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') attemptUnlock(elements.unlockEmail.value);
  });

  // Toggle "Already own it?" unlock form
  if (elements.toggleUnlockBtn) {
    elements.toggleUnlockBtn.addEventListener('click', () => {
      const isHidden = elements.existingUnlock.hidden;
      elements.existingUnlock.hidden = !isHidden;
      elements.toggleUnlockBtn.textContent = isHidden
        ? 'Hide unlock form'
        : 'Already own it? Unlock here';
    });
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Close editor on Escape
    if (e.key === 'Escape') {
      if (!elements.editorOverlay.hidden) {
        closeEditor();
      } else if (!elements.proModal.hidden) {
        elements.proModal.hidden = true;
      }
    }
  });

  // Ctrl+S to download
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      if (!elements.editorOverlay.hidden) {
        downloadPNG();
      }
    }
  });

  // Ctrl+C to copy (when editor is open)
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'c' && !elements.editorOverlay.hidden) {
      // Only copy if not selecting text
      if (window.getSelection().toString() === '') {
        e.preventDefault();
        copyToClipboard();
      }
    }
  });

  // Pro feature buttons
  document.getElementById('no-watermark-btn').addEventListener('click', () => {
    if (state.pro) {
      showToast('Watermark removed!', 'success');
    } else {
      elements.proModal.hidden = false;
    }
  });

  document.getElementById('extra-styles-btn').addEventListener('click', () => {
    if (state.pro) {
      elements.fontStyleSelect.querySelector('option[value="Bangers"]').disabled = false;
      elements.fontStyleSelect.querySelector('option[value="Oswald Bold"]').disabled = false;
      showToast('Extra fonts unlocked!', 'success');
    } else {
      elements.proModal.hidden = false;
    }
  });

  // Upload card click and keyboard
  elements.galleryGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.upload-card');
    if (card) triggerFileUpload();
  });

  elements.galleryGrid.addEventListener('keydown', (e) => {
    const card = e.target.closest('.upload-card');
    if (card && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      triggerFileUpload();
    }
  });
}

// ============ INIT ============
function init() {
  state.templates = templates;
  state.filteredTemplates = templates;

  loadProStatus();

  // Show paywall on first page load for non-pro users
  if (!state.pro) {
    elements.proModal.hidden = false;
  }

  initEventListeners();
  renderGallery();
}

// Start app
document.addEventListener('DOMContentLoaded', init);