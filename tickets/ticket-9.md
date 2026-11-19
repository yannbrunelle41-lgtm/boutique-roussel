# Ticket 9 — Le site propose une livraison le dimanche

## Signalement de Madame Roussel

> Bonjour, je ne livre jamais le dimanche, c’est mon jour de fermeture. Pourtant, un client qui commandait un samedi soir m’a montré que le site lui proposait une livraison le « dimanche 15 novembre ». Il a choisi ce jour-là et j’ai dû le rappeler. Bizarrement, il ne voyait aucun samedi dans la liste.

## Reproduction avant correction

1. Je lance la boutique et j’ouvre `http://localhost:8080/?maintenant=2026-11-14T19:30` pour simuler une commande le samedi soir.
2. J’ouvre le menu « Jour » dans la partie « Livraison ».
3. Je vérifie le premier jour proposé, l’absence du dimanche et la présence du samedi suivant.

Je m’attends à voir le lundi 16 novembre en premier et le samedi 21 novembre dans la liste. Avec le code d’origine exécuté dans le fuseau de Paris, les libellés allaient du dimanche 15 au vendredi 20 novembre.

## Prompts utilisés

**Exemple de prompt de diagnostic**

> Quand je simule une commande le samedi 14 novembre à 19 h 30, le site propose le dimanche alors que la boutique est fermée ce jour-là. Le samedi suivant n’apparaît pas non plus. Je pense que le site décale les dates d’un jour. Comment je peux vérifier d’où vient le décalage avant de modifier le code ?

## Hypothèses et vérifications

- **Le dimanche est autorisé par erreur.** J’écarte cette piste. Le dimanche figure bien dans les jours de fermeture, et le premier jour calculé avant la conversion est le lundi 16.
- **La date recule d’un jour pendant la conversion.** L’IA a vérifié le calcul dans le fuseau de Paris. Le lundi 16 novembre à minuit à Paris correspond au dimanche 15 à 23 h en UTC. Le code gardait ensuite la partie « date » de cette valeur. Le samedi 21 subissait le même décalage et apparaissait comme un vendredi.

## Cause et correctif

Dans `js/livraison.js`, l’IA a remplacé la conversion en UTC par une date construite avec l’année, le mois et le jour locaux. Dans `js/affichage.js`, la date est désormais lue à minuit dans le fuseau local pour produire le libellé. Le jour calculé et le jour affiché correspondent.

### Revue après résolution

L’IA m’a proposé de décaler d’un jour le libellé affiché. J’ai écarté cette idée, car le décalage dépend du fuseau et la date enregistrée pourrait rester fausse. J’ai gardé une date locale du calcul jusqu’à l’affichage.

## Vérification après correction

Après chaque correctif, je vérifie que le problème est résolu et que les fonctions liées au changement marchent toujours. Je refais aussi les tests des tickets déjà corrigés pour vérifier que les problèmes ne reviennent pas.

L’IA a exécuté les modules de la boutique dans le terminal, avec une simulation des éléments de la page, dans les fuseaux de Paris et de New York.

- **Ticket 9.** Pour le samedi 14 novembre à 19 h 30, les six dates proposées vont du lundi 16 au samedi 21. Un essai le vendredi à 13 h 59 propose le samedi en premier, et à 14 h la première date devient le lundi. Le passage au mois de janvier a aussi été vérifié.
- **Tickets 1 à 5.** Les variantes de `NOEL10`, les boutons `+` et `−`, le filtre « Merci », les tailles distinctes et la suppression d’une seule ligne ont été vérifiés.
- **Tickets 6 à 8.** La livraison reste offerte à 60 € à Tours. Un message de 301 caractères compte pour trois cartes à 7,50 €. La confirmation reprend le jour et le créneau choisis.

**Vérification restante dans Safari.** L’écran d’authentification a bloqué l’accès au navigateur. Le menu des jours reste à vérifier dans la boutique ouverte dans Safari.

---

## Réponse à Madame Roussel

Bonjour Madame Roussel,

J’ai corrigé le décalage dans les jours de livraison. Pour une commande passée le samedi soir, le premier jour proposé est maintenant le lundi. Le dimanche reste exclu et les samedis sont proposés quand ils sont disponibles.

Merci de m’avoir signalé le problème.

Bien cordialement,\
Yann
