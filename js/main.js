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

  // Reviews search/filter
  const searchInput = document.getElementById("review-search");
  const grid = document.getElementById("reviews-grid");
  const noResults = document.getElementById("no-results");
  if (searchInput && grid) {
    const cards = Array.from(grid.querySelectorAll(".card"));
    searchInput.addEventListener("input", function () {
      const q = this.value.trim().toLowerCase();
      let visible = 0;
      cards.forEach(function (card) {
        const text = card.textContent.toLowerCase();
        const show = !q || text.includes(q);
        card.style.display = show ? "" : "none";
        if (show) visible++;
      });
      if (noResults) {
        noResults.style.display = visible === 0 ? "block" : "none";
      }
    });
  }

  // FAQ search — single control filters the entire page
  const faqSearch = document.getElementById("faq-search");
  const faqBtn = document.getElementById("faq-search-btn");
  const faqClear = document.getElementById("faq-clear-btn");
  const faqNoResults = document.getElementById("faq-no-results");
  if (faqSearch) {
    const items = Array.from(document.querySelectorAll("main details"));
    const sections = Array.from(document.querySelectorAll("main section[id]"));

    function runFilter() {
      const q = faqSearch.value.trim().toLowerCase();
      let anyVisible = false;
      items.forEach(function (item) {
        const text = item.textContent.toLowerCase();
        const show = !q || text.includes(q);
        item.style.display = show ? "" : "none";
        if (show) anyVisible = true;
      });
      sections.forEach(function (sec) {
        const hasVisible = Array.from(sec.querySelectorAll("details")).some(function (d) {
          return d.style.display !== "none";
        });
        sec.style.display = hasVisible ? "" : "none";
      });
      if (faqNoResults) {
        faqNoResults.style.display = anyVisible || !q ? "none" : "block";
      }
      if (faqClear) {
        faqClear.style.display = q ? "inline-block" : "none";
      }
    }

    faqSearch.addEventListener("input", runFilter);
    if (faqBtn) {
      faqBtn.addEventListener("click", runFilter);
    }
    if (faqClear) {
      faqClear.addEventListener("click", function () {
        faqSearch.value = "";
        runFilter();
        faqSearch.focus();
      });
    }
  }

  // Simple cookie notice (no non-essential cookies currently)
  if (!localStorage.getItem("cookie-notice-dismissed")) {
    const banner = document.createElement("div");
    banner.id = "cookie-notice";
    banner.style.cssText = "position:fixed;bottom:0;left:0;right:0;background:var(--surface);color:var(--text);padding:12px 16px;z-index:300;border-top:1px solid var(--line);font-size:14px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;";
    banner.innerHTML = '<span>This site uses essential functionality and third-party services (Google Fonts/Maps, Square). See our <a href="cookies.html" style="color:var(--accent);">Cookie Policy</a>.</span><button id="cookie-dismiss" style="background:var(--accent);color:#121110;border:none;padding:8px 14px;min-height:40px;cursor:pointer;">Got it</button>';
    document.body.appendChild(banner);
    document.getElementById("cookie-dismiss").addEventListener("click", function () {
      localStorage.setItem("cookie-notice-dismissed", "1");
      banner.remove();
    });
  }
});
