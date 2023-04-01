// Firebase
import { onAuthStateChanged } from "firebase/auth";


// Variables DOM
let btnInteraction = document.querySelectorAll(".header .interaction .btn");
let btnMenuMobile = document.querySelector(".icon__menu");
let informationAppLoggedOut = document.querySelector(".information__app");
let petEmpty = document.querySelector(".pet__empty");


onAuthStateChanged(auth, (user) => {
    btnInteraction.forEach(btn => {
        if (user) {

            if (btn.classList.contains("user__logged--out")){
                btn.classList.remove("btn--enabled")
            }

            if (btn.classList.contains("user__logged--in")) {
                
                if (window.outerWidth >= 768){
                    btn.classList.add("btn--enabled")
                    btnMenuMobile.classList.remove("btn--enabled");
                } else {
                    btnMenuMobile.classList.add("btn--enabled");
                }
            }

            if (location.pathname.includes("index")){
                informationAppLoggedOut.classList.remove("section__fade--in");
            }

            petEmpty.classList.add("section__fade--in");
            showIconMenu()
            showPets()

        } else {
            if (btn.classList.contains("user__logged--out")){
                btn.classList.add("btn--enabled")
            }
            if (btn.classList.contains("user__logged--in")) {
                btn.classList.remove("btn--enabled")
            }

            if (location.pathname.includes("index")){
                informationAppLoggedOut.classList.add("section__fade--in");
            }
        }
    })
});
