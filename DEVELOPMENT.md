# GUSTA RESTO

## Uruchomienie

```sh
cd /workspace/Moj_projekt
python3 -m http.server 3000 --bind 0.0.0.0
```

Statyczna strona HTML/CSS/JavaScript bez zależności i budowania. Serwer Pythona służy do prac lokalnych. Nie jest to motyw WordPress. Nie publikowano strony pod gustaresto.pl.

## Menu

Pełna karta jest na stronie głównej w sekcji `#menu`. `menu.html` pozostaje zgodnym wstecznie adresem bezpośrednim. Nawigacja i przyciski na stronie głównej prowadzą do sekcji tej samej strony. Wszystkie 40 pozycji i grup wyboru w 9 kategoriach są zapisane w HTML, także dla przeglądarek bez JavaScript. Filtry i wyszukiwanie obsługuje `app.js`.

Edytuj `data/menu.json`, następnie uruchom:

```sh
python3 scripts/build_menu.py
```

Generator aktualizuje kartę w index.html oraz menu.html; przy dodawaniu kategorii trzeba również dodać odpowiadający jej przycisk `data-category` w obu plikach. Wartość `price: null` oznacza brak ceny w dostarczonym materiale. Jedyna podana cena to Margherita 31 zł. Nie dopisano cen pozostałych dań ani dodatków. Nie jest to system zamówień. Nie nadano potrawom niepotwierdzonych oznaczeń dietetycznych ani alergenów.

Źródło: `assets/menu.pdf`, dostarczony plik GUSTA_karta_menu_A3_ortografia.pdf. Strona 1 zawiera grafiki, strona 2 — kartę. Nazwy techniczne bez osobnych tytułów uporządkowano dla czytelności; nie dodawano składników. W PDF są robocze zapisy cen i literówki (np. „z kurczakem – cena”); usunięto techniczne placeholdery i poprawiono oczywiste literówki. Nazwa „endamame” pozostaje zgodna ze źródłem.

## Materiały marki

Przejrzano wszystkie 8 grafik z GUSTA_FOLIA.zip. W assets/brand zachowano niezmienione oryginały użyte w projekcie, w tym oba dostarczone pliki logo. Logo na burgundowym tle wyświetla się przez okno CSS: proporcje oryginału nie są zmieniane. Kolory pobrano z dominujących pikseli plików: #6C1E1E / #FFE6D2 z kwadratowego logo oraz #661920 z Logo marki.png i grafik wizerunkowych. Burgund #661920 jest drugim autentycznym odcieniem, a nie jego przypadkowym zamiennikiem.

Archiwum Wizualuzacje.zip zawiera 13 plików wizualizacji. Przejrzano wszystkie ujęcia; 2.jpeg i plik WhatsApp przedstawiają to samo ujęcie. W assets/interiors zapisano 6 wybranych, niezmienionych plików JPEG z czytelnymi nazwami:

- sala-glowna.jpeg ← 2.jpeg: hero, priorytet pobierania high.
- wspolny-stol.jpeg ← 9.jpeg: główne ujęcie galerii.
- korten-detal.jpeg ← 3.jpeg: detal materiałów i podziałów.
- strefa-wypoczynku.jpeg ← 5.jpeg: kamienna ściana i tapicerowane kanapy.
- bar.jpeg ← 12.jpeg: bar, hokery i drewno.
- sciana-kortenowa.jpeg ← Gusta.jpeg: tło sekcji wyboru, autentyczna faktura kortenu widoczna w wizualizacji.

Wizualizacje są renderami architektonicznymi, nie zdjęciami gotowej restauracji. Galeria opisuje je odpowiednio. Kadry wynikają wyłącznie z CSS object-fit/object-position; oryginalne pliki pozostały bez zmian. Zdjęcia galerii mają lazy loading i zadeklarowane wymiary. Galeria działa jako przewijany slider z czterema miniaturami, przyciskami poprzedni/następny, klawiaturą i gestem przewijania. Nie ma automatycznego odtwarzania. Powiększanie jest dostępne dla każdego slajdu. Powiększenie działa przez natywny dialog, z przyciskami poprzedni/następny, strzałkami klawiatury, Escape i powrotem fokusu do wybranego ujęcia. Bez JavaScript linki otwierają oryginalny plik. Plansze tymczasowe i komunikaty o braku wizualizacji usunięto. Nie użyto stocków.

Inspiracje eyetop.pl i mildreds.com nie zostały otwarte — domeny nie są objęte obecną polityką sieci. Projekt opiera się na briefie i dostarczonych materiałach.

## Walidacja

Sprawdzono składnię JavaScript i testy Chromium: 40 pozycji / 9 kategorii, cena Margherity, filtry, wyszukiwanie bez polskich znaków, brak wyników, linki do kategorii, mobilna nawigacja i jej zamknięcie Escape. Pełna karta działa bez JavaScript. Sprawdzono brak poziomego przewijania na obu stronach dla 320, 390, 768 i 1440 px oraz brak błędów JavaScript. Po dodaniu materiałów i zmianach karty sprawdź ponownie układ oraz zgodność ze źródłem.


Po dodaniu wizualizacji sprawdzono odpowiedzi HTTP wszystkich 6 plików, cztery pozycje galerii, responsywność przy 320/390/768/1440 px, powiększanie, poprzedni/następny, zawijanie galerii, strzałki klawiatury, Escape, powrót fokusu i odnośniki bez JavaScript.


## Nowa kompozycja i one-page

Całkowicie przebudowano arkusz CSS: pełnoekranowe hero, duże hasło, zmienna lokalna Manrope (Latin i Latin Extended z polskimi znakami), burgundowe i ciemne sekcje, duży slider wnętrz, pełna karta na głównej i rozbudowany kontakt. Font pochodzi z @fontsource-variable/manrope 5.3.0; integralność pobranego archiwum sprawdzono względem SHA-512 z rejestru npm. Licencja OFL jest w assets/fonts/OFL-Manrope.txt. Brak zależności od zewnętrznego CDN w działającej stronie.

Korten w pasie pod hero i panelu sekcji wyboru pochodzi z powiększonego kadru ściany na oryginalnej wizualizacji, zestawionego z półprzezroczystą warstwą dla czytelności. Nie użyto wygenerowanej tekstury rdzy. Powiększenie i pozycję kadru określa CSS. Na mobile kadry i skale typografii są osobno dopasowane. Obsługa prefers-reduced-motion wyłącza wejścia zdjęć i sekcji oraz płynne przewijanie slidera. Treść pozostaje dostępna bez JavaScript.

Końcowe testy one-page: pełne menu na głównej (40 pozycji / 9 kategorii), kategorie, wyszukiwanie, brak wyników, bezpośredni #pasta, slider poprzedni/następny/miniatury/zawijanie/klawiatura, powiększenie, brak poziomego przepełnienia dla 320/390/700/768/1024/1440 px oraz kompletna karta bez JavaScript. Zrzuty ujawniły zbyt wysokie miniatury wynikające z atrybutu wysokości obrazu; skorygowano je przez height:auto.


## Ostatnie dopracowanie interfejsu

Usunięto pas Lunch/Pizza/Pasta. Header przepuszcza tło i używa backdrop-filter; w hero zdjęcie przechodzi za header. Hero ma trzy kadry (sala, wspólny stół, bar), zmianę co 7 sekund, przenikanie i efekt Ken Burns. Dostępne są ręczne przyciski kadru i pauza. Autoodtwarzanie zatrzymuje się poza ekranem oraz po ukryciu karty; prefers-reduced-motion domyślnie wstrzymuje pokaz i wyłącza transformacje.

Przycisk hero zastąpiono podkreślonym odnośnikiem z osobną strzałką w okręgu. Tekst O nas powiększono, zachowując jego dużą typografię po lewej. Menu ma burgundowe przyciski z licznikami pozycji, wyróżnione nagłówki i układ dwóch kolumn na komputerze / jednej na telefonie. Nieznane ceny oznaczono myślnikiem z dostępnym opisem; cenę Margherity zachowano. Generator obsługuje te oznaczenia.

Wnętrza przeniesiono za pełne menu. Poprzedni duży slider i miniatury zastąpiono czterema rozsuwanymi panelami. Na komputerze działają hover, kliknięcie i klawiatura; na telefonie panele układają się pionowo i rozwijają po dotknięciu. Link + otwiera powiększenie. Jeden panel pozostaje rozwinięty.

Do przeglądania poza środowiskiem można przygotować ZIP z index.html, menu.html, styles.css, app.js oraz assets. Po rozpakowaniu otwórz index.html. Dane menu są w HTML, więc nie wymagają serwera ani fetch. Publiczny adres WWW wymaga wdrożenia na hosting; środowisko onboarding nie udostępnia publicznych podglądów localhost.
