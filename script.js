// script.js

// =========================
// 1) KONAMI CODE
// =========================
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let konamiIndex = 0;

// =========================
// 2) TYPED TEXT EASTER EGGS
// =========================
let typedText = "";

// =========================
// 3) THEMES
// =========================
const THEME_PRO = "pro";
const THEME_LOL = "lol";
const THEME_MARIO = "mario";
const THEME_LUIGI = "luigi";

// Au chargement, on applique le thème stocké + initialisation
document.addEventListener("DOMContentLoaded", () => {
  applyStoredTheme();
});

// Écoute globale des touches
document.addEventListener("keydown", (e) => {
  // 3.1) Konami code
  if (e.keyCode === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      triggerKonamiEgg();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }

  // 3.2) Accumuler le texte tapé (uniquement les caractères imprimables)
  if (e.key.length === 1) {
    typedText += e.key;
  }

  // Limiter la longueur de typedText pour éviter l'explosion de mémoire
  if (typedText.length > 50) {
    typedText = typedText.slice(-50);
  }

  // 3.3) Vérifier la présence de "je te vois"
  if (typedText.toLowerCase().includes("je te vois")) {
    alert("Tu m'as vu... et je te vois aussi !");
    typedText = "";
  }

  // 3.4) Vérifier la présence de "league of legends"
  if (typedText.toLowerCase().includes("league of legends")) {
    setThemeLoL(); // Splash par défaut
    typedText = "";
  }

  // 3.5) Vérifier la présence de "mario"
  if (typedText.toLowerCase().includes("mario")) {
    setThemeMario();
    typedText = "";
  }

  // 3.6) Vérifier la présence de "pro"
  if (typedText.toLowerCase().includes("pro")) {
    setThemePro();
    typedText = "";
  }

  // 3.7) Vérifier la présence de "luigi"
  if (typedText.toLowerCase().includes("luigi")) {
    setThemeLuigi();
    typedText = "";
  }
});

// ======================
// 4) FONCTIONS DU KONAMI
// ======================
function triggerKonamiEgg() {
  alert("Konami Code détecté ! Super move déverrouillé !");
}

// =========================
// 5) GESTION DES THEMES
// =========================

// Lire le thème stocké dans localStorage ou Pro par défaut
function applyStoredTheme() {
  const stored = localStorage.getItem("theme");
  if (stored === THEME_LOL) {
    setThemeLoL(false);
  } else if (stored === THEME_MARIO) {
    setThemeMario(false);
  } else if (stored === THEME_LUIGI) {
    setThemeLuigi(false);
  } else {
    setThemePro(false);
  }
}

// -- Thème Pro --
function setThemePro(withSplash = true) {
  document.body.classList.remove("lol-theme", "mario-theme", "luigi-theme");
  document.body.classList.add("pro-theme");
  localStorage.setItem("theme", THEME_PRO);

  // Si tu as un logo spécifique :
  updateLogo("img/logo-pro.png");

  // Splash anim
  if (withSplash) playSplash("#007acc"); 
}

// -- Thème LoL --
function setThemeLoL(withSplash = true) {
  document.body.classList.remove("pro-theme", "mario-theme", "luigi-theme");
  document.body.classList.add("lol-theme");
  localStorage.setItem("theme", THEME_LOL);

  // Logo
  updateLogo("img/logo-lol.png");

  if (withSplash) playSplash("#0E1A26");
}

// -- Thème Mario --
function setThemeMario(withSplash = true) {
  document.body.classList.remove("pro-theme", "lol-theme", "luigi-theme");
  document.body.classList.add("mario-theme");
  localStorage.setItem("theme", THEME_MARIO);

  updateLogo("img/logo-mario.png");

  if (withSplash) playSplash("#e32407");
}

// -- Thème Luigi --
function setThemeLuigi(withSplash = true) {
  document.body.classList.remove("pro-theme", "lol-theme", "mario-theme");
  document.body.classList.add("luigi-theme");
  localStorage.setItem("theme", THEME_LUIGI);

  updateLogo("img/logo-luigi.png");

  if (withSplash) playSplash("#1e9c1e");
}

// =========================
// 6) SPLASH ANIMATION
// =========================
function playSplash(color) {
  // Créer un div .theme-splash
  const splash = document.createElement("div");
  splash.className = "theme-splash";
  splash.style.backgroundColor = color;

  // L'ajouter au body
  document.body.appendChild(splash);

  // Le retirer après l'animation
  splash.addEventListener("animationend", () => {
    splash.remove();
  });
}

// =========================
// 7) CHANGER LE LOGO
// =========================
function updateLogo(src) {
  const logoImg = document.getElementById("logo-img");
  if (logoImg) {
    logoImg.src = src;
  }
}

