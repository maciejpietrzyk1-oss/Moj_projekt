# GUSTA RESTO

Strona restauracji GUSTA RESTO: pełne menu na stronie głównej, oryginalna identyfikacja marki, automatyczne hero i galeria rozsuwanych wizualizacji.

## Uruchomienie

```sh
python3 -m http.server 3000 --bind 0.0.0.0
```

Uruchom polecenie w katalogu repozytorium. Projekt nie wymaga instalowania zależności ani procesu budowania. W sesji z obsługą interaktywnego podglądu otwórz uruchomioną aplikację na porcie 3000.

## Edycja menu

Dane: `data/menu.json`. Po edycji uruchom:

```sh
python3 scripts/build_menu.py
```

Generator aktualizuje kartę w `index.html` i `menu.html`. Jedyna cena podana w źródłowym PDF-ie to Margherita 31 zł; pozostałe pozostają nieokreślone.

Materiały graficzne i lokalne fonty znajdują się w `assets`. Dodatkowe informacje: [DEVELOPMENT.md](DEVELOPMENT.md).

Strona nie została wdrożona na gustaresto.pl. Repozytorium zawiera wersję statyczną, bez integracji WordPress.
