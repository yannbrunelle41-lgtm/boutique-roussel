// Gestion des codes promo, version 2.
// Les codes sont comparés sans tenir compte des majuscules ni des espaces,
// pour éviter les refus quand la cliente tape son code sur téléphone.

// Renvoie la remise en euros, ou 0 si le code n'est pas valable.
export function appliquerPromo(code, montant, liste) {
  const saisie = code.trim().toUpperCase();
  const regle = liste.find((promo) => promo.code === saisie);
  if (!regle || montant < regle.minimum) {
    return 0;
  }
  if (regle.type === "pourcentage") {
    return Math.round(montant * regle.valeur) / 100;
  }
  return regle.valeur;
}

// Indique si un code existe, quelle que soit sa casse.
export function codeExiste(code, liste) {
  return liste.some((promo) => promo.code === code.trim().toUpperCase());
}
