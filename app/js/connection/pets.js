// Firebase
import { query, where, collection, getDocs } from "firebase/firestore";
import { getDownloadURL } from "firebase/storage";

// Variables DOM
let sectionEmpty = document.querySelector(".information__pets .section__pets--empty");
let section = document.querySelector(".information__pets .section__pets .container__cards");
let infoPet = document.querySelector(".pet__info");
let deleteInfo = document.querySelector(".pet__info--delete");
let icons = document.querySelectorAll(".calendar__header__interaction .icon");

// Variables y arrays
let hygiene = ["Baño", "Cepillado", "Corte de pelo", "Corte de uñas", "Limpieza de oidos", "Limpieza de ojos", "Limpieza dental"];



// Función para mostrar las mascotas del usuario
const showPets = async (userId) => {

    const myQuery = query(collection(db, "pets"), where("datos.usuario", "==", userId));
    const querySnap = await getDocs(myQuery);

    // Si no se ha agregado ninguna mascota se anima al usuario a iniciar el proceso
    if (querySnap.empty){
        sectionEmpty.classList.replace("section--hidden", "section__fade--in");

    // Si se han agregado se mostrarán en la página de inicio
    } else {
        section.parentNode.classList.remove("section--hidden")
        section.classList.add("section__fade--in");

        // Detalle de cada mascota con información básica (cards)
        let cards = [];
        querySnap.forEach((doc) => {
            let data = doc.data();

            for (let i in data){
                let article = document.createElement("article");
                article.classList.add("article", "card");
                article.setAttribute("data-pet", `${data[i].mascota.nombre}`)
                cards.push(article);

                printDataBasicPet(article, data[i].mascota.avatar, data[i].mascota.tipo, data[i].mascota.nombre)
                section.appendChild(article)
            }

        });

        // Información completa de cada mascota, visible al clicar una card
        printCalendar()

        cards.forEach(card => {

            let cardPet = card.dataset.pet; // Nombre de mascota
            
            querySnap.forEach((doc) => {
                let data = doc.data();

                for (let i in data){
                    
                    if (cardPet === data[i].mascota.nombre){
                        
                        card.addEventListener("click", (e) => {
                            section.classList.replace("section__fade--in", "section--hidden");
                            infoPet.parentNode.classList.add("section__fade--in")
                            
                            // Pintamos información básica y las tareas del calendario, posibilidad de setear avatar
                            printDataBasicPet(infoPet, data[i].mascota.avatar, data[i].mascota.tipo, data[i].mascota.nombre)
                            setAvatar(infoPet, doc.id, data[i].mascota.avatar)
                            printTaskCalendar(data[i].fecha_alta, data[i].mascota.tipo, data[i].mascota.tareas, data[i].mascota.temporalizacion, hygiene)                            
                            
                            // Desplazamiento entre meses del calendario
                            icons.forEach(icon => {
                                icon.addEventListener("click", (e) => {
                                    let days = document.querySelectorAll(".day");
                                    days.forEach(day => day.remove())
                                    infoTask.childNodes.forEach(el => el.remove())

                                    if (icon.classList.contains("icon__prev")){
                                        currentMonth--
                            
                                        if (currentMonth < 0){
                                            currentMonth = 11;
                                            currentYear--
                                        }
                            
                                    } else if (icon.classList.contains("icon__next")){
                                        currentMonth++
                                        if (currentMonth > 11){
                                            currentMonth = 0;
                                            currentYear++
                                        }
                                    }
                                    setTimeout(() => {
                                        printCalendar()
                                        printTaskCalendar(data[i].fecha_alta, data[i].mascota.tipo, data[i].mascota.tareas, data[i].mascota.temporalizacion, hygiene)         
                                        printTask();                   
                                    }, 200)
                                })
                            })

                            printTask();

                            // Eliminar mascota
                            deleteInfo.addEventListener("click", (e) => {
                                (data[i].mascota.avatar) && deleteImageStorage(data[i].mascota.avatar)
                                deletePetDDBB(doc.id)
                                setTimeout(() => location.reload(), 1000)
                            })
                        })

                    }   
                }
            });
        })
    }
}

// Muestra las tareas al clicar días del calendario
const printTask = () => {
    let days = document.querySelectorAll(".day");

    days.forEach(day => {
        day.addEventListener("click", (e) => {     
            // Al hacer click sobre un día con tareas, se activa este día y se muestran las tareas
            if (day.classList.contains("--task")){
                day.classList.add("--active");
                setTimeout(() => {
                    for (let i in day.dataset){
                        let item = document.createElement("li");
                        item.classList.add("text", `${(hygiene.includes(`${day.dataset[i]}`)) ? "--hygiene__task" : "--cleaning__task"}`)
                        item.textContent = `${day.dataset[i]}`
                        infoTask.appendChild(item)
                    }
                }, 100)
        
                // Si previamente estaba activado otro día, este se desactiva y se remueven sus tareas
                days.forEach(day => {
                    if (day.textContent != e.target.textContent){
                        day.classList.remove("--active")
                        
                        if (infoTask.hasChildNodes() == true){
                            let items = infoTask.childNodes;
                            items.forEach(item => item.remove())
                        }
                    }
                })                
            }
        })

        // Por defecto, se mostrarán las tareas del día actual sin necesidad de hacer clic
        if (day.classList.contains("--today")){
            if (!day.classList.contains("--task")){
                if (infoTask.hasChildNodes() == false){
                    let span = document.createElement("span");
                    span.classList.add("text");
                    span.textContent = `No hay tareas para hoy`
                    infoTask.appendChild(span)
                }
            } else {
                for (let i in day.dataset){
                    let item = document.createElement("li");
                    item.classList.add("text", `${(hygiene.includes(`${day.dataset[i]}`)) ? "--hygiene__task" : "--cleaning__task"}`)
                    item.textContent = `${day.dataset[i]}`
                    infoTask.appendChild(item)
                }
            }
        }
    })
}

// Muestra información básica de la mascota
const printDataBasicPet = (el, avatarPet, typePet, namePet) => {
    let picture = document.createElement("picture");
    picture.classList.add("picture");
    let avatar = document.createElement("img");
    avatar.classList.add("card__img")

    if (avatarPet){
        newImageStorage(avatar, avatarPet)
        const pathReference = ref(storage, `${avatarPet}`);
        getDownloadURL(pathReference)
        .then((url) => {
            avatar.setAttribute('src', `${url}`);
            
        })
        .catch(error => console.log(error));
    } else {
        avatar.setAttribute("src", `assets/images/avatars/avatar-${typePet}.png`);
    }

    avatar.setAttribute("alt", `Avatar de ${namePet}`)

    let name = document.createElement("h3");
    name.classList.add("card__title", "title__body--bold");
    name.textContent = namePet;

    picture.appendChild(avatar)
    el.appendChild(picture)
    el.appendChild(name)
}

// Modificar el avatar por defecto
const setAvatar = (el, idPet, avatarPet) => {

    if (!avatarPet){
        let label = document.createElement("label");
        let attrLabel = "set__avatar__pet" 
        label.setAttribute("for", `${attrLabel}` );

        let icon = document.createElement("img");
        icon.classList.add("icon");
        icon.setAttribute("src", "assets/icons/icon-upload-img.png")
        icon.setAttribute("alt", "Cambiar imagen");

        let input = document.createElement("input");
        input.setAttribute("type", "file")
        input.setAttribute("id", `${attrLabel}`);
        input.setAttribute("name", `${attrLabel}`)

        label.appendChild(icon)
        label.appendChild(input)
        el.appendChild(label)

        input.addEventListener("change", (e) => {
            let fileAvatar = e.target.files[0];
            let avatar = fileAvatar.name;

            // Almacenar avatar en Firestore Database
            updatePetDDBB(idPet, avatar)

            // Almacenar datos en Firestore Storage
            newImageStorage(avatar, fileAvatar)

            // Visualizar nuevo avatar
            const reader = new FileReader();
            reader.readAsDataURL(fileAvatar);
            reader.addEventListener("load", (e) => {
                const reader = new FileReader();
                reader.readAsDataURL(fileAvatar);
                reader.addEventListener("load", (e) => {
                    let picture = document.createElement("picture");
                    picture.classList.add("picture");
                    let img = document.createElement("img");
                    img.classList.add("card__img");
                    img.setAttribute("src", e.target.result)
                    
                    picture.appendChild(img)
                    infoPet.insertBefore(picture, document.querySelector(".pet__info .card__title"))
                })
                infoPet.firstChild.remove()
                label.remove()

            })
        })      
    }
}