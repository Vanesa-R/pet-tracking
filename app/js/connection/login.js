// Firebase 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


// Evento submit sobre formularios de login y registro
forms.forEach(form => {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Registro
        if (form.classList.contains("form__register")){

            let name = document.querySelector("#user__name").value;
            let email = document.querySelector("#email__register");
            let password = document.querySelector("#password__register");
            let btnSubmit = document.querySelector(".btn__submit--register");
    
            createUserWithEmailAndPassword(auth, email.value, password.value)
            .then(() => {
                const userId = auth.currentUser.uid;
                newUserDDBB(userId, name, email.value);
                setTimeout(() => closeModal(), 1000)
            })
            .catch((error) => {
                if (error.code == "auth/email-already-in-use"){
                    btnSubmit.setAttribute("disabled", "disabled");
                    email.nextElementSibling.textContent = "Existe un usuario registrado con esta dirección de correo electrónico"
                } else {
                    email.nextElementSibling.textContent = "";
                }
            })
        }


        // Login
        if (form.classList.contains("form__login")){
            let email = document.querySelector("#email__login");
            let password = document.querySelector("#password__login");
            let btnSubmit = document.querySelector(".btn__submit--login");

            signInWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
              closeModal();
            })
            .catch((error) => {
                btnSubmit.setAttribute("disabled", "disabled");
                userNotFound(error, email);
                passwordWrong(error, password);
            });
        }
    })
})


// FORMULARIO LOGIN - ACCEDER CON CUENTA
let btnGoogle = document.querySelector(".btn--google");

btnGoogle.addEventListener("click", () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        newUserDDBB(user.uid, user.displayName, user.email);
        setTimeout(() => closeModal(), 1000)

    }).catch((error) => console.log(error.message));
})



// FORMULARIO LOGIN - SOLICITAR NUEVA CONTRASEÑA
let linkPassword = document.querySelector(".link__password");

linkPassword.addEventListener("click", () => {

    // Variables
    let email = document.querySelector("#email__recovery");
    let submit = document.querySelector(".btn__submit--resetPassword");
    let steps = document.querySelectorAll(".form__reset__step");    
    modalLogin.firstChild.classList.remove("modal--active");
    modalLogin.firstChild.nextSibling.classList.add("modal--active");


    if (email != ""){
        submit.addEventListener("click", (e) => {
            e.preventDefault()
            const auth = getAuth();
            sendPasswordResetEmail(auth, email.value)
            .then(() => {
                steps.forEach((step, i) => (i == 1) ? step.classList.add("step--show") : step.classList.remove("step--show"))
                setTimeout(() => {
                    modalLogin.firstChild.nextSibling.classList.remove("modal--active");
                    modalLogin.firstChild.classList.add("modal--active");
                    steps.forEach((step, i) => (i == 0) ? step.classList.add("step--show") : step.classList.remove("step--show"))

                }, 10000)
            })
            .catch((error) => {
              userNotFound(error, email)
              submit.setAttribute("disabled", "disabled");
              isValidateInput.email = false;
            });
        })
    }
})


// Errores acceso
const userNotFound = (error, el) => {
    el.nextElementSibling.textContent = (error.code == "auth/user-not-found" || error.code == "auth/missing-email") ? "La dirección de correo introducida no está asociada a ninguna cuenta" : "";
}

const passwordWrong = (error, el) => {
    el.nextElementSibling.textContent = (error.code == "auth/wrong-password") ? "La contraseña es incorrecta" : "";
}