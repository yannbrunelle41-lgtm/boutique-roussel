# Ticket 5 — Le panier se vide en supprimant un bouquet

## Signalement de Madame Roussel

> Bonjour, une cliente avait mis trois bouquets différents dans son panier. Elle a voulu retirer le premier avec le bouton « Supprimer » : les trois ont disparu. Elle a cru à une panne et elle est partie sans commander.

## Reproduction avant correction

1. Je pars d’un panier vide et j’ajoute trois bouquets différents, sans changer les options.
2. Je clique sur « Supprimer » sur la première ligne.
3. Je vérifie quels bouquets restent dans le panier.

Je m’attends à retrouver les deux derniers bouquets. Dans Safari, un seul clic a suffi à vider le panier.

## Prompts utilisés

**Exemple de prompt de diagnostic**

> J’ajoute trois bouquets différents au panier. Quand je clique sur « Supprimer » à côté du premier, les trois disparaissent. Je voudrais garder les deux autres. Je pense que le problème est dans la façon dont le code retire le bouquet. Tu vois d’autres pistes ? Comment je peux les vérifier avant de modifier le code ?

## Hypothèses et vérifications

- **Un clic déclenche plusieurs suppressions.** C’était une piste à vérifier après le problème du bouton `+` au ticket 2. Le bouton « Supprimer » utilise le même écouteur, installé une seule fois. L’IA a vérifié que l’appel à la fonction de suppression suffit à expliquer le résultat.
- **La fonction retire aussi les lignes qui suivent.** Dans `js/panier.js`, `splice(index)` indique à partir de quelle ligne supprimer. Sans deuxième argument, la suppression continue jusqu’à la fin du panier. Cela explique pourquoi supprimer la première ligne fait disparaître les trois.

## Cause et correctif

L’IA a remplacé `lignes.splice(index)` par `lignes.splice(index, 1)` dans `supprimerLigne`. Le `1` indique qu’une seule ligne doit être retirée. Cette fonction sert aussi quand le bouton `−` fait tomber la quantité d’une ligne à zéro.

## Vérification après correction

Après chaque correctif, je vérifie que le problème est résolu et que les fonctions liées au changement marchent toujours. Je refais aussi les tests des tickets déjà corrigés pour vérifier que les problèmes ne reviennent pas.

L’IA a réalisé les essais suivants dans Safari sur ordinateur.

- **Ticket 5.** Supprimer la ligne du milieu laisse deux bouquets. Supprimer ensuite la première ligne en laisse un. Le panier se vide quand la dernière ligne est supprimée. Sur un panier avec une petite et deux grandes Pivoines poudrées, cliquer sur `−` sur la petite retire seulement cette ligne.
- **Ticket 1.** Les quatre variantes de `NOEL10` donnent chacune 3,49 € de remise sur 34,90 €. Le code `INCONNU` est refusé.
- **Ticket 2.** Deux clics sur `+` font passer la quantité de 1 à 2 puis à 3. Les clics sur `−` la ramènent à 2, puis à 1, et le dernier retire la ligne.
- **Ticket 3.** « Le petit mot » apparaît sous « Toutes », « Merci » et « Pour le plaisir ». Il est absent sous « Amour ».
- **Ticket 4.** Une petite Pivoine poudrée et une grande restent sur deux lignes. Ajouter une autre grande augmente seulement la quantité de la ligne « Grand ».

---

## Réponse à Madame Roussel

Bonjour Madame Roussel,

J’ai corrigé le bouton « Supprimer » du panier. Il retire maintenant seulement le bouquet sélectionné. Les autres bouquets restent dans le panier.

Merci de m’avoir signalé le problème.

Bien cordialement,\
Yann
