// Firebase
import { signOut } from "firebase/auth";

// Variables DOM
let btnLogout = document.querySelectorAll(".interaction__logout");
let menuMobile = document.querySelector(".menu__primary");

btnLogout.forEach(btn => {
    btn.addEventListener("click", (e) => {
        signOut(auth)
        .then(() => {
            // CTA cerrar sesión
            (btn.classList.contains("user__logged--out")) && btn.classList.add("btn--enabled");

            // CTA iniciar sesión
            (btn.classList.contains("user__logged--in")) && btn.classList.remove("btn--enabled");
            
            // Mostrar main
            (main.classList.contains("main--fadeOut") && main.classList.remove("main--fadeOut"));

            // Ocultar menú de navegación
            menuMobile.classList.remove("menu--active");
            btnMenuMobile.classList.remove("btn--enabled");

        })
        .catch((error) => console.log(error));
    })
})