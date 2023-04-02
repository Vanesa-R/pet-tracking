// Variables DOM
let btnInteraction = document.querySelectorAll(".header .interaction .btn");
let modalLogin = document.querySelector(".modal__container");
let forms = document.querySelectorAll(".modal .form");
let inputs = document.querySelectorAll(".form .input__group input");
let linkOtherForm = document.querySelectorAll(".link__login");
let iconClose = document.querySelectorAll(".icon__close");
let iconPass = document.querySelectorAll(".input__icon");


// Expresiones regulares para validar formularios
const regExpres = {
    user: /^[a-zA-Z]{3,16}$/,
    email: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    password:  /^[a-z0-9_-]{8,18}$/
}




// Validación de inputs
const isValidateInput = {
    user: false,
    email: false,
    password: false,
    password2: false,
}


// Abrir modales login/registro
btnInteraction.forEach(btn => {
    if(btn.classList.contains("user__logged--out")){
        btn.addEventListener("click", () => {
            modalLogin.classList.add("modal__container--active");
            modalLogin.classList.remove("modal__container");
            
            if (btn.classList.contains("interaction__login")){
                modalLogin.firstChild.classList.add("modal--active")
            } else if (btn.classList.contains("interaction__register")){
                modalLogin.lastChild.classList.add("modal--active");
            }
        })
    }
})


// Cerrar modales login/registro
iconClose.forEach(icon => {
    icon.addEventListener("click", () => {
        icon.parentNode.parentNode.classList.remove("modal--active");
        if (modalLogin.classList.contains("modal__container--active")){
            modalLogin.classList.remove("modal__container--active");
            modalLogin.classList.add("modal__container");
        }
        resetForm()
    })
})

const closeModal = () => {
    modalLogin.classList.add("modal__container");
    modalLogin.classList.remove("modal__container--active");
    modalLogin.firstChild.classList.remove("modal--active");
    modalLogin.lastChild.classList.remove("modal--active");

}


// Cambiar entre modales login/registro
linkOtherForm.forEach((linkLogin, i) => {
    linkLogin.addEventListener("click", () => {
        if (i === 0) {
            modalLogin.firstChild.classList.remove("modal--active");
            modalLogin.lastChild.classList.add("modal--active");
        } else {
            modalLogin.lastChild.classList.remove("modal--active");
            modalLogin.firstChild.classList.add("modal--active");
        }
    })
})




// FORMULARIOS, validaciones y envío
const validateForm = (e) => {
    switch (e.target.name){
        case "user__name":
            if (e.target.value !== ""){
                validateInput(regExpres.user, e.target.value, e.target, "user")
            }
            break;

        case "email__register":
        case "email__login":
            validateInput(regExpres.email, e.target.value, e.target, "email", "La dirección de correo electrónico no es válida")
            break;

        case "password__register":
        case "password__login":
            validateInput(regExpres.password, e.target.value, e.target, "password", "La contraseña no cumple con los requisitos")
            break;

        case "repeat__password__register":
            if (e.target.value == document.querySelector("#password__register").value) {
                e.target.classList.remove("validate--error");
                e.target.nextElementSibling.textContent = "";
                isValidateInput.password2 = true;

            } else {
                e.target.classList.add("validate--error");
                e.target.nextElementSibling.textContent = "Las contraseñas no coinciden"
                isValidateInput.password2 = false;
            }
            break;
    }

    forms.forEach(form => {
        if (form.classList.contains("form__login")){
            if (isValidateInput.email && isValidateInput.password){
                document.querySelector(".form__login--withEmail .btn__submit").removeAttribute("disabled");
            } else {
                document.querySelector(".form__login--withEmail .btn__submit").setAttribute("disabled", "disabled")
            }
        }

        if (form.classList.contains("form__register")){
            if (isValidateInput.user && isValidateInput.email && isValidateInput.password && isValidateInput.password2){
                document.querySelector(".form__register--create .btn__submit").removeAttribute("disabled")
            } else {
                document.querySelector(".form__register--create .btn__submit").setAttribute("disabled", "disabled")
            }
        }
    })
}

const validateInput = (expresion, value, input, check, text) => {

    if (input.value != ""){
        if (expresion.test(value)){
            input.classList.remove("validate--error")
            input.nextElementSibling.textContent = "";
            isValidateInput[check] = true;
    
        } else {
            input.classList.add("validate--error")
            input.nextElementSibling.textContent = text;
            isValidateInput[check] = false;
        }
    } else {
        if (input.classList.contains("validate--error")){
            input.classList.remove("validate--error");
            input.nextElementSibling.textContent = "";
        }
    }
}

// Limpiar valores de input
const resetForm = () => {
    inputs.forEach(input => {
       input.value = "";
    })

    for (let i in isValidateInput){
        isValidateInput[i] = false;
    }
}

// Mostrar contraseña
iconPass.forEach(icon => {
    icon.addEventListener("click", () => {
        let input = icon.previousElementSibling;
        if (input.value !== ""){
            if (input.getAttribute("type") === "password"){
                input.setAttribute("type", "text")
                icon.setAttribute("src", "/dist/assets/icons/eye-open.png")
            } else {
                input.setAttribute("type", "password")
                icon.setAttribute("src", "/dist/assets/icons/eye-close.png")
            }
        }
    })
})


inputs.forEach(input => {
    input.addEventListener("keyup", (e) => validateForm(e));
    input.addEventListener("blur", (e) => validateForm(e));
   
    if (input["name"] === "user__name"){
        if (input.value === ""){
           isValidateInput.user = true;
        }
    }
});