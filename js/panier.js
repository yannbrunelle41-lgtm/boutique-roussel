// Le panier : une liste de lignes { bouquetId, options, quantite }.

let lignes = [];

// Renvoie les lignes du panier.
export function lignesPanier() {
  return lignes;
}

// Remplace tout le panier (au chargement de la page).
export function remplacerLignes(nouvelles) {
  lignes = nouvelles;
}

// Indique si deux compositions sont identiques.
function memesOptions(a, b) {
  return a.taille === b.taille && a.vase === b.vase && a.carte === b.carte && a.message === b.message;
}

// Ajoute un bouquet composé ; si la même composition est déjà là, augmente sa quantité.
export function ajouterAuPanier(bouquetId, options) {
  const existante = lignes.find((ligne) => ligne.bouquetId === bouquetId && memesOptions(ligne.options, options));
  if (existante) {
    existante.quantite += 1;
  } else {
    lignes.push({ bouquetId, options, quantite: 1 });
  }
}

// Change la quantité d'une ligne ; à zéro, la ligne disparaît.
export function changerQuantite(index, ecart) {
  const ligne = lignes[index];
  if (!ligne) return;
  ligne.quantite += ecart;
  if (ligne.quantite <= 0) {
    supprimerLigne(index);
  }
}

// Supprime une ligne du panier.
export function supprimerLigne(index) {
  lignes.splice(index);
}

// Vide le panier (après la commande).
export function viderPanier() {
  lignes = [];
}
