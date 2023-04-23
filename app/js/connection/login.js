// Firebase 
import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";


// Evento submit sobre formulario de login y registro
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
                closeModal();
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
                if (error.code == "auth/user-not-found"){
                    email.nextElementSibling.textContent = "La dirección de correo introducida no está asociada a ninguna cuenta"
                } else {
                    email.nextElementSibling.textContent = "";
                }

                if (error.code == "auth/wrong-password"){
                    password.nextElementSibling.textContent = "La contraseña es incorrecta"
                } else {
                    password.nextElementSibling.textContent = ""
                }
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
        closeModal();

    }).catch((error) => {
      console.log(error.message)
    });
})


// FORMULARIO LOGIN - SOLICITAR NUEVA CONTRASEÑA
let linkPassword = document.querySelector(".link__password");

linkPassword.addEventListener("click", () => {
    let email = document.querySelector("#email__login");
    const auth = getAuth();
    sendPasswordResetEmail(auth, email.value)
      .then(() => {
        email.nextElementSibling.textContent = "";
      })
      .catch((error) => {
        if (email.value === "") {
            email.nextElementSibling.textContent = "El campo email no puede estar vacío"
        } else if (error.code == "auth/user-not-found"){
            email.nextElementSibling.textContent = "La dirección de correo introducida no está asociada a ninguna cuenta"
        }
       
      });
})


// Almacenar nuevo usuario en la base de datos
const newUserDDBB = (userId, name, email) => {
    setDoc(doc(db, "users", userId), {
        datos_personales : {
            nombre: name,
            email: email
        }
    })
}