# ASYT Business — Experience

Site React/Vite présentant les solutions d'intelligence artificielle locale d'ASYT, avec démonstrations et interface de conversation.

## Site public

**GitHub Pages :** https://fabienlufbery-hue.github.io/BOT-Business/

Le workflow `.github/workflows/pages.yml` compile le site avec la base Vite `/BOT-Business/` et publie le dossier `dist` sur GitHub Pages à chaque modification de `main`.

## Limitation importante

GitHub Pages est un hébergement **statique** : il n'exécute pas `server.ts`. Le endpoint `/api/consultant/chat` et le TTS serveur ne sont donc **pas disponibles** sur cette URL tant qu'un serveur HTTPS distinct n'est pas déployé et relié à l'interface. La synthèse vocale du navigateur, quand elle est disponible, ne remplace pas Gemini Live.

Ne jamais intégrer `GEMINI_API_KEY` au code frontend, au dépôt ni à une variable `VITE_*` : cette clé doit rester sur le serveur.

## Développement local

Avec Node 22+ :

```bash
npm install
cp .env.example .env
# Configurer la variable GEMINI_API_KEY dans .env pour la partie serveur.
npm run dev
```

Le script `npm run build` produit le site statique `dist`. Le script `npm run start` démarre le serveur Express.

## Sécurité / démonstration

Les estimations d'économies, niveaux de sécurité et propositions commerciales affichés par la démo sont illustratifs ; ils ne constituent ni une certification, ni une garantie, ni une offre ferme. Éviter toute transmission de données sensibles au chatbot cloud.
