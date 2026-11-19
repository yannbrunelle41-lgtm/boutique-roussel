// Calcul des prix : bouquet, options, sous-total et total de la commande.

import { arrondir } from "./outils.js";

let catalogue = null;

// Garde le catalogue en mémoire pour les calculs.
export function chargerCatalogue(donnees) {
  catalogue = donnees;
}

// Renvoie le bouquet correspondant à un identifiant.
export function trouverBouquet(id) {
  return catalogue.bouquets.find((bouquet) => bouquet.id === id);
}

// Renvoie la taille correspondant à un identifiant.
export function trouverTaille(id) {
  return catalogue.options.tailles.find((taille) => taille.id === id);
}

// Une carte par tranche de caractères, avec au moins une carte si l’option est choisie.
export function nombreCartes(message) {
  const longueur = Array.from(message ?? "").length;
  return Math.max(1, Math.ceil(longueur / catalogue.options.carte.longueurMax));
}

export function detailCartes(lignes) {
  const nombre = lignes.reduce((total, ligne) => {
    if (!ligne.options?.carte) return total;
    return total + nombreCartes(ligne.options.message) * ligne.quantite;
  }, 0);
  const prixParCarte = catalogue.options.carte.prix;
  return { nombre, prixParCarte, montant: nombre * prixParCarte };
}

// Prix d'un exemplaire : bouquet + supplément de taille + vase + cartes.
export function prixUnitaire(ligne) {
  const bouquet = trouverBouquet(ligne.bouquetId);
  const options = ligne.options || {};
  const taille = trouverTaille(options.taille);
  let prix = bouquet ? bouquet.prix : 0;
  if (taille) prix += taille.supplement;
  if (options.vase) prix += catalogue.options.vase.prix;
  if (options.carte) prix += nombreCartes(options.message) * catalogue.options.carte.prix;
  return prix;
}

// Prix d'une ligne du panier : prix d'un exemplaire multiplié par la quantité.
export function prixLigne(ligne) {
  return prixUnitaire(ligne) * ligne.quantite;
}

// Sous-total du panier, avant remise et livraison.
export function sousTotal(lignes) {
  return arrondir(lignes.reduce((total, ligne) => total + prixLigne(ligne), 0));
}

// Total à payer : sous-total, moins la remise, plus la livraison.
export function totalCommande(montant, remise, frais) {
  return montant - remise + (frais || 0);
}
