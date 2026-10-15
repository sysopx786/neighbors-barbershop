# Exact navigation and homepage counter snippets

**Repository:** `sysopx786/neighbors-barbershop` (#20 only)

## Navigation — add after Press in BOTH desktop and mobile menus

**English**

```html
<a href="/neighbors-barbershop/grand-opening">Grand Opening</a>
```

**Spanish**

```html
<a href="/neighbors-barbershop/es/grand-opening">Gran inauguración</a>
```

**Portuguese (Brazil)**

```html
<a href="/neighbors-barbershop/pt/grand-opening">Grande inauguração</a>
```

These are the **exact destination paths** used by the three new pages. The actual current navbar is built by React, so pasting only these anchors into pre-rendered HTML will not reliably update the live menu after hydration. The `apply_grand_opening.py` installer takes care of that by adding `assets/grand-opening-enhancements.js` to all current HTML pages. The enhancement inserts the correct links after Press every time React renders a desktop/mobile menu.

## Homepage hero — visible example

Place directly after the first hero eyebrow, currently `Spring City · Est. 2026`. It will appear in the site's brass/brick palette. At October 15, 2026 the English text is **We've been open for 124 days.** The count starts at zero on June 13, 2026.

```html
<a
  href="/neighbors-barbershop/grand-opening"
  class="neighbors-opening-days"
  data-neighbors-open-days
>
  Opened June 13, 2026
</a>
```

The enhancer auto-creates this element if it is not present, and updates the text by calculating Spring City's calendar date (`America/New_York`), every minute. It handles English, Spanish, and Portuguese as follows:

```
EN: We've been open for 124 days. · June 13, 2026 ↗
ES: Llevamos 124 días abiertos. · 13 de junio de 2026 ↗
PT: Estamos abertos há 124 dias. · 13 de junho de 2026 ↗
```

The exact runtime script is `assets/grand-opening-enhancements.js`, included in the archive. **Do not paste a second copy of the counter script** if you run the installer.

## When you regain the React source project

1. Add a route for `/grand-opening` under the site's optional locale segment so `/es/grand-opening` and `/pt/grand-opening` load the translated page.
2. Add the three locale-specific nav labels after Press in the shared header component.
3. Move the day-counter date calculation into a homepage React component.
4. Rebuild all 69 HTML routes and remove the compiled-site enhancement.

## Images (included)

```text
/photos/grand-opening-ribbon.jpg
/photos/grand-opening-poster.jpg
/photos/grand-opening-thank-you.jpg
```
