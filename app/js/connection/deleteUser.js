// Firebase
import { deleteUser, reauthenticateWithCredential, reauthenticateWithPopup, EmailAuthProvider  } from "firebase/auth";


// DOM 
const linkDelete = document.querySelector(".delete__count");
const modalReauthenticate = document.querySelector(".modal__reauthenticate");
let btnconfirmDelete = document.querySelector(".form__reauthenticate .btn__submit--reauthenticate");
let stepsReauthenticate = document.querySelectorAll(".form__reauthenticate .form__reauthenticate__step");

const deleteUserAccount  = (user) => {
    linkDelete.addEventListener("click", async () => {

        // Cerrar menú móvil en caso de estar abierto
        (menu.classList.contains("menu--active")) && menu.classList.remove("menu--active");

        // Mostrar main en caso de estar oculto
        (main.classList.contains("main--fadeOut") && main.classList.remove("main--fadeOut"));


        // Consultar si hay datos almacenados en Storage y Dabatase del usuario. Eliminarlos si existen
        const myQuery = query(collection(db, "pets"), where("datos.usuario", "==", user.uid));
        const querySnap = await getDocs(myQuery);
        if (!querySnap.empty) {
            querySnap.forEach((doc) => {
                let data = doc.data();
                for (let i in data){
                    (data[i].mascota.avatar) && deleteImageStorage(data[i].mascota.avatar)
                    deletePetDDBB(doc.id)
                }               
            });
        }


        // Conocer método de autenticación y solicitar reautenticación al usuario

       setTimeout(() => {
           for (let i in user.providerData){

            // Acceso mediante Google
            if (user.providerData[i].providerId == "google.com") {
                const provider = new GoogleAuthProvider();
                reauthenticateWithPopup(auth.currentUser, provider)
                .then((result) => {
                    const user = result.user;
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    deleteUser(user)
                    deleteUserDDBB(user.uid)                    
                    setTimeout(() => {
                        modalLogin.classList.replace("modal__container", "modal__container--active")
                        modalReauthenticate.classList.add("modal--active");
                        stepsReauthenticate.forEach((step, i) => (i == 1) ? step.classList.add("step--show") : step.classList.remove("step--show"))
                    }, 500)

                    setTimeout(() => {
                        modalLogin.classList.replace("modal__container--active", "modal__container")
                        modalReauthenticate.classList.remove("modal--active");
                    }, 2500)
                }).catch(error => console.log(error.message));
    

            // Acceso mediante email y password
            } else if (user.providerData[i].providerId == "password"){

                modalLogin.classList.replace("modal__container", "modal__container--active")
                modalReauthenticate.classList.add("modal--active");

                let password = document.querySelector("#password__reauthenticate");
                
                btnconfirmDelete.addEventListener("click", () => {
                    const credential = EmailAuthProvider.credential(
                        user.email,
                        password.value
                    )

                    reauthenticateWithCredential(user, credential)
                    .then(() => {
                        deleteUser(user)
                        deleteUserDDBB(user.uid)
                        setTimeout(() => {
                            stepsReauthenticate.forEach((step, i) => (i == 1) ? step.classList.add("step--show") : step.classList.remove("step--show"))
                        }, 150)

                        setTimeout(() => {
                            stepsReauthenticate.forEach((step, i) => (i == 0) ? step.classList.add("step--show") : step.classList.remove("step--show"))
                            modalLogin.classList.replace("modal__container--active", "modal__container");
                            modalReauthenticate.classList.remove("modal--active");
                        }, 3000)
                    })
                    .catch((error) => passwordWrong(error, password))
                })
            }
           }
       }, 600)

    })
}