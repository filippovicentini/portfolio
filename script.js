(() => {
  const overlay = document.getElementById('command-palette');
  const trigger = document.querySelector('.command-trigger');
  const search = document.getElementById('command-search');
  const empty = document.getElementById('command-empty');
  const items = Array.from(document.querySelectorAll('[data-command-item]'));
  const groups = Array.from(document.querySelectorAll('[data-command-group]'));
  let previousFocus = null;

  if (!overlay || !trigger || !search) return;

  const visibleItems = () => items.filter((item) => !item.hidden);

  const setActive = (item) => {
    items.forEach((entry) => entry.classList.toggle('is-active', entry === item));
  };

  const openPalette = () => {
    previousFocus = document.activeElement;
    overlay.hidden = false;
    document.body.classList.add('command-open');
    search.value = '';
    filterItems('');
    requestAnimationFrame(() => search.focus());
  };

  const closePalette = () => {
    overlay.hidden = true;
    document.body.classList.remove('command-open');
    setActive(null);
    if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
  };

  const filterItems = (query) => {
    const normalized = query.trim().toLowerCase();

    items.forEach((item) => {
      const haystack = `${item.textContent} ${item.dataset.keywords || ''}`.toLowerCase();
      item.hidden = normalized.length > 0 && !haystack.includes(normalized);
    });

    groups.forEach((group) => {
      const hasVisible = Array.from(group.querySelectorAll('[data-command-item]')).some((item) => !item.hidden);
      group.hidden = !hasVisible;
    });

    const currentVisible = visibleItems();
    empty.hidden = currentVisible.length > 0;
    setActive(currentVisible[0] || null);
  };

  const moveFocus = (direction) => {
    const currentVisible = visibleItems();
    if (!currentVisible.length) return;

    const activeElement = document.activeElement;
    let index = currentVisible.indexOf(activeElement);

    if (index === -1) {
      index = direction > 0 ? -1 : 0;
    }

    const nextIndex = (index + direction + currentVisible.length) % currentVisible.length;
    const next = currentVisible[nextIndex];
    next.focus();
    setActive(next);
  };

  trigger.addEventListener('click', openPalette);

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closePalette();
  });

  search.addEventListener('input', () => filterItems(search.value));

  items.forEach((item) => {
    item.addEventListener('focus', () => setActive(item));
    item.addEventListener('mouseenter', () => setActive(item));
    item.addEventListener('click', () => closePalette());
  });

  document.addEventListener('keydown', (event) => {
    const shortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k';

    if (shortcut) {
      event.preventDefault();
      overlay.hidden ? openPalette() : closePalette();
      return;
    }

    if (overlay.hidden) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closePalette();
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      moveFocus(1);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      moveFocus(-1);
      return;
    }

    if (event.key === 'Enter' && document.activeElement === search) {
      const first = visibleItems()[0];
      if (first) {
        event.preventDefault();
        first.click();
      }
    }
  });
})();

// Subtle pointer-following glow for featured project cards.
(() => {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (!finePointer.matches) return;

  const cards = document.querySelectorAll('.project--showcase');

  cards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      card.style.setProperty('--glow-x', `${x}px`);
      card.style.setProperty('--glow-y', `${y}px`);
    });

    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--glow-x', '50%');
      card.style.setProperty('--glow-y', '50%');
    });
  });
})();


// Subtle one-time reveal animations while scrolling.
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const groups = [
    { selector: '#progetti .heading, #progetti .projects-section-label, #progetti .project--showcase, #progetti .projects-secondary-header, #progetti .project--compact', step: 70 },
    { selector: '#esperienza .experience-intro, #esperienza .experience-role', step: 90 },
    { selector: '#competenze .heading, #competenze .skills-foundation, #competenze .skill-card, #competenze .skills-secondary', step: 55 },
    { selector: '#education .education-head, #education .degree-card, #education .certification-panel', step: 80 },
    { selector: 'footer .eyebrow, footer h2, footer .contact-card, footer .footer-bottom', step: 70 }
  ];

  const targets = [];

  groups.forEach(({ selector, step }) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      if (element.dataset.revealBound === 'true') return;
      element.dataset.revealBound = 'true';
      element.style.setProperty('--reveal-delay', `${Math.min(index * step, 280)}ms`);
      element.classList.add('reveal-on-scroll');
      targets.push(element);
    });
  });

  if (!targets.length) return;

  if (reducedMotion || !('IntersectionObserver' in window)) {
    targets.forEach((element) => element.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      instance.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -7% 0px'
  });

  targets.forEach((element) => observer.observe(element));
})();


// Minimal scroll progress bar at the very top of the viewport.
(() => {
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');

  const bar = document.createElement('div');
  bar.className = 'scroll-progress-bar';
  progress.appendChild(bar);
  document.body.appendChild(progress);

  let ticking = false;

  const updateProgress = () => {
    const doc = document.documentElement;
    const scrollable = Math.max(doc.scrollHeight - window.innerHeight, 0);
    const ratio = scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0;
    bar.style.setProperty('--scroll-progress', ratio.toFixed(4));
    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateProgress);
  };

  updateProgress();
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
})();
