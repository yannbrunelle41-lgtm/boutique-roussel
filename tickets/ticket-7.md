# Ticket 7 — Message de la carte limité à 150 caractères

## Signalement de Madame Roussel

> Bonjour, une cliente voulait écrire un long message sur la carte, pour un mariage. Le site l’a bloquée au milieu de sa phrase. Pouvez-vous enlever cette limite ? Mes clientes doivent pouvoir écrire ce qu’elles veulent.

## Reproduction avant correction

1. Je choisis un bouquet et je coche « Carte avec votre message ».
2. Je saisis un texte de 149 caractères dans « Votre message ».
3. J’ajoute un caractère, puis j’essaie d’en ajouter un autre.
4. Je vérifie aussi ce qui se passe si je colle un texte de plus de 150 caractères.

Dans Safari, le 150e caractère s’affiche et le 151e est refusé. En collant un texte de 152 caractères, seuls les 150 premiers apparaissent dans le champ.

## Prompts utilisés

**Exemple de prompt de diagnostic**

> Quand j’écris un message pour la carte, le champ bloque au bout d’un certain nombre de caractères. Je pense qu’il y a une fonction ou une propriété qui limite ce que je peux saisir. Tu peux m’aider à vérifier où se trouve cette limite et si je peux l’enlever ?

## Hypothèses et vérifications

- **Une propriété limite la saisie dans le champ.** Cette piste est confirmée. Avant la correction, la propriété `maxLength` du champ recevait la valeur 150 définie dans `data/catalogue.json`. L’essai dans Safari a confirmé que le blocage se produisait pendant la saisie.
- **Le texte est coupé seulement au moment de l’ajout au panier.** J’écarte cette piste. Le 151e caractère était déjà refusé avant de cliquer sur « Ajouter au panier ». Dans `js/composition.js`, le code utilisait aussi `slice` pour garder au maximum 150 caractères quand il lisait le message.

## Cause et correctif

La limite vient d’une règle du cahier des charges. La carte imprimée mesure 8 × 5 cm, et Madame Roussel a fixé avec son imprimeur un maximum de 150 caractères pour que le texte tienne sur la carte.

### Les solutions envisagées

Au départ, l’IA a proposé de garder la limite et de l’indiquer sous le champ. J’ai fait remarquer que Madame Roussel voulait surtout que ses clientes puissent écrire leur message en entier.

L’IA a ensuite proposé un feuillet joint au bouquet ou une carte pliée. J’ai proposé de garder les cartes actuelles et d’imprimer la suite du message sur une deuxième carte, puis sur une troisième si nécessaire. L’IA a suggéré de numéroter les cartes pour qu’on puisse les lire dans l’ordre.

J’ai choisi cette solution et demandé d’enlever la limite dans le champ. J’ai aussi proposé d’afficher le nombre de cartes nécessaires selon la longueur du texte et de demander à Madame Roussel de prévenir son imprimeur.

J’ai ensuite proposé de facturer chaque carte imprimée à 2,50 € et d’afficher ce tarif à côté de l’option, avant la saisie du message.

J’ai aussi demandé de montrer le calcul dans le récapitulatif pour que la cliente puisse vérifier ce qu’elle paie.

### Ce qui a changé sur le site

L’IA a retiré le blocage dans le champ et la coupure lors de la lecture du texte. Le panier conserve le message entier. Un indicateur sous le champ se met à jour pendant la saisie, à raison de 150 caractères par carte. Le formulaire et le panier utilisent le même calcul pour facturer 2,50 € par carte. L’impression et la numérotation des cartes sont à organiser avec l’imprimeur.

Sous le sous-total, la ligne « Dont cartes imprimées » détaille le calcul, par exemple « 3 × 2,50 € = 7,50 € ». Ce montant est déjà compris dans le sous-total. La ligne s’affiche dès qu’un bouquet du panier comporte l’option carte.

## Vérification après correction

Après chaque correctif, je vérifie que le problème est résolu et que les fonctions liées au changement marchent toujours. Je refais aussi les tests des tickets déjà corrigés pour vérifier que les problèmes ne reviennent pas.

Dans Safari, l’IA a confirmé que le champ accepte les textes de 150, 151, 300 et 301 caractères. L’indicateur affiche respectivement 1, 2, 2 et 3 cartes.

Dans Safari, le tarif par carte est visible avant de cocher l’option. Sur une Pivoine poudrée à 34,90 €, le prix passe à 37,40 € avec une carte, à 39,90 € avec deux cartes et à 42,40 € avec trois cartes. La ligne à 42,40 € reste au même prix après rechargement de la page.

Le récapitulatif affiche la part des cartes déjà incluse dans le sous-total. Dans Safari, un panier contenant six cartes affiche « 6 × 2,50 € = 15,00 € ». Passer un bouquet de une à deux unités ajoute les cartes de ce bouquet au calcul. Un bouquet sans carte ne change pas ce détail.

Dans le terminal, l’IA a vérifié que deux textes de 301 caractères qui diffèrent seulement par leur dernière lettre restent distincts et entiers après la sauvegarde et la relecture du panier. Elle a aussi vérifié le prix avec deux exemplaires du même bouquet et rejoué les contrôles des tickets 1 à 6.

---

## Réponse à Madame Roussel

Bonjour Madame Roussel,

J’ai retiré la limite de saisie. Vos clientes peuvent écrire leur message en entier, et le site leur indique combien de cartes de 8 × 5 cm seront nécessaires. Le tarif de 2,50 € par carte imprimée est affiché à côté de l’option et le prix se met à jour pendant la saisie. Le récapitulatif détaille aussi le calcul du prix des cartes.

Pouvez-vous prévenir votre imprimeur de ce changement ? Pour les messages longs, il pourra imprimer la suite sur les cartes suivantes, à raison de 150 caractères maximum par carte, puis numéroter les cartes pour que le destinataire puisse lire le message dans l’ordre.

Merci de m’avoir signalé le problème.

Bien cordialement,\
Yann
