# Ticket 4 — Deux tailles, deux grands bouquets

## Signalement de Madame Roussel

> Bonjour, une cliente voulait offrir deux Pivoine poudrée : une petite pour sa sœur et une grande pour sa mère. Elle a composé la petite et l’a ajoutée au panier, puis elle a choisi « Grand » et a cliqué à nouveau sur « Ajouter au panier ». Dans son panier : deux grandes ! Elle n’a pas compris, et moi non plus.

## Reproduction avant correction

1. Je pars d’un panier vide et je clique sur « Composer » pour le bouquet Pivoine poudrée.
2. Je garde la taille « Petit », je laisse les options décochées et je clique sur « Ajouter au panier ».
3. Sans quitter le formulaire, je choisis « Grand » et je clique à nouveau sur « Ajouter au panier ».
4. Je regarde les tailles, les quantités et le sous-total du panier.

Je dois avoir une petite Pivoine poudrée à 34,90 € et une grande à 50,50 €, soit 85,40 € au total. Dans Safari, après le deuxième ajout, le panier affichait une seule ligne de deux grands bouquets à 101,00 €.

## Prompts utilisés

**Exemple de prompt de diagnostic**

> J’ajoute une Pivoine poudrée en taille Petit, puis je change la taille en Grand et j’ajoute le bouquet une deuxième fois. Je devrais avoir un petit et un grand, mais je vois deux grands dans le panier. Je pense que le panier ne garde pas la taille choisie au moment du premier ajout. Tu vois d’autres pistes ? Comment je peux les vérifier avant de modifier le code ?

## Hypothèses et vérifications

- **Le panier regroupe les bouquets même quand les tailles sont différentes.** J’écarte cette piste, car la comparaison dans `memesOptions` vérifie déjà la taille. Le problème commence avant cette comparaison.
- **Le premier bouquet reprend les choix du formulaire.** L’IA a reproduit le cas avec le code du panier avant correction. Elle a ajouté un petit bouquet, modifié la taille dans les options utilisées pour cet ajout, puis ajouté le grand bouquet. Le panier a regroupé les deux en une ligne à 101,00 €, comme dans Safari.

## Cause et correctif

Le formulaire garde ses choix dans un objet appelé `options`. Le panier conservait ce même objet pour le premier bouquet. En passant de « Petit » à « Grand » dans le formulaire, on changeait donc aussi la taille du bouquet déjà dans le panier. Au deuxième ajout, le panier voyait deux bouquets de même taille et les regroupait.

L’IA a modifié `ajouterAuPanier` dans `js/panier.js`. À chaque nouvelle ligne, le panier garde une copie des options. Les changements dans le formulaire ne touchent plus les bouquets déjà ajoutés. Deux bouquets avec les mêmes choix se regroupent toujours sur la même ligne.

### Revue après résolution

L’IA m’a proposé de copier les options dans le formulaire avant de les envoyer. J’ai préféré faire la copie au moment de créer la ligne du panier. C’est à cet endroit que les choix doivent être gardés, quel que soit l’endroit d’où vient l’ajout.

## Vérification après correction

Après chaque correctif, je vérifie que le problème est résolu et que les fonctions liées au changement marchent toujours. Je refais aussi les tests des tickets déjà corrigés pour vérifier que les problèmes ne reviennent pas.

L’IA a vérifié les points suivants dans le terminal avec les modules de la boutique.

- **Ticket 4.** Le petit et le grand forment deux lignes, pour un sous-total de 85,40 €. Ajouter un deuxième grand augmente seulement la quantité de la ligne « Grand ». Le vase, la carte et le message restent ceux choisis au moment de l’ajout, même si le formulaire est modifié ensuite. Les tailles restent distinctes après une sauvegarde et une relecture des données.
- **Ticket 1.** Les quatre saisies de `NOEL10` donnent une remise de 3,49 € sur 34,90 €. Un code inconnu est refusé.
- **Ticket 2.** En simulant les clics sur `+` et `−`, la quantité passe de 1 à 2 puis à 3, revient à 2 puis à 1, et le dernier clic retire la ligne.
- **Ticket 3.** « Le petit mot » est affiché sous « Toutes », « Merci » et « Pour le plaisir ». Il est absent sous « Amour ».

L’IA a aussi rejoué les essais dans Safari sur ordinateur après la correction.

- **Ticket 4.** Le panier affiche bien un petit bouquet à 34,90 € et un grand à 50,50 €, pour un sous-total de 85,40 €. En ajoutant un deuxième grand, seule la quantité de la ligne « Grand » passe à 2. Les deux lignes sont toujours présentes après le rechargement de la page.
- **Ticket 1.** Les quatre variantes de `NOEL10` appliquent chacune 3,49 € de remise sur 34,90 €. Le code inconnu est refusé.
- **Ticket 2.** Les clics sur `+` et `−` changent la quantité d’un seul bouquet à la fois. Le dernier clic sur `−` retire la ligne.
- **Ticket 3.** « Le petit mot » apparaît sous « Toutes », « Merci » et « Pour le plaisir ». Il reste absent sous « Amour ».

---

## Réponse à Madame Roussel

Bonjour Madame Roussel,

J’ai corrigé le problème avec les tailles dans le panier. Si vous ajoutez une petite Pivoine poudrée puis une grande, le panier garde les deux tailles et affiche chaque bouquet sur sa propre ligne.

Merci de m’avoir signalé le problème.

Bien cordialement,\
Yann
