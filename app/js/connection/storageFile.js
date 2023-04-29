import { deleteObject } from "firebase/storage"

// Almacenar imagen en Firestore Storage
const newImageStorage = (avatar, fileAvatar) => {
    const imageRef = ref(storage, `images/${avatar}`)
    uploadBytes(imageRef, fileAvatar)
    .then((snapshot) => {
        console.log(`Imagen almacenada con éxito`)
    })
    .catch(error => console.log(error))
}

// Eliminar imagen de Firestore Storage
const deleteImageStorage = (avatar) => {
    const desertRef = ref(storage, `${avatar}`);
    deleteObject(desertRef)
    .then(() => console.log("Imagen eliminada"))
    .catch(error => console.log(error))

}