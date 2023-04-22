import { ref, uploadBytes } from "firebase/storage";

const formPet = async (userId) => {

    // DOM
    const formPet = document.querySelector(".form__add__pet");
    const steps = Array.from(document.querySelectorAll(".form__pet__tab"));
    const details = document.querySelectorAll(".detail__task");
    const selectPet = document.querySelectorAll("input[name='type__pet']");
    const imagePet = document.querySelector("input[name='avatar__pet']");
    const dropZone = document.querySelector(".form__add__pet .drop__zone");
    const success = document.querySelector(".form__add__pet .text--success")

    // Declaración de variables, arrays y objetos
    let group = "";
    let typePet = "";
    let fileAvatar = "";
    let avatar = "";

    let checkbox = [];
    let selects = [];
    let mytask = [];
    let myTiming = [];


    const isValidatePetInput = {
        namePet: false,
        typePet: false,
        taskPet: false,
    }



    // DESPLAZAMIENTO ENTRE PASOS DEL FORMULARIO

    let activeTab = steps.findIndex(step => {
        return step.classList.contains("tab--active");
    })


    const showActiveTab = () => {
        steps.forEach((step, i) => {
            (i === activeTab) ? step.classList.add("tab--active") : step.classList.remove("tab--active")
        })
    }

    if (activeTab < 0) {
        activeTab = 0;
        steps[activeTab].classList.add("tab--active")
        showActiveTab()
    }
    
    
    // Escucha en botones "Anterior", "Siguiente" y "Enviar"
    formPet.addEventListener("click", (e, user) => {

        // Siguiente
        if (e.target.classList.contains("btn__next")){            
            e.preventDefault()
           
            // Pintamos desplegable de tareas del segundo paso
            if (activeTab == 0){ 
                printTask(typePet)
                
                // Control para mantener las tareas seleccionadas en caso de retroceder paso
                for (let i in checkbox){
                    for (let j in mytask){
                        (mytask[j] === checkbox[i].value) && checkbox[i].click();
                    }
                }
            }

            // Pintamos el resumen de tareas y temporalización del tercer paso
            (activeTab == 1) && printResumeTaskandTime()
            
            activeTab++;
        } 
        
        // Anterior
        else if (e.target.classList.contains("btn__prev")){
            e.preventDefault()

            if (activeTab == 1){
                // Remover desplegable de tareas en caso de retroceder paso
                let group = document.querySelectorAll(".checkbox__group");
                group.forEach(checkbox => {
                    checkbox.remove()
                })
                
                // Remover tareas seleccionadas en caso de reproceder paso y seleccionar otra mascota
                selectPet.forEach(radio => {
                    radio.addEventListener("change", (e) => {
                        mytask.length = 0;
                        myTiming.length = 0;
                    })
                })
            }

            if (activeTab == 2){
                let group = document.querySelectorAll(".container__task--checked .group__task");
                group.forEach(option => {
                    option.remove()
                })
            }
            
            activeTab--;

        } 
        
        // Enviar
        else if (e.target.classList.contains("btn__submit")){
            e.preventDefault();

            // Almacenar datos en Firestore Database
            let name = document.querySelector("input[name='name__pet']").value;
            let date = new Date();
            date = date.toLocaleDateString();
            let idPet = Math.random().toString(30);

            setDoc(doc(db, "pets", idPet), {
                datos : {
                    mascota : {
                        nombre: name,
                        avatar: `images/${avatar}`,
                        tipo: typePet,
                        tareas: mytask,
                        temporalizacion: myTiming,
                    },
                    fecha_alta: date,
                    usuario: userId
                },
            }, {
                merge: true
            })

            // Almacenar dados en Firestore Storage
            const imageRef = ref(storage, `images/${avatar}`)
            uploadBytes(imageRef, fileAvatar)
            .then((snapshot) => {
                console.log(`Imagen almacenada con éxito`)
            })
            .catch(error => console.log(error))
          
            // Mostramos mensaje de éxito al usuario
            success.textContent = "¡Mascota agregada con éxito!"
            
            // Limpiar datos del formulario y dejar de mostrar el mensaje de éxito
            setTimeout(() => {
                success.textContent = "";
                formPet.reset()
                mytask.length = 0;
                myTiming.length = 0;
                dropZone.childNodes.forEach((el, i) => (i > 2) && el.remove())
            }, 1600)

            // Llevar al primer paso del formulario
            setTimeout(() => {
                steps.forEach((step, i) => (i === 0) && step.classList.add("tab--active"))
            }, 1650)
        }

        isValidatePetInput.typePet = (typePet !== "") ? true : false;
        isValidatePetInput.taskPet = (mytask.length > 0) ? true : false;
    
        showActiveTab()
    })


    // Comportamiendo de desplegables del formulario
    details.forEach(detail => {
        detail.addEventListener("click", () => {
            (!detail.hasAttribute("open")) && details.forEach(detail => detail.removeAttribute("open"));
        })
    })


    // Pintado de segundo paso del formulario dependiendo de mascota seleccionada
    const addTask = (arr, index) => {
        let key = arr[index].replace("de ", "").toLowerCase().replace(" ", "_");
            
        group = document.createElement("div");
        group.classList.add("checkbox__group");

        let input = document.createElement("input");
        input.classList.add("input")
        input.setAttribute("id", `${key}`);
        input.setAttribute("type", "checkbox");
        input.setAttribute("name", `${key}`);
        input.setAttribute("value", `${arr[index]}`)
        checkbox.push(input)

        let label = document.createElement("label");
        label.classList.add("label");
        label.setAttribute("for", `${key}`)
        label.textContent = arr[index];

        group.appendChild(input);
        group.appendChild(label);
    }

    const printTask = (typePet) => {
        let section = "";
        let hygiene = [];
        let cleaning = [];

        switch(typePet) {
            case "perro":
                hygiene.push("Baño", "Cepillado", "Corte de pelo", "Corte de uñas", "Limpieza de oidos", "Limpieza de ojos", "Limpieza dental");
                cleaning.push("Cama", "Comedero", "Bebedero", "Juguetes", "Collar")
                break;
            case "gato":
                hygiene.push("Baño", "Cepillado", "Corte de pelo", "Corte de uñas", "Limpieza de oidos", "Limpieza de ojos", "Limpieza dental");
                cleaning.push("Cama", "Arenero", "Rascador", "Comedero", "Bebedero", "Juguetes", "Collar")
                break;
            case "ave":
                hygiene.push("Corte de uñas");
                cleaning.push("Jaula", "Comedero", "Bebedero");
                break;
            case "tortuga":
                hygiene.push("Baño");
                cleaning.push("Terrario", "Acuario", "Comedero", "Bebedero");
                break;
        }

        details.forEach(detail => {
            section = detail.firstElementChild.childNodes[1].textContent;
            
            if (section === "Higiene"){   
                for (let j in hygiene){
                    addTask(hygiene, j)
                    detail.appendChild(group)
                }
            } 
            
            const sortCleaning = new Set(cleaning);
            let cleaningArr = [...sortCleaning];

            if (section === "Limpieza"){
                for (let k in cleaningArr){
                    addTask(cleaningArr, k)
                    detail.appendChild(group)
                }
            }   
        })

        checkbox.forEach(check => {
            check.addEventListener("click", (e) => {
                if (check.checked){
                    if (!mytask.includes(e.target.value)){
                        mytask.push(e.target.value)
                        myTiming.push("1_semana");
                    }
                } else {
                    if (mytask.includes(e.target.value)){
                        let index = mytask.indexOf(e.target.value);
                        mytask.splice(index, 1)
                        myTiming.splice(index, 1)
                    }
                }
            })
        })
    }


    // Pintado del tercer paso del formulario con las tareas y temporalización
    const printResumeTaskandTime = () => {

        for (let i in mytask){

            let optionsTimes = ["1 vez a la semana", "1 vez al mes", "2 veces al mes", "1 vez al año", "2 veces al año", "3 veces al año"];

            let group = document.createElement("div");
            group.classList.add("group__task");

            let label = document.createElement("label");
            label.setAttribute("for", `${mytask[i]}`)
            label.textContent = `${mytask[i]}`;

            let selectTime = document.createElement("select");
            selectTime.classList.add("select");
            selects.push(selectTime)


            for (let j in optionsTimes){
                let option = document.createElement("option");
                option.setAttribute("value", `${optionsTimes[j].replace(/vez |veces |al |la |a /g, "").replace(" ", "_")}`);
                option.textContent = `${optionsTimes[j]}`
                selectTime.appendChild(option)
            }
            
            group.appendChild(label)
            group.appendChild(selectTime)
            document.querySelector(".container__task--checked").appendChild(group);

        }

        selects.forEach((select, i) => {
            select.addEventListener("change", (e) => {
                myTiming.splice(i, 1, `${e.target.value}`)
            })
        })
    }


    // Valifación de campos obligatorios
    const validateFormPet = (e) => {
        steps.forEach(step => {
            let activeBTNNext =  document.querySelector(`.btn__next[data-next="${activeTab}"]`);

            switch(activeTab){
                case 0:
                    (e.target.type === "text") && validatePetInputs(e.target, "namePet", "Escribe el nombre de tu mascota");
                    typePet = (e.target.type === "radio") && e.target.value;
                    (isValidatePetInput.namePet && isValidatePetInput.typePet) ? activeBTNNext.removeAttribute("disabled") : activeBTNNext.setAttribute("disabled", "disabled")
                    break;
                
                case 1:
                    (isValidatePetInput.taskPet) ? activeBTNNext.removeAttribute("disabled") : activeBTNNext.setAttribute("disabled", "disabled");
                    break;
            }
        }
    )}
                   
    
    // Validación input text
    const validatePetInputs = (input, check, text) => {
        if (regExpres.user.test(input.value)){
            input.classList.remove("validate--error");
            input.nextElementSibling.textContent = "";
            isValidatePetInput[check] = true;
        }  else {
            input.classList.add("validate--error")
            input.nextElementSibling.textContent = text;
            isValidatePetInput[check] = false;
        }
    }

    // Escucha en input file
    imagePet.addEventListener("change", e => {
        fileAvatar = e.target.files[0];
        avatar = fileAvatar.name;
        showPreviewImg(fileAvatar)
    })

    
    // Escucha en drop zone
    dropZone.addEventListener("dragover", e => {
        e.preventDefault();
    })

    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        fileAvatar = e.dataTransfer.files[0];
        avatar = fileAvatar.name;
        showPreviewImg(fileAvatar)
    })

    // Previsualización de imagen
    const showPreviewImg = (fileAvatar) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileAvatar);
        reader.addEventListener("load", (e) => {

            // Mostrar imagen agregada
            let picture = document.createElement("picture");
            
            dropZone.childNodes.forEach((el, i) => (i > 2) && el.remove())

            picture.classList.add("picture__preview");
            let imgPreview = document.createElement("img");
            imgPreview.classList.add("img__preview");
            imgPreview.setAttribute("src", e.target.result)
            
            picture.appendChild(imgPreview)
            dropZone.appendChild(picture)
        })
    }

    // Escucha en el formulario        
    formPet.addEventListener("change", (e) => validateFormPet(e))

    // Escucha a input radio
    selectPet.forEach(radio => {
        radio.addEventListener("change", (e) => {
            typePet = radio.value;
            isValidatePetInput.typePet = true;
        })
    })
}