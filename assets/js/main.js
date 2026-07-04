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