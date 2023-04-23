// Almacenar imagen en Firestore Storage
const newImageStorage = (avatar, fileAvatar) => {
    const imageRef = ref(storage, `images/${avatar}`)
    uploadBytes(imageRef, fileAvatar)
    .then((snapshot) => {
        console.log(`Imagen almacenada con éxito`)
    })
    .catch(error => console.log(error))
}