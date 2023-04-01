// Firebase
import { signOut } from "firebase/auth";

// Variables DOM
let btnLogout = document.querySelectorAll(".interaction__logout");
let menuMobile = document.querySelector(".menu__primary");


btnLogout.forEach(btn => {
    btn.addEventListener("click", (e) => {
        signOut(auth)
        .then((result) => {
            if (btn.classList.contains("user__logged--out")){
                btn.classList.add("btn--enabled")
            }
            if (btn.classList.contains("user__logged--in")) {
                btn.classList.remove("btn--enabled")
            }
            menuMobile.classList.remove("menu--active");
            btnMenuMobile.classList.remove("btn--enabled");

    
          }).catch((error) => {
            console.log(error)
          });
    })
})
