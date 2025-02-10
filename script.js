// script.js

// Constantes pour identifier chaque thème
const THEME_PRO = "pro";
const THEME_LOL = "lol";
const THEME_MARIO = "mario";
const THEME_LUIGI = "luigi";

// Au chargement
document.addEventListener("DOMContentLoaded", () => {
  applyStoredTheme();
});

// Fonction pour appliquer le thème stocké dans localStorage
function applyStoredTheme() {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === THEME_LOL) {
    setThemeLoL(false);  // false = pas d'animation initiale
  } else if (storedTheme === THEME_MARIO) {
    setThemeMario(false);
  } else if (storedTheme === THEME_LUIGI) {
    setThemeLuigi(false);
  } else {
    setThemePro(false);
  }
}

// ================== THÈMES ================== //

// À chaque setThemeX, on appelle "playSplash(color)" pour déclencher l'animation
function setThemePro(withSplash = true) {
  document.body.classList.remove("lol-theme", "mario-theme", "luigi-theme");
  document.body.classList.add("pro-theme");
  localStorage.setItem("theme", THEME_PRO);
  updateLogo("img/logo-pro.png");
  if (withSplash) playSplash("#007acc"); 
}

function setThemeLoL(withSplash = true) {
  document.body.classList.remove("pro-theme", "mario-theme", "luigi-theme");
  document.body.classList.add("lol-theme");
  localStorage.setItem("theme", THEME_LOL);
  updateLogo("img/logo-lol.png");
  if (withSplash) playSplash("#0E1A26"); 
}

function setThemeMario(withSplash = true) {
  document.body.classList.remove("pro-theme", "lol-theme", "luigi-theme");
  document.body.classList.add("mario-theme");
  localStorage.setItem("theme", THEME_MARIO);
  updateLogo("img/logo-mario.png");
  if (withSplash) playSplash("#e32407"); 
}

function setThemeLuigi(withSplash = true) {
  document.body.classList.remove("pro-theme", "lol-theme", "mario-theme");
  document.body.classList.add("luigi-theme");
  localStorage.setItem("theme", THEME_LUIGI);
  updateLogo("img/logo-luigi.png");
  if (withSplash) playSplash("#1e9c1e"); 
}

// ================== SPLASH ANIMATION ================== //
// color = la couleur du splash 
function playSplash(color) {
  // Créer un div .theme-splash
  const splash = document.createElement("div");
  splash.className = "theme-splash";
  // On fixe la couleur en fond
  splash.style.backgroundColor = color;

  document.body.appendChild(splash);

  // Après l'animation (~500ms), on supprime le div
  splash.addEventListener("animationend", () => {
    splash.remove();
  });
}

// ================== LOGO ================== //
function updateLogo(src) {
  const logoImg = document.getElementById("logo-img");
  if (logoImg) {
    logoImg.src = src;
  }
}

