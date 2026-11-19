// Boutique en ligne Fleurs Roussel : point d'entrée.
// Charge les données, prépare la page et recalcule tout à chaque changement.

import { lireJson, maintenant } from "./outils.js";
import { chargerCatalogue, sousTotal, totalCommande } from "./prix.js";
import { chargerPromos, appliquerPromo } from "./promo.js";
import { chargerReglesLivraison, fraisLivraison, joursDeLivraison, momentsDeLivraison, zonePour } from "./livraison.js";
import { lignesPanier, remplacerLignes, ajouterAuPanier, changerQuantite, supprimerLigne, viderPanier } from "./panier.js";
import { sauverPanier, chargerPanier } from "./stockage.js";
import { preparerComposition, ouvrirComposition } from "./composition.js";
import { afficherCatalogue, afficherPanier, afficherJours, afficherMoments, afficherRecap } from "./affichage.js";

// Ce que la cliente a saisi en dehors du panier.
const etat = { codePromo: "", codePostal: "", catalogue: null };

// Lance la boutique.
async function demarrer() {
  const [catalogue, livraison, promos] = await Promise.all([
    lireJson("data/catalogue.json"),
    lireJson("data/livraison.json"),
    lireJson("data/promos.json"),
  ]);
  etat.catalogue = catalogue;
  chargerCatalogue(catalogue);
  chargerReglesLivraison(livraison);
  chargerPromos(promos);

  const sauvegarde = chargerPanier();
  remplacerLignes(sauvegarde.lignes);
  etat.codePromo = sauvegarde.codePromo;

  preparerFiltres(catalogue.occasions);
  afficherCatalogue(catalogue.bouquets, "toutes", ouvrirComposition);
  preparerComposition(catalogue.options, quandAjoute);
  afficherJours(joursDeLivraison(maintenant()));
  afficherMoments(momentsDeLivraison());

  document.querySelector("#form-promo").addEventListener("submit", appliquerCode);
  document.querySelector("#code-postal").addEventListener("input", (evenement) => {
    etat.codePostal = evenement.target.value;
    rafraichir();
  });
  document.querySelector("#bouton-commander").addEventListener("click", commander);

  rafraichir();
}

// Crée les boutons radio des occasions.
function preparerFiltres(occasions) {
  const zone = document.querySelector("#filtres");
  [{ id: "toutes", libelle: "Toutes" }, ...occasions].forEach((occasion, index) => {
    const label = document.createElement("label");
    label.className = "flex items-center gap-2 rounded-full border border-roussel-vert px-4 py-2";
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "occasion";
    radio.value = occasion.id;
    radio.checked = index === 0;
    radio.className = "accent-roussel-vert";
    label.append(radio, document.createTextNode(occasion.libelle));
    zone.append(label);
  });
  zone.addEventListener("change", (evenement) => {
    afficherCatalogue(etat.catalogue.bouquets, evenement.target.value, ouvrirComposition);
  });
}

// Un bouquet composé vient d'être ajouté.
function quandAjoute(bouquetId, options) {
  ajouterAuPanier(bouquetId, options);
  rafraichir();
}

// Les boutons des lignes du panier.
function quandActionPanier(action, index) {
  if (action === "plus") changerQuantite(index, 1);
  if (action === "moins") changerQuantite(index, -1);
  if (action === "supprimer") supprimerLigne(index);
  rafraichir();
}

// Le formulaire du code promo.
function appliquerCode(evenement) {
  evenement.preventDefault();
  const saisie = document.querySelector("#code-promo").value;
  const resultat = appliquerPromo(saisie, sousTotal(lignesPanier()));
  etat.codePromo = resultat.valide ? saisie : "";
  document.querySelector("#message-promo").textContent = resultat.message;
  rafraichir();
}

// Recalcule et réaffiche le panier et le récapitulatif.
function rafraichir() {
  const lignes = lignesPanier();
  afficherPanier(lignes, quandActionPanier);

  const montant = sousTotal(lignes);
  let remise = 0;
  if (etat.codePromo) {
    const resultat = appliquerPromo(etat.codePromo, montant);
    remise = resultat.remise;
    if (!resultat.valide) {
      etat.codePromo = "";
      document.querySelector("#message-promo").textContent = resultat.message;
    }
  }
  const frais = etat.codePostal.trim().length === 5 ? fraisLivraison(etat.codePostal, montant) : undefined;
  afficherRecap({ montant, remise, frais, total: totalCommande(montant, remise, frais) });
  sauverPanier(lignes, etat.codePromo);
}

// Le bouton « Commander » : vérifie la commande puis la confirme.
function commander() {
  const message = document.querySelector("#message-commande");
  const jour = document.querySelector("#jour-livraison");
  const moment = document.querySelector("input[name=moment]");
  if (lignesPanier().length === 0) {
    message.textContent = "Votre panier est vide.";
    return;
  }
  if (!zonePour(etat.codePostal)) {
    message.textContent = "Indiquez un code postal où nous livrons.";
    return;
  }
  if (!jour.value) {
    message.textContent = "Choisissez un jour de livraison.";
    return;
  }
  const libelleJour = jour.options[jour.selectedIndex].textContent;
  message.textContent =
    "Merci ! Votre commande est enregistrée pour le " + libelleJour + " (" + moment.nextSibling.textContent.toLowerCase() + ").";
  viderPanier();
  etat.codePromo = "";
  rafraichir();
}

demarrer();
