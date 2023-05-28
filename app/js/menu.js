/* SECCIÓN MENÚ NAVBAR */

// Variables acceso DOM
const menu = document.querySelector(".menu__primary");
const main = document.querySelector(".main");
const btnMenu = document.querySelector(".icon__menu");

// Expandir menú de navegación
btnMenu.addEventListener("click", () => {
    if (window.innerWidth <= 1024){
        menu.classList.toggle("menu--active");
        main.classList.toggle("main--fadeOut");
        btnMenu.classList.toggle("icon--active");
        (menu.classList.contains("menu--active")) ? btnMenu.setAttribute("aria-expanded", "true") : btnMenu.setAttribute("aria-expanded", "false");
    }
})


// Mostrar icono menú hamburguesa
const showIconMenu = () => {
    window.addEventListener("resize", () => {
        (window.innerWidth >= 1024)  ? btnMenu.classList.remove("btn--enabled") : btnMenu.classList.add("btn--enabled");
    })
}