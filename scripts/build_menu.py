"""Regeneruje tekstową kartę w menu.html z data/menu.json, bez zależności."""
from pathlib import Path
from html import escape
import json

root = Path(__file__).resolve().parents[1]
groups = json.loads((root / 'data/menu.json').read_text())
parts = []
for index, group in enumerate(groups):
    key = escape(group['id'], quote=True)
    parts.append(f'<section class="menu-group" id="{key}" data-menu-group="{key}" aria-labelledby="heading-{key}"><div class="menu-group-heading"><p class="eyebrow">{index + 1:02d} / NA TWÓJ GUST</p><h2 id="heading-{key}">{escape(group["title"])}</h2><p>{escape(group["intro"])}</p></div><div class="menu-group-items">')
    for item in group['items']:
        price = item.get('price')
        assert price is None or isinstance(price, (int, float)), 'Cena musi być liczbą lub null'
        parts.append('<article class="menu-item"><div><h3>' + escape(item['name']) + '</h3>')
        if item.get('description'):
            parts.append('<p>' + escape(item['description']) + '</p>')
        parts.append('</div>' + (f'<span class="price">{price} zł</span>' if price is not None else '<span class="price price-pending" aria-label="Cena: zapytaj obsługę" title="Zapytaj obsługę o aktualną cenę">—</span>') + '</article>')
    parts.append('</div></section>')
for name in ('index.html', 'menu.html'):
    page = root / name
    source = page.read_text()
    start_marker = '<div id="menu-results">'
    end_marker = '</div><p class="empty" id="menu-empty"'
    start = source.index(start_marker) + len(start_marker)
    end = source.index(end_marker, start)
    page.write_text(source[:start] + ''.join(parts) + source[end:])
    print(f'{name}: {sum(len(group["items"]) for group in groups)} pozycji / {len(groups)} kategorii.')
