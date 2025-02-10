// script.js

// Petit exemple d’animation sur le clic d’un bouton ou sur le chargement de page.
// Ici, on fait simplement un console.log et une petite animation d’apparition.

document.addEventListener("DOMContentLoaded", () => {
  console.log("Le site est chargé !");
  const elements = document.querySelectorAll(".project-card, .cv-block, .contact-form");

  elements.forEach(el => {
    // Animation d’opacité à l’apparition
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";

    setTimeout(() => {
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }, 300);
  });
});
