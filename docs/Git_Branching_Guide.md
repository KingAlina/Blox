# Workflow: Schritt für Schritt
Für jede Aufgabe wird ein eigener Branch erstellt. Diese Branches sind kurzlebig und werden nach dem Merge gelöscht.

## Schritt 1: Lokales Repository aktualisieren
Bevor du mit einer neuen Aufgabe beginnst, stelle sicher, dass dein lokaler dev-Branch auf dem neuesten Stand ist.

```bash
git checkout dev
git pull origin dev
```

## Schritt 2: Neue Aufgabe starten: Einen Feature-Branch erstellen
Erstelle einen eigenen Branch für dein Feature, ausgehend vom dev-Branch:

```bash
git checkout -b feature/DEIN-BEREICH-kurzbeschreibung
```
Unsere Bereiche:
Alina: feature/scrum-...
Aria: feature/frontend-...
Michael: feature/backend-...
Sophia: feature/game-logic-...
Hina: feature/game-ui-...


## Schritt 3: Änderungen speichern: Commits
Speichere deine Fortschritte lokal auf deinem Rechner:

```bash
git add .
git commit -m "Kurze Beschreibung der Änderung (z.B. Login-Formular erstellt)"
```


## Schritt 4: Änderungen veröffentlichen: Push auf GitHub
Wenn dein Feature fertig (oder bereit für Feedback) ist, lade deinen Branch auf GitHub hoch.

```bash
git push -u origin feature/DEIN-BEREICH-kurzbeschreibung
```


## Schritt 5: Code zusammenführen: Pull Request (PR) erstellen
1. Gehe auf GitHub in unser Repository.
2. Klicke auf "Compare & pull request"
3. Wähle als Ziel (base) den dev-branch aus
4. Informiere mich (Alina), damit ich den Merge prüfen und durchführen kann. 



Hinweis: Niemals direkt im main oder dev arbeiten! Bei Konflikten bitte sofort melden. 