/*
 * Visual sizing controls for the reconstructed Sundae Club campaign sections.
 * Open index.html?customize=1 to show the editor. Changes are stored locally in
 * the browser; use Copy CSS settings to apply them as permanent defaults in styles.css.
 */
(() => {
  'use strict';

  const STORAGE_KEY = 'sundaeClubEditableBannerSettings-v2';
  const banners = [
    { selector: '.hero-rebuilt', label: 'Homepage hero' },
    { selector: '.dessert-rebuilt', label: 'Dessert-inspired' },
    { selector: '.mood-rebuilt', label: 'Choose your mood' },
    { selector: '.touch-rebuilt', label: 'Touch test' },
    { selector: '.offer-rebuilt', label: 'Sweet Duo offer' }
  ];
  const defaults = Object.fromEntries(banners.map(({ selector }) => [selector, { width: 100, scale: 100, space: 100 }]));

  function clamp(value, min, max, fallback) {
    const n = Number(value);
    return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
  }

  function readSettings() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {};
      return Object.fromEntries(banners.map(({ selector }) => {
        const saved = stored[selector] || {};
        return [selector, {
          width: clamp(saved.width, 60, 100, 100),
          scale: clamp(saved.scale, 75, 120, 100),
          space: clamp(saved.space, 70, 135, 100)
        }];
      }));
    } catch (_) {
      return JSON.parse(JSON.stringify(defaults));
    }
  }

  let settings = readSettings();

  function applySettings() {
    banners.forEach(({ selector }) => {
      const element = document.querySelector(selector);
      if (!element) return;
      const value = settings[selector];
      element.style.setProperty('--banner-width', `${value.width}%`);
      element.style.setProperty('--banner-scale', String(value.scale / 100));
      element.style.setProperty('--banner-space', String(value.space / 100));
    });
  }

  function saveSettings() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch (_) { /* private browsing can block storage */ }
  }

  function cssRules() {
    return '/* Sundae Club adjustable campaign sections — paste at the end of styles.css */\n' +
      banners.map(({ selector }) => {
        const item = settings[selector];
        return `${selector} { --banner-width: ${item.width}%; --banner-scale: ${Number((item.scale / 100).toFixed(2))}; --banner-space: ${Number((item.space / 100).toFixed(2))}; }`;
      }).join('\n');
  }

  applySettings();
  const params = new URLSearchParams(window.location.search);
  if (params.get('customize') !== '1') return;

  const editor = document.createElement('aside');
  editor.className = 'banner-editor';
  editor.setAttribute('aria-label', 'Campaign section design controls');
  editor.innerHTML = `
    <div class="banner-editor-head">
      <div><p class="eyebrow" style="margin-bottom:6px">DESIGN CONTROLS</p><h2 class="banner-editor-title">Adjust campaign sections</h2></div>
      <button class="banner-editor-close" type="button" aria-label="Close editor">×</button>
    </div>
    <p class="banner-editor-subtitle">These sections are rebuilt with live text and separate image layers, so their size, type scale and spacing can be changed without stretching one flattened banner.</p>
    <div class="banner-editor-controls"></div>
    <div class="banner-editor-actions">
      <button type="button" class="banner-editor-button" data-banner-reset>Reset all</button>
      <button type="button" class="banner-editor-button primary" data-banner-copy>Copy CSS settings</button>
    </div>
    <textarea class="banner-editor-css" aria-label="CSS settings to copy" readonly hidden></textarea>
    <p class="banner-editor-status" aria-live="polite">Changes save in this browser as you adjust.</p>
    <p class="banner-editor-subtitle" style="margin:6px 0 0">To apply these settings to every visitor, click Copy CSS settings and paste the generated rules at the end of <code>styles.css</code>. Text and buttons can be edited directly in <code>index.html</code>.</p>
  `;

  const controls = editor.querySelector('.banner-editor-controls');
  const status = editor.querySelector('.banner-editor-status');
  const cssOutput = editor.querySelector('.banner-editor-css');

  const definitions = [
    { key: 'width', label: 'Section width', min: 60, max: 100, step: 1, suffix: '%', hintLeft: '60%', hintRight: '100%' },
    { key: 'scale', label: 'Text & visual scale', min: 75, max: 120, step: 1, suffix: '%', hintLeft: '75%', hintRight: '120%' },
    { key: 'space', label: 'Section spacing', min: 70, max: 135, step: 1, suffix: '%', hintLeft: 'Compact', hintRight: 'Spacious' }
  ];

  banners.forEach(({ selector, label }, index) => {
    const group = document.createElement('section');
    group.className = 'banner-editor-group';
    group.innerHTML = `<h3 class="banner-editor-group-title">${label}</h3>`;

    definitions.forEach(def => {
      const row = document.createElement('div');
      row.className = 'banner-editor-row';
      const inputId = `banner-${index}-${def.key}`;
      row.innerHTML = `
        <div class="banner-editor-label-line"><label for="${inputId}">${def.label}</label><output class="banner-editor-value" for="${inputId}">${settings[selector][def.key]}${def.suffix}</output></div>
        <input class="banner-editor-range" id="${inputId}" type="range" min="${def.min}" max="${def.max}" step="${def.step}" value="${settings[selector][def.key]}" data-banner-selector="${selector}" data-banner-key="${def.key}">
        <div class="banner-editor-range-hint"><span>${def.hintLeft}</span><span>${def.hintRight}</span></div>
      `;
      const slider = row.querySelector('input');
      const output = row.querySelector('output');
      slider.addEventListener('input', () => {
        const key = slider.dataset.bannerKey;
        settings[selector][key] = Number(slider.value);
        output.value = `${slider.value}${def.suffix}`;
        output.textContent = `${slider.value}${def.suffix}`;
        applySettings();
        saveSettings();
        cssOutput.hidden = true;
        status.textContent = `${label} updated and saved in this browser.`;
      });
      group.appendChild(row);
    });
    controls.appendChild(group);
  });

  editor.querySelector('[data-banner-reset]').addEventListener('click', () => {
    settings = JSON.parse(JSON.stringify(defaults));
    editor.querySelectorAll('[data-banner-selector]').forEach(slider => {
      const selector = slider.dataset.bannerSelector;
      const key = slider.dataset.bannerKey;
      slider.value = settings[selector][key];
      slider.closest('.banner-editor-row').querySelector('output').textContent = `${slider.value}%`;
    });
    applySettings();
    saveSettings();
    cssOutput.hidden = true;
    status.textContent = 'All five sections reset to their default sizes.';
  });

  editor.querySelector('[data-banner-copy]').addEventListener('click', async () => {
    cssOutput.value = cssRules();
    cssOutput.hidden = false;
    cssOutput.focus();
    cssOutput.select();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(cssOutput.value);
        status.textContent = 'CSS copied. Paste it at the end of styles.css.';
      } else if (document.execCommand('copy')) {
        status.textContent = 'CSS copied. Paste it at the end of styles.css.';
      } else {
        status.textContent = 'CSS is selected below. Copy it and paste it at the end of styles.css.';
      }
    } catch (_) {
      status.textContent = 'CSS is selected below. Copy it and paste it at the end of styles.css.';
    }
  });

  editor.querySelector('.banner-editor-close').addEventListener('click', () => {
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.delete('customize');
    window.history.replaceState({}, '', nextUrl);
    editor.remove();
  });

  document.body.appendChild(editor);
})();
