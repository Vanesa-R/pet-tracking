/* SECCIÓN INTRODUCCIÓN APP */

// la imagen cambiará cada cinco segundos para mostrar a distintas mascotas
const rotateImages = () => {
    let img = document.querySelector(".information__app__img img");
    setInterval(() => {
        let imgRandom = Math.round(Math.random()* (5-1)+1); 
        img.setAttribute("src",`assets/images/decoratives/pets${imgRandom}.webp`)
    }, 5000)
}
