'use strict';
(() => {
  const button = document.querySelector('#live');
  const sources = ['content.js', 'slides.js', 'slides.css', 'live-reload.js', '../../../../assets/brand.css'];
  const local = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
  let enabled = local && sessionStorage.getItem('course-live') === '1';
  let baseline = null, timer = null, polling = false;
  function paint() {
    button.setAttribute('aria-pressed', String(enabled));
    button.textContent = enabled ? '● En vivo' : 'En vivo';
    button.title = local ? 'Actualizar al editar los archivos (L)' : 'Disponible en el servidor local';
    button.disabled = !local;
  }
  async function poll() {
    if (!enabled || polling) return;
    polling = true;
    try {
      const texts = await Promise.all(sources.map(async source => {
        const response = await fetch(source, {cache: 'no-store', signal: AbortSignal.timeout(4000)});
        if (!response.ok) throw new Error('Archivo no disponible');
        return response.text();
      }));
      const version = JSON.stringify(texts);
      if (baseline !== null && baseline !== version) {
        location.reload();
        return;
      }
      baseline = version;
      button.textContent = '● En vivo';
    } catch {
      button.textContent = '↻ Reconectando';
    } finally {
      polling = false;
      if (enabled) timer = setTimeout(poll, 2000);
    }
  }
  function toggle() {
    if (!local) return;
    enabled = !enabled;
    sessionStorage.setItem('course-live', enabled ? '1' : '0');
    clearTimeout(timer);
    baseline = null;
    paint();
    if (enabled) poll();
  }
  button.addEventListener('click', toggle);
  addEventListener('keydown', event => {
    if (event.key.toLowerCase() === 'l' && !document.querySelector('#overlay').open
        && !event.target.matches('input,textarea,select') && !event.metaKey && !event.ctrlKey && !event.altKey) toggle();
  });
  paint();
  if (enabled) poll();
})();

