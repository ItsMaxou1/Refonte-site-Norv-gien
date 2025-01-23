// Exemple de produits récupérés du panier
let panier = JSON.parse(localStorage.getItem("panier")) || [];

// Fonction pour afficher le résumé de commande
function afficherResumeCommande() {
  let resumeContainer = document.getElementById("resume-commande");
  let totalContainer = document.getElementById("total-commande");
  let total = 0;

  panier.forEach((produit) => {
    let produitElement = `
            <div class="produit-resume">
                <span>${produit.nom} (x${produit.quantite})</span>
                <span>kr ${produit.prix * produit.quantite}</span>
            </div>
        `;
    resumeContainer.innerHTML += produitElement;
    total += produit.prix * produit.quantite;
  });

  totalContainer.textContent = `Total : kr ${total}`;
}

// Afficher le résumé dès que la page se charge
window.onload = afficherResumeCommande;

// Fonction pour valider le numéro de téléphone
function validerTelephone(telephone) {
  const regex = /^\d{10}$/; // Exemple pour un numéro de 10 chiffres
  return regex.test(telephone);
}

// Fonction pour valider le code postal
function validerCodePostal(codePostal) {
  const regex = /^\d{5}$/; // Exemple pour un code postal de 5 chiffres
  return regex.test(codePostal);
}

// Fonction pour valider la date d'expiration
function validerDateExpiration(dateExpiration) {
  const regex = /^(0[1-9]|1[0-2])\/\d{2}$/; // Format MM/AA
  return regex.test(dateExpiration);
}

// Fonction pour valider le numéro de carte bancaire
function validerNumeroCarte(numeroCarte) {
  const regex = /^\d{16}$/; // Exemple pour un numéro de carte de 16 chiffres
  return regex.test(numeroCarte);
}

// Fonction pour valider le CVV
function validerCVV(cvv) {
  const regex = /^\d{3}$/; // Exemple pour un CVV de 3 chiffres
  return regex.test(cvv);
}

// Fonction de validation du formulaire
function validerFormulaire() {
  let valid = true;

  // Validation pour chaque champ (exemple basique)
  const inputs = document.querySelectorAll("#commande-form input");
  inputs.forEach((input) => {
    if (!input.value) {
      valid = false;
      input.style.borderColor = "red"; // Afficher un bord rouge pour les erreurs
    } else {
      input.style.borderColor = ""; // Réinitialiser la couleur du bord
    }
  });

  // Validation spécifique pour le téléphone
  const telephone = document.getElementById("telephone").value;
  if (!validerTelephone(telephone)) {
    valid = false;
    document.getElementById("telephone").style.borderColor = "red";
    alert("Le numéro de téléphone doit contenir exactement 10 chiffres.");
  }

  // Validation spécifique pour le code postal
  const codePostal = document.getElementById("code-postal").value;
  if (!validerCodePostal(codePostal)) {
    valid = false;
    document.getElementById("code-postal").style.borderColor = "red";
    alert("Le code postal doit contenir exactement 5 chiffres.");
  }

  // Validation spécifique pour la date d'expiration
  const dateExpiration = document.getElementById("expiration").value;
  if (!validerDateExpiration(dateExpiration)) {
    valid = false;
    document.getElementById("expiration").style.borderColor = "red";
    alert("La date d'expiration doit être au format MM/AA.");
  }

  // Validation spécifique pour le numéro de carte bancaire
  const numeroCarte = document.getElementById("carte-numero").value;
  if (!validerNumeroCarte(numeroCarte)) {
    valid = false;
    document.getElementById("carte-numero").style.borderColor = "red";
    alert(
      "Le numéro de la carte bancaire doit contenir exactement 16 chiffres."
    );
  }

  // Validation spécifique pour le CVV
  const cvv = document.getElementById("cvv").value;
  if (!validerCVV(cvv)) {
    valid = false;
    document.getElementById("cvv").style.borderColor = "red";
    alert("Le CVV doit contenir exactement 3 chiffres.");
  }

  return valid;
}

// Simuler la soumission du formulaire avec validation
document
  .getElementById("commande-form")
  .addEventListener("submit", function (event) {
    // Empêcher l'envoi par défaut pour pouvoir valider
    event.preventDefault();

    if (!validerFormulaire()) {
      alert("Veuillez remplir tous les champs correctement.");
    } else {
      alert("Commande confirmée ! Merci pour votre achat.");

      // Sauvegarde des informations du panier
      localStorage.setItem("commande", JSON.stringify(panier));

      // Vider le panier dans le localStorage
      localStorage.clear();

      // Utilisation de setTimeout pour assurer l'affichage de l'alerte avant la redirection
      setTimeout(function () {
        window.location.href = "../Page confirmation/confirmation.html";
      }, 500); // Délai avant la redirection
    }
  });

// Format automatique de la date d'expiration
document
  .getElementById("expiration")
  .addEventListener("input", function (event) {
    let value = event.target.value.replace(/\D/g, ""); // Retirer les non-chiffres
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4); // Ajouter '/'
    }
    event.target.value = value;
  });
