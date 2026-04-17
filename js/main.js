// ============================================================
// TV-CHECKPROGRAMM — Main Application
// ============================================================

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const { CHANNELS, CATEGORY_LABELS, getSchedule, getCurrentShow, isLive, getProgress, getCurrentTimeStr } = window.AppData;

  // ======= STATE =======
  const state = {
    selectedDate: new Date(),
    filter: 'all',       // all | tv | radio | movies | sport | news | kids | music | culture
    search: '',
    page: 'home',        // home | channel | about | faq | policy | docs | contacts
    selectedChannel: null,
    channelPage: 0,
    ITEMS_PER_PAGE: 12,
    mobileMenuOpen: false,
    modalOpen: false,
    modalChannel: null,
    widgetMode: window.location.hash === '#widget',
  };

  // ======= DOM REFS =======
  const app = document.getElementById('app');
  document.body.classList.toggle('widget-mode', state.widgetMode);

  // ======= RENDER FUNCTIONS =======

  function render() {
    app.innerHTML = '';
    if (!state.widgetMode) {
      app.appendChild(renderHeader());
      app.appendChild(renderMobileMenu());
    }

    switch (state.page) {
      case 'home':    app.appendChild(renderHomePage()); break;
      case 'channel': app.appendChild(renderChannelPage()); break;
      case 'about':   app.appendChild(renderAboutPage()); break;
      case 'faq':     app.appendChild(renderFaqPage()); break;
      case 'policy':  app.appendChild(renderPolicyPage()); break;
      case 'docs':    app.appendChild(renderDocsPage()); break;
      case 'contacts':app.appendChild(renderContactsPage()); break;
    }

    if (!state.widgetMode) app.appendChild(renderFooter());
    if (state.modalOpen) app.appendChild(renderModal());

    bindEvents();
    updateClock();
  }

  window.addEventListener('app:schedule-updated', () => {
    if (state.page === 'home' || state.page === 'channel') {
      render();
    }
  });

  // ======= HEADER =======
  function renderHeader() {
    const el = document.createElement('header');
    el.className = 'header';
    el.innerHTML = `
      <div class="header-inner">
        <a class="logo" href="#" data-nav="home">
          <div class="logo-icon">📺</div>
          <span class="logo-text">TV-<span>CHECK</span></span>
        </a>
        <div class="header-search" style="position:relative">
          <span class="search-icon">🔍</span>
          <input type="text" id="headerSearch" placeholder="Поиск канала или передачи..." value="${state.search}" autocomplete="off">
          <div class="autocomplete" id="headerAutocomplete"></div>
        </div>
        <nav class="header-nav">
          <a href="#" data-nav="home" class="${state.page==='home'?'active':''}">Главная</a>
          <a href="#" data-nav="about" class="${state.page==='about'?'active':''}">О сервисе</a>
          <a href="#" data-nav="docs" class="${state.page==='docs'?'active':''}">Документация</a>
          <a href="#" data-nav="faq" class="${state.page==='faq'?'active':''}">FAQ</a>
          <span class="live-badge">В ЭФИРЕ</span>
        </nav>
        <div class="burger" id="burgerBtn"><span></span><span></span><span></span></div>
      </div>
    `;
    return el;
  }

  function renderMobileMenu() {
    const el = document.createElement('div');
    el.className = `mobile-menu${state.mobileMenuOpen ? ' open' : ''}`;
    el.innerHTML = `
      <div class="mobile-search">
        <input type="text" id="mobileSearch" placeholder="Поиск..." value="${state.search}">
        <button class="btn-primary" id="mobileSearchBtn" style="padding:10px 16px">🔍</button>
      </div>
      <a href="#" data-nav="home">🏠 Главная</a>
      <a href="#" data-nav="about">ℹ️ О сервисе</a>
      <a href="#" data-nav="docs">📄 Документация</a>
      <a href="#" data-nav="faq">❓ FAQ</a>
      <a href="#" data-nav="policy">🔒 Политика конфиденциальности</a>
      <a href="#" data-nav="contacts">📧 Контакты</a>
    `;
    return el;
  }

  // ======= HOME PAGE =======
  function renderHomePage() {
    const wrap = document.createElement('div');
    wrap.className = 'page';
    wrap.innerHTML = `
      ${state.widgetMode ? '' : renderHero()}
      ${renderDateBar()}
      ${renderFilterBar()}
    `;
    const mainLayout = document.createElement('div');
    mainLayout.className = 'main-layout';
    if (!state.widgetMode) mainLayout.appendChild(renderSidebar());
    mainLayout.appendChild(renderScheduleSection());
    wrap.appendChild(mainLayout);
    if (!state.widgetMode) {
      wrap.innerHTML += renderFeaturesSection();
      wrap.innerHTML += renderFaqSection();
    }
    return wrap;
  }

  function renderHero() {
    return `
      <section class="hero">
        <div class="hero-eyebrow">📡 Расписание в реальном времени</div>
        <h1>TV-<span>CHECK</span><br>PROGRAMM</h1>
        <p>Полное расписание российских и зарубежных каналов. Сначала показываем локальный кэш, затем подгружаем фактический EPG.</p>
        <div class="hero-search" style="position:relative">
          <input type="text" id="heroSearch" placeholder="Введите название канала или передачи..." value="${state.search}" autocomplete="off">
          <div class="autocomplete" id="heroAutocomplete"></div>
          <button class="btn-primary" id="heroSearchBtn">Найти →</button>
        </div>
        <div class="hero-stats">
          <div class="hero-stat"><div class="num">${CHANNELS.filter(c=>c.type==='tv').length}+</div><div class="label">ТВ каналов</div></div>
          <div class="hero-stat"><div class="num">${CHANNELS.filter(c=>c.type==='radio').length}+</div><div class="label">Радиостанций</div></div>
          <div class="hero-stat"><div class="num">24/7</div><div class="label">Обновление</div></div>
          <div class="hero-stat"><div class="num">7</div><div class="label">Дней расписания</div></div>
        </div>
      </section>
    `;
  }

  function renderDateBar() {
    const today = new Date();
    const dates = [];
    for (let i = -3; i <= 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push(d);
    }
    const days = ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'];
    const months = ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек'];
    let html = '<div class="date-bar"><div class="date-bar-inner">';
    dates.forEach(d => {
      const isSel = d.toDateString() === state.selectedDate.toDateString();
      const isToday = d.toDateString() === today.toDateString();
      const isYes = d.toDateString() === new Date(today.getTime() - 86400000).toDateString();
      let label = `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`;
      if (isToday) label = 'Сегодня';
      else if (isYes) label = 'Вчера';
      else if (d.getTime() === today.getTime() + 86400000) label = 'Завтра';
      html += `<button class="date-btn${isSel?' active':''}${isToday?' today':''}" data-date="${d.toISOString()}">${label}</button>`;
    });
    html += '</div></div>';
    return html;
  }

  function renderFilterBar() {
    const filters = [
      { key: 'all', label: '📺 Все' },
      { key: 'tv', label: '🖥 ТВ', type: 'tv' },
      { key: 'radio', label: '📻 Радио', type: 'radio' },
      { key: 'movies', label: '🎬 Кино', type: 'movies' },
      { key: 'sport', label: '⚽ Спорт', type: 'sport' },
      { key: 'news', label: '📰 Новости', type: 'news' },
      { key: 'kids', label: '🧸 Детские', type: 'kids' },
      { key: 'music', label: '🎵 Музыкальные', type: 'music' },
      { key: 'culture', label: '🎭 Культура', type: 'culture' },
    ];
    let html = '<div class="filter-bar"><div class="filter-bar-inner">';
    filters.forEach(f => {
      html += `<button class="filter-chip${state.filter===f.key?' active':''}" data-filter="${f.key}" data-type="${f.type||''}">${f.label}</button>`;
    });
    html += `<div class="time-filter" style="margin-left:auto">
      <button class="time-btn" data-time="all">Весь день</button>
      <button class="time-btn" data-time="morning">Утро</button>
      <button class="time-btn" data-time="day">День</button>
      <button class="time-btn" data-time="evening">Вечер</button>
    </div>`;
    html += '</div></div>';
    return html;
  }

  function renderSidebar() {
    const el = document.createElement('aside');
    el.className = 'sidebar';
    const tvCats = ['federal','entertainment','news','sport','kids','music','culture','movies','regional'];
    const radioCats = ['radio-music','radio-news','radio-talk','radio-sport'];

    let html = `<div class="sidebar-section">
      <div class="sidebar-title">Телеканалы</div>
      <div class="sidebar-link${state.filter==='tv'?'  active':''}" data-filter="tv"><span class="icon">🖥</span> Все ТВ <span class="count">${CHANNELS.filter(c=>c.type==='tv').length}</span></div>`;

    tvCats.forEach(cat => {
      const count = CHANNELS.filter(c => c.category === cat).length;
      if (!count) return;
      html += `<div class="sidebar-link" data-cat="${cat}"><span class="icon">▸</span> ${window.AppData.CATEGORY_LABELS[cat]||cat} <span class="count">${count}</span></div>`;
    });

    html += `</div><div class="sidebar-section">
      <div class="sidebar-title">Радиостанции</div>
      <div class="sidebar-link${state.filter==='radio'?' active':''}" data-filter="radio"><span class="icon">📻</span> Всё Радио <span class="count">${CHANNELS.filter(c=>c.type==='radio').length}</span></div>`;

    radioCats.forEach(cat => {
      const count = CHANNELS.filter(c => c.category === cat).length;
      if (!count) return;
      html += `<div class="sidebar-link" data-cat="${cat}"><span class="icon">▸</span> ${window.AppData.CATEGORY_LABELS[cat]||cat} <span class="count">${count}</span></div>`;
    });

    html += `</div><div class="sidebar-section">
      <div class="sidebar-title">Информация</div>
      <div class="sidebar-link" data-nav="about"><span class="icon">ℹ️</span> О сервисе</div>
      <div class="sidebar-link" data-nav="faq"><span class="icon">❓</span> Вопросы и ответы</div>
      <div class="sidebar-link" data-nav="docs"><span class="icon">📄</span> Документация</div>
      <div class="sidebar-link" data-nav="policy"><span class="icon">🔒</span> Политика</div>
      <div class="sidebar-link" data-nav="contacts"><span class="icon">📧</span> Контакты</div>
    </div>`;
    el.innerHTML = html;
    return el;
  }

  function renderScheduleSection() {
    const wrap = document.createElement('div');

    // Filter channels
    let channels = CHANNELS.filter(c => {
      if (state.filter === 'tv') return c.type === 'tv';
      if (state.filter === 'radio') return c.type === 'radio';
      if (state.filter === 'movies') return c.category === 'movies';
      if (state.filter === 'sport') return c.category === 'sport';
      if (state.filter === 'news') return c.category === 'news';
      if (state.filter === 'kids') return c.category === 'kids';
      if (state.filter === 'music') return c.category === 'music' || c.category === 'radio-music';
      if (state.filter === 'culture') return c.category === 'culture';
      return true;
    });

    // Search
    if (state.search.trim()) {
      const q = state.search.trim().toLowerCase();
      channels = channels.filter(c => c.name.toLowerCase().includes(q));
    }

    // Pagination
    const total = channels.length;
    const shown = channels.slice(0, (state.channelPage + 1) * state.ITEMS_PER_PAGE);

    if (state.search) {
      const lbl = document.createElement('div');
      lbl.className = 'search-results-bar';
      lbl.innerHTML = `<div class="search-results-label">Найдено каналов: <strong>${total}</strong> по запросу "<strong>${state.search}</strong>"</div>`;
      wrap.appendChild(lbl);
    }

    const grid = document.createElement('div');
    grid.className = 'schedule-grid';

    if (shown.length === 0) {
      grid.innerHTML = `<div class="empty-state"><div class="big-icon">📭</div><h3>Ничего не найдено</h3><p>Попробуйте изменить фильтр или поисковый запрос</p></div>`;
    } else {
      shown.forEach((ch, i) => {
        const schedule = getSchedule(ch.id, state.selectedDate);
        grid.appendChild(renderChannelCard(ch, schedule, i));
      });
    }

    wrap.appendChild(grid);

    if (shown.length < total) {
      const more = document.createElement('div');
      more.className = 'load-more-wrap';
      more.innerHTML = `<button class="btn-outline" id="loadMoreBtn">Показать ещё каналы (${total - shown.length})</button>`;
      wrap.appendChild(more);
    }

    return wrap;
  }

  function renderChannelCard(ch, schedule, animIdx) {
    const card = document.createElement('div');
    card.className = 'channel-card';
    card.style.animationDelay = `${animIdx * 0.04}s`;

    const badgeClass = `badge-${ch.category === 'radio-music' || ch.category === 'radio-talk' || ch.category === 'radio-news' || ch.category === 'radio-sport' ? 'radio' : ch.category}`;
    const badgeLabel = ch.type === 'radio' ? 'Радио' : (window.AppData.CATEGORY_LABELS[ch.category] || ch.category);

    const currentShow = getCurrentShow(schedule);

    // Show 5 items around current
    const now = new Date();
    const curIdx = schedule.findIndex(s => s === currentShow);
    const startIdx = Math.max(0, curIdx - 1);
    const visItems = schedule.slice(startIdx, startIdx + 6);

    let schedHtml = visItems.map((item, i) => {
      const absIdx = startIdx + i;
      const live = isLive(item, schedule, absIdx);
      const prog = live ? getProgress(item, schedule, absIdx) : 0;
      return `<div class="schedule-item${live ? ' is-live' : ''}" data-show="${encodeURIComponent(item.title)}" data-channel="${ch.id}">
        <div class="sched-time">${item.time}</div>
        <div class="sched-info">
          <div class="sched-title">${item.title}</div>
          <div class="sched-desc">${item.genre}${live ? ` · ${item.duration} мин` : ''}</div>
          ${live ? `<div class="now-progress"><div class="now-progress-bar" style="width:${prog}%"></div></div>` : ''}
        </div>
        ${live ? `<div class="sched-genre" style="color:var(--live)">В ЭФИРЕ</div>` : `<div class="sched-genre">${item.genre}</div>`}
      </div>`;
    }).join('');

    card.innerHTML = `
      <div class="channel-header" data-channel-open="${ch.id}">
        <div class="channel-logo" style="border-color:${ch.color}22">
          <div style="width:48px;height:48px;border-radius:10px;background:${ch.color}22;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:${ch.color}">${ch.icon}</div>
        </div>
        <div class="channel-meta">
          <div class="channel-name">${ch.name}</div>
          <div style="display:flex;align-items:center;gap:6px;margin-top:3px">
            <span class="channel-type-badge ${badgeClass}">${badgeLabel}</span>
          </div>
        </div>
        <div class="channel-now">
          <div class="now-label">СЕЙЧАС</div>
          <div class="now-show">${currentShow ? currentShow.title : '—'}</div>
        </div>
      </div>
      <div class="channel-schedule">${schedHtml}</div>
      <button class="show-more-btn" data-channel-detail="${ch.id}">Полное расписание →</button>
    `;
    return card;
  }

  function renderFeaturesSection() {
    return `
      <section class="features-section">
        <div class="section-header">
          <div class="section-eyebrow">Возможности</div>
          <div class="section-title">ВСЁ ЧТО НУЖНО</div>
          <p class="section-desc">Мощный агрегатор телерадиопрограмм с удобным интерфейсом и поиском по всем каналам</p>
        </div>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">📡</div>
            <div class="feature-title">${CHANNELS.length}+ каналов и радиостанций</div>
            <p class="feature-desc">Полный охват российских федеральных, региональных и тематических каналов, а также радиостанций.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🔍</div>
            <div class="feature-title">Умный поиск</div>
            <p class="feature-desc">Ищите не только канал, но и конкретную передачу. Мгновенные подсказки в автодополнении.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📅</div>
            <div class="feature-title">Расписание на 7 дней</div>
            <p class="feature-desc">Смотрите программу передач на неделю вперёд и назад — планируйте просмотр заранее.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🟢</div>
            <div class="feature-title">Текущий эфир</div>
            <p class="feature-desc">Всегда видите, что идёт сейчас — с индикатором прогресса и оставшимся временем.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📱</div>
            <div class="feature-title">Мобильная версия</div>
            <p class="feature-desc">Полностью адаптированный дизайн для смартфонов и планшетов любых размеров.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <div class="feature-title">Мгновенная загрузка</div>
            <p class="feature-desc">Никаких лишних запросов — расписание загружается мгновенно, без ожиданий.</p>
          </div>
        </div>
      </section>
    `;
  }

  function renderFaqSection() {
    return `
      <section class="faq-section">
        <div class="section-header">
          <div class="section-eyebrow">FAQ</div>
          <div class="section-title">ЧАСТЫЕ ВОПРОСЫ</div>
        </div>
        <div class="faq-list" style="max-width:760px;margin:0 auto">
          ${[
            ['Как найти расписание конкретного канала?', 'Используйте строку поиска в шапке или на главной странице. Введите название канала или радиостанции — результаты появятся мгновенно.'],
            ['Можно ли посмотреть программу на несколько дней вперёд?', 'Да! Используйте навигацию по датам под строкой поиска — доступны данные на 7 дней вперёд и 3 дня назад.'],
            ['Как часто обновляется расписание?', 'Расписание обновляется в режиме реального времени. Текущий эфир помечается зелёным индикатором «В ЭФИРЕ».'],
            ['Доступна ли программа для радиостанций?', 'Да, TV-CHECKPROGRAMM охватывает более 20 популярных радиостанций со своим расписанием передач.'],
            ['Почему нет моего канала?', 'Мы постоянно расширяем базу. Напишите нам через форму обратной связи — и мы добавим канал в ближайшем обновлении.'],
          ].map(([q, a]) => `
            <div class="faq-item">
              <div class="faq-question">${q} <span class="chevron">▾</span></div>
              <div class="faq-answer">${a}</div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  // ======= CHANNEL DETAIL PAGE =======
  function renderChannelPage() {
    const ch = CHANNELS.find(c => c.id === state.selectedChannel);
    if (!ch) { state.page = 'home'; return renderHomePage(); }

    const schedule = getSchedule(ch.id, state.selectedDate);
    const badgeClass = `badge-${ch.type === 'radio' ? 'radio' : ch.category}`;
    const page = document.createElement('div');
    page.className = 'page';

    let schedHtml = schedule.map((item, i) => {
      const live = isLive(item, schedule, i);
      const prog = live ? getProgress(item, schedule, i) : 0;
      return `<div class="schedule-item${live ? ' is-live' : ''}">
        <div class="sched-time">${item.time}</div>
        <div class="sched-info">
          <div class="sched-title">${item.title}</div>
          <div class="sched-desc">${item.genre} · ${item.duration} мин</div>
          ${live ? `<div class="now-progress"><div class="now-progress-bar" style="width:${prog}%"></div></div>` : ''}
        </div>
        ${live ? `<div class="sched-genre" style="color:var(--live)">В ЭФИРЕ</div>` : `<div class="sched-genre">${item.genre}</div>`}
      </div>`;
    }).join('');

    page.innerHTML = `
      <div class="channel-detail-header">
        <div class="channel-detail-inner">
          <div class="channel-detail-logo">
            <div style="width:80px;height:80px;border-radius:16px;background:${ch.color}22;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:${ch.color}">${ch.icon}</div>
          </div>
          <div class="channel-detail-meta">
            <div style="margin-bottom:8px"><a href="#" data-nav="home" style="color:var(--muted);font-size:13px">← Все каналы</a></div>
            <div class="channel-detail-name">${ch.name}</div>
            <div class="channel-detail-info">
              <span class="channel-type-badge ${badgeClass}" style="margin-right:8px">${ch.type === 'radio' ? 'Радио' : (window.AppData.CATEGORY_LABELS[ch.category]||ch.category)}</span>
              · Расписание: ${formatDate(state.selectedDate)}
            </div>
          </div>
        </div>
      </div>
      ${renderDateBar()}
      <div class="main-layout" style="grid-template-columns:1fr;max-width:860px">
        <div>
          <div class="channel-card">${schedHtml}</div>
        </div>
      </div>
    `;
    return page;
  }

  // ======= STATIC PAGES =======
  function renderAboutPage() {
    return staticPage('О сервисе TV-CHECKPROGRAMM', `
      <p>TV-CHECKPROGRAMM — современный агрегатор программы телепередач и радиоэфира для России. Мы объединяем в одном месте расписание более ${CHANNELS.filter(c=>c.type==='tv').length} телеканалов и ${CHANNELS.filter(c=>c.type==='radio').length} радиостанций.</p>
      <h3 style="margin:24px 0 10px;font-size:18px">Наша миссия</h3>
      <p>Дать зрителям и слушателям удобный, современный и быстрый инструмент для планирования просмотра — без рекламы и лишних кликов.</p>
      <h3 style="margin:24px 0 10px;font-size:18px">Что мы предлагаем</h3>
      <ul style="color:var(--muted);line-height:2;padding-left:20px">
        <li>Полное суточное расписание любого ТВ-канала</li>
        <li>Расписание радиостанций с жанровой фильтрацией</li>
        <li>Поиск по названию передачи или канала</li>
        <li>Программа на 7 дней вперёд</li>
        <li>Индикатор текущего эфира в реальном времени</li>
        <li>Адаптивный дизайн для любых устройств</li>
      </ul>
      <h3 style="margin:24px 0 10px;font-size:18px">Команда</h3>
      <p style="color:var(--muted)">Мы небольшая команда разработчиков и редакторов, влюблённых в телевидение и радио. Работаем с 2024 года.</p>
    `);
  }

  function renderDocsPage() {
    const widgetCode = `<iframe\n  src="${window.location.origin + window.location.pathname}#widget"\n  width="100%"\n  height="920"\n  style="border:0;border-radius:12px;overflow:hidden"\n  loading="lazy"\n  referrerpolicy="no-referrer-when-downgrade">\n</iframe>`;
    return staticPage('Документация', `
      <h3 style="margin-bottom:12px;font-size:18px">Как пользоваться TV-CHECKPROGRAMM</h3>
      <div style="background:var(--card);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:20px">
        <h4 style="font-size:15px;margin-bottom:8px;color:var(--accent2)">1. Поиск канала</h4>
        <p style="color:var(--muted);font-size:14px">Введите название канала или радиостанции в строку поиска. Автодополнение предложит совпадения мгновенно.</p>
      </div>
      <div style="background:var(--card);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:20px">
        <h4 style="font-size:15px;margin-bottom:8px;color:var(--accent2)">2. Выбор даты</h4>
        <p style="color:var(--muted);font-size:14px">Используйте ленту дат под поисковой строкой. Доступны данные за 3 прошедших и 7 следующих дней.</p>
      </div>
      <div style="background:var(--card);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:20px">
        <h4 style="font-size:15px;margin-bottom:8px;color:var(--accent2)">3. Фильтрация</h4>
        <p style="color:var(--muted);font-size:14px">Фильтруйте каналы по типу (ТВ/Радио) или тематике (Спорт, Новости, Кино, Детские и т.д.).</p>
      </div>
      <div style="background:var(--card);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:20px">
        <h4 style="font-size:15px;margin-bottom:8px;color:var(--accent2)">4. Полное расписание</h4>
        <p style="color:var(--muted);font-size:14px">Нажмите «Полное расписание →» на карточке канала, чтобы открыть подробную программу на весь день.</p>
      </div>
      <div style="background:var(--card);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:20px">
        <h4 style="font-size:15px;margin-bottom:8px;color:var(--accent2)">5. Встраиваемый виджет</h4>
        <p style="color:var(--muted);font-size:14px;margin-bottom:10px">Скопируйте код ниже и вставьте на свой сайт. Виджет откроется в iframe.</p>
        <textarea id="widgetEmbedCode" readonly style="width:100%;min-height:160px;background:var(--bg2);color:var(--text);border:1px solid var(--border);border-radius:10px;padding:12px;font-size:13px;line-height:1.6">${widgetCode}</textarea>
        <div style="margin-top:10px">
          <button class="btn-primary" id="copyWidgetCodeBtn">Скопировать код виджета</button>
        </div>
      </div>
      <h3 style="margin:24px 0 12px;font-size:18px">API (для разработчиков)</h3>
      <p style="color:var(--muted);font-size:14px">Используется клиентская подгрузка XMLTV (EPG). Если источник недоступен, включается локальный резервный график. По вопросам интеграции напишите нам: <a href="mailto:api@tv-checkprogramm.ru" style="color:var(--accent2)">api@tv-checkprogramm.ru</a></p>
    `);
  }

  function renderFaqPage() {
    const faqs = [
      ['Как найти расписание конкретного канала?', 'Используйте строку поиска в шапке сайта или на главной странице. Введите любую часть названия канала — результаты появятся мгновенно.'],
      ['Можно ли посмотреть программу на несколько дней?', 'Да! Навигация по датам позволяет смотреть программу на 7 дней вперёд и 3 дня назад от текущего дня.'],
      ['Как часто обновляется расписание?', 'Мы обновляем данные ежедневно. Текущий эфир помечается индикатором «В ЭФИРЕ» в реальном времени.'],
      ['Есть ли радиостанции?', 'Да, база включает более 20 популярных FM и интернет-радиостанций России с подробным расписанием.'],
      ['Почему нет нужного канала?', 'Напишите нам через страницу контактов — и мы постараемся добавить канал в ближайшем обновлении.'],
      ['Сайт бесплатный?', 'Да, TV-CHECKPROGRAMM полностью бесплатен для пользователей.'],
      ['Как сообщить об ошибке в расписании?', 'Напишите на contact@tv-checkprogramm.ru с указанием канала и даты ошибочного расписания.'],
      ['Есть ли мобильное приложение?', 'Мобильного приложения пока нет, но сайт полностью адаптирован для мобильных устройств.'],
    ];
    return staticPage('Часто задаваемые вопросы', faqs.map(([q,a]) => `
      <div class="faq-item">
        <div class="faq-question">${q} <span class="chevron">▾</span></div>
        <div class="faq-answer">${a}</div>
      </div>
    `).join(''));
  }

  function renderPolicyPage() {
    return staticPage('Политика конфиденциальности', `
      <p style="color:var(--muted);font-size:13px;margin-bottom:20px">Последнее обновление: 1 января 2025 года</p>
      <h3 style="margin:20px 0 8px;font-size:16px">1. Общие положения</h3>
      <p style="color:var(--muted);font-size:14px;line-height:1.8">TV-CHECKPROGRAMM (далее — «Сервис») уважает конфиденциальность пользователей. Настоящая Политика описывает, какие данные мы собираем и как их используем.</p>
      <h3 style="margin:20px 0 8px;font-size:16px">2. Собираемые данные</h3>
      <p style="color:var(--muted);font-size:14px;line-height:1.8">Сервис может собирать анонимную статистику использования (просматриваемые страницы, время сессий) для улучшения качества. Персональные данные не собираются без явного согласия пользователя.</p>
      <h3 style="margin:20px 0 8px;font-size:16px">3. Cookies</h3>
      <p style="color:var(--muted);font-size:14px;line-height:1.8">Мы используем технические cookies для сохранения предпочтений (выбранная дата, фильтр). Данные не передаются третьим лицам.</p>
      <h3 style="margin:20px 0 8px;font-size:16px">4. Контакты</h3>
      <p style="color:var(--muted);font-size:14px">По вопросам конфиденциальности: <a href="mailto:privacy@tv-checkprogramm.ru" style="color:var(--accent2)">privacy@tv-checkprogramm.ru</a></p>
    `);
  }

  function renderContactsPage() {
    return staticPage('Контакты', `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin-bottom:32px">
        ${[
          ['📧','Email','contact@tv-checkprogramm.ru'],
          ['💬','Telegram','@tvcheckprogramm'],
          ['🐦','Twitter/X','@tvcheckprog'],
          ['📍','Офис','Москва, Россия'],
        ].map(([icon, label, val]) => `
          <div style="background:var(--card);border:1px solid var(--border);border-radius:12px;padding:20px;text-align:center">
            <div style="font-size:32px;margin-bottom:8px">${icon}</div>
            <div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:var(--muted);margin-bottom:4px">${label}</div>
            <div style="font-size:14px;font-weight:600">${val}</div>
          </div>
        `).join('')}
      </div>
      <h3 style="margin-bottom:16px;font-size:18px">Написать нам</h3>
      <div style="background:var(--card);border:1px solid var(--border);border-radius:12px;padding:24px">
        <div style="display:grid;gap:12px">
          <input type="text" placeholder="Ваше имя" style="background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:12px 16px;color:var(--text);font-family:var(--font-body);font-size:14px;outline:none;width:100%">
          <input type="email" placeholder="Email" style="background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:12px 16px;color:var(--text);font-family:var(--font-body);font-size:14px;outline:none;width:100%">
          <textarea rows="5" placeholder="Ваше сообщение..." style="background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:12px 16px;color:var(--text);font-family:var(--font-body);font-size:14px;outline:none;width:100%;resize:vertical"></textarea>
          <button class="btn-primary" id="sendContactBtn" style="width:fit-content">Отправить →</button>
        </div>
      </div>
    `);
  }

  function staticPage(title, html) {
    const page = document.createElement('div');
    page.className = 'page';
    page.innerHTML = `
      <div style="background:var(--bg2);border-bottom:1px solid var(--border);padding:32px 24px">
        <div style="max-width:860px;margin:0 auto">
          <div style="margin-bottom:8px"><a href="#" data-nav="home" style="color:var(--muted);font-size:13px">← На главную</a></div>
          <h1 style="font-family:var(--font-display);font-size:36px;letter-spacing:2px">${title}</h1>
        </div>
      </div>
      <div style="max-width:860px;margin:0 auto;padding:32px 24px;line-height:1.7">${html}</div>
    `;
    return page;
  }

  // ======= MODAL =======
  function renderModal() {
    if (!state.modalChannel) return document.createElement('div');
    const ch = state.modalChannel;
    const schedule = getSchedule(ch.id, state.selectedDate);
    const ov = document.createElement('div');
    ov.className = 'modal-overlay open';
    ov.id = 'modalOverlay';

    let items = schedule.map((item, i) => {
      const live = isLive(item, schedule, i);
      return `<div class="modal-sched-item${live ? ' is-live' : ''}">
        <div class="modal-time">${item.time}</div>
        <div><div class="modal-show-name">${item.title}</div><div style="font-size:12px;color:var(--muted)">${item.genre}</div></div>
        ${live ? `<div style="margin-left:auto;font-size:11px;font-weight:700;color:var(--live)">ЭФИР</div>` : ''}
      </div>`;
    }).join('');

    ov.innerHTML = `<div class="modal">
      <div class="modal-header">
        <div class="modal-title">${ch.name}</div>
        <button class="modal-close" id="modalClose">✕</button>
      </div>
      <div class="modal-channel-info">
        <div style="width:48px;height:48px;border-radius:10px;background:${ch.color}22;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;color:${ch.color};flex-shrink:0">${ch.icon}</div>
        <div>
          <div style="font-size:15px;font-weight:700">${ch.name}</div>
          <div style="font-size:12px;color:var(--muted)">${ch.type === 'radio' ? 'Радиостанция' : 'Телеканал'} · ${formatDate(state.selectedDate)}</div>
        </div>
        <button class="btn-primary" style="margin-left:auto;font-size:12px;padding:8px 14px" data-channel-detail="${ch.id}" id="modalFullBtn">Открыть →</button>
      </div>
      <div class="modal-schedule-list">${items}</div>
    </div>`;
    return ov;
  }

  // ======= FOOTER =======
  function renderFooter() {
    const el = document.createElement('footer');
    el.className = 'footer';
    el.innerHTML = `
      <div class="footer-inner">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="logo" style="margin-bottom:14px">
              <div class="logo-icon">📺</div>
              <span class="logo-text">TV-<span>CHECK</span></span>
            </div>
            <p>Полное расписание всех телеканалов и радиостанций России. Бесплатно и без регистрации.</p>
          </div>
          <div>
            <div class="footer-col-title">Телеканалы</div>
            <ul class="footer-links">
              <li><a href="#" data-filter="federal">Федеральные</a></li>
              <li><a href="#" data-filter="news">Новостные</a></li>
              <li><a href="#" data-filter="sport">Спортивные</a></li>
              <li><a href="#" data-filter="kids">Детские</a></li>
              <li><a href="#" data-filter="movies">Кино</a></li>
              <li><a href="#" data-filter="music">Музыкальные</a></li>
            </ul>
          </div>
          <div>
            <div class="footer-col-title">Радио</div>
            <ul class="footer-links">
              <li><a href="#" data-filter="radio">Все станции</a></li>
              <li><a href="#" data-cat="radio-music">Музыкальное</a></li>
              <li><a href="#" data-cat="radio-news">Новостное</a></li>
              <li><a href="#" data-cat="radio-talk">Разговорное</a></li>
              <li><a href="#" data-cat="radio-sport">Спортивное</a></li>
            </ul>
          </div>
          <div>
            <div class="footer-col-title">Сервис</div>
            <ul class="footer-links">
              <li><a href="#" data-nav="about">О нас</a></li>
              <li><a href="#" data-nav="docs">Документация</a></li>
              <li><a href="#" data-nav="faq">FAQ</a></li>
              <li><a href="#" data-nav="policy">Политика конфиденциальности</a></li>
              <li><a href="#" data-nav="contacts">Контакты</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2025 TV-CHECKPROGRAMM. Все права защищены.</p>
          <div style="display:flex;gap:16px">
            <a href="#" data-nav="policy">Конфиденциальность</a>
            <a href="#" data-nav="docs">Документация</a>
            <a href="#" data-nav="contacts">Контакты</a>
          </div>
        </div>
      </div>
    `;
    return el;
  }

  // ======= HELPERS =======
  function formatDate(d) {
    const days = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
    const months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`;
  }

  function showToast(msg) {
    let t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  }

  function updateClock() {
    const el = document.getElementById('liveClock');
    if (el) el.textContent = getCurrentTimeStr();
  }

  function handleSearch(q) {
    state.search = q;
    state.filter = 'all';
    state.channelPage = 0;
    state.page = 'home';
    render();
  }

  function showAutocomplete(inputEl, acEl) {
    const q = inputEl.value.trim().toLowerCase();
    if (q.length < 1) { acEl.classList.remove('open'); return; }
    const matches = CHANNELS.filter(c => c.name.toLowerCase().includes(q)).slice(0, 6);
    if (!matches.length) { acEl.classList.remove('open'); return; }
    acEl.innerHTML = matches.map(ch => `
      <div class="autocomplete-item" data-channel-detail="${ch.id}">
        <div class="autocomplete-logo" style="background:${ch.color}22;color:${ch.color}">${ch.icon}</div>
        <div>
          <div class="autocomplete-name">${ch.name}</div>
          <div class="autocomplete-type">${ch.type === 'radio' ? 'Радио' : 'ТВ'} · ${window.AppData.CATEGORY_LABELS[ch.category]||ch.category}</div>
        </div>
      </div>
    `).join('');
    acEl.classList.add('open');
  }

  // ======= BIND EVENTS =======
  function bindEvents() {
    // Navigation
    document.querySelectorAll('[data-nav]').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        state.page = el.dataset.nav;
        state.mobileMenuOpen = false;
        window.scrollTo(0, 0);
        render();
      });
    });

    // Filter chips
    document.querySelectorAll('[data-filter]').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        const f = el.dataset.filter;
        state.filter = f;
        state.search = '';
        state.channelPage = 0;
        state.page = 'home';
        window.scrollTo(0, 0);
        render();
      });
    });

    // Category sidebar
    document.querySelectorAll('[data-cat]').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        // filter by category
        const cat = el.dataset.cat;
        const cats = CHANNELS.filter(c => c.category === cat);
        if (!cats.length) return;
        // Show only those channels
        state.filter = 'all';
        state.search = '';
        state.channelPage = 0;
        state.page = 'home';
        // Temporarily override
        state._catFilter = cat;
        window.scrollTo(0, 300);
        renderCatFilter(cat);
      });
    });

    // Date buttons
    document.querySelectorAll('[data-date]').forEach(el => {
      el.addEventListener('click', () => {
        state.selectedDate = new Date(el.dataset.date);
        state.page = state.page === 'channel' ? 'channel' : 'home';
        render();
      });
    });

    // Load more
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        state.channelPage++;
        render();
      });
    }

    // Channel detail open
    document.querySelectorAll('[data-channel-detail]').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        state.selectedChannel = el.dataset.channelDetail;
        state.page = 'channel';
        window.scrollTo(0, 0);
        render();
      });
    });

    // Channel modal open (click on header)
    document.querySelectorAll('[data-channel-open]').forEach(el => {
      el.addEventListener('click', () => {
        const ch = CHANNELS.find(c => c.id === el.dataset.channelOpen);
        if (!ch) return;
        state.modalChannel = ch;
        state.modalOpen = true;
        render();
      });
    });

    // FAQ toggle
    document.querySelectorAll('.faq-question').forEach(el => {
      el.addEventListener('click', () => {
        el.closest('.faq-item').classList.toggle('open');
      });
    });

    // Modal close
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) {
      document.getElementById('modalClose')?.addEventListener('click', () => {
        state.modalOpen = false;
        render();
      });
      modalOverlay.addEventListener('click', e => {
        if (e.target === modalOverlay) { state.modalOpen = false; render(); }
      });
    }

    // Hero search
    const heroSearch = document.getElementById('heroSearch');
    const heroAc = document.getElementById('heroAutocomplete');
    const heroBtn = document.getElementById('heroSearchBtn');
    if (heroSearch) {
      heroSearch.addEventListener('input', () => showAutocomplete(heroSearch, heroAc));
      heroSearch.addEventListener('keydown', e => { if (e.key === 'Enter') handleSearch(heroSearch.value); });
    }
    if (heroBtn) heroBtn.addEventListener('click', () => handleSearch(heroSearch?.value || ''));
    if (heroAc) {
      heroAc.addEventListener('click', e => {
        const item = e.target.closest('[data-channel-detail]');
        if (item) { state.selectedChannel = item.dataset.channelDetail; state.page = 'channel'; state.modalOpen = false; window.scrollTo(0,0); render(); }
      });
    }

    // Header search
    const headerSearch = document.getElementById('headerSearch');
    const headerAc = document.getElementById('headerAutocomplete');
    if (headerSearch) {
      headerSearch.addEventListener('input', () => showAutocomplete(headerSearch, headerAc));
      headerSearch.addEventListener('keydown', e => { if (e.key === 'Enter') handleSearch(headerSearch.value); });
    }
    if (headerAc) {
      headerAc.addEventListener('click', e => {
        const item = e.target.closest('[data-channel-detail]');
        if (item) { state.selectedChannel = item.dataset.channelDetail; state.page = 'channel'; state.modalOpen = false; window.scrollTo(0,0); render(); }
      });
    }

    // Mobile
    const burger = document.getElementById('burgerBtn');
    if (burger) burger.addEventListener('click', () => { state.mobileMenuOpen = !state.mobileMenuOpen; render(); });

    const mobileSearch = document.getElementById('mobileSearch');
    const mobileSearchBtn = document.getElementById('mobileSearchBtn');
    if (mobileSearchBtn) mobileSearchBtn.addEventListener('click', () => handleSearch(mobileSearch?.value || ''));

    // Contact form
    const sendContactBtn = document.getElementById('sendContactBtn');
    if (sendContactBtn) sendContactBtn.addEventListener('click', () => showToast('✅ Сообщение отправлено! Мы ответим в течение 24 часов.'));

    const copyWidgetCodeBtn = document.getElementById('copyWidgetCodeBtn');
    const widgetEmbedCode = document.getElementById('widgetEmbedCode');
    if (copyWidgetCodeBtn && widgetEmbedCode) {
      copyWidgetCodeBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(widgetEmbedCode.value);
          showToast('✅ Код виджета скопирован');
        } catch (_) {
          widgetEmbedCode.select();
          document.execCommand('copy');
          showToast('✅ Код виджета скопирован');
        }
      });
    }

    // Time filters
    document.querySelectorAll('[data-time]').forEach(el => {
      el.addEventListener('click', () => {
        document.querySelectorAll('[data-time]').forEach(b => b.classList.remove('active'));
        el.classList.add('active');
      });
    });

    // Close autocomplete on outside click
    document.addEventListener('click', e => {
      if (!e.target.closest('.header-search') && !e.target.closest('.hero-search')) {
        document.querySelectorAll('.autocomplete').forEach(ac => ac.classList.remove('open'));
      }
    }, { once: true });
  }

  function renderCatFilter(cat) {
    // Scroll to schedule and filter inline without full re-render
    // Just re-render with category filter via search hack
    const matching = CHANNELS.filter(c => c.category === cat);
    if (matching.length === 1) {
      state.selectedChannel = matching[0].id;
      state.page = 'channel';
      window.scrollTo(0, 0);
      render();
    } else {
      state.filter = 'all';
      state.search = '';
      // We'll apply category-level filter
      state._catFilter = cat;
      render();
      state._catFilter = null;
    }
  }

  // ======= CLOCK INTERVAL =======
  setInterval(() => {
    const el = document.getElementById('liveClock');
    if (el) el.textContent = getCurrentTimeStr();
    // Update progress bars
    document.querySelectorAll('.now-progress-bar').forEach(bar => {
      // They'll be updated on next render cycle
    });
  }, 30000);

  // ======= INITIAL RENDER =======
  render();
});
