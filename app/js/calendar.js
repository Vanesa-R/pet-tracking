
// DOM
let calendar = document.querySelector(".pet__info__calendar");
let dateCalendar = document.querySelector(".calendar__header__interaction .calendar__actual__date");
let days = document.querySelector(".calendar__main");
let infoTask = document.querySelector(".pet__calendar .about__task");

// Variables y arrays
let date = new Date()
let actualMonth = date.getMonth();
let actualYear =  date.getFullYear();

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];


const printCalendar = () => {
    let firstDayOfMonth = new Date(actualYear, actualMonth, 0).getDay(); // Día semana
    let lastDayOfMonth = new Date(actualYear, actualMonth + 1, 0).getDate(); // Último día del mes 28, 30, 31
    let lastDayPreviousMonth = new Date(actualYear, actualMonth, 0).getDate(); // Último día del mes anterior 28, 30, 31
    let firstDayOfNextMonth = new Date(actualYear, actualMonth, lastDayOfMonth).getDay() // Primer día semana mes siguiente - de 0 a 6

    // Pintar mes actual
    dateCalendar.textContent = `${months[actualMonth]} ${actualYear}`;
    
    // Pintar últimos días del mes anterior
    for (let i = firstDayOfMonth; i > 0; i--){
        let day = document.createElement("li");
        day.classList.add("day", "text", "--light")
        day.textContent = `${lastDayPreviousMonth - i +1}`;
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
            actualMonth === new Date().getMonth() &&
            actualYear === new Date().getFullYear()){
                day.classList.add("--today")
        }
    }
    
    // Printar primeros días del mes siguiente
    if (firstDayOfNextMonth > 0){
        for (let i = firstDayOfNextMonth; i < 7; i++){
            let day = document.createElement("li");
            day.classList.add("day", "text", "--light")
            day.textContent = `${i - firstDayOfNextMonth +1}`;
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

    switch(typePet){
        case "perro":
        case "gato":
            endLoop = endLoop + 15;
            break;
        case "ave":
            endLoop = endLoop + 10;
            break;
        case "tortuga":
            endLoop = endLoop + 30;
            break;
    }

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
                                (actualMonth == i.getMonth()) &&
                                (actualYear == i.getFullYear())){
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