(function(){
  const reveal = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('in');io.unobserve(entry.target);}});},{threshold:.12});
    reveal.forEach(function(el){io.observe(el);});
  } else {reveal.forEach(function(el){el.classList.add('in');});}
  const buttons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');
  buttons.forEach(function(btn){
    btn.addEventListener('click',function(){
      const key = btn.getAttribute('data-tab');
      buttons.forEach(function(b){b.classList.toggle('active', b === btn);});
      panels.forEach(function(p){p.classList.toggle('active', p.id === 'tab-' + key);});
    });
  });
})();


/* Sélecteur de thèmes programme */
(function(){
  function applyFilter(container, value){
    var scope = document;
    var groups = scope.querySelectorAll('[data-subject-group]');
    groups.forEach(function(group){
      var groupValue = group.getAttribute('data-subject-group');
      var hidden = value !== 'all' && groupValue !== value;
      group.classList.toggle('is-hidden', hidden);
    });

    container.querySelectorAll('.subject-filter-btn').forEach(function(btn){
      var active = btn.getAttribute('data-filter') === value;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  document.addEventListener('click', function(event){
    var btn = event.target.closest('.subject-filter-btn');
    if(!btn) return;

    var container = btn.closest('[data-subject-filter]');
    if(!container) return;

    applyFilter(container, btn.getAttribute('data-filter') || 'all');
  });
})();


/* Menu mobile — construit un tiroir à partir de la navigation existante */
(function(){
  var burger = document.querySelector('.nav-burger');
  if(!burger) return;

  var overlay = document.createElement('div');
  overlay.className = 'mobile-menu';
  overlay.id = 'mobile-menu';
  overlay.setAttribute('aria-hidden', 'true');

  var inner = document.createElement('div');
  inner.className = 'mobile-menu-inner';
  inner.setAttribute('role', 'dialog');
  inner.setAttribute('aria-modal', 'true');
  inner.setAttribute('aria-label', 'Menu de navigation');

  var top = document.createElement('div');
  top.className = 'mobile-menu-top';
  var title = document.createElement('span');
  title.className = 'mobile-menu-title';
  title.textContent = 'Menu';
  var closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'mobile-menu-close';
  closeBtn.setAttribute('aria-label', 'Fermer le menu');
  closeBtn.innerHTML = '<span aria-hidden="true">\u00D7</span>';
  top.appendChild(title);
  top.appendChild(closeBtn);
  inner.appendChild(top);

  var linksNav = document.createElement('nav');
  linksNav.className = 'mobile-menu-links';
  linksNav.setAttribute('aria-label', 'Navigation mobile');
  document.querySelectorAll('.navlinks a').forEach(function(a){
    var link = document.createElement('a');
    link.href = a.getAttribute('href');
    link.textContent = a.textContent.trim();
    if(a.classList.contains('nav-webinar')) link.className = 'is-webinar';
    linksNav.appendChild(link);
  });
  inner.appendChild(linksNav);

  var actions = document.createElement('div');
  actions.className = 'mobile-menu-actions';
  document.querySelectorAll('.nav-actions a').forEach(function(a){
    actions.appendChild(a.cloneNode(true));
  });
  inner.appendChild(actions);

  overlay.appendChild(inner);
  document.body.appendChild(overlay);

  function isOpen(){ return overlay.classList.contains('open'); }
  function open(){
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }
  function close(){
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    burger.focus();
  }

  burger.addEventListener('click', function(){ isOpen() ? close() : open(); });
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', function(e){ if(e.target === overlay) close(); });
  inner.addEventListener('click', function(e){ if(e.target.closest('a')) close(); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape' && isOpen()) close(); });

  // Referme le menu si l'on repasse en affichage bureau
  var mq = window.matchMedia('(min-width:951px)');
  (mq.addEventListener ? mq.addEventListener.bind(mq,'change') : mq.addListener.bind(mq))(function(e){
    if(e.matches && isOpen()) close();
  });
})();
