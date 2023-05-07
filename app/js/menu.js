/* SECCIÓN MENÚ NAVBAR */

// Variables acceso DOM
const header = document.querySelector(".header");
const btnMenu = document.querySelector(".icon__menu");
const menu = document.querySelector(".menu__primary");
const btnLogout = document.querySelector(".interaction .interaction__logout")


// Expandir menú de navegación
btnMenu.addEventListener("click", () => {
    if (window.innerWidth <= 1024){
        menu.classList.toggle("menu--active");
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