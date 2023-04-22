
// DOM
let calendar = document.querySelector(".pet__info__calendar");
let dateCalendar = document.querySelector(".calendar__header__interaction .calendar__actual__date");
let days = document.querySelector(".calendar__main");
let infoTask = document.querySelector(".pet__calendar .about__task");

// Variables y arrays
let date = new Date()
let currentMonth = date.getMonth(); // Mes de 0 a 11
let currentYear =  date.getFullYear();

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];


const printCalendar = () => {
    let firstDayOfMonth = new Date(currentYear, currentMonth, 0).getDay(); // Día semana de 0 a 6 que es día 1
    let lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Último día del mes 28, 29, 30, 31
    let lastDayPreviousMonth = new Date(currentYear, currentMonth, 0).getDate(); // Último día del mes anterior 28, 29, 30, 31
    let firstDayOfNextMonth = new Date(currentYear, currentMonth, lastDayOfMonth).getDay() // Primer día semana mes siguiente - de 0 a 6

    // Pintar mes actual
    dateCalendar.textContent = `${months[currentMonth]} ${currentYear}`;
    
    // Pintar últimos días del mes anterior
    for (let i = firstDayOfMonth; i > 0; i--){ // Posiciones que deben ocupar días previos de 0 a 6
        let day = document.createElement("li");
        day.classList.add("day", "text", "--light")
        day.textContent = `${lastDayPreviousMonth - i +1}`; // En dichas posiciones pintamos los últimos días del mes anterior
        days.appendChild(day)
    }

    // Pintar días del mes actual
    for (let i = 1; i <= lastDayOfMonth; i++){
        let day = document.createElement("li");
        day.classList.add("day", "text")
        day.textContent = i;
        days.appendChild(day)

        // Destacar día actual
        if ((i === date.getDate()) &&
            currentMonth === new Date().getMonth() &&
            currentYear === new Date().getFullYear()){
                day.classList.add("--today")
        }
    }
    
    // Printar primeros días del mes siguiente
    if (firstDayOfNextMonth > 0){ // Si es 0 el día 1 comienza en lunes y no se mostrará en el mes
        for (let i = firstDayOfNextMonth; i < 7; i++){ // Posiciones del mes siguiente
            let day = document.createElement("li");
            day.classList.add("day", "text", "--light")
            day.textContent = `${i - firstDayOfNextMonth +1}`; // Pintamos todas las posiciones con los días del mes siguiente
            days.appendChild(day)
        }
    }
}



const printTaskCalendar = (registrationDay, typePet, myTask, myTiming, arrHygiene) => {
    
    let days = document.querySelectorAll(".day");

    let dateInit = new Date()
    let dateSplit = registrationDay.split("/");

    dateInit.setDate(dateSplit[0]);
    dateInit.setMonth(dateSplit[1] -1);
    dateInit.setFullYear(dateSplit[2]);

    let dateEnd = new Date();
    let endLoop = parseInt(dateSplit[2]);
    
    const miliseconds = 1000 * 60 * 60 * 24;
    let interval;
    let className;

    const setEndLoop = {
        "perro": endLoop + 15,
        "gato": endLoop + 15,
        "ave": endLoop + 10,
        "tortuga": endLoop + 30
    }

    endLoop = setEndLoop[typePet];
    dateEnd.setFullYear(endLoop)

    for (let j in myTask){
        for (let k in myTask){
            if (j === k){
                let task = [myTask[j], myTiming[k]];

                className = (arrHygiene.includes(task[0])) ? "--hygiene__task" : "--cleaning__task";
                let timing = task[1]

                const setMyInterval = {
                    "1_semana": miliseconds * 7,
                    "1_mes": miliseconds * 30,
                    "2_mes": miliseconds * 15,
                    "1_año": miliseconds * 365,
                    "2_año": miliseconds * 182,
                    "3_año": miliseconds * 121
                }

                interval = setMyInterval[timing];

                for (let i = dateInit; i <= dateEnd; i = new Date(i.getTime() + interval)){                      
                    days.forEach(day => {
                        if (!day.classList.contains("--light")){
                            if ((day.textContent == i.getDate()) &&
                                (currentMonth == i.getMonth()) &&
                                (currentYear == i.getFullYear())){
                                    day.classList.add("--task", className)
                                    day.setAttribute(`data-${task[0].replaceAll(" ", "_")}`, `${task[0]}`)
                            }
                        }    
                    })
                }
            }
        }
    }
}