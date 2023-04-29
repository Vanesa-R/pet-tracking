import{initializeApp}from"firebase/app";import{getFirestore}from"@firebase/firestore";import{getAuth}from"firebase/auth";import{getStorage}from"firebase/storage";const firebaseConfig={apiKey:"AIzaSyBlbGMnS8UVk3ZUrlNDgYsX0q4jLum-aWA",authDomain:"pet-tracking-79e8a.firebaseapp.com",projectId:"pet-tracking-79e8a",storageBucket:"pet-tracking-79e8a.appspot.com",messagingSenderId:"248212976670",appId:"1:248212976670:web:8fb86899b7441a291e2a0f"},app=initializeApp(firebaseConfig),db=getFirestore(app),auth=getAuth(app),storage=getStorage(app);import{ref,uploadBytes}from"firebase/storage";const formPet=async e=>{const t=document.querySelector(".form__add__pet"),a=Array.from(document.querySelectorAll(".form__pet__tab")),n=document.querySelectorAll(".detail__task"),o=document.querySelectorAll("input[name='type__pet']"),s=document.querySelector("input[name='avatar__pet']"),i=document.querySelector(".form__add__pet .drop__zone"),r=document.querySelector(".form__add__pet .text--success");let c="",l="",d="",u="",m=[],p=[],g=[],h=[];const _={namePet:!1,avatarPet:!1,typePet:!1,taskPet:!1};let f=a.findIndex((e=>e.classList.contains("tab--active")));const b=()=>{a.forEach(((e,t)=>{t===f?e.classList.add("tab--active"):e.classList.remove("tab--active")}))};f<0&&(f=0,a[f].classList.add("tab--active"),b()),t.addEventListener("click",((n,s)=>{if(n.target.classList.contains("btn__next")){if(n.preventDefault(),0==f){v(l);for(let e in m)for(let t in g)g[t]===m[e].value&&m[e].click()}1==f&&E(),f++}else if(n.target.classList.contains("btn__prev")){if(n.preventDefault(),1==f){document.querySelectorAll(".checkbox__group").forEach((e=>{e.remove()})),o.forEach((e=>{e.addEventListener("change",(e=>{g.length=0,h.length=0}))}))}if(2==f){document.querySelectorAll(".container__task--checked .group__task").forEach((e=>{e.remove()}))}f--}else if(n.target.classList.contains("btn__submit")){n.preventDefault();let o=document.querySelector("input[name='name__pet']").value,s=new Date;s=s.toLocaleDateString();let c=Math.random().toString(30);newPetDDBB(c,o,l,g,h,s,e),d&&_.avatarPet&&updatePetDDBB(c,u),d&&_.avatarPet&&newImageStorage(u,d),r.textContent="¡Mascota agregada con éxito!",setTimeout((()=>{r.textContent="",t.reset(),g.length=0,h.length=0,i.childNodes.forEach(((e,t)=>t>2&&e.remove())),document.querySelectorAll(".message--error").forEach((e=>e.remove()))}),1600),setTimeout((()=>{a.forEach(((e,t)=>0===t&&e.classList.add("tab--active")))}),1650)}_.typePet=""!==l,_.taskPet=g.length>0,b()})),n.forEach((e=>{e.addEventListener("click",(()=>{!e.hasAttribute("open")&&n.forEach((e=>e.removeAttribute("open")))}))}));const L=(e,t)=>{let a=e[t].replace("de ","").toLowerCase().replace(" ","_");c=document.createElement("div"),c.classList.add("checkbox__group");let n=document.createElement("input");n.classList.add("input"),n.setAttribute("id",`${a}`),n.setAttribute("type","checkbox"),n.setAttribute("name",`${a}`),n.setAttribute("value",`${e[t]}`),m.push(n);let o=document.createElement("label");o.classList.add("label"),o.setAttribute("for",`${a}`),o.textContent=e[t],c.appendChild(n),c.appendChild(o)},v=e=>{let t="",a=[],o=[];switch(e){case"perro":a.push("Baño","Cepillado","Corte de pelo","Corte de uñas","Limpieza de oidos","Limpieza de ojos","Limpieza dental"),o.push("Cama","Comedero","Bebedero","Juguetes","Collar");break;case"gato":a.push("Baño","Cepillado","Corte de pelo","Corte de uñas","Limpieza de oidos","Limpieza de ojos","Limpieza dental"),o.push("Cama","Arenero","Rascador","Comedero","Bebedero","Juguetes","Collar");break;case"ave":a.push("Corte de uñas"),o.push("Jaula","Comedero","Bebedero");break;case"tortuga":a.push("Baño"),o.push("Terrario","Acuario","Comedero","Bebedero")}n.forEach((e=>{if(t=e.firstElementChild.childNodes[1].textContent,"Higiene"===t)for(let t in a)L(a,t),e.appendChild(c);let n=[...new Set(o)];if("Limpieza"===t)for(let t in n)L(n,t),e.appendChild(c)})),m.forEach((e=>{e.addEventListener("click",(t=>{if(e.checked)g.includes(t.target.value)||(g.push(t.target.value),h.push("1_semana"));else if(g.includes(t.target.value)){let e=g.indexOf(t.target.value);g.splice(e,1),h.splice(e,1)}}))}))},E=()=>{for(let e in g){let t=["1 vez a la semana","1 vez al mes","2 veces al mes","1 vez al año","2 veces al año","3 veces al año"],a=document.createElement("div");a.classList.add("group__task");let n=document.createElement("label");n.setAttribute("for",`${g[e]}`),n.textContent=`${g[e]}`;let o=document.createElement("select");o.classList.add("select"),p.push(o);for(let e in t){let a=document.createElement("option");a.setAttribute("value",`${t[e].replace(/vez |veces |al |la |a /g,"").replace(" ","_")}`),a.textContent=`${t[e]}`,o.appendChild(a)}a.appendChild(n),a.appendChild(o),document.querySelector(".container__task--checked").appendChild(a)}p.forEach(((e,t)=>{e.addEventListener("change",(e=>{h.splice(t,1,`${e.target.value}`)}))}))},y=(e,t,a)=>{regExpres.user.test(e.value)?(e.classList.remove("validate--error"),e.nextElementSibling.textContent="",_[t]=!0):(e.classList.add("validate--error"),e.nextElementSibling.textContent=a,_[t]=!1)},C=(e,t,a)=>{/([a-zA-Z0-9\s_\\.\-\(\):])+(.jpeg|.jpg|.png)$/.test(t)?(_.avatarPet=!0,a.textContent=""):(_.avatarPet=!1,a.textContent="El fichero no es válido. Selecciona una imagen.")};s.addEventListener("change",(e=>{d=e.target.files[0],u=d.name,C(0,u,e.target.parentNode.parentNode.nextElementSibling),A(d)})),i.addEventListener("dragover",(e=>{e.preventDefault()})),i.addEventListener("drop",(e=>{e.preventDefault(),d=e.dataTransfer.files[0],u=d.name,C(0,u,document.querySelector(".drop__zone").nextElementSibling),A(d)}));const A=e=>{const t=new FileReader;t.readAsDataURL(e),t.addEventListener("load",(e=>{let t=document.createElement("picture");i.childNodes.forEach(((e,t)=>t>2&&e.remove())),t.classList.add("picture__preview");let a=document.createElement("img");a.classList.add("img__preview"),a.setAttribute("src",e.target.result),t.appendChild(a),i.appendChild(t)}))};t.addEventListener("change",(e=>(e=>{a.forEach((t=>{let a=document.querySelector(`.btn__next[data-next="${f}"]`);switch(f){case 0:"text"===e.target.type&&y(e.target,"namePet","Escribe el nombre de tu mascota"),l="radio"===e.target.type&&e.target.value,_.namePet&&_.typePet?a.removeAttribute("disabled"):a.setAttribute("disabled","disabled");break;case 1:_.taskPet?a.removeAttribute("disabled"):a.setAttribute("disabled","disabled")}}))})(e))),o.forEach((e=>{e.addEventListener("change",(t=>{l=e.value,_.typePet=!0}))}))};import{createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,sendPasswordResetEmail}from"firebase/auth";forms.forEach((e=>{e.addEventListener("submit",(async t=>{if(t.preventDefault(),e.classList.contains("form__register")){let e=document.querySelector("#user__name").value,t=document.querySelector("#email__register"),a=document.querySelector("#password__register"),n=document.querySelector(".btn__submit--register");createUserWithEmailAndPassword(auth,t.value,a.value).then((()=>{const a=auth.currentUser.uid;newUserDDBB(a,e,t.value),closeModal()})).catch((e=>{"auth/email-already-in-use"==e.code?(n.setAttribute("disabled","disabled"),t.nextElementSibling.textContent="Existe un usuario registrado con esta dirección de correo electrónico"):t.nextElementSibling.textContent=""}))}if(e.classList.contains("form__login")){let e=document.querySelector("#email__login"),t=document.querySelector("#password__login"),a=document.querySelector(".btn__submit--login");signInWithEmailAndPassword(auth,e.value,t.value).then((e=>{closeModal()})).catch((n=>{a.setAttribute("disabled","disabled"),"auth/user-not-found"==n.code?e.nextElementSibling.textContent="La dirección de correo introducida no está asociada a ninguna cuenta":e.nextElementSibling.textContent="","auth/wrong-password"==n.code?t.nextElementSibling.textContent="La contraseña es incorrecta":t.nextElementSibling.textContent=""}))}}))}));let btnGoogle=document.querySelector(".btn--google");btnGoogle.addEventListener("click",(()=>{const e=new GoogleAuthProvider;signInWithPopup(auth,e).then((e=>{GoogleAuthProvider.credentialFromResult(e);const t=e.user;newUserDDBB(t.uid,t.displayName,t.email),closeModal()})).catch((e=>{console.log(e.message)}))}));let linkPassword=document.querySelector(".link__password");linkPassword.addEventListener("click",(()=>{let e=document.querySelector("#email__login");const t=getAuth();sendPasswordResetEmail(t,e.value).then((()=>{e.nextElementSibling.textContent=""})).catch((t=>{""===e.value?e.nextElementSibling.textContent="El campo email no puede estar vacío":"auth/user-not-found"==t.code&&(e.nextElementSibling.textContent="La dirección de correo introducida no está asociada a ninguna cuenta")}))}));import{signOut}from"firebase/auth";let btnLogout=document.querySelectorAll(".interaction__logout"),menuMobile=document.querySelector(".menu__primary");btnLogout.forEach((e=>{e.addEventListener("click",(t=>{signOut(auth).then((()=>{e.classList.contains("user__logged--out")&&e.classList.add("btn--enabled"),e.classList.contains("user__logged--in")&&e.classList.remove("btn--enabled"),menuMobile.classList.remove("menu--active"),btnMenuMobile.classList.remove("btn--enabled")})).catch((e=>console.log(e)))}))}));import{query,where,collection,getDocs}from"firebase/firestore";import{getDownloadURL}from"firebase/storage";let sectionEmpty=document.querySelector(".information__pets .section__pets--empty"),section=document.querySelector(".information__pets .section__pets .container__cards"),infoPet=document.querySelector(".pet__info"),deleteInfo=document.querySelector(".pet__info--delete"),icons=document.querySelectorAll(".calendar__header__interaction .icon"),hygiene=["Baño","Cepillado","Corte de pelo","Corte de uñas","Limpieza de oidos","Limpieza de ojos","Limpieza dental"];const showPets=async e=>{const t=query(collection(db,"pets"),where("datos.usuario","==",e)),a=await getDocs(t);if(a.empty)sectionEmpty.classList.replace("section--hidden","section__fade--in");else{section.parentNode.classList.remove("section--hidden"),section.classList.add("section__fade--in");let e=[];a.forEach((t=>{let a=t.data();for(let t in a){let n=document.createElement("article");n.classList.add("article","card"),n.setAttribute("data-pet",`${a[t].mascota.nombre}`),e.push(n),printDataBasicPet(n,a[t].mascota.avatar,a[t].mascota.tipo,a[t].mascota.nombre),section.appendChild(n)}})),printCalendar(),e.forEach((e=>{let t=e.dataset.pet;a.forEach((a=>{let n=a.data();for(let o in n)t===n[o].mascota.nombre&&e.addEventListener("click",(e=>{section.classList.replace("section__fade--in","section--hidden"),infoPet.parentNode.classList.add("section__fade--in"),printDataBasicPet(infoPet,n[o].mascota.avatar,n[o].mascota.tipo,n[o].mascota.nombre),setAvatar(infoPet,a.id,n[o].mascota.avatar),printTaskCalendar(n[o].fecha_alta,n[o].mascota.tipo,n[o].mascota.tareas,n[o].mascota.temporalizacion,hygiene),icons.forEach((e=>{e.addEventListener("click",(t=>{document.querySelectorAll(".day").forEach((e=>e.remove())),infoTask.childNodes.forEach((e=>e.remove())),e.classList.contains("icon__prev")?(currentMonth--,currentMonth<0&&(currentMonth=11,currentYear--)):e.classList.contains("icon__next")&&(currentMonth++,currentMonth>11&&(currentMonth=0,currentYear++)),setTimeout((()=>{printCalendar(),printTaskCalendar(n[o].fecha_alta,n[o].mascota.tipo,n[o].mascota.tareas,n[o].mascota.temporalizacion,hygiene),printTask()}),200)}))})),printTask(),deleteInfo.addEventListener("click",(e=>{n[o].mascota.avatar&&deleteImageStorage(n[o].mascota.avatar),deletePetDDBB(a.id),setTimeout((()=>location.reload()),1e3)}))}))}))}))}},printTask=()=>{let e=document.querySelectorAll(".day");e.forEach((t=>{if(t.addEventListener("click",(a=>{t.classList.contains("--task")&&(t.classList.add("--active"),setTimeout((()=>{for(let e in t.dataset){let a=document.createElement("li");a.classList.add("text",""+(hygiene.includes(`${t.dataset[e]}`)?"--hygiene__task":"--cleaning__task")),a.textContent=`${t.dataset[e]}`,infoTask.appendChild(a)}}),100),e.forEach((e=>{if(e.textContent!=a.target.textContent&&(e.classList.remove("--active"),1==infoTask.hasChildNodes())){infoTask.childNodes.forEach((e=>e.remove()))}})))})),t.classList.contains("--today"))if(t.classList.contains("--task"))for(let e in t.dataset){let a=document.createElement("li");a.classList.add("text",""+(hygiene.includes(`${t.dataset[e]}`)?"--hygiene__task":"--cleaning__task")),a.textContent=`${t.dataset[e]}`,infoTask.appendChild(a)}else if(0==infoTask.hasChildNodes()){let e=document.createElement("span");e.classList.add("text"),e.textContent="No hay tareas para hoy",infoTask.appendChild(e)}}))},printDataBasicPet=(e,t,a,n)=>{let o=document.createElement("picture");o.classList.add("picture");let s=document.createElement("img");if(s.classList.add("card__img"),t){newImageStorage(s,t);const e=ref(storage,`${t}`);getDownloadURL(e).then((e=>{s.setAttribute("src",`${e}`)})).catch((e=>console.log(e)))}else s.setAttribute("src",`assets/images/avatars/avatar-${a}.png`);let i=document.createElement("h3");i.classList.add("card__title","title__body--bold"),i.textContent=n,o.appendChild(s),e.appendChild(o),e.appendChild(i)},setAvatar=(e,t,a)=>{if(!a){let a=document.createElement("label"),n="set__avatar__pet";a.setAttribute("for",`${n}`);let o=document.createElement("img");o.classList.add("icon"),o.setAttribute("src","assets/icons/icon-upload-img.png"),o.setAttribute("alt","Cambiar imagen");let s=document.createElement("input");s.setAttribute("type","file"),s.setAttribute("id",`${n}`),s.setAttribute("name",`${n}`),a.appendChild(o),a.appendChild(s),e.appendChild(a),s.addEventListener("change",(e=>{let n=e.target.files[0],o=n.name;updatePetDDBB(t,o),newImageStorage(o,n);const s=new FileReader;s.readAsDataURL(n),s.addEventListener("load",(e=>{const t=new FileReader;t.readAsDataURL(n),t.addEventListener("load",(e=>{let t=document.createElement("picture");t.classList.add("picture");let a=document.createElement("img");a.classList.add("card__img"),a.setAttribute("src",e.target.result),t.appendChild(a),infoPet.insertBefore(t,document.querySelector(".pet__info .card__title"))})),infoPet.firstChild.remove(),a.remove()}))}))}};import{onAuthStateChanged}from"firebase/auth";import{getDoc}from"firebase/firestore";let btnInteraction=document.querySelectorAll(".header .interaction .btn"),btnMenuMobile=document.querySelector(".icon__menu"),greeting=document.querySelector(".greeting"),informationAppLoggedOut=document.querySelector(".information__app"),informationAppLoggedIn=document.querySelector(".information__pets"),page51=document.querySelectorAll(".page-51"),warningPage51=document.querySelectorAll(".private__area__warning"),linksModal=document.querySelectorAll(".private__area__warning .link");onAuthStateChanged(auth,(async e=>{if(e){const t=doc(db,"users",e.uid),a=await getDoc(t);if(a.exists()){let e=a.data();for(let t in e)greeting.textContent=e[t].nombre&&`Hola, ${e[t].nombre}`}btnInteraction.forEach((e=>{e.classList.contains("user__logged--out")&&e.classList.remove("btn--enabled"),e.classList.contains("user__logged--in")&&(window.outerWidth>=1024?(e.classList.add("btn--enabled"),btnMenuMobile.classList.remove("btn--enabled")):btnMenuMobile.classList.add("btn--enabled"),window.addEventListener("resize",(()=>{window.innerWidth>=1024?e.classList.add("btn--enabled"):e.classList.remove("btn--enabled")})))})),location.href.includes("mascota")||(informationAppLoggedOut.classList.remove("section__fade--in"),informationAppLoggedIn.classList.replace("section--hidden","section__fade--in"),showPets(e.uid)),location.pathname.includes("mascota")&&formPet(e.uid),page51.forEach((e=>{e.classList.remove("section--hidden")})),warningPage51.forEach((e=>{e.classList.add("section--hidden")})),menu.classList.remove("section--hidden"),showIconMenu()}else greeting.textContent="",rotateImages(),btnInteraction.forEach((e=>{e.classList.contains("user__logged--out")&&e.classList.add("btn--enabled"),e.classList.contains("user__logged--in")&&e.classList.remove("btn--enabled"),location.href.includes("mascota")||(informationAppLoggedOut.classList.add("section__fade--in"),informationAppLoggedIn.classList.replace("section__fade--in","section--hidden")),page51.forEach((t=>{t.classList.add("section--hidden"),openLoginModalAutomatically(e),openModalClick(e)}))})),menu.classList.add("section--hidden"),warningPage51.forEach((e=>{e.classList.remove("section--hidden")}))}));const openLoginModalAutomatically=e=>{setTimeout((()=>{e.classList.contains("interaction__login")&&e.click()}),2600)},openModalClick=e=>{linksModal.forEach((t=>{t.addEventListener("click",(()=>{t.classList.contains("link__login")&&e.classList.contains("interaction__login")&&e.click(),t.classList.contains("link__register")&&e.classList.contains("interaction__register")&&e.click()}))}))};import{doc,setDoc,deleteDoc}from"firebase/firestore";const newUserDDBB=(e,t,a)=>{setDoc(doc(db,"users",e),{datos_personales:{nombre:t,email:a}})},newPetDDBB=(e,t,a,n,o,s,i)=>{setDoc(doc(db,"pets",e),{datos:{mascota:{nombre:t,tipo:a,tareas:n,temporalizacion:o},fecha_alta:s,usuario:i}},{merge:!0})},updatePetDDBB=(e,t)=>{setDoc(doc(db,"pets",e),{datos:{mascota:{avatar:`images/${t}`}}},{merge:!0})},deletePetDDBB=e=>{deleteDoc(doc(db,"pets",e))};import{deleteObject}from"firebase/storage";const newImageStorage=(e,t)=>{const a=ref(storage,`images/${e}`);uploadBytes(a,t).then((e=>{console.log("Imagen almacenada con éxito")})).catch((e=>console.log(e)))},deleteImageStorage=e=>{const t=ref(storage,`${e}`);deleteObject(t).then((()=>console.log("Imagen eliminada"))).catch((e=>console.log(e)))};