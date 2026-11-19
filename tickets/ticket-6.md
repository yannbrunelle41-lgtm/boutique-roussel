# Ticket 6 — Livraison facturée à 60 €

## Signalement de Madame Roussel

> Bonjour, sur le site il est écrit que la livraison est offerte dès 60 € d’achat. Une cliente de Tours a commandé un Blanc pur en taille moyenne, avec le vase. Son sous-total affichait bien 60,00 €, mais on lui a compté 5,90 € de livraison. Je l’ai remboursée, mais cela ne doit pas se reproduire.

## Reproduction avant correction

1. Je pars d’un panier vide et je clique sur « Composer » pour le bouquet Blanc pur.
2. Je choisis la taille « Moyen », je coche le vase et j’ajoute le bouquet au panier.
3. Je saisis le code postal `37000` et je regarde le récapitulatif.

Je m’attends à voir « Offerte » pour la livraison, puisque le sous-total atteint 60,00 €. Dans Safari, le sous-total affichait bien 60,00 €, mais la livraison coûtait 5,90 € et le total était de 65,90 €.

## Prompts utilisés

**Exemple de prompt de diagnostic**

> J’ajoute un Blanc pur en taille Moyen avec un vase, puis je saisis le code postal 37000. Le panier affiche 60,00 € et me rajoute 5,90 € de livraison. Je pense que le site offre la livraison seulement au-dessus de 60 €. Tu vois une autre explication ? Comment je peux vérifier ça avant de modifier le code ?

## Hypothèses et vérifications

- **La livraison est offerte seulement au-dessus de 60 €.** J’écarte cette piste. Dans `js/livraison.js`, la comparaison utilise `>=`, ce qui veut dire « supérieur ou égal ». Le test de la fonction avec exactement 60 € donne bien 0 € de frais.
- **Le montant calculé diffère du montant affiché.** L’IA a refait le calcul avec le prix du bouquet, le supplément de taille et le vase. En JavaScript, `38.9 + 8.2 + 12.9` donne `59.99999999999999`. L’écran affiche ce nombre comme 60,00 €, mais la comparaison le considère encore comme inférieur à 60 €.

## Cause et correctif

Les nombres à virgule peuvent donner de petits écarts de calcul en JavaScript. Ici, cet écart faisait passer le sous-total juste en dessous du seuil. L’IA a utilisé la fonction `arrondir` déjà présente dans `js/outils.js` pour arrondir le sous-total au centime dans `js/prix.js`. La livraison compare maintenant le seuil au même montant que celui affiché.

## Vérification après correction

Après chaque correctif, je vérifie que le problème est résolu et que les fonctions liées au changement marchent toujours. Je refais aussi les tests des tickets déjà corrigés pour vérifier que les problèmes ne reviennent pas.

L’IA a réalisé les essais suivants dans Safari sur ordinateur.

- **Ticket 6.** À 60,00 €, la livraison est offerte pour le code postal 37000. Avec `NOEL10`, le total passe à 54,00 € et la livraison reste offerte, car le seuil s’applique avant la remise. À 47,10 €, les frais sont de 5,90 € à Tours et de 7,90 € dans l’agglomération. Le code postal 75001 affiche « Zone non livrée ».
- **Ticket 1.** Les quatre variantes de `NOEL10` appliquent 3,49 € de remise sur un panier de 34,90 €. Le code `INCONNU` est refusé.
- **Ticket 2.** Deux clics sur `+` font passer la quantité de 1 à 2 puis à 3. Deux clics sur `−` la ramènent à 2 puis à 1, et un dernier clic retire la ligne.
- **Ticket 3.** « Le petit mot » apparaît avec « Toutes », « Merci » et « Pour le plaisir ». Il est absent avec « Amour ».
- **Ticket 4.** Une petite et une grande Pivoine poudrée apparaissent sur deux lignes, avec un sous-total de 85,40 €.
- **Ticket 5.** Supprimer la première ligne d’un panier de trois lignes laisse les deux autres bouquets.

Dans le terminal, l’IA a aussi vérifié le seuil à 59,99 €, 60,00 € et 60,01 €. À Tours, la livraison reste payante à 59,99 € et devient gratuite à partir de 60,00 €.

---

## Réponse à Madame Roussel

Bonjour Madame Roussel,

J’ai corrigé le calcul qui facturait la livraison sur une commande de 60 €. La livraison est maintenant bien offerte dès 60 € d’achat, avant l’application d’une réduction.

Merci de m’avoir signalé le problème.

Bien cordialement,\
Yann
