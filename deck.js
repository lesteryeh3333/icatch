// deck.js — shared across all slide pages
(function(){
  const canvas = document.getElementById('hlCanvas');
  const stage = document.getElementById('stage');
  const ctx = canvas.getContext('2d');
  let mode = 'none'; // 'none' | 'draw' | 'erase' | 'laser'
  let drawing = false;
  let lastX = 0, lastY = 0;

  function resizeCanvas(){
    const rect = stage.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    const prev = document.createElement('canvas');
    prev.width = canvas.width; prev.height = canvas.height;
    prev.getContext('2d').drawImage(canvas, 0, 0);
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.setTransform(ratio,0,0,ratio,0,0);
    ctx.drawImage(prev, 0, 0, prev.width/ratio, prev.height/ratio);
  }
  window.addEventListener('resize', ()=>{ resizeCanvas(); cachedRect = null; });
  resizeCanvas();

  function setMode(next){
    mode = (mode === next) ? 'none' : next;
    canvas.classList.remove('mode-draw','mode-erase');
    document.body.classList.remove('laser-on');
    if(mode === 'draw') canvas.classList.add('mode-draw');
    if(mode === 'erase') canvas.classList.add('mode-erase');
    if(mode === 'laser') document.body.classList.add('laser-on');
    updateToolbarUI();
  }

  function updateToolbarUI(){
    document.querySelectorAll('.ctx-item[data-tool]').forEach(it=>{
      it.classList.toggle('on', it.dataset.tool === mode);
    });
  }

  let cachedRect = null;
  function getPos(e){
    const rect = cachedRect || canvas.getBoundingClientRect();
    const t = e.touches ? e.touches[0] : e;
    return { x: t.clientX - rect.left, y: t.clientY - rect.top };
  }

  function startDraw(e){
    if(mode !== 'draw' && mode !== 'erase') return;
    drawing = true;
    cachedRect = canvas.getBoundingClientRect();
    const p = getPos(e);
    lastX = p.x; lastY = p.y;
  }
  function moveDraw(e){
    if(!drawing) return;
    const p = getPos(e);
    if(mode === 'draw'){
      ctx.globalCompositeOperation = 'multiply';
      ctx.strokeStyle = 'rgba(255,214,0,0.55)';
      ctx.lineWidth = 16;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    } else if(mode === 'erase'){
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 28;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    }
    lastX = p.x; lastY = p.y;
  }
  function endDraw(){ drawing = false; }

  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', moveDraw);
  window.addEventListener('mouseup', endDraw);
  canvas.addEventListener('touchstart', e=>{ startDraw(e); }, {passive:true});
  canvas.addEventListener('touchmove', e=>{ moveDraw(e); }, {passive:true});
  canvas.addEventListener('touchend', endDraw);

  function clearCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
  }

  // Laser pointer dot
  const laserDot = document.createElement('div');
  laserDot.className = 'laser-dot';
  document.body.appendChild(laserDot);
  document.addEventListener('mousemove', e=>{
    laserDot.style.left = e.clientX + 'px';
    laserDot.style.top = e.clientY + 'px';
  });

  // Right-click custom context menu (only place [data-tool] listeners are bound —
  // binding it a second time elsewhere double-fires setMode's toggle and cancels itself out)
  const ctxMenu = document.getElementById('ctxMenu');
  document.addEventListener('contextmenu', e=>{
    e.preventDefault();
    ctxMenu.style.left = Math.min(e.clientX, window.innerWidth-210) + 'px';
    ctxMenu.style.top = Math.min(e.clientY, window.innerHeight-260) + 'px';
    ctxMenu.classList.add('show');
    updateToolbarUI();
  });
  document.addEventListener('click', ()=> ctxMenu.classList.remove('show'));
  ctxMenu.querySelectorAll('[data-tool]').forEach(it=>{
    it.addEventListener('click', ()=> setMode(it.dataset.tool));
  });
  const ctxClear = document.getElementById('ctxClear');
  if(ctxClear) ctxClear.addEventListener('click', clearCanvas);

  // Mobile fallback: floating button opens same tool menu
  const fab = document.getElementById('toolsFab');
  if(fab){
    fab.addEventListener('click', (e)=>{
      e.stopPropagation();
      const rect = fab.getBoundingClientRect();
      const menuWidth = 200, menuHeight = 230;
      let left = rect.left - menuWidth + rect.width;
      let top = rect.bottom + 8;
      left = Math.max(8, Math.min(left, window.innerWidth - menuWidth - 8));
      if(top + menuHeight > window.innerHeight){
        top = Math.max(8, rect.top - menuHeight - 8);
      }
      ctxMenu.style.left = left + 'px';
      ctxMenu.style.top = top + 'px';
      ctxMenu.classList.add('show');
      updateToolbarUI();
    });
  }

  // Bullet expand/collapse (and week-block / cp-list items) — accordion within siblings
  document.querySelectorAll('.bullet, .week-block, .cp-list li').forEach(b=>{
    b.addEventListener('click', (ev)=>{
      if(mode === 'draw' || mode === 'erase') return; // avoid accidental toggle while drawing
      const willOpen = !b.classList.contains('open');
      if(willOpen && b.parentElement){
        Array.from(b.parentElement.children).forEach(sib=>{
          if(sib !== b) sib.classList.remove('open');
        });
      }
      b.classList.toggle('open');
    });
  });

  // Sidebar — universal floating overlay (mobile + desktop), toggled via menu button
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const menuBtn = document.getElementById('menuBtn');
  if(menuBtn){
    menuBtn.addEventListener('click', ()=>{
      sidebar.classList.toggle('open');
      overlay.classList.toggle('show');
    });
    overlay.addEventListener('click', ()=>{ sidebar.classList.remove('open'); overlay.classList.remove('show'); });
  }

  // Expand-from-center transition on the page's color block (not the whole page)
  // Skipped entirely on pages that opt out (their own internal animation takes over)
  const skipTransition = document.body.hasAttribute('data-no-transition');
  const pageBlock = skipTransition ? null : (function(){
    const kids = Array.from(stage.children).filter(el => el !== canvas);
    return kids[0] || null;
  })();
  if(pageBlock){
    pageBlock.classList.add('page-block-enter');
    setTimeout(()=>{
      pageBlock.classList.add('open');
    }, 30);
    setTimeout(()=>{
      pageBlock.classList.remove('page-block-enter','open');
    }, 560);
  }
  const FADE_MS = 380;
  function fadeOutBlock(){
    if(pageBlock){
      pageBlock.classList.add('page-block-enter');
      pageBlock.classList.remove('open');
      void pageBlock.offsetWidth;
    }
  }
  document.querySelectorAll('a[href$=".html"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      if(a.getAttribute('aria-disabled')==='true') return;
      const href = a.getAttribute('href');
      if(!href || href==='#') return;
      e.preventDefault();
      fadeOutBlock();
      setTimeout(()=>{ window.location.href = href; }, FADE_MS);
    });
  });

  // Keyboard navigation: PageUp/PageDown/ArrowLeft/ArrowRight -> real page links
  function fadeNavigate(href){
    fadeOutBlock();
    setTimeout(()=>{ window.location.href = href; }, FADE_MS);
  }
  document.addEventListener('keydown', e=>{
    if(e.key === 'PageDown' || e.key === 'ArrowRight'){
      const n = document.getElementById('nextBtn');
      if(n && n.getAttribute('aria-disabled') !== 'true') fadeNavigate(n.href);
    }
    if(e.key === 'PageUp' || e.key === 'ArrowLeft'){
      const p = document.getElementById('prevBtn');
      if(p && p.getAttribute('aria-disabled') !== 'true') fadeNavigate(p.href);
    }
  });
})();
