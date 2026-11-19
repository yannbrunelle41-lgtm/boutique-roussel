# Ticket 10 — « NaN € » dans un ancien panier

## Signalement de Madame Roussel

> Bonjour, une cliente fidèle, qui commandait déjà sur le site l’an dernier, avant la nouvelle version, m’a envoyé une capture d’écran : son panier affiche « NaN € » à la place des prix, et elle ne peut plus commander. Chez moi et chez mes autres clientes, tout fonctionne. Que se passe-t-il ?

## Reproduction avant correction

1. Je prépare un panier de test avec une ancienne sauvegarde simulée. Elle contient un bouquet et aucune quantité.
2. Je place cette sauvegarde dans le stockage du navigateur sous la clé `panier-roussel`.
3. Je recharge la boutique et je regarde le prix de la ligne et le sous-total.

L’IA a reproduit le calcul dans le terminal avec cette sauvegarde simulée. L’ancien code chargeait la ligne et le calcul du sous-total donnait `NaN`. Le cahier des charges prévoit que les paniers de la version 1 ne sont pas repris en version 2. Dans ce cas, la boutique doit démarrer avec un panier vide.

## Prompts utilisés

**Exemple de prompt de diagnostic**

> Une cliente qui utilisait l’ancienne version voit « NaN € » dans son panier. Chez les autres clientes, les prix s’affichent normalement. Je n’ai pas d’idée sur la façon de résoudre le problème pour l’instant. Peux-tu me proposer des pistes et m’expliquer comment vérifier si ça vient d’un ancien panier enregistré dans le navigateur ?

## Hypothèses et vérifications

- **Un prix manque dans le catalogue.** J’écarte cette piste. Dans Safari, une Pivoine poudrée ajoutée à un panier neuf coûte bien 34,90 €. Dans le terminal, le même bouquet donne `NaN` dans le panier ancien simulé alors que le catalogue est le même.
- **La boutique relit une ancienne sauvegarde.** L’IA a vérifié que `chargerPanier` acceptait un tableau sans numéro de version. Dans la sauvegarde simulée, la ligne n’a pas le champ `quantite` attendu. Le calcul multiplie alors le prix du bouquet par une valeur manquante.

## Cause et correctif

Le problème vient de la lecture du panier dans `js/stockage.js`. L’IA a ajouté une vérification du numéro de version et du format de la liste. Si la sauvegarde est ancienne ou illisible, la boutique démarre avec un panier vide. Si le panier vient de la version 2 et que la liste a le bon format, la boutique restaure les bouquets et le code promo. Afficher 0 € à la place de `NaN` aurait laissé la ligne incompatible dans le panier.

## Vérification après correction

Après chaque correctif, je vérifie que le problème est résolu et que les fonctions liées au changement marchent toujours. Je refais aussi les tests des tickets déjà corrigés pour vérifier que les problèmes ne reviennent pas.

- **Ticket 10.** Dans le terminal, l’IA a démarré la boutique avec un stockage simulé contenant un ancien panier. La boutique a affiché un sous-total de 0,00 € et enregistré un panier vide en version 2. Une sauvegarde illisible est aussi écartée. Dans Safari, un panier créé avec la version actuelle a gardé le bouquet et sa remise de 3,49 € après rechargement.
- **Tickets 1 à 9.** L’IA a rejoué dans le terminal les contrôles des promotions, des quantités, des filtres, des tailles, de la suppression, de la livraison gratuite, du prix des cartes et de la confirmation du créneau. Dans Safari, elle a aussi vérifié que la liste des jours du ticket 9 va bien du lundi 16 au samedi 21 novembre.

Le scénario avec l’ancienne sauvegarde reste à rejouer dans Safari.

---

## Réponse à Madame Roussel

Bonjour Madame Roussel,

J’ai corrigé le problème qui empêchait d’afficher les prix quand le site retrouvait un panier de l’ancienne version. Votre cliente pourra repartir d’un panier vide et ajouter à nouveau ses bouquets. Les paniers de la version actuelle sont toujours conservés.

Merci de m’avoir signalé le problème.

Bien cordialement,\
Yann
