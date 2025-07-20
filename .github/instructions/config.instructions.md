---
applyTo: '**'
---

# Uniwersalne wytyczne projektowe

## Podejście do kodowania
1. Używaj komponentów funkcyjnych i nowoczesnych mechanizmów zarządzania stanem.
2. **SEPARACJA LOGIKI I PREZENTACJI**: 
   - Komponenty UI (.tsx) powinny zawierać TYLKO prezentację i obsługę interakcji
   - Logika biznesowa MUSI być w osobnych plikach (.ts): services/, hooks/, utils/
   - Żadna logika biznesowa nie może być bezpośrednio w komponentach
   - Komponenty importują i używają gotowej logiki z plików .ts
3. Komponenty powinny być małe i mieć jedną odpowiedzialność.
4. Definiuj ścisłe interfejsy typów dla danych i odpowiedzi API.
5. Centralizuj interakcje z API w jednym miejscu (np. `services/api.ts`).
6. Stosuj responsywny design z użyciem narzędzi CSS lub frameworków.
7. Wspieraj SSR i hydratację, jeśli projekt tego wymaga.
8. Stosuj dobre praktyki dostępności (ARIA, semantyczny HTML).

## Wytyczne projektowania komponentów

### Komponenty modularne
- Projektuj komponenty jako spójne jednostki z jasnymi granicami (np. karta, panel, modal, formularz).
- Unikaj nadmiernej fragmentacji.
- Przykłady: `Card`, `Panel`, `Modal`, `Form`.

### Standardy dla modali
- Zamknięcie po kliknięciu poza modalem i po naciśnięciu Escape.
- Zarządzanie fokusem i animacje.
- Atrybuty ARIA i odpowiedni z-index.

### Obsługa błędów
- Obsługa błędów API z przyjaznymi komunikatami.
- Walidacja po stronie klienta.
- Stany ładowania i fallback UI.
- Obsługa błędów sieciowych.

### Walidacja formularzy
- Walidacja w czasie rzeczywistym i przy submit.
- Jasne komunikaty o błędach.
- Wyróżnienie pól wymaganych.
- Walidacja formatów (np. URL, tokeny).

## Integracja z API
- Dynamiczne adresy URL (nie hardkoduj).
- Kod niezależny od dostawcy.
- Centralizacja wywołań API.
- Spójna obsługa błędów.

## Struktura katalogów (przykład)
```
public/
src/
  assets/
  components/          # Komponenty UI (.tsx) - TYLKO prezentacja
  layouts/
  pages/
  services/           # Logika biznesowa (.ts) - API, operacje
  hooks/              # Custom hooks (.ts) - logika stanu
  utils/              # Funkcje pomocnicze (.ts) - pure functions
  styles/
  stories/            # Pliki .stories.tsx dla Storybook
  test/               # Pliki .test.ts/.test.tsx
  main entry point
```

## Jakość i konwencje
- Lintowanie i formatowanie kodu.
- **TESTY JEDNOSTKOWE**: 
  - Każdy plik .ts MUSI mieć odpowiadający plik .test.ts z testami pokrywającymi 100% funkcjonalności
  - Testy muszą sprawdzać wszystkie ścieżki kodu, edge cases i obsługę błędów
  - Używaj describe/it/expect do strukturyzowania testów
  - Mockuj zewnętrzne zależności
- **TESTY INTEGRACYJNE**: Komponenty .tsx testuj z @testing-library/preact
- Konwencjonalne commity.
- Dokumentacja kodu (JSDoc/TSDoc).

## Storybook dla komponentów
- **KAŻDY KOMPONENT MUSI MIEĆ PLIK .stories.tsx**:
  - Lokalizacja: `src/stories/NazwaKomponentu.stories.tsx`
  - Dokumentuj wszystkie props komponentu
  - Utwórz stories dla wszystkich wariantów (default, różne stany, rozmiary)
  - Dodaj interaktywne controls dla wszystkich props
  - Użyj tagów ['autodocs'] dla automatycznej dokumentacji
  - Przykłady użycia w różnych scenariuszach
- **Struktura stories**:
  ```tsx
  import { ComponentName } from '../components/ComponentName';
  
  export default {
    title: 'Design System/ComponentName',
    component: ComponentName,
    tags: ['autodocs'],
    argTypes: {
      // definicje controls dla wszystkich props
    },
  };
  
  export const Default = {};
  export const Variant1 = { args: { ... } };
  // więcej wariantów
  ```

## Automatyczna dokumentacja
- Skanuj folder `src/` w poszukiwaniu plików `.ts` i `.tsx`.
- Dodawaj adnotacje JSDoc/TSDoc do modułów, interfejsów, funkcji.
- Po zmianach uruchom generowanie dokumentacji.
- Eksportuj interfejsy używane przez eksportowane symbole.
- Sprawdzaj ostrzeżenia narzędzi dokumentujących.

### Konfiguracja TypeDoc i TSDoc - rozwiązywanie problemów

#### Struktura plików konfiguracyjnych
- **`typedoc.json`** - podstawowa konfiguracja TypeDoc:
  ```json
  {
    "entryPoints": ["src"],
    "entryPointStrategy": "expand",
    "out": "public/docs/api",
    "gitRevision": "main",
    "gitRemote": "origin",
    "tsconfig": "./tsconfig.app.json"
  }
  ```
- **`tsdoc.json`** - konfiguracja tagów TSDoc:
  ```json
  {
    "$schema": "https://developer.microsoft.com/json-schemas/tsdoc/v0/tsdoc.schema.json",
    "tagDefinitions": [
      {
        "tagName": "@fileoverview",
        "syntaxKind": "modifier"
      },
      {
        "tagName": "@packageDocumentation", 
        "syntaxKind": "modifier"
      },
      {
        "tagName": "@since",
        "syntaxKind": "modifier"
      }
    ],
    "supportForTags": {
      "@fileoverview": true,
      "@packageDocumentation": true,
      "@param": true,
      "@returns": true,
      "@throws": true,
      "@example": true,
      "@see": true,
      "@since": true,
      "@deprecated": true,
      "@internal": true,
      "@override": true,
      "@virtual": true,
      "@readonly": true
    }
  }
  ```

#### Rozwiązywanie typowych problemów
- **Ostrzeżenie "blockTags overwritten"**: NIE definiuj `blockTags` w `typedoc.json` - używaj tylko `tsdoc.json`
- **"Unknown block tag @since"**: Dodaj definicję tagu w `tsdoc.json` w sekcji `tagDefinitions`
- **"Invalid git remote"**: Zainicjalizuj repozytorium git lub ustaw `gitRevision: null`
- **Wszystkie interfejsy używane przez eksportowane symbole MUSZĄ być eksportowane** z `export interface`
- **Przykłady interfejsów wymagających eksportu**: props komponentów, interfejsy w metodach klas, typy parametrów i kontekstów
- **Po każdym uruchomieniu dokumentacji sprawdzaj ostrzeżenia** i poprawiaj eksporty interfejsów
- **Używaj domyślnej gałęzi `main`** (`gitRevision: "main"` w typedoc.json)