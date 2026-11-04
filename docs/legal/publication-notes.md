# Dokumenty prawne — przed publikacją

Wersja robocza: 2026-11-04. Nie stanowi potwierdzenia kompletności prawnej ani konfiguracji produkcji.

## Potwierdzone w kodzie

- Firebase Authentication i Firestore; logowanie email/hasło i Google.
- Analytics inicjalizowane w src/config/firebase.js niezależnie od zgód.
- cookiesAnalytical/cookiesMarketing domyślnie true w SettingsContext; przełączniki zapisują preferencje, lecz nie blokują SDK.
- Wybrany profil dziecka w localStorage; odczyt NEXT_LOCALE przez proxy.
- Automatyczne usuwanie konta za flagą, domyślnie wyłączone.
- Płatności odłożone, plan testowy nie jest zweryfikowaną subskrypcją.

## Do ustalenia i wykonania

- Adres podmiotu, status działalności i wymagane dane identyfikacyjne. Nie wymyślać adresu ani NIP.
- Region Firestore i rzeczywiści odbiorcy, podmioty umowne, transfery i dokumenty dostawców; potwierdzić hosting Vercel w produkcji.
- Okresy retencji dla kont, zgłoszeń, logów, analityki i kopii. Nie przyjęto arbitralnych terminów.
- Mechanizm obsługi żądań praw osób, manualne usuwanie danych i dostęp do skrzynki kontaktowej.
- Odmowa jako ustawienie początkowe opcjonalnych technologii; brak inicjalizacji Analytics przed zgodą, cofanie zgody i panel publiczny.
- Inwentaryzacja cookies/localStorage/IndexedDB, rzeczywiste nazwy i czasy; testy sieciowe gościa i zalogowanego.
- Prawa do wszystkich warstw utworów i szczegółowe warunki licencji pokazów publicznych.
- Przy uruchomieniu sprzedaży: cennik końcowy, rozliczenia, anulowanie, reklamacje, odstąpienie, dostarczanie informacji na trwałym nośniku. Nie wpisywać automatycznej utraty prawa odstąpienia za samo odtworzenie bajki.
- Po zatwierdzeniu: usunąć redakcyjne uwagi ze szkiców, przenieść JSON do src/articles/content, podpiąć stopkę i widok bez Sidebar dla gościa. Ustawienia ciasteczek mają otwierać panel, nie wyłącznie artykuł.

## Źródła sprawdzone 2026-11-04

- https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/principles-gdpr_en
- https://europa.eu/youreurope/business/governance-and-sustainability/digital-and-data-compliance/data-protection-gdpr/index_en.htm
- https://europa.eu/youreurope/business/growing/digitalising/online-privacy/index_en.htm
- https://europa.eu/youreurope/citizens/consumers/shopping/returns/index_en.htm
- https://firebase.google.com/support/privacy
- https://firebase.google.com/docs/tutorials/payments-stripe
- https://docs.stripe.com/security/guide

To źródła do redakcji, a nie zapewnienie zgodności wdrożenia. Szkice celowo odróżniają aktualne funkcje od planów.

## Udostępnienie szkiców w interfejsie

Na prośbę właściciela trzy szkice PL/EN skopiowano do src/articles/content.
Są dostępne jako publiczne artykuły pod /{pl|en}/article/{privacy-policy|terms-of-use|cookies}.
Zachowano jawne uwagi o wersji roboczej i brakach. Udostępnienie treści nie oznacza
naprawy zgód, uruchomienia płatności ani zatwierdzenia kompletności dokumentów.
Stopka i ustawienia prowadzą do tych samych treści; widok artykułu nie wymaga logowania.
Link ciasteczek nazwano informacyjnym: nie udaje gotowego panelu zgód.
Kopie w drafts są materiałem początkowym; dalsze poprawki publikowanych tekstów
należy prowadzić w src/articles/content.
