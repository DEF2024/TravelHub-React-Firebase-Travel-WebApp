const menuOpen = document.querySelector(".mean-nav");
const menuClose = document.querySelector(".close-nav");
const overlay = document.querySelector(".app-nav");

menuOpen.addEventListener("click", () => {
  overlay.classList.add("app-nav-active");
});

menuClose.addEventListener("click", () => {
  overlay.classList.remove("app-nav-active");
});