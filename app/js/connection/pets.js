// Firebase
import { query, where, collection, getDocs } from "firebase/firestore";

// Variables DOM
let sectionEmpty = document.querySelector(".information__pets .section__pets--empty");
let section = document.querySelector(".information__pets .section__pets .container__cards");
let infoPet = document.querySelector(".pet__info__show");


const showPets = async (userId) => {

    const myQuery = query(collection(db, "pets"), where("datos.usuario", "==", userId));
    const querySnap = await getDocs(myQuery);

    if (querySnap.empty){
        sectionEmpty.classList.add("section__fade--in");

    } else {

        let cards = [];

        section.classList.add("section__fade--in");

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


        cards.forEach(card => {
            let cardPet = card.dataset.pet;
            
            querySnap.forEach((doc) => {

                let data = doc.data();
    
                for (let i in data){
                    
                    if (cardPet === data[i].mascota.nombre){
                        card.addEventListener("click", (e) => {
                            
                            let avatar = document.createElement("img");
                            avatar.setAttribute("src", `/dist/assets/images/avatars/avatar-${data[i].mascota.tipo}.png`)
            
            
                            let name = document.createElement("h3");
                            name.classList.add("card__title", "title__body--bold");
                            name.textContent = data[i].mascota.nombre;
        
        
                            for (let j in data[i].mascota.tareas){
                                for (let k in data[i].mascota.temporalizacion){
                                    if (j === k){
                                        let task = [data[i].mascota.tareas[j], data[i].mascota.temporalizacion[k]]
                                        console.log(task)
                                    }
                                }
                            }


                            
                            infoPet.classList.add("pet__info--active")
                            infoPet.appendChild(avatar);
                            infoPet.appendChild(name)
                        })
                    }
                    
                }
            
            });


        })

    }
}

