# Grand Opening — Ready to add to repository #20

Repository: `sysopx786/neighbors-barbershop` only. Original event: June 13, 2026.

This package contains **three complete, responsive, standalone HTML pages**, the three user-supplied images, a matching stylesheet, a safe post-hydration navigation/counter enhancement for the existing compiled React site, and an installation script.

## Add the files

1. Download and unzip this archive into the ROOT of `sysopx786/neighbors-barbershop` on your computer. Preserve each directory path. It should add `grand-opening/index.html`, `es/grand-opening/index.html`, `pt/grand-opening/index.html`, three `photos/` JPGs and two `assets/` files.
2. From the repo root run `python3 apply_grand_opening.py`. It adds a JavaScript reference to the existing 66 built HTML files; creates the Grand Opening nav link after **Press** on desktop and mobile; displays the automatic day counter under the homepage kicker; updates `sitemap.xml` to 69 URLs; and adds the page to README files.
3. Review `git diff` before committing. Upload/push only to repository #20.
4. Preview `/neighbors-barbershop/grand-opening/`, `/neighbors-barbershop/es/grand-opening/`, and `/neighbors-barbershop/pt/grand-opening/`. Check homepage counter and header nav in all languages, desktop and mobile.

## Important architecture limitation

The GitHub repository contains a **compiled React/TanStack Router export**, not the original source components or build configuration. Editing just an HTML menu may be undone by hydration. Therefore this integration **uses a small DOM enhancement script**, rather than incorrectly editing the minified route-tree bundle. It adds native HTML links that navigate to the three static pages. This works around the missing application sources but is not the preferred long-term architecture.

**When original source is recovered:** move the new route into the React router, add the nav item after Press in the shared nav component, and add the day counter as a React component. Then remove `assets/grand-opening-enhancements.js` and its script tags and regenerate the published files.

## Notes

- Counter starts at **0 days on June 13, 2026**; at October 15, 2026 it reads **124 days**. It calculates the calendar date in `America/New_York`, not the visitor's timezone, so it changes at Spring City midnight without reload. Months are not shown.
- The post screenshot and historical flyer are presented as archival images. Spanish/Portuguese quotes are identified as **translations**; the original screenshots retain English.
- **SEO:** Current repository tags/sitemap target `https://www.theneighborsbarber.com` even though this repo serves the GitHub Pages preview at `https://sysopx786.github.io/neighbors-barbershop/`. The new pages match the existing SEO configuration. Change these URLs together only if the canonical production host changes.
- The supplied Facebook post is linked exactly as provided; this archive makes no claims about the identity of that post's author.
- No existing files have been changed in GitHub by creating this package. Running the script locally and committing is required to publish it.
