// Codes promo : vérification et calcul de la remise.

import { formaterPrix } from "./outils.js";

let promos = [];

// Garde la liste des codes promo en mémoire.
export function chargerPromos(liste) {
  promos = liste;
}

// Applique un code promo à un sous-total.
// Renvoie { valide, remise, message }.
export function appliquerPromo(saisie, montant) {
  const code = saisie.trim().toUpperCase();
  const regle = promos.find((promo) => promo.code === code);
  if (!regle) {
    return { valide: false, remise: 0, message: "Ce code promo n'existe pas." };
  }
  if (montant < regle.minimum) {
    return {
      valide: false,
      remise: 0,
      message: "Ce code est valable à partir de " + formaterPrix(regle.minimum) + " d'achat.",
    };
  }
  const remise = regle.type === "pourcentage" ? (montant * regle.valeur) / 100 : regle.valeur;
  return { valide: true, remise, message: "Code " + regle.code + " appliqué." };
}
