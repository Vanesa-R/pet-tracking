import { doc, setDoc, deleteDoc } from "firebase/firestore";

// Almacenar nuevo usuario en la base de datos
const newUserDDBB = (userId, name, email) => {
    setDoc(doc(db, "users", userId), {
        datos_personales : {
            nombre: name,
            email: email
        }
    })
}

// Almacenar nueva mascota en la base de datos
const newPetDDBB = (idPet, name, typePet, mytask, myTiming, date, userId) => {
    setDoc(doc(db, "pets", idPet), {
        datos : {
            mascota : {
                nombre: name,
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
}


// Actualizar avatar de la mascota en la base de datos
const updatePetDDBB = (idPet, avatar) => {
    setDoc(doc(db, "pets", idPet), {
        datos : {
            mascota : {
                avatar: `images/${avatar}`,
            },
        }
    }, {
        merge: true
    })
}

const deletePetDDBB = (idPet) => {
    deleteDoc(doc(db, "pets", idPet));
}