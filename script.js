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

  // on limite typedText pour éviter trop de caractères
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
  if (stored === THEME_LOL)
