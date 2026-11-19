# Boutique Fleurs Roussel

Boutique en ligne de Fleurs Roussel : catalogue, composition des bouquets, panier, livraison et commande.

Version 2, mise en ligne en septembre 2026.

## Installer

```
npm install
```

## Lancer

```
npm run serve    # sert la boutique sur http://localhost:8080
```

Le serveur est nécessaire : le navigateur refuse de lire les fichiers de `data/` quand la page est ouverte directement depuis le disque.

Les styles sont déjà compilés dans `dist/output.css`. Après avoir ajouté une classe Tailwind dans le HTML ou le JavaScript, lancer `npm run dev` dans un second terminal.

## Essais

Pour simuler une autre date et une autre heure, ajouter `?maintenant=` à l'adresse, par exemple :

```
http://localhost:8080/?maintenant=2026-11-12T10:00
```

## Organisation

| Fichier | Contenu |
|:--|:--|
| `index.html` | La page de la boutique |
| `js/app.js` | Point d'entrée : chargement des données, événements, mise à jour de la page |
| `js/affichage.js` | Affichage du catalogue, du panier, des jours de livraison, du récapitulatif |
| `js/composition.js` | Formulaire de composition d'un bouquet |
| `js/panier.js` | Lignes du panier |
| `js/prix.js` | Calcul des prix |
| `js/promo.js` | Codes promo |
| `js/promotions.js` | Codes promo (version 2) |
| `js/livraison.js` | Zones, frais et jours de livraison |
| `js/stockage.js` | Sauvegarde du panier dans le navigateur |
| `js/outils.js` | Fonctions communes |
| `data/catalogue.json` | Bouquets, occasions et options |
| `data/livraison.json` | Règles de livraison |
| `data/promos.json` | Codes promo |
| `src/input.css` | Tailwind et le thème Roussel |
