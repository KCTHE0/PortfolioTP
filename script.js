// script.js

document.addEventListener("DOMContentLoaded", () => {
  console.log("Site chargé !");

  // Animation d’apparition sur certaines sections
  const elements = document.querySelectorAll(".featured-card, .project-card, .cv-block, .contact-form, .about-section, .call-to-action");
  elements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";

    setTimeout(() => {
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }, 300);
  });

  // Easter Egg: Konami Code
  const konamiCode = [38,38,40,40,37,39,37,39,66,65]; 
  let konamiIndex = 0;

  document.addEventListener("keydown", (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        triggerEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });
});

// Action déclenchée par l’easter egg
function triggerEasterEgg() {
  // Par exemple, on affiche une pop-up
  alert("C'est bien mais tu croyais faire quoi la ?");
}


let typedText = "";

document.addEventListener("keypress", (e) => {
  // Ajoute le caractère tapé à la suite
  typedText += e.key;
  
  // On peut faire une comparaison insensible à la casse :
  // => tout mettre en minuscule et vérifier si "je te vois" est dedans
  if (typedText.toLowerCase().includes("je te vois")) {
    // Déclenche l'easter egg
    triggerSecondEasterEgg();
    
    // On réinitialise typedText pour éviter plusieurs déclenchements en chaîne
    typedText = "";
  }

  // Si la chaîne devient trop longue, on peut aussi l'élaguer pour éviter
  // que ça devienne énorme (optionnel)
  if (typedText.length > 30) {
    typedText = typedText.slice(-30);
  }
});

function triggerSecondEasterEgg() {
  alert("Tu m'as vu... et je te vois aussi !");
  // Ou toute autre action cool (modal, animation, changement de style, etc.)
}

