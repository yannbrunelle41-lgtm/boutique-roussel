// Outils communs à toute la boutique.

// Affiche un montant au format français : 29,90 €.
export function formaterPrix(montant) {
  return montant.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

// Affiche une date au format « samedi 14 novembre ».
export function formaterDate(date) {
  return date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
}

// Date et heure courantes.
// Pour les essais, ?maintenant=2026-11-14T19:30 dans l'adresse simule une autre date.
export function maintenant() {
  const simulee = new URLSearchParams(window.location.search).get("maintenant");
  return simulee ? new Date(simulee) : new Date();
}

// Arrondit un montant au centime.
export function arrondir(montant) {
  return Math.round(montant * 100) / 100;
}

// Lit un fichier JSON du dossier data/.
export async function lireJson(chemin) {
  const reponse = await fetch(chemin);
  if (!reponse.ok) {
    throw new Error("Lecture impossible : " + chemin);
  }
  return reponse.json();
}

// Crée un élément HTML avec ses classes et son texte.
export function creer(balise, classes, texte) {
  const element = document.createElement(balise);
  if (classes) element.className = classes;
  if (texte !== undefined) element.textContent = texte;
  return element;
}
