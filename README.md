# Fit & Gezond - Health & Fitness App

Een persoonlijke web applicatie voor het delen van wandelmotivatie en gezonde recepten met vrienden en bekenden.

## Features

### Wandelmotivatie
- **Wandeltracker**: Registreer je dagelijkse wandelingen met afstand en tijd
- **Statistieken**: Bekijk je stappen vandaag, kilometers deze week en je streak
- **Wandelgeschiedenis**: Overzicht van je laatste 10 wandelingen
- **Motiverende tips**: Praktische tips om van wandelen een gewoonte te maken

### Recepten Delen
- **Receptengalerij**: Overzichtelijke weergave van al je gezonde recepten
- **Foto's**: Voeg mooie foto's toe aan je recepten
- **Categorieën**: Organiseer recepten per maaltijd (ontbijt, lunch, diner, snack)
- **Details**: Inclusief ingrediënten, bereidingswijze, bereidingstijd en calorieën
- **Eenvoudig toevoegen**: Gebruiksvriendelijk formulier om nieuwe recepten toe te voegen

### Health & Fitness Tips
- Hydratatie
- Slaap
- Voeding
- Mindfulness
- Doelen stellen
- Sociale steun

## Technologie

- **HTML5**: Moderne semantische HTML
- **CSS3**: Responsive design met flexbox en grid
- **Vanilla JavaScript**: Geen frameworks, pure JavaScript
- **LocalStorage**: Alle data wordt lokaal opgeslagen in je browser

## Aan de slag

### Installatie

1. Clone de repository:
```bash
git clone https://github.com/vocverl/health-fitness-app.git
cd health-fitness-app
```

2. Open `index.html` in je browser:
   - Dubbelklik op het bestand, of
   - Open via een lokale server (aanbevolen):

**Met Python 3:**
```bash
python -m http.server 8000
```

**Met Node.js (http-server):**
```bash
npx http-server
```

Bezoek vervolgens: `http://localhost:8000`

### Deployment op GitHub Pages

1. Ga naar je repository op GitHub
2. Klik op **Settings** > **Pages**
3. Selecteer onder "Source": **main** branch
4. Klik op **Save**
5. Je app is nu beschikbaar op: `https://vocverl.github.io/health-fitness-app/`

## Gebruik

### Wandeling Registreren
1. Scroll naar de "Wandelmotivatie" sectie
2. Vul het aantal kilometers en minuten in
3. Klik op "Toevoegen"
4. Je statistieken worden automatisch bijgewerkt!

### Recept Toevoegen
1. Scroll naar "Gezonde Recepten"
2. Scroll naar het formulier onderaan
3. Vul alle velden in:
   - Naam van het recept
   - Categorie (ontbijt, lunch, diner, snack)
   - Ingrediënten (één per regel)
   - Bereidingswijze
   - Foto URL (optioneel - gebruik een gratis image hosting service zoals Imgur)
   - Bereidingstijd in minuten
   - Calorieën (optioneel)
4. Klik op "Recept Opslaan"

### Tips voor Foto's
Voor receptfoto's kun je gebruikmaken van:
- **Unsplash**: Gratis stock foto's
- **Imgur**: Upload je eigen foto's
- **Cloudinary**: Voor grotere projecten

## Data Opslag

Alle data wordt opgeslagen in de LocalStorage van je browser:
- Wandelingen
- Recepten
- Statistieken

**Let op**: Als je je browser cache wist, kan je data verloren gaan. Voor een productieomgeving zou je een database kunnen toevoegen.

## Aanpassen

### Kleuren wijzigen
Open `styles.css` en pas de CSS variabelen aan in `:root`:

```css
:root {
    --primary-color: #4CAF50;    /* Hoofdkleur */
    --secondary-color: #2196F3;  /* Secundaire kleur */
    --accent-color: #FF9800;     /* Accentkleur */
}
```

### Sample Recepten
De app bevat 3 voorbeeldrecepten. Deze kun je verwijderen of aanpassen in `app.js` rond regel 11.

## Browser Ondersteuning

- Chrome (aanbevolen)
- Firefox
- Safari
- Edge

Werkt op desktop, tablet en mobiel!

## Roadmap

Mogelijke toekomstige features:
- [ ] Data export/import functionaliteit
- [ ] Sociale sharing opties
- [ ] Backend database voor persistente opslag
- [ ] Gebruikersaccounts
- [ ] Foto upload functionaliteit
- [ ] Wandelroutes met GPS tracking
- [ ] Voedingsinformatie calculator
- [ ] Week menu planner
- [ ] Boodschappenlijst generator

## Licentie

Dit project is open source en beschikbaar voor persoonlijk gebruik.

## Contact

Voor vragen of suggesties, maak een issue aan op GitHub.

---

**Veel plezier met het delen van je health & fitness journey!** 💪🥗🚶‍♂️
