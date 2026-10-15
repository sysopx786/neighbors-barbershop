/* Works with the published built site; keeps the extra link on React-rendered menus. */
(() => {
  'use strict';
  const BASE = '/neighbors-barbershop/';
  const DATE_OPENED_UTC = Date.UTC(2026, 5, 13); // June is month 5 (zero-indexed)
  const TZ = 'America/New_York';
  const config = {
    en: { label: 'Grand Opening', count: n => `We've been open for ${n} day${n === 1 ? '' : 's'}.`, date: 'June 13, 2026' },
    es: { label: 'Gran inauguración', count: n => `Llevamos ${n} día${n === 1 ? '' : 's'} abiertos.`, date: '13 de junio de 2026' },
    pt: { label: 'Grande inauguração', count: n => `Estamos abertos há ${n} dia${n === 1 ? '' : 's'}.`, date: '13 de junho de 2026' },
  };
  const locale = () => location.pathname.startsWith(BASE + 'es') ? 'es' : location.pathname.startsWith(BASE + 'pt') ? 'pt' : 'en';
  const pathFor = l => BASE + (l === 'en' ? '' : l + '/') + 'grand-opening';
  function daysSinceOpening() {
    const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
      timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit'
    }).formatToParts(new Date()).filter(p => p.type !== 'literal').map(p => [p.type, Number(p.value)]));
    return Math.max(0, Math.round((Date.UTC(parts.year, parts.month - 1, parts.day) - DATE_OPENED_UTC) / 86400000));
  }
  function addNavigation() {
    const l = locale(), newPath = pathFor(l);
    const links = [...document.querySelectorAll('header a[href]')];
    for (const press of links) {
      if (new URL(press.href, location.origin).pathname !== BASE + (l === 'en' ? '' : l + '/') + 'press') continue;
      if (press.parentElement?.querySelector(`a[data-grand-opening-nav="${l}"]`)) continue;
      const link = document.createElement('a');
      link.href = newPath;
      link.textContent = config[l].label;
      link.className = press.className.replace(/\bactive\b/g, '').trim();
      link.dataset.grandOpeningNav = l;
      press.insertAdjacentElement('afterend', link);
    }
  }
  function addDayCounter() {
    const path = location.pathname.replace(/\/$/, '');
    if (![BASE.slice(0, -1), BASE + 'es', BASE + 'pt'].includes(path)) return;
    const l = locale();
    const hero = document.querySelector('main#main > section');
    const eyebrow = hero?.querySelector('p.text-xs.tracking-widest');
    if (!eyebrow) return;
    let box = hero.querySelector('[data-neighbors-open-days]');
    if (!box) {
      box = document.createElement('a');
      box.href = pathFor(l);
      box.className = 'neighbors-opening-days';
      box.dataset.neighborsOpenDays = '';
      box.style.cssText = 'display:inline-flex;align-items:center;flex-wrap:wrap;gap:.4rem;margin-top:.75rem;padding:.5rem .8rem;border-radius:999px;border:1px solid #b38445;color:#933e36;background:#f5ede0;font-weight:600;font-size:.85rem;text-decoration:none;line-height:1.5';
      eyebrow.insertAdjacentElement('afterend', box);
    }
    const nextText = `${config[l].count(daysSinceOpening())} · ${config[l].date} ↗`;
    if (box.textContent !== nextText) box.textContent = nextText;
  }
  let queued = false;
  function update() { addNavigation(); addDayCounter(); }
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; update(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule, { once:true });
  else schedule();
  window.addEventListener('load', schedule, { once:true });
  const observer = new MutationObserver(schedule);
  observer.observe(document.documentElement, { childList:true, subtree:true });
  setInterval(schedule, 60000); // Updates after midnight in Spring City; no refresh needed.
})();
