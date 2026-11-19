// Affichage : catalogue, panier, jours de livraison et récapitulatif.

import { creer, formaterDate, formaterPrix } from "./outils.js";
import { prixLigne, trouverBouquet, trouverTaille } from "./prix.js";

// Affiche les bouquets d'une occasion (ou tous).
export function afficherCatalogue(bouquets, occasion, surChoix) {
  const liste = document.querySelector("#liste-bouquets");
  liste.replaceChildren();
  bouquets
    .filter((bouquet) => occasion === "toutes" || bouquet.occasions.includes(occasion))
    .forEach((bouquet) => {
      const carte = creer("li", "flex flex-col gap-2 rounded-lg bg-roussel-vert-clair p-4");
      carte.append(
        creer("h3", "text-lg font-bold text-roussel-vert", bouquet.nom),
        creer("p", "text-roussel-gris", bouquet.description),
        creer("p", "font-bold text-roussel-rose", "À partir de " + formaterPrix(bouquet.prix))
      );
      const bouton = creer(
        "button",
        "mt-auto rounded bg-roussel-vert px-4 py-3 font-bold text-white focus-visible:outline-2 focus-visible:outline-roussel-rose",
        "Composer"
      );
      bouton.type = "button";
      bouton.addEventListener("click", () => surChoix(bouquet));
      carte.append(bouton);
      liste.append(carte);
    });
}

// Décrit les options d'une ligne : « Moyen, vase, carte ».
function decrireOptions(options) {
  if (!options) return "";
  const taille = trouverTaille(options.taille);
  const morceaux = [taille ? taille.libelle : ""];
  if (options.vase) morceaux.push("vase");
  if (options.carte) morceaux.push("carte");
  return morceaux.filter(Boolean).join(", ");
}

// Affiche les lignes du panier avec leurs boutons.
export function afficherPanier(lignes, surAction) {
  const liste = document.querySelector("#panier-liste");
  liste.replaceChildren();
  document.querySelector("#panier-vide").hidden = lignes.length > 0;

  lignes.forEach((ligne, index) => {
    const bouquet = trouverBouquet(ligne.bouquetId);
    const element = creer("li", "flex flex-wrap items-center gap-3 border-b border-roussel-vert-clair py-3");
    const texte = creer("div", "grow");
    texte.append(
      creer("p", "font-bold", bouquet ? bouquet.nom : ligne.nom),
      creer("p", "text-sm text-roussel-gris", decrireOptions(ligne.options))
    );
    const quantite = creer("span", "min-w-8 text-center", String(ligne.quantite));
    quantite.setAttribute("aria-label", "Quantité");
    element.append(
      texte,
      bouton("moins", index, "−", "Retirer un exemplaire"),
      quantite,
      bouton("plus", index, "+", "Ajouter un exemplaire"),
      creer("span", "min-w-24 text-right font-bold text-roussel-rose", formaterPrix(prixLigne(ligne))),
      bouton("supprimer", index, "Supprimer", "Supprimer la ligne")
    );
    liste.append(element);
  });

  // Les boutons + , − et Supprimer de toutes les lignes.
  liste.addEventListener("click", (evenement) => {
    const cible = evenement.target.closest("button[data-action]");
    if (!cible) return;
    surAction(cible.dataset.action, Number(cible.dataset.index));
  });
}

// Crée un bouton d'action pour une ligne du panier.
function bouton(action, index, texte, description) {
  const element = creer(
    "button",
    "rounded border border-roussel-vert px-3 py-2 text-roussel-vert focus-visible:outline-2 focus-visible:outline-roussel-rose",
    texte
  );
  element.type = "button";
  element.dataset.action = action;
  element.dataset.index = index;
  element.setAttribute("aria-label", description);
  return element;
}

// Remplit la liste des jours de livraison.
export function afficherJours(jours) {
  const select = document.querySelector("#jour-livraison");
  select.replaceChildren(creer("option", "", "Choisir un jour"));
  select.firstChild.value = "";
  jours.forEach((jour) => {
    const option = creer("option", "", formaterDate(new Date(jour)));
    option.value = jour;
    select.append(option);
  });
}

// Remplit les moments de livraison.
export function afficherMoments(moments) {
  const zone = document.querySelector("#choix-moment");
  moments.forEach((moment, index) => {
    const label = creer("label", "flex items-center gap-2 py-2");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "moment";
    radio.value = moment.id;
    radio.checked = index === 0;
    radio.className = "size-5 accent-roussel-vert";
    label.append(radio, document.createTextNode(moment.libelle));
    zone.append(label);
  });
}

// Affiche le récapitulatif de la commande.
export function afficherRecap({ montant, remise, frais, total }) {
  document.querySelector("#recap-sous-total").textContent = formaterPrix(montant);
  document.querySelector("#recap-remise").textContent = remise ? "− " + formaterPrix(remise) : formaterPrix(0);
  let livraison = "Saisir un code postal";
  if (frais === 0) livraison = "Offerte";
  else if (frais === null) livraison = "Zone non livrée";
  else if (frais !== undefined) livraison = formaterPrix(frais);
  document.querySelector("#recap-livraison").textContent = livraison;
  document.querySelector("#recap-total").textContent = formaterPrix(total);
}
