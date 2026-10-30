const toggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('#navigation');
function closeNavigation() {
  navigation.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}
toggle.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNavigation));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeNavigation();
    toggle.focus();
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();

// Menu pozostaje dostępne w HTML również bez JavaScript.
const search = document.querySelector('#menu-search');
if (search) {
  let selected = 'all';
  const groups = [...document.querySelectorAll('[data-menu-group]')];
  const buttons = [...document.querySelectorAll('[data-category]')];
  const normalize = text => text.toLocaleLowerCase('pl').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ł/g, 'l');
  function filterMenu() {
    const query = normalize(search.value.trim());
    let count = 0;
    for (const group of groups) {
      let visible = 0;
      const categoryMatches = selected === 'all' || group.dataset.menuGroup === selected;
      for (const item of group.querySelectorAll('.menu-item')) {
        const matches = categoryMatches && normalize(item.querySelector('div').textContent).includes(query);
        item.hidden = !matches;
        if (matches) visible++;
      }
      group.hidden = visible === 0;
      count += visible;
    }
    document.querySelector('#menu-empty').hidden = count !== 0;
    document.querySelector('#result-count').textContent = `Widoczne pozycje: ${count}`;
  }
  function selectCategory(id) {
    selected = groups.some(group => group.dataset.menuGroup === id) ? id : 'all';
    buttons.forEach(button => {
      const active = button.dataset.category === selected;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    filterMenu();
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    // Zmiana kategorii rozpoczyna nowe wyszukiwanie.
    search.value = '';
    selectCategory(button.dataset.category);
    history.replaceState(null, '', selected === 'all' ? location.pathname : `#${selected}`);
  }));
  search.addEventListener('input', filterMenu);
  window.addEventListener('hashchange', () => { search.value = ''; selectCategory(location.hash.slice(1)); });
  selectCategory(location.hash.slice(1));
}

// Linki w galerii prowadzą do plików także bez obsługi dialogu lub JavaScript.
const galleryDialog = document.querySelector('.gallery-dialog');
const galleryLinks = [...document.querySelectorAll('.gallery-open')];
if (galleryDialog && typeof galleryDialog.showModal === 'function') {
  let currentImage = 0;
  let opener;
  function showImage(index) {
    currentImage = (index + galleryLinks.length) % galleryLinks.length;
    const link = galleryLinks[currentImage];
    const image = link.querySelector('img');
    const largeImage = document.querySelector('#gallery-image');
    largeImage.src = link.href;
    largeImage.alt = image.alt;
    document.querySelector('#gallery-caption').textContent = link.closest('figure').querySelector('figcaption span').textContent;
    document.querySelector('#gallery-counter').textContent = `${currentImage + 1} / ${galleryLinks.length} — WNĘTRZA GUSTA`;
  }
  galleryLinks.forEach((link, index) => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = link;
    showImage(index);
    galleryDialog.showModal();
    document.body.classList.add('gallery-is-open');
  }));
  galleryDialog.querySelector('.gallery-close').addEventListener('click', () => galleryDialog.close());
  galleryDialog.querySelector('.gallery-prev').addEventListener('click', () => showImage(currentImage - 1));
  galleryDialog.querySelector('.gallery-next').addEventListener('click', () => showImage(currentImage + 1));
  galleryDialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showImage(currentImage + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  galleryDialog.addEventListener('click', event => {
    const rect = galleryDialog.getBoundingClientRect();
    if (event.target === galleryDialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) galleryDialog.close();
  });
  galleryDialog.addEventListener('close', () => {
    document.body.classList.remove('gallery-is-open');
    opener?.focus({ preventScroll: true });
  });
}

// Wejście sekcji nie blokuje treści bez JS ani przy ograniczeniu animacji.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.remove('is-pending');
        revealObserver.unobserve(entry.target);
      }
    }
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => {
    if (element.getBoundingClientRect().top > window.innerHeight) element.classList.add('is-pending');
    revealObserver.observe(element);
  });
}


const interiorPanels = [...document.querySelectorAll('.interior-panel')];
if (interiorPanels.length) {
  function expandPanel(panel) {
    interiorPanels.forEach(item => {
      const expanded = item === panel;
      item.classList.toggle('is-expanded', expanded);
      item.querySelector('.panel-toggle').setAttribute('aria-expanded', String(expanded));
      item.querySelector('.panel-zoom').tabIndex = expanded ? 0 : -1;
    });
  }
  interiorPanels.forEach((panel, index) => {
    const toggle = panel.querySelector('.panel-toggle');
    toggle.addEventListener('click', () => expandPanel(panel));
    panel.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') expandPanel(panel); });
    panel.addEventListener('focusin', () => expandPanel(panel));
    toggle.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
      event.preventDefault();
      const direction = ['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1;
      const next = interiorPanels[(index + direction + interiorPanels.length) % interiorPanels.length];
      expandPanel(next);
      next.querySelector('.panel-toggle').focus({ preventScroll: true });
    });
  });
  expandPanel(interiorPanels[0]);
}

const hero = document.querySelector('.hero');
const heroSlides = [...document.querySelectorAll('.hero-slide')];
if (hero && heroSlides.length > 1) {
  const dots = [...document.querySelectorAll('[data-hero-slide]')];
  const pause = document.querySelector('.hero-pause');
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let currentHero = 0;
  let timer;
  let userPaused = motionPreference.matches;
  let heroVisible = true;
  function updatePlayback() {
    clearTimeout(timer);
    const stopped = userPaused || document.hidden || !heroVisible;
    hero.dataset.paused = String(stopped);
    pause.setAttribute('aria-label', userPaused ? 'Wznów pokaz zdjęć' : 'Wstrzymaj pokaz zdjęć');
    pause.querySelector('span').textContent = userPaused ? '▷' : 'Ⅱ';
    if (!stopped) timer = setTimeout(() => { showHero(currentHero + 1); updatePlayback(); }, 7000);
  }
  function showHero(index) {
    currentHero = (index + heroSlides.length) % heroSlides.length;
    heroSlides.forEach((slide, i) => {
      const active = i === currentHero;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    const image = heroSlides[currentHero].querySelector('img');
    image.style.animation = 'none';
    void image.offsetWidth;
    image.style.animation = '';
    dots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === currentHero)));
  }
  dots.forEach(dot => dot.addEventListener('click', () => { showHero(Number(dot.dataset.heroSlide)); updatePlayback(); }));
  pause.addEventListener('click', () => { userPaused = !userPaused; updatePlayback(); });
  document.addEventListener('visibilitychange', updatePlayback);
  motionPreference.addEventListener('change', () => { userPaused = motionPreference.matches; updatePlayback(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { heroVisible = entries[0].isIntersecting; updatePlayback(); }, { threshold: 0.05 }).observe(hero);
  }
  document.querySelector('.hero-playback').hidden = false;
  updatePlayback();
}
