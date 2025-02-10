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

// Au chargement, on applique le thème stocké
document.addEventListener("DOMContentLoaded", () => {
  applyStoredTheme();
});

// Écoute globale des touches
document.addEventListener("keydown", (e) => {
  // 1) Konami code
  if (e.keyCode === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      triggerKonamiEgg();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }

  // 2) Accumuler le texte tapé (uniquement caractères imprimables)
  if (e.key.length === 1) {
    typedText += e.key;
  }

  // on limite typedText
  if (typedText.length > 50) {
    typedText = typedText.slice(-50);
  }

  // 3) Easter Egg "je te vois"
  if (typedText.toLowerCase().includes("je te vois")) {
    alert("Tu m'as vu... et je te vois aussi !");
    typedText = "";
  }

  // 4) Thème LoL si "league of legends"
  if (typedText.toLowerCase().includes("league of legends")) {
    setThemeLoL();
    typedText = "";
  }

  // 5) Thème Mario si "mario"
  if (typedText.toLowerCase().includes("mario")) {
    setThemeMario();
    typedText = "";
  }

  // 6) Thème Pro si "pro"
  if (typedText.toLowerCase().includes("pro")) {
    setThemePro();
    typedText = "";
  }

  // 7) Thème Luigi si "luigi"
  if (typedText.toLowerCase().includes("luigi")) {
    setThemeLuigi();
    typedText = "";
  }
});

// ======================
// KONAMI CODE FUNCTION
// ======================
function triggerKonamiEgg() {
  alert("Konami Code détecté ! Super move déverrouillé !");
}

// =========================
// THEMES MANAGEMENT
// =========================
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

function setThemePro() {
  document.body.classList.remove("lol-theme", "mario-theme", "luigi-theme");
  document.body.classList.add("pro-theme");
  localStorage.setItem("theme", THEME_PRO);
  updateLogo("img/logo-pro.png");
}

function setThemeLoL() {
  document.body.classList.remove("pro-theme", "mario-theme", "luigi-theme");
  document.body.classList.add("lol-theme");
  localStorage.setItem("theme", THEME_LOL);
  updateLogo("img/logo-lol.png");
}

function setThemeMario() {
  document.body.classList.remove("pro-theme", "lol-theme", "luigi-theme");
  document.body.classList.add("mario-theme");
  localStorage.setItem("theme", THEME_MARIO);
  updateLogo("img/logo-mario.png");
}

function setThemeLuigi() {
  document.body.classList.remove("pro-theme", "lol-theme", "mario-theme");
  document.body.classList.add("luigi-theme");
  localStorage.setItem("theme", THEME_LUIGI);
  updateLogo("img/logo-luigi.png");
}

// =========================
// LOGO DYNAMIQUE
// =========================
function updateLogo(src) {
  const logoImg = document.getElementById("logo-img");
  if (logoImg) {
    logoImg.src = src;
  }
}
