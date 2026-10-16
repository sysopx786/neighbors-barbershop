(function() {
  // Remove any existing mobile menus
  var old = document.getElementById('site-mobile-nav');
  if (old) old.remove();
  
  // Find or create menu button
  var btn = document.querySelector('button[aria-controls], button#menu-btn, .hamburger, summary');
  if (!btn) {
    // Create button if missing
    var header = document.querySelector('header');
    if (!header) return;
    btn = document.createElement('button');
    btn.id = 'site-menu-btn';
    btn.innerHTML = '<span class="sr-only">Open menu</span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16"/><path d="M4 18h16"/><path d="M4 6h16"/></svg>';
    btn.style.cssText = 'background:none;border:none;padding:8px;cursor:pointer;';
    header.appendChild(btn);
  }
  
  // Create consistent menu
  var nav = document.createElement('nav');
  nav.id = 'site-mobile-nav';
  nav.style.cssText = 'display:none;position:fixed;inset:0;background:#f8f4ee;z-index:9999;padding:80px 24px 24px;overflow-y:auto;';
  nav.innerHTML = '<button id="site-close" style="position:absolute;top:16px;right:16px;background:none;border:none;font-size:28px;cursor:pointer;">&times;</button><div style="display:flex;flex-direction:column;gap:14px;font-size:1.2rem;"><a href="/neighbors-barbershop/" style="text-decoration:none;color:inherit;">Home</a><a href="/neighbors-barbershop/about" style="text-decoration:none;color:inherit;">The shop</a><a href="/neighbors-barbershop/services" style="text-decoration:none;color:inherit;">Services</a><a href="/neighbors-barbershop/gallery" style="text-decoration:none;color:inherit;">Gallery</a><a href="/neighbors-barbershop/reviews" style="text-decoration:none;color:inherit;">Reviews</a><a href="/neighbors-barbershop/media" style="text-decoration:none;color:inherit;">Media</a><a href="/neighbors-barbershop/press" style="text-decoration:none;color:inherit;">Press</a><a href="/neighbors-barbershop/grand-opening" style="text-decoration:none;color:inherit;">Grand Opening</a><a href="/neighbors-barbershop/tips" style="text-decoration:none;color:inherit;">Tips</a><a href="/neighbors-barbershop/faq" style="text-decoration:none;color:inherit;">FAQs</a><a href="/neighbors-barbershop/future" style="text-decoration:none;color:inherit;">2040</a><a href="/neighbors-barbershop/#visit" style="text-decoration:none;color:inherit;">Visit</a><a href="/neighbors-barbershop/book" style="display:inline-block;background:#8b4513;color:#fff;padding:12px 20px;border-radius:999px;text-align:center;text-decoration:none;margin-top:8px;">Book a chair</a></div>';
  document.body.appendChild(nav);
  
  function open() { nav.style.display = 'block'; }
  function close() { nav.style.display = 'none'; }
  
  btn.addEventListener('click', function(e) { e.preventDefault(); open(); });
  document.getElementById('site-close').addEventListener('click', close);
})();
