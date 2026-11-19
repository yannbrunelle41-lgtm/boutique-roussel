// Sauvegarde du panier dans le navigateur, pour le retrouver à la visite suivante.

const CLE = "panier-roussel";
const VERSION = 2;

// Enregistre le panier et le code promo.
export function sauverPanier(lignes, codePromo) {
  const donnees = { version: VERSION, lignes, codePromo };
  localStorage.setItem(CLE, JSON.stringify(donnees));
}

// Relit le panier enregistré, ou un panier vide.
export function chargerPanier() {
  const panierVide = { lignes: [], codePromo: "" };
  const brut = localStorage.getItem(CLE);
  if (!brut) return panierVide;

  let donnees;
  try {
    donnees = JSON.parse(brut);
  } catch (erreur) {
    if (!(erreur instanceof SyntaxError)) throw erreur;
    return panierVide;
  }
  if (donnees?.version !== VERSION || !Array.isArray(donnees.lignes)) return panierVide;

  return { lignes: donnees.lignes, codePromo: donnees.codePromo || "" };
}
