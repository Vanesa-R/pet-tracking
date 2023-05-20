/* SECCIÓN FOOTER*/

// Mostrar año en footer
const printYear = () => {
    let year = document.querySelector(".attribution__year")
    let yearCreate = document.querySelector(".attribution__year").dataset.create;
    let currentYear = new Date().getFullYear();

    if (yearCreate == currentYear){
        year.textContent = yearCreate;
    } else if (yearCreate <= currentYear){
        year.textContent = `${yearCreate} - ${currentYear}`
    }
}
printYear();