# Ticket 3 — « Le petit mot » absent du filtre « Merci »

## Signalement de Madame Roussel

> Bonjour, quand on choisit l’occasion « Merci », le bouquet « Le petit mot » n’apparaît pas. C’est pourtant celui que je vends le plus pour dire merci ! Il est bien là quand on affiche tous les bouquets.

## Reproduction avant correction

1. Je lance la boutique avec `npm run serve`.
2. Je sélectionne « Toutes » et je vérifie que « Le petit mot » est dans la liste.
3. Je sélectionne « Merci » et je regarde si le bouquet est toujours affiché.

Le bouquet doit apparaître avec les deux filtres. Dans Safari, il était visible parmi les six bouquets du catalogue, mais disparaissait avec le filtre « Merci ». Trois autres bouquets restaient affichés.

## Prompts utilisés

**Exemple de prompt de diagnostic**

> Quand je choisis « Toutes », je vois « Le petit mot ». Quand je passe sur « Merci », le bouquet disparaît alors qu’il devrait rester affiché. Je pense que le problème est côté JavaScript. Tu vois d’autres pistes ? Comment je peux les vérifier dans le navigateur avant de modifier le code ?

## Hypothèses et vérifications

- **Le filtre « Merci » ne fonctionne pas.** J’écarte cette piste, car dans Safari le filtre affichait déjà Champêtre, Soleil d’automne et Blanc pur.
- **L’occasion est mal renseignée pour « Le petit mot ».** Dans le catalogue, ce bouquet utilisait `Merci` avec une majuscule. Le filtre et les trois autres bouquets utilisaient `merci` en minuscules. Cette différence explique pourquoi le filtre laissait le bouquet de côté.

## Cause et correctif

Le filtre compare l’identifiant de l’occasion choisie avec ceux enregistrés pour chaque bouquet. Pour JavaScript, `Merci` et `merci` sont deux valeurs différentes. La correction consiste à écrire `merci` en minuscules dans la fiche de « Le petit mot » dans `data/catalogue.json`.

## Vérification après correction

Après chaque correctif, je vérifie que le problème est résolu et que les fonctions liées au changement marchent toujours. Je refais aussi les tests des tickets déjà corrigés pour vérifier que les problèmes ne reviennent pas.

L’IA a réalisé les essais suivants dans Safari sur ordinateur.

- **Ticket 3.** « Merci » affiche maintenant « Le petit mot » avec les trois autres bouquets. Le bouquet reste visible sous « Toutes » et « Pour le plaisir ». Le filtre « Amour » affiche les Roses rouges.
- **Ticket 1.** Les quatre saisies de `NOEL10` du ticket 1 donnent chacune une remise de 3,49 € sur un panier de 34,90 €. Le code `INCONNU` est refusé.
- **Ticket 2.** En partant d’un bouquet, deux clics sur `+` font passer la quantité à 2 puis à 3. Trois clics sur `−` la ramènent à 2, puis à 1, avant de retirer la ligne.

## Réponse à Madame Roussel

Bonjour Madame Roussel,

J’ai corrigé le classement du bouquet « Le petit mot ». Il apparaît maintenant quand on choisit l’occasion « Merci ».

Merci de m’avoir signalé le problème.

Bien cordialement,\
Yann
