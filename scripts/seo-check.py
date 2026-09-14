"""Validate npm run build's static export and production URL consistency."""
from html.parser import HTMLParser
from pathlib import Path
import json
import xml.etree.ElementTree as ET
from urllib.parse import urlparse

class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(); self.links=[]; self.meta={}; self.canonical=[]; self.text=[]; self.structured=[]; self.in_json=False; self.feed(source)
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='a': self.links.append(a.get('href',''))
        if tag=='meta': self.meta[a.get('property',a.get('name',''))]=a.get('content')
        if tag=='link' and a.get('rel')=='canonical': self.canonical.append(a['href'])
        if tag=='script' and a.get('type')=='application/ld+json': self.in_json=True
    def handle_data(self, data):
        if self.in_json: self.structured.append(json.loads(data))
        else: self.text.append(data)
    def handle_endtag(self,tag):
        if tag=='script': self.in_json=False

base='https://risangdevs.github.io/personal-landing-page/'
paths=['','projects/meci/','resume/']
for route in paths:
    p=Page(Path('out',route,'index.html').read_text())
    assert p.canonical==[base+route], p.canonical
    assert p.meta['og:url']==base+route
    assert p.meta['description']
    assert p.meta['og:image']==base+'social-preview.png'
    assert p.meta['twitter:card']=='summary_large_image'
    for link in p.links:
        if link.startswith('/'):
            assert link.startswith('/personal-landing-page/'), link
            file=Path('out',urlparse(link).path.removeprefix('/personal-landing-page/'))
            assert file.exists(), link
    if not route: assert '/personal-landing-page/projects/meci/' in p.links
    if route=='projects/meci/':
        assert p.structured[0]['@type']=='CreativeWork'
        assert 'Realtime data, deliberate rendering' in ''.join(p.text)
urls=[e.text for e in ET.parse('out/sitemap.xml').iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
assert set(urls)=={base+p for p in paths},urls
assert Path('out/social-preview.png').read_bytes().startswith(b'\x89PNG')
assert Path('out/.nojekyll').exists()
print('SEO export passed: crawlable content, canonical URLs, metadata, internal links, sitemap, image, and .nojekyll')
