# Fit & Gezond - Health & Fitness App

Een persoonlijke health & fitness web applicatie voor het bijhouden van fitnessdoelen, delen van gezonde recepten en het volgen van een gezondheidsprotocol.

## Features

### Fitness Metrics
- **Body Fat Percentage** - Track huidig vs doel met voortgangsbalk en foto uploads
- **VO2 Max** - Track cardio fitness niveau met fitness categorie classificatie (Slecht tot Superieur)
- Foto upload functionaliteit (opgeslagen als base64 in LocalStorage)

### Recepten
- **Receptengalerij** - Overzichtelijke weergave met foto's en macro's
- **Categorieen** - Ontbijt, Lunch, Diner, Snack
- **Macro tracking** - Eiwitten, koolhydraten, vetten met calorie berekening
- **Recept details** - Modal popup met volledige informatie
- **Toevoegen & verwijderen** - Gebruiksvriendelijk formulier
- **3 standaard recepten** - Power Ontbijt, Hele Zeebaars, Kipfilet met Paddenstoelen

### 70/30 Principe
- Visuele ijsberg illustratie
- Uitleg waarom 70% voeding vs 30% beweging
- Educatieve kaarten met motiverende content

### Virgil's Protocol
- Uitgebreid gezondheidsoptimalisatie protocol (geinspireerd door Bryan Johnson's Blueprint)
- **17 actieve items** — supplementen, skincare, moleculaire agenten, functioneel voedsel
- **Kosten tracking** — maandelijks (425,14) en dagelijks (14,17)
- **Filterbare tabs** — Alles, Supplementen, Skincare, Voeding, Moleculair
- Details per item: merk, leverancier, dosering, frequentie, voorraad, kosten

### Voedingsdagboek
- Link naar MyFitnessPal integratie
- Uitleg over macro tracking

## Tech Stack

- **HTML5 / CSS3 / Vanilla JavaScript** — geen frameworks
- **LocalStorage** — alle data lokaal opgeslagen (overleeft page refresh, niet cache wissen)
- **Google Fonts** — Raleway font family
- **Unsplash** — Externe afbeeldingen voor recepten en hero sectie

## Starten

Open `index.html` in een moderne browser.

Of via een lokale server (aanbevolen):
```bash
python -m http.server 8000    # Python 3
npx http-server               # Node.js
```

### Deployment op GitHub Pages

1. Push naar GitHub repository
2. Settings > Pages > selecteer "main" branch
3. Beschikbaar op: `https://vocverl.github.io/health-fitness-app/`

## Projectstructuur

```
health-fitness-app/
├── index.html           # Hoofd HTML
├── app.js               # JavaScript logica
├── styles.css           # Styling
├── protocol-data.js     # Protocol items data
├── favicon.svg          # Icoon
├── images/
│   └── 70-30-iceberg.jpg
└── README.md
```

## Aanpassen

### Kleuren wijzigen
Pas CSS variabelen aan in `styles.css` onder `:root`.

### Protocol items
Bewerk `protocol-data.js` om supplementen, skincare en andere items toe te voegen of aan te passen.

### Recepten
De app bevat 3 voorbeeldrecepten. Deze kun je aanpassen in `app.js`. Nieuwe recepten worden opgeslagen in LocalStorage.

## Browser Ondersteuning

Chrome, Firefox, Safari, Edge. Responsive voor desktop, tablet en mobiel.
