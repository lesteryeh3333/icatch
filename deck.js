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
    updateDebugBadge();
  }

  // TEMPORARY debug badge — remove once pen issue is diagnosed
  const debugBadge = document.createElement('div');
  debugBadge.style.cssText = 'position:fixed;left:8px;bottom:8px;z-index:99999;background:#000;color:#0f0;font:11px monospace;padding:6px 10px;border-radius:6px;pointer-events:none;max-width:96vw;word-break:break-all;';
  document.body.appendChild(debugBadge);
  function updateDebugBadge(){
    debugBadge.textContent = 'mode=' + mode + ' canvasClass=' + canvas.className + ' cw=' + canvas.width + ' ch=' + canvas.height;
  }
  updateDebugBadge();
  canvas.addEventListener('mousedown', ()=>{ debugBadge.textContent += ' | mousedown-fired'; });
  canvas.addEventListener('touchstart', ()=>{ debugBadge.textContent += ' | touchstart-fired'; }, {passive:true});

  const debugBadge2 = document.createElement('div');
  debugBadge2.style.cssText = 'position:fixed;left:8px;top:calc(env(safe-area-inset-top,0px) + 8px);z-index:99999;background:#000;color:#ff0;font:11px monospace;padding:6px 10px;border-radius:6px;pointer-events:none;max-width:96vw;word-break:break-all;';
  debugBadge2.textContent = 'waiting for tool tap...';
  document.body.appendChild(debugBadge2);

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
    it.addEventListener('click', (ev)=>{
      debugBadge2.textContent = 'CLICKED item, tool=' + it.dataset.tool + ' @' + Date.now();
      setMode(it.dataset.tool);
    });
    it.addEventListener('touchend', (ev)=>{
      debugBadge2.textContent = 'TOUCHEND item, tool=' + it.dataset.tool + ' @' + Date.now();
    });
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
      debugBadge2.textContent = 'FAB tapped, menu left=' + Math.round(left) + ' top=' + Math.round(top) + ' showClass=' + ctxMenu.className;
    });
  }

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

  // Bullet expand/collapse (and week-block on page4)
  document.querySelectorAll('.bullet, .week-block, .cp-list li').forEach(b=>{
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

  // Expand-from-center transition on the page's color block — TEMPORARILY DISABLED
  // (troubleshooting pen tool conflict; re-enable once confirmed pen works without it)
  const FADE_MS = 0;
  function fadeOutBlock(){ /* no-op while transition is disabled */ }
  document.querySelectorAll('a[href$=".html"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      if(a.getAttribute('aria-disabled')==='true') return;
      // let the browser navigate normally — no custom handling while disabled
    });
  });
})();
