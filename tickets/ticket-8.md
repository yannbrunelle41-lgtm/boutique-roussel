# Ticket 8 — Livraison confirmée le matin au lieu de l’après-midi

## Signalement de Madame Roussel

> Bonjour, une cliente avait choisi une livraison l’après-midi, parce qu’elle travaille le matin. Le message de confirmation disait « matin », et c’est aussi ce qui était écrit dans la commande que j’ai reçue. Mon livreur est passé le matin : personne. Elle a dû venir chercher son bouquet à la boutique.

## Reproduction avant correction

1. J’ajoute une Pivoine poudrée au panier.
2. Je saisis le code postal `37000` et je choisis un jour de livraison.
3. Je coche « Après-midi », puis je clique sur « Commander ».
4. Je compare le créneau choisi avec celui du message de confirmation.

Je m’attends à lire « après-midi ». Dans Safari, « Après-midi » était bien coché, mais la confirmation indiquait « matin ».

## Prompts utilisés

**Exemple de prompt de diagnostic**

> Je choisis « Après-midi » pour la livraison, mais après avoir cliqué sur « Commander », le message indique « matin ». Je pense que le choix se remet sur « Matin » quand je passe la commande. Tu vois une autre explication ? Comment je peux vérifier avant de modifier le code ?

## Hypothèses et vérifications

- **Le choix revient sur « Matin » quand je commande.** J’écarte cette piste. Dans Safari, le bouton « Après-midi » est resté coché après le clic, alors que le message indiquait « matin ».
- **Le site lit le mauvais bouton.** L’IA a vérifié la fonction `commander` dans `js/app.js`. Le code cherchait le premier bouton du groupe. Comme « Matin » est affiché en premier, la confirmation reprenait toujours ce créneau.

## Cause et correctif

L’IA a ajouté `:checked` à la recherche du bouton dans `commander`. Cela permet de lire le bouton coché au moment de la confirmation. Le reste de la vérification de la commande suit les mêmes étapes.

## Vérification après correction

Après chaque correctif, je vérifie que le problème est résolu et que les fonctions liées au changement marchent toujours. Je refais aussi les tests des tickets déjà corrigés pour vérifier que les problèmes ne reviennent pas.

L’IA a fait les essais suivants dans Safari sur ordinateur, dans la boutique locale.

- **Ticket 8.** Avec « Après-midi » coché, la confirmation indique « après-midi ». Avec « Matin », elle indique « matin ». Le panier se vide après la confirmation. Le site bloque toujours la commande si le panier est vide, si le code postal manque ou si aucun jour n’a été choisi.
- **Ticket 1.** Les quatre variantes de `NOEL10` appliquent 3,49 € de remise sur 34,90 €. Le code inconnu est refusé.
- **Ticket 2.** Deux clics sur `+` font passer la quantité de 1 à 2 puis à 3. Deux clics sur `−` la ramènent à 2 puis à 1.
- **Ticket 3.** « Le petit mot » apparaît sous « Toutes », « Merci » et « Pour le plaisir ». Il est absent sous « Amour ».
- **Ticket 4.** Une petite et une grande Pivoine poudrée restent sur deux lignes, pour 85,40 € au total.
- **Ticket 5.** Supprimer la première ligne d’un panier de trois lignes laisse les deux autres.
- **Ticket 6.** À 60,00 € de sous-total, la livraison est offerte pour le code postal 37000.
- **Ticket 7.** Un message de 301 caractères donne trois cartes. Le récapitulatif affiche « 3 × 2,50 € = 7,50 € ».

La boutique locale affiche la confirmation à l’écran. Une transmission à la boutique ou au livreur ne peut pas être contrôlée avec cette version.

## Réponse à Madame Roussel

Bonjour Madame Roussel,

J’ai corrigé la confirmation de commande. Elle reprend maintenant le créneau choisi par la cliente. J’ai vérifié les deux cas, une livraison le matin et une livraison l’après-midi.

Merci de m’avoir signalé le problème.

Bien cordialement,
Yann
