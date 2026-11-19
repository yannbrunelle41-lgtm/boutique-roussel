# Ticket 2 — Le bouton + ajoute plusieurs bouquets

Ticket 2 : le bouton +
Bonjour, quand une cliente veut plusieurs bouquets identiques et clique sur le +, le panier en ajoute
plusieurs d’un coup, et c’est de pire en pire à chaque clic. Une cliente s’est retrouvée avec une quinzaine
de bouquets. Heureusement qu’elle a vu le total avant de commander !

## Reproduction avant correction

1. Lancer la boutique avec `npm run serve` et partir d’un panier vide.
2. Ajouter une Pivoine poudrée en taille Petit, sans option.
3. Cliquer deux fois sur le bouton `+` de la ligne. Observer la quantité après chaque clic.
4. Recharger la page, puis cliquer de nouveau deux fois sur `+` en notant la quantité après chaque clic.

**Résultat attendu.** Avec un bouquet au départ, le premier clic doit faire passer la quantité à 2 et le second à 3.

**Résultat observé dans Safari.** La ligne affichait 7 bouquets après deux clics. En rechargeant la page avec ces 7 bouquets, les deux clics suivants ont fait passer la quantité de 7 à 8, puis de 8 à 10.

## Demande à l’IA

**Prompt de diagnostic possible**

> Quand je pars d’un panier vide, que j’ajoute une Pivoine poudrée en taille Petit sans option, puis que je clique deux fois sur le bouton `+` du panier, la quantité passe de 1 à 7. Je m’attends à passer de 1 à 2, puis à 3.
>
> Peux-tu regarder ce qui se passe entre le clic et la mise à jour de la quantité dans `js/affichage.js`, `js/app.js` et `js/panier.js` ? Donne-moi tes hypothèses et indique comment les vérifier dans le navigateur avant de proposer un correctif.

## Hypothèses et vérifications

- **Plusieurs réactions au même clic.** L’IA a relevé que `afficherPanier` installe un nouvel écouteur de clic à chaque actualisation. Dans Safari, le premier clic après un rechargement ajoute un seul bouquet et le suivant en ajoute deux. Ce résultat correspond à l’accumulation des écouteurs au fil des actualisations.
- **Mauvaise valeur ajoutée par le bouton.** Cette piste a été écartée. Dans `quandActionPanier`, le bouton `+` ajoute déjà 1. Le premier clic après le rechargement confirme que cette valeur est correcte.

## Cause et correctif

Quand le panier est actualisé, les boutons sont recréés, mais la liste qui les contient reste en place. Les anciens écouteurs restent attachés à cette liste. Chaque nouveau clic déclenche donc plusieurs fois la même action.

L’IA a déplacé l’installation de l’écouteur dans `preparerPanier`, appelée une seule fois au démarrage par `js/app.js`. `afficherPanier` continue de recréer les lignes et leurs boutons. Le même écouteur traite les clics sur `+`, `−` et « Supprimer ».

## Vérification après correction

Après chaque correctif, je vérifie que le problème est résolu et que les fonctions liées au changement marchent toujours. Je refais aussi les tests des tickets déjà corrigés pour vérifier que les problèmes ne reviennent pas.

- **Quantités dans Safari.** L’IA est repartie du panier enregistré à 10 bouquets. Deux clics sur `+` ont donné 11 puis 12 bouquets. Un clic sur `−` a ramené la quantité à 11. Un essai avec un seul bouquet a aussi confirmé que `−` retire la dernière ligne.
- **Suppression.** En supprimant la première ligne d’un panier qui en contenait deux, Safari a retiré les deux lignes. L’IA a reproduit ce comportement dans `js/panier.js`, dont le code est identique à la version précédente. Ce problème est couvert par le ticket 5.
- **Ticket 1 rejoué dans Safari sur ordinateur.** Les quatre variantes de `NOEL10` du ticket 1 ont chacune appliqué 3,49 € de remise sur 34,90 €. Le code `INCONNU` a été refusé.

## Réponse à Madame Roussel

Bonjour Madame Roussel,

J’ai corrigé le bouton + du panier. Chaque clic ajoute maintenant un seul bouquet à la quantité choisie. J’ai vérifié que cela fonctionne aussi après plusieurs clics de suite.

Merci de m’avoir signalé le problème.

Bien cordialement,

Yann
