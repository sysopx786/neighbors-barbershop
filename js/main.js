document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".mobile-menu");
  if (hamburger && menu) {
    hamburger.addEventListener("click", function () {
      menu.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", menu.classList.contains("open"));
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Simple lightbox for gallery
  document.querySelectorAll(".gallery-grid img").forEach(function (img) {
    img.addEventListener("click", function () {
      const overlay = document.createElement("div");
      overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;";
      const big = document.createElement("img");
      big.src = img.src;
      big.alt = img.alt;
      big.style.maxWidth = "100%";
      big.style.maxHeight = "90vh";
      big.style.objectFit = "contain";
      const close = document.createElement("button");
      close.textContent = "Close";
      close.style.cssText = "position:absolute;top:16px;right:16px;background:var(--accent);color:#121110;border:none;padding:8px 16px;min-height:48px;";
      close.addEventListener("click", function () { overlay.remove(); });
      overlay.addEventListener("click", function (e) { if (e.target === overlay) overlay.remove(); });
      document.addEventListener("keydown", function esc(e) {
        if (e.key === "Escape") { overlay.remove(); document.removeEventListener("keydown", esc); }
      });
      overlay.appendChild(big);
      overlay.appendChild(close);
      document.body.appendChild(overlay);
    });
  });
});
