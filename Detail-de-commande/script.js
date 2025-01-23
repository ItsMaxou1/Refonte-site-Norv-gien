function changerQuantite(index, changement) {
  // Récupérer le panier du localStorage
  let panier = JSON.parse(localStorage.getItem("panier")) || [];

  // Modifier la quantité du produit à l'index spécifié
  panier[index].quantite += changement;

  // Si la quantité est inférieure ou égale à 0, supprimer le produit
  if (panier[index].quantite <= 0) {
    panier.splice(index, 1);
  }

  // Mettre à jour le localStorage avec le panier modifié
  localStorage.setItem("panier", JSON.stringify(panier));

  // Recharger la page pour mettre à jour l'affichage
  afficherPanier();
}

function supprimerDuPanier(index) {
  // Récupérer le panier du localStorage
  let panier = JSON.parse(localStorage.getItem("panier")) || [];

  // Supprimer le produit à l'index spécifié
  panier.splice(index, 1);

  // Mettre à jour le localStorage avec le panier modifié
  localStorage.setItem("panier", JSON.stringify(panier));

  // Recharger la page pour mettre à jour l'affichage
  afficherPanier();
}

// Appeler la fonction pour afficher le panier au chargement de la page
window.onload = afficherPanier;
