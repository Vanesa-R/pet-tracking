/* SECCIÓN FOOTER*/

// Mostrar año en footer
const printYear = () => {
    let year = document.querySelector(".attribution__year")
    let yearCreate = document.querySelector(".attribution__year").dataset.create;
    let yearActual = new Date().getFullYear();

    if (yearCreate == yearActual){
        year.textContent = yearCreate;
    } else if (yearCreate <= yearActual){
        year.textContent = `${yearCreate} - ${yearActual}`
    }

}
printYear();