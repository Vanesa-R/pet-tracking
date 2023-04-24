// Firebase
import { onAuthStateChanged } from "firebase/auth";


// Variables DOM
let btnInteraction = document.querySelectorAll(".header .interaction .btn");
let btnMenuMobile = document.querySelector(".icon__menu");
let informationAppLoggedOut = document.querySelector(".information__app");
let informationAppLoggedIn = document.querySelector(".information__pets");

let page51 = document.querySelectorAll(".page-51");
let warningPage51 = document.querySelectorAll(".private__area__warning");
let linksModal = document.querySelectorAll(".private__area__warning .link");


onAuthStateChanged(auth, (user) => {

    // Usuario conectado
    if (user) {

        btnInteraction.forEach(btn => {

            (btn.classList.contains("user__logged--out")) && btn.classList.remove("btn--enabled");
    
            if (btn.classList.contains("user__logged--in")) {
                if (window.outerWidth >= 768){
                    btn.classList.add("btn--enabled")
                    btnMenuMobile.classList.remove("btn--enabled");
                } else {
                    btnMenuMobile.classList.add("btn--enabled");
                }
            }
        })

        if (!location.href.includes("mascota")){
            informationAppLoggedOut.classList.remove("section__fade--in");
            informationAppLoggedIn.classList.replace("section--hidden", "section__fade--in");
            showPets(user.uid);
        }
        
        if (location.pathname.includes("mascota")) {
            formPet(user.uid)
        }
        
        page51.forEach(section => {
            section.classList.remove("section--hidden")
        })
        
        warningPage51.forEach(warning => {
            warning.classList.add("section--hidden")
        })
        
        menu.classList.remove("section--hidden");

        showIconMenu();


    // Usuario desconectado - Invitado
    } else {

        rotateImages()

        btnInteraction.forEach(btn => {
            (btn.classList.contains("user__logged--out")) && btn.classList.add("btn--enabled");
            (btn.classList.contains("user__logged--in")) && btn.classList.remove("btn--enabled");
    
            if (!location.href.includes("mascota")){
                informationAppLoggedOut.classList.add("section__fade--in");
                informationAppLoggedIn.classList.replace("section__fade--in", "section--hidden");
            }

            page51.forEach(section => {
                section.classList.add("section--hidden");
                openLoginModalAutomatically(btn)
                openModalClick(btn)
            })
        })

        menu.classList.add("section--hidden");

        warningPage51.forEach(warning => {
            warning.classList.remove("section--hidden");
        })
    }

});

const openLoginModalAutomatically = (btn) => {
    setTimeout(() => {
        if (btn.classList.contains("interaction__login")){
            btn.click()
        }
    },2600)
}

const openModalClick = (btn) => {
    linksModal.forEach(link => {
        link.addEventListener("click", () => {
            if (link.classList.contains("link__login")){
               (btn.classList.contains("interaction__login")) && btn.click();
            }

            if (link.classList.contains("link__register")){
                (btn.classList.contains("interaction__register")) && btn.click();
            }
        })
    })
}

