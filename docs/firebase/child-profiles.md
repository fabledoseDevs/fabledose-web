# Profile dzieci — uruchomienie na Firebase Spark

Ta zmiana nie wymaga Cloud Functions ani zmiany planu. Wymaga opublikowania reguł
obejmujących nową kolekcję. Wykluczenia i godziny działają jako preferencje respektowane przez aplikację.
PIN pozostaje wyłączony; wybór profilu nie zapewnia autoryzacji rodzica.

## Reguły — kopiuj i wklej

1. Otwórz projekt **fabledose-3413d** w Firebase Console.
2. Przejdź do **Build → Firestore Database → Rules**.
3. Skopiuj całą zawartość pliku `docs/firebase/firestore-account-deletion.rules`
   z bieżącego brancha. Wklej zamiast dotychczasowej treści, bez znaczników Markdown.
4. Kliknij **Publish**. Nie zmieniaj Authentication ani planu rozliczeniowego.
5. W aplikacji odśwież stronę. Jeśli wcześniej pojawił się błąd profili, użyj
   przycisku „Spróbuj ponownie”.

Plik zachowuje dostęp do dotychczasowych ustawień, ulubionych i postępów rodzica
oraz blokadę usuwania konta. Dodaje dostęp wyłącznie właściciela do jego profili
oraz ich bibliotek, walidację pól profilu i blokadę nowych zapisów do profilu
w trakcie usuwania. Usunięcia istniejących dokumentów pozostają możliwe dla cleanupu.
Nie otwiera dostępu innym użytkownikom. Reguły nie są publikowane automatycznie.

## Sprawdzenie w aplikacji

1. W Ustawienia → Kontrola rodzicielska dodaj Asię i Stasia.
2. Wybierz Asię, dodaj bajkę do ulubionych i przeczytaj kilka slajdów.
3. Wybierz Stasia w nawigacji. Jego ulubione i postęp powinny być niezależne.
4. Wróć do Asi i odśwież stronę — wybrany profil i zapisane dane powinny pozostać.
5. Sprawdź też postęp audiobooka osobno dla PL i EN.
6. Zmień imię lub awatar, sprawdź ponowne wczytanie na drugim urządzeniu.
7. Usuń profil z potwierdzeniem. Drugi profil i biblioteka rodzica mają pozostać.
8. Wyloguj się i zaloguj na inne konto — poprzednie profile nie mogą się pojawić.

Istniejące dane zostają przy opcji „Rodzic”. Nie przypisujemy ich automatycznie dziecku.
Usuwanie profilu jest nieodwracalne; przy błędzie można ponowić przerwane czyszczenie.

## Wykluczenia i godziny na Spark

Po dodaniu profili wybierz tryb rodzica. Przy bajce kliknij okrągłą strzałkę obok
ulubionych. Switch przy imieniu dziecka przełącza „Dostępna” / „Wykluczona”,
z zielonym/czerwonym opisem i obsługą klawiatury. Wykluczone bajki są ukryte
w bibliotece, katalogu/wyszukiwaniu i ulubionych; ich bezpośrednie adresy są blokowane
w aplikacji. Nie usuwamy ulubionych ani postępu: po przywróceniu bajki wracają.

Przycisk „Godziny dostępu” przy profilu otwiera osobny edytor. Włącz ograniczenie,
ustaw strefę czasową (domyślnie Europe/Warsaw) i jeden przedział dla dni roboczych
oraz jeden dla weekendów. Wyłączenie danej kategorii dni oznacza brak dostępu;
wyłączenie całego harmonogramu znosi limity godzin, zachowując wykluczenia.
Początek przedziału jest włączny, koniec wyłączny. Przedziały przez północ oraz
równe godziny nie są przyjmowane. Czas jest liczony w zapisanej strefie, również
po zmianie czasu letniego/zimowego. Po końcu przedziału aplikacja zamyka odtwarzacz,
zatrzymuje audio i zapisuje ostatnią pozycję; slajdy zapisują postęp przy zmianie.

**Opublikuj ponownie aktualny plik reguł**, jeśli poprzednia wersja została już
wklejona. Nowa walidacja profili dopuszcza opcjonalne pole `policy` z godzinami
i wykluczeniami. Nie zmieniaj rozliczeń i nie wdrażaj Cloud Functions.

Test: wyklucz bajkę Asi, sprawdź jej katalog i bezpośredni link, a potem profil
Stasia. Ustaw Asi koniec dostępu za minutę i sprawdź zatrzymanie audiobooka oraz
zachowanie postępu. Po ponownym udostępnieniu bajki dane mają pozostać.

## Ograniczenie oraz kolejny etap

PIN, ograniczenie błędnych prób, jego zmiana/reset i serwerowa sesja rodzica
pozostają do wdrożenia. Użytkownik mający dostęp do zalogowanego konta może nadal
zmienić profil i ustawienia. Godziny opierają się na zegarze przeglądarki; publiczne
pliki bajek można otworzyć poza aplikacją. Nie jest to zabezpieczenie dostępu do
plików ani nieprzekraczalna kontrola rodzicielska. Nie przechowujemy jawnego PIN-u
ani jego skrótu dostępnego klientowi. Pełna ochrona wymaga osobno uzgodnionego
backendu i sposobu dostarczania treści.
