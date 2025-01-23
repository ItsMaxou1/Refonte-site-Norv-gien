/* carrousel image */

const carrousel = document.querySelector(".carrousel");
const indicateurs = document.querySelectorAll(".indicateurs-carrousel button");
let index = 0;

// Fonction pour afficher l'image suivante
function afficherImageSuivante() {
  index = (index + 1) % 4; // On change entre les 4 images
  afficherImage(index);
}

// Fonction pour afficher une image spécifique
function afficherImage(index) {
  carrousel.style.transform = `translateX(-${index * 100}%)`;
  mettreAJourIndicateurs();
}

// Met à jour les indicateurs visuels
function mettreAJourIndicateurs() {
  indicateurs.forEach((indicateur, i) => {
    indicateur.classList.toggle("actif", i === index);
  });
}

// Permet de cliquer sur les indicateurs pour changer d'image
indicateurs.forEach((indicateur) => {
  indicateur.addEventListener("click", (e) => {
    index = parseInt(e.target.getAttribute("data-index"));
    afficherImage(index);
  });
});

// Change automatiquement toutes les x secondes
setInterval(afficherImageSuivante, 4000);

/* Fin carrousel image */

/* Avis auto */

document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll("#etoiles .star");
  const etoilesInput = document.getElementById("rating");
  const avisForm = document.getElementById("avisForm");
  const avisListe = document.querySelector(".avis-liste");

  let selectedRating = 0;

  // Gestion des étoiles sélectionnées
  stars.forEach((star) => {
    star.addEventListener("click", (e) => {
      selectedRating = e.target.getAttribute("data-value");
      etoilesInput.value = selectedRating;
      updateStarSelection(selectedRating);
    });
  });

  // Soumettre un avis
  avisForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nom = document.getElementById("name").value;
    const avisTexte = document.getElementById("review").value;
    const etoiles = etoilesInput.value;

    if (!nom || !etoiles || !avisTexte) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    ajouterAvis(nom, etoiles, avisTexte);

    // Réinitialiser le formulaire
    avisForm.reset();
    updateStarSelection(0);
  });

  function updateStarSelection(note) {
    stars.forEach((star) => {
      if (star.getAttribute("data-value") <= note) {
        star.classList.add("selected");
      } else {
        star.classList.remove("selected");
      }
    });
  }

  function ajouterAvis(nom, etoiles, avisTexte) {
    const avisHTML = `
        <div class="avis-client">
          <p><strong>${nom}</strong> - ${afficherEtoiles(etoiles)}</p>
          <p>${avisTexte}</p>
        </div>
      `;
    avisListe.insertAdjacentHTML("afterbegin", avisHTML);
  }

  function afficherEtoiles(note) {
    let etoilesHTML = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= note) {
        etoilesHTML += "★";
      } else {
        etoilesHTML += "☆";
      }
    }
    return etoilesHTML;
  }
});

/* FIN avis auto */
