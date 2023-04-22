// Firebase
import { query, where, collection, getDocs, AggregateField } from "firebase/firestore";
import { getDownloadURL } from "firebase/storage";

// Variables DOM
let sectionEmpty = document.querySelector(".information__pets .section__pets--empty");
let section = document.querySelector(".information__pets .section__pets .container__cards");
let infoPet = document.querySelector(".pet__info");
let icons = document.querySelectorAll(".calendar__header__interaction .icon");

// Variables y arrays
let hygiene = ["Baño", "Cepillado", "Corte de pelo", "Corte de uñas", "Limpieza de oidos", "Limpieza de ojos", "Limpieza dental"];


// Función para mostrar las mascotas del usuario
const showPets = async (userId) => {

    const myQuery = query(collection(db, "pets"), where("datos.usuario", "==", userId));
    const querySnap = await getDocs(myQuery);

    // Si no se ha agregado ninguna mascota se anima al usuario a iniciar el proceso
    if (querySnap.empty){
        sectionEmpty.classList.add("section__fade--in");

    // Si se han agregado se mostrarán en la página de inicio
    } else {
        section.classList.add("section__fade--in");

        // Detalle de cada mascota (cards)
        let cards = [];
        querySnap.forEach((doc) => {
            let data = doc.data();

            for (let i in data){
                
                let article = document.createElement("article");
                article.classList.add("article", "card");
                article.setAttribute("data-pet", `${data[i].mascota.nombre}`)
                cards.push(article);

                 // Avatar
                 let picture = document.createElement("picture");
                 picture.classList.add("picture");
                 let avatar = document.createElement("img");
                 avatar.classList.add("card__img")
                 
                 if (data[i].mascota.avatar){
                     const pathReference = ref(storage, `${data[i].mascota.avatar}`);
                     getDownloadURL(pathReference)
                       .then((url) => {
                         avatar.setAttribute('src', `${url}`);
                       })
                       .catch(error => console.log(error));
                 } else {
                     avatar.setAttribute("src", `/dist/assets/images/avatars/avatar-${data[i].mascota.tipo}.png`);
                 }

                let name = document.createElement("h3");
                name.classList.add("card__title", "title__body--bold");
                name.textContent = data[i].mascota.nombre;

                picture.appendChild(avatar)
                article.appendChild(picture)
                article.appendChild(name)
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
                    
                    if (cardPet === data[i].mascota.nombre){ // Mostramos la información de la mascota seleccionada

                        card.addEventListener("click", (e) => {
                            section.classList.replace("section__fade--in", "section--hidden");

                            // Avatar
                            let picture = document.createElement("picture");
                            picture.classList.add("picture");
                            let avatar = document.createElement("img");
                            avatar.classList.add("card__img")
                            
                            if (data[i].mascota.avatar){
                                const pathReference = ref(storage, `${data[i].mascota.avatar}`);
                                getDownloadURL(pathReference)
                                  .then((url) => {
                                    avatar.setAttribute('src', `${url}`);
                                  })
                                  .catch(error => console.log(error));
                            } else {
                                avatar.setAttribute("src", `/dist/assets/images/avatars/avatar-${data[i].mascota.tipo}.png`);
                            }
            
                            // Nombre
                            let name = document.createElement("h3");
                            name.classList.add("card__title", "title__body--bold");
                            name.textContent = data[i].mascota.nombre;
                            
                            printTaskCalendar(data[i].fecha_alta, data[i].mascota.tipo, data[i].mascota.tareas, data[i].mascota.temporalizacion, hygiene)                            

                            infoPet.parentNode.classList.add("section__fade--in")
                            picture.appendChild(avatar)
                            infoPet.appendChild(picture);
                            infoPet.appendChild(name);


                            // Desplazamiento entre meses del calendario
                            icons.forEach(icon => {
                                icon.addEventListener("click", (e) => {
                                    let days = document.querySelectorAll(".day");
                                    days.forEach(day => day.remove())
                                    
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
                                        showTask();                   
                                    }, 100)
                                })
                            })
                            showTask();
                        })
                    }   
                }
            });
        })
    }
}


const showTask = () => {
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
                }, 150)
        
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
                let span = document.createElement("span");
                span.classList.add("text");
                span.textContent = `No hay tareas para hoy`
                infoTask.appendChild(span)
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