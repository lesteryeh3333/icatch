// deck.js — shared across all 9 slide pages
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
  window.addEventListener('resize', resizeCanvas);
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
    document.querySelectorAll('[data-tool]').forEach(btn=>{
      btn.classList.toggle('active', btn.dataset.tool === mode);
    });
    document.querySelectorAll('.ctx-item[data-tool]').forEach(it=>{
      it.classList.toggle('on', it.dataset.tool === mode);
    });
  }

  function getPos(e){
    const rect = canvas.getBoundingClientRect();
    const t = e.touches ? e.touches[0] : e;
    return { x: t.clientX - rect.left, y: t.clientY - rect.top };
  }

  function startDraw(e){
    if(mode !== 'draw' && mode !== 'erase') return;
    drawing = true;
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

  // Fullscreen
  function toggleFullscreen(){
    if(!document.fullscreenElement){
      document.documentElement.requestFullscreen().catch(()=>{});
    } else {
      document.exitFullscreen().catch(()=>{});
    }
  }

  // Toolbar buttons
  document.querySelectorAll('[data-tool]').forEach(btn=>{
    btn.addEventListener('click', ()=> setMode(btn.dataset.tool));
  });
  const fsBtn = document.getElementById('fsBtn');
  if(fsBtn) fsBtn.addEventListener('click', toggleFullscreen);
  const clearBtn = document.getElementById('clearBtn');
  if(clearBtn) clearBtn.addEventListener('click', clearCanvas);

  // Right-click custom context menu
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
  const ctxFs = document.getElementById('ctxFs');
  if(ctxFs) ctxFs.addEventListener('click', toggleFullscreen);

  // Mobile fallback: floating button opens same tool menu
  const fab = document.getElementById('toolsFab');
  if(fab){
    fab.addEventListener('click', (e)=>{
      e.stopPropagation();
      const rect = fab.getBoundingClientRect();
      ctxMenu.style.left = Math.min(rect.left - 150, window.innerWidth-210) + 'px';
      ctxMenu.style.top = (rect.top - 220) + 'px';
      ctxMenu.classList.add('show');
      updateToolbarUI();
    });
  }

  // Keyboard navigation: PageUp/PageDown/ArrowLeft/ArrowRight -> real page links
  document.addEventListener('keydown', e=>{
    if(e.key === 'PageDown' || e.key === 'ArrowRight'){
      const n = document.getElementById('nextBtn');
      if(n && n.getAttribute('aria-disabled') !== 'true') window.location.href = n.href;
    }
    if(e.key === 'PageUp' || e.key === 'ArrowLeft'){
      const p = document.getElementById('prevBtn');
      if(p && p.getAttribute('aria-disabled') !== 'true') window.location.href = p.href;
    }
  });

  // Bullet expand/collapse
  document.querySelectorAll('.bullet').forEach(b=>{
    b.addEventListener('click', (ev)=>{
      if(mode === 'draw' || mode === 'erase') return; // avoid accidental toggle while drawing
      b.classList.toggle('open');
    });
  });

  // Mobile sidebar
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const menuBtn = document.getElementById('menuBtn');
  if(menuBtn){
    menuBtn.addEventListener('click', ()=>{ sidebar.classList.add('open'); overlay.classList.add('show'); });
    overlay.addEventListener('click', ()=>{ sidebar.classList.remove('open'); overlay.classList.remove('show'); });
  }
})();
