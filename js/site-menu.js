(function() {
  // Remove ALL old menus
  document.querySelectorAll('#mobile-nav, #site-mobile-nav, .mobile-menu, .go-menu, details, nav[aria-label="Mobile"], nav[aria-label="Menu"]').forEach(el => el.remove());
  document.querySelectorAll('button, summary').forEach(el => {
    var t = (el.textContent || '').toLowerCase();
    var a = (el.getAttribute('aria-label') || '').toLowerCase();
    if (t.includes('menu') || a.includes('menu') || el.querySelector('svg')) {
      el.remove();
    }
  });
  
  // Create menu button in header or body
  var container = document.querySelector('header') || document.body;
  var btn = document.createElement('button');
  btn.id = 'site-menu-btn';
  btn.setAttribute('aria-label', 'Open menu');
  btn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16"/><path d="M4 18h16"/><path d="M4 6h16"/></svg>';
  btn.style.cssText = 'background:none;border:none;padding:10px;cursor:pointer;position:fixed;top:12px;right:16px;z-index:10000;';
  container.appendChild(btn);
  
  // Create menu panel
  var nav = document.createElement('nav');
  nav.id = 'site-mobile-nav';
  nav.style.cssText = 'display:none;position:fixed;inset:0;background:#f8f4ee;z-index:9999;padding:70px 24px 24px;overflow-y:auto;font-family:system-ui,sans-serif;';
  nav.innerHTML = '<button id="site-close" style="position:absolute;top:16px;right:16px;background:none;border:none;font-size:32px;cursor:pointer;line-height:1;">&times;</button><div style="display:flex;flex-direction:column;gap:16px;font-size:1.25rem;"><a href="/neighbors-barbershop/" style="text-decoration:none;color:#1c1612;padding:8px 0;border-bottom:1px solid #e8e0d6;">Home</a><a href="/neighbors-barbershop/about" style="text-decoration:none;color:#1c1612;padding:8px 0;border-bottom:1px solid #e8e0d6;">The shop</a><a href="/neighbors-barbershop/services" style="text-decoration:none;color:#1c1612;padding:8px 0;border-bottom:1px solid #e8e0d6;">Services</a><a href="/neighbors-barbershop/gallery" style="text-decoration:none;color:#1c1612;padding:8px 0;border-bottom:1px solid #e8e0d6;">Gallery</a><a href="/neighbors-barbershop/reviews" style="text-decoration:none;color:#1c1612;padding:8px 0;border-bottom:1px solid #e8e0d6;">Reviews</a><a href="/neighbors-barbershop/media" style="text-decoration:none;color:#1c1612;padding:8px 0;border-bottom:1px solid #e8e0d6;">Media</a><a href="/neighbors-barbershop/press" style="text-decoration:none;color:#1c1612;padding:8px 0;border-bottom:1px solid #e8e0d6;">Press</a><a href="/neighbors-barbershop/grand-opening" style="text-decoration:none;color:#1c1612;padding:8px 0;border-bottom:1px solid #e8e0d6;">Grand Opening</a><a href="/neighbors-barbershop/tips" style="text-decoration:none;color:#1c1612;padding:8px 0;border-bottom:1px solid #e8e0d6;">Tips</a><a href="/neighbors-barbershop/faq" style="text-decoration:none;color:#1c1612;padding:8px 0;border-bottom:1px solid #e8e0d6;">FAQs</a><a href="/neighbors-barbershop/future" style="text-decoration:none;color:#1c1612;padding:8px 0;border-bottom:1px solid #e8e0d6;">2040</a><a href="/neighbors-barbershop/#visit" style="text-decoration:none;color:#1c1612;padding:8px 0;border-bottom:1px solid #e8e0d6;">Visit</a><a href="/neighbors-barbershop/book" style="display:inline-block;background:#8b4513;color:#fff;padding:14px 24px;border-radius:999px;text-align:center;text-decoration:none;margin-top:12px;">Book a chair</a></div>';
  document.body.appendChild(nav);
  
  btn.onclick = function() { nav.style.display = 'block'; };
  document.getElementById('site-close').onclick = function() { nav.style.display = 'none'; };
})();
