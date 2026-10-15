#!/usr/bin/env python3
"""Apply Grand Opening nav + days counter to Neighbors' compiled GitHub Pages export.
Run from repository root after merging in the files from the ZIP. Idempotent.
"""
from pathlib import Path

base = Path(__file__).resolve().parent
assert (base / 'index.html').exists(), 'Run this script inside the neighbors-barbershop repository.'
assert (base / 'assets/grand-opening-enhancements.js').exists(), 'Missing assets/grand-opening-enhancements.js'
for p in ['grand-opening/index.html', 'es/grand-opening/index.html', 'pt/grand-opening/index.html']:
    assert (base/p).exists(), f'Missing {p}'

# The existing 66 pages are produced by React SSR. A shared enhancer runs after
# hydration to add the menu link and the homepage counter, without changing bundles.
tag='<script src="/neighbors-barbershop/assets/grand-opening-enhancements.js" defer></script>'
changed=[]
for page in base.rglob('index.html'):
    if any(part in ('grand-opening','__grok') for part in page.parts):
        continue
    data=page.read_text(encoding='utf-8')
    if tag not in data:
        if '</body>' not in data:
            print('Skipping (no body):',page.relative_to(base));continue
        page.write_text(data.replace('</body>',tag+'</body>',1),encoding='utf-8')
        changed.append(str(page.relative_to(base)))

sitemap=base/'sitemap.xml'
if sitemap.exists():
    xml=sitemap.read_text(encoding='utf-8')
    urls={
       'en':'https://www.theneighborsbarber.com/grand-opening',
       'es':'https://www.theneighborsbarber.com/es/grand-opening',
       'pt-BR':'https://www.theneighborsbarber.com/pt/grand-opening',
    }
    if '<loc>'+urls['en']+'</loc>' not in xml:
        rows=[]
        for loc in ['en','es','pt-BR']:
            rows.append('  <url>\n    <loc>'+urls[loc]+'</loc>\n'+'\n'.join(
                '    <xhtml:link rel="alternate" hreflang="'+l+'" href="'+dest+'"/>'
                for l,dest in [*urls.items(),('x-default',urls['en'])]
            )+'\n  </url>')
        xml=xml.replace('</urlset>','\n'.join(rows)+'\n</urlset>')
        sitemap.write_text(xml,encoding='utf-8')
        changed.append('sitemap.xml')

for filename in ['README.md','readme.txt']:
    p=base/filename
    if p.exists():
        data=p.read_text(encoding='utf-8')
        if '- Grand Opening' not in data and '- Press' in data:
            p.write_text(data.replace('- Press','- Press\n- Grand Opening (June 13, 2026)',1),encoding='utf-8')
            changed.append(filename)
print(f'Updated {len(changed)} existing files (normally 66 pages, sitemap and README).')
for p in changed: print(' -',p)
print('Grand Opening pages and images are ready. Review git diff, then commit.')
