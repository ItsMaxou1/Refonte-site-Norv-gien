// Récupérer les informations de commande depuis le localStorage
let panier = JSON.parse(localStorage.getItem("panier")) || [];

console.log("Panier :", panier); // Debug : Afficher les données du panier

// Afficher le résumé de commande sur la page confirmation
function afficherConfirmationCommande() {
  let resumeContainer = document.getElementById("resume-commande");
  let total = 0;

  if (panier.length === 0) {
    resumeContainer.innerHTML = "<p>Votre panier est vide.</p>";
    document.getElementById("total-commande").textContent = "0 €";
    return;
  }

  panier.forEach((produit) => {
    let produitElement = `
      <div class="produit-resume">
        <span>${produit.nom} (x${produit.quantite})</span>
        <span>${produit.prix * produit.quantite} €</span>
      </div>
    `;
    resumeContainer.innerHTML += produitElement;
    total += produit.prix * produit.quantite;
  });

  document.getElementById("total-commande").textContent = `${total} €`;
}

// Exécuter la fonction dès que la page se charge
window.onload = afficherConfirmationCommande;

console.log(localStorage.getItem("panier"));
