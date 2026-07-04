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
