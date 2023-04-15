// Firebase
import { query, where, collection, getDocs } from "firebase/firestore";

// Variables DOM
let sectionEmpty = document.querySelector(".information__pets .section__pets--empty");
let section = document.querySelector(".information__pets .section__pets .container__cards");
let infoPet = document.querySelector(".pet__info");
let icons = document.querySelectorAll(".calendar__header__interaction .icon")

// Variables y arrays
let hygiene = ["Baño", "Cepillado", "Corte de pelo", "Corte de uñas", "Limpieza de oidos", "Limpieza de ojos", "Limpieza dental"];


const showPets = async (userId) => {

    const myQuery = query(collection(db, "pets"), where("datos.usuario", "==", userId));
    const querySnap = await getDocs(myQuery);

    if (querySnap.empty){
        sectionEmpty.classList.add("section__fade--in");

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

                let avatar = document.createElement("img");
                avatar.setAttribute("src", `/dist/assets/images/avatars/avatar-${data[i].mascota.tipo}.png`)

                let name = document.createElement("h3");
                name.classList.add("card__title", "title__body--bold");
                name.textContent = data[i].mascota.nombre;

                article.appendChild(avatar)
                article.appendChild(name)
                section.appendChild(article)
            }
        });

        // Información completa de cada mascota, visible al clicar una card
        printCalendar()

        cards.forEach(card => {
            let cardPet = card.dataset.pet;
            
            querySnap.forEach((doc) => {
                let data = doc.data();
    
                for (let i in data){
                    
                    if (cardPet === data[i].mascota.nombre){
                        card.addEventListener("click", (e) => {

                            section.remove()
                            
                            let avatar = document.createElement("img");
                            avatar.setAttribute("src", `/dist/assets/images/avatars/avatar-${data[i].mascota.tipo}.png`)
            
                            let name = document.createElement("h3");
                            name.classList.add("card__title", "title__body--bold");
                            name.textContent = data[i].mascota.nombre;
                            
                            printTaskCalendar(data[i].fecha_alta, data[i].mascota.tipo, data[i].mascota.tareas, data[i].mascota.temporalizacion, hygiene)                            

                            infoPet.parentNode.classList.add("section__fade--in")
                            infoPet.appendChild(avatar);
                            infoPet.appendChild(name)

                            icons.forEach(icon => {
                                icon.addEventListener("click", (e) => {
                                    let days = document.querySelectorAll(".day");
                                    days.forEach(day => day.remove())
                            
                                    
                                    if (icon.classList.contains("icon__prev")){
                                        actualMonth--
                            
                                        if (actualMonth < 0){
                                            actualMonth = 11;
                                            actualYear--
                                        }
                            
                                    } else if (icon.classList.contains("icon__next")){
                                        actualMonth++
                                        if (actualMonth > 11){
                                            actualMonth = 0;
                                            actualYear++
                                        }
                                    }
                                    setTimeout(() => {
                                        printCalendar()
                                        printTaskCalendar(data[i].fecha_alta, data[i].mascota.tipo, data[i].mascota.tareas, data[i].mascota.temporalizacion, hygiene)                            
                                    }, 100)
                                })
                            })

                            let days = document.querySelectorAll(".day");

                            days.forEach(day => {
                                day.addEventListener("click", (e) => {     
             
                                    if (day.classList.contains("--task")){

                                        day.classList.add("--active");
                                    
                                        for (let i in day.dataset){
                                            let item = document.createElement("li");
                                            item.classList.add("text", `${(hygiene.includes(`${day.dataset[i]}`)) ? "--hygiene__task" : "--cleaning__task"}`)
                                            item.textContent = `${day.dataset[i]}`
                                            infoTask.appendChild(item)
                                        }
                        
                                        days.forEach(day => {
                                            if (day.textContent != e.target.textContent){
                                                day.classList.remove("--active")
                                            }
                                        })                
                                    }
                                })
                            })
                        })
                    }   
                }
            });
        })
    }
}