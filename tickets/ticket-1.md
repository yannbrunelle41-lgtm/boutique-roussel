# Ticket 1 — Refus du code promotionnel NOEL10

## Signalement de Madame Roussel

> Bonjour, une cliente m’a appelée hier. Elle a voulu utiliser le code NOEL10 de ma lettre d’information
> depuis son téléphone, et le site lui a répondu que ce code n’existe pas. Sur mon ordinateur, le code
> marche très bien. Elle a fini par commander sans la réduction et elle n’était pas contente. Pouvez-vous
> regarder ?

## Reproduction avant correction

1. Lancer la boutique avec `npm run serve`.
2. Ajouter une Pivoine poudrée en taille Petit, sans option, au panier.
3. Dans le champ « Code promo », saisir chaque variante ci-dessous et cliquer sur « Appliquer » après chaque saisie. Garder le même panier pour comparer.
4. Refaire les essais en affichage mobile et en affichage ordinateur.

| Saisie (␣ représente un espace) | Résultat observé dans les deux affichages |
| --- | --- |
| `NOEL10` | Code accepté |
| `noel10` | Code refusé |
| `NOEL10␣` | Code refusé |
| `noel10␣` | Code refusé |

Le cahier des charges prévoit une remise de 10 % sur le sous-total, que le code soit saisi en majuscules ou en minuscules. J’ai aussi demandé que le code soit accepté avec un espace à la fin.

## Prompts utilisés

**Diagnostic.** J’ai donné à l’IA les résultats de mes premiers essais sur mobile et sur ordinateur, puis je lui ai posé cette question.

> tu as d'autres hypothèses pour reproduire le bug ?

**Cahier des charges.** Après avoir reproduit le refus avec un espace à la fin du code en majuscules, j’ai demandé à l’IA ce que prévoyait le cahier des charges.

> est-ce que le cahier des charges impose l'aceptation du code NOEL10 avec espace après ?

**Demande de correction adressée à l’IA.**

> ok il faut être sûr qu'avec espace ça fonctionne

## Hypothèses et vérifications

- **Code en minuscules.** Avec le même panier, j’ai testé `NOEL10` et `noel10`. Sur mobile comme sur ordinateur, le code en majuscules fonctionne et celui en minuscules est refusé.
- **Espace à la fin du code.** Au départ, j’ai testé `noel10` en minuscules avec un espace à la fin. Sur le conseil de l’IA, j’ai refait le test avec `NOEL10` en majuscules et un espace à la fin. Le code a été refusé sur mobile et sur ordinateur. L’espace suffit donc à provoquer le refus.
- **Caractère invisible introduit par le copier-coller, piste non testée.** L’IA a proposé d’examiner le texte copié depuis la lettre d’information. La saisie exacte de la cliente reste inconnue. J’ai pu reproduire le refus en saisissant le code en minuscules ou en ajoutant un espace à la fin.

## Cause et correctif

`js/app.js` transmet la valeur du champ à `appliquerPromo` dans `js/promo.js`. Avant le correctif, la fonction comparait la saisie telle quelle au code `NOEL10` déclaré dans `data/promos.json`. Le code était donc refusé s’il était écrit en minuscules ou s’il y avait un espace à la fin.

À ma demande, l’IA a modifié `appliquerPromo`. Le correctif utilise `trim()` pour retirer les espaces avant et après le code, puis `toUpperCase()` pour le convertir en majuscules avant la comparaison. La même fonction sert lors de la saisie du code et lors du recalcul du panier.

## Vérification après correction

Après chaque correctif, je vérifie que le problème est résolu et que les fonctions liées au changement marchent toujours. Je refais aussi les tests des tickets déjà corrigés pour vérifier que les problèmes ne reviennent pas.

Pour ce ticket, l’IA a effectué les vérifications suivantes.

- **Safari sur ordinateur.** Les quatre saisies du tableau affichent « Code NOEL10 appliqué. ». Le code `INCONNU` est toujours refusé.
- **Montants relevés dans Safari.** Avec trois Pivoines poudrées en taille Petit, le sous-total est de 104,70 €. En appliquant `NOEL10` suivi d’un espace, la remise affichée est de 10,47 € et le total avant livraison est de 94,23 €.
- **Test du module.** Sur un sous-total de 50 €, les variantes valides donnent 5 € de remise, y compris avec des espaces des deux côtés. Le seuil de 30 € de `BIENVENUE5` a aussi été vérifié.

**Vérification restante en affichage mobile.** Rejouer les quatre saisies du tableau et contrôler le montant de la remise.

## Réponse à Madame Roussel

Bonjour Madame Roussel,

Le code NOEL10 pouvait être refusé s’il était saisi en minuscules ou avec un espace à la fin. J’ai corrigé ce problème. Le code accepte maintenant ces saisies et applique bien la remise de 10 %.

Merci de m’avoir signalé le problème.

Bonne journée.

Bien cordialement,  
Yann
