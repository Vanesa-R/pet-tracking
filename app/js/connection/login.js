// Firebase 
import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";


// Evento submit sobre formulario de login y registro
forms.forEach(form => {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        let name = document.querySelector("#user__name").value;
        let email = document.querySelector("#email__register").value;
        let password = document.querySelector("#password__register").value;

        // Registro
        if (form.classList.contains("form__register")){
            closeModal();
            
            const newUserRegister = await createUserWithEmailAndPassword(auth, email, password)
            const userId = auth.currentUser.uid;

            const newUserDDBB = await setDoc(doc(db, "users", userId),{
                Datos_personales : {
                    Nombre: name,
                    Email: email,
                }
            })

        }

        // Login
        if (form.classList.contains("form__login")){
            const userLogged = await signInWithEmailAndPassword(auth, email, password)
            closeModal();

            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              const user = userCredential.user;
            })
            .catch((error) => {
              console.log(error.message)
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
        const token = credential.accessToken;
        const user = result.user;
        closeModal();

        const userId = auth.currentUser.uid;
        const newUserDDBB = setDoc(doc(db, "users", userId),{
            Datos_personales : {
                Nombre: user.displayName,
                Email: user.email,
            }
        })

      }).catch((error) => {
        console.log(error.message)
      });
})

