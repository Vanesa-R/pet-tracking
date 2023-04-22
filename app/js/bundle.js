import{initializeApp}from"firebase/app";import{getFirestore}from"@firebase/firestore";import{getAuth}from"firebase/auth";import{getStorage}from"firebase/storage";const firebaseConfig={apiKey:"AIzaSyBlbGMnS8UVk3ZUrlNDgYsX0q4jLum-aWA",authDomain:"pet-tracking-79e8a.firebaseapp.com",projectId:"pet-tracking-79e8a",storageBucket:"pet-tracking-79e8a.appspot.com",messagingSenderId:"248212976670",appId:"1:248212976670:web:8fb86899b7441a291e2a0f"},app=initializeApp(firebaseConfig),db=getFirestore(app),auth=getAuth(app),storage=getStorage(app);import{ref,uploadBytes}from"firebase/storage";const formPet=async e=>{const t=document.querySelector(".form__add__pet"),a=Array.from(document.querySelectorAll(".form__pet__tab")),n=document.querySelectorAll(".detail__task"),o=document.querySelectorAll("input[name='type__pet']"),s=document.querySelector("input[name='avatar__pet']"),i=(document.querySelector(".control__tab .btn__submit--pet"),document.querySelector(".form__add__pet .text--success"));let r="",c="",l="",d="",u=[],m=[],p=[],g=[];const h={namePet:!1,typePet:!1,taskPet:!1};let _=a.findIndex((e=>e.classList.contains("tab--active")));const f=()=>{a.forEach(((e,t)=>{t===_?e.classList.add("tab--active"):e.classList.remove("tab--active")}))};_<0&&(_=0,a[_].classList.add("tab--active"),f()),t.addEventListener("click",((n,s)=>{if(n.target.classList.contains("btn__next")){if(n.preventDefault(),0==_){L(c);for(let e in u)for(let t in p)p[t]===u[e].value&&u[e].click()}1==_&&v(),_++}else if(n.target.classList.contains("btn__prev")){if(n.preventDefault(),1==_){document.querySelectorAll(".checkbox__group").forEach((e=>{e.remove()})),o.forEach((e=>{e.addEventListener("change",(e=>{p.length=0,g.length=0}))}))}if(2==_){document.querySelectorAll(".container__task--checked .group__task").forEach((e=>{e.remove()}))}_--}else if(n.target.classList.contains("btn__submit")){n.preventDefault();let o=document.querySelector("input[name='name__pet']").value,s=new Date;s=s.toLocaleDateString();let r=Math.random().toString(30);setDoc(doc(db,"pets",r),{datos:{mascota:{nombre:o,avatar:`images/${d}`,tipo:c,tareas:p,temporalizacion:g},fecha_alta:s,usuario:e}},{merge:!0});const u=ref(storage,`images/${d}`);uploadBytes(u,l).then((e=>{console.log("Imagen almacenada con éxito")})).catch((e=>console.log(e))),i.textContent="¡Mascota agregada con éxito!",setTimeout((()=>{i.textContent="",t.reset(),p.length=0,g.length=0}),1600),setTimeout((()=>{a.forEach(((e,t)=>0===t&&e.classList.add("tab--active")))}),1650)}h.typePet=""!==c,h.taskPet=p.length>0,f()})),n.forEach((e=>{e.addEventListener("click",(()=>{!e.hasAttribute("open")&&n.forEach((e=>e.removeAttribute("open")))}))}));const b=(e,t)=>{let a=e[t].replace("de ","").toLowerCase().replace(" ","_");r=document.createElement("div"),r.classList.add("checkbox__group");let n=document.createElement("input");n.classList.add("input"),n.setAttribute("id",`${a}`),n.setAttribute("type","checkbox"),n.setAttribute("name",`${a}`),n.setAttribute("value",`${e[t]}`),u.push(n);let o=document.createElement("label");o.classList.add("label"),o.setAttribute("for",`${a}`),o.textContent=e[t],r.appendChild(n),r.appendChild(o)},L=e=>{let t="",a=[],o=[];switch(e){case"perro":a.push("Baño","Cepillado","Corte de pelo","Corte de uñas","Limpieza de oidos","Limpieza de ojos","Limpieza dental"),o.push("Cama","Comedero","Bebedero","Juguetes","Collar");break;case"gato":a.push("Baño","Cepillado","Corte de pelo","Corte de uñas","Limpieza de oidos","Limpieza de ojos","Limpieza dental"),o.push("Cama","Arenero","Rascador","Comedero","Bebedero","Juguetes","Collar");break;case"ave":a.push("Corte de uñas"),o.push("Jaula","Comedero","Bebedero");break;case"tortuga":a.push("Baño"),o.push("Terrario","Acuario","Comedero","Bebedero")}n.forEach((e=>{if(t=e.firstElementChild.childNodes[1].textContent,"Higiene"===t)for(let t in a)b(a,t),e.appendChild(r);let n=[...new Set(o)];if("Limpieza"===t)for(let t in n)b(n,t),e.appendChild(r)})),u.forEach((e=>{e.addEventListener("click",(t=>{if(e.checked)p.includes(t.target.value)||(p.push(t.target.value),g.push("1_semana"));else if(p.includes(t.target.value)){let e=p.indexOf(t.target.value);p.splice(e,1),g.splice(e,1)}}))}))},v=()=>{for(let e in p){let t=["1 vez a la semana","1 vez al mes","2 veces al mes","1 vez al año","2 veces al año","3 veces al año"],a=document.createElement("div");a.classList.add("group__task");let n=document.createElement("label");n.setAttribute("for",`${p[e]}`),n.textContent=`${p[e]}`;let o=document.createElement("select");o.classList.add("select"),m.push(o);for(let e in t){let a=document.createElement("option");a.setAttribute("value",`${t[e].replace(/vez |veces |al |la |a /g,"").replace(" ","_")}`),a.textContent=`${t[e]}`,o.appendChild(a)}a.appendChild(n),a.appendChild(o),document.querySelector(".container__task--checked").appendChild(a)}m.forEach(((e,t)=>{e.addEventListener("change",(e=>{g.splice(t,1,`${e.target.value}`)}))}))},E=(e,t,a)=>{regExpres.user.test(e.value)?(e.classList.remove("validate--error"),e.nextElementSibling.textContent="",h[t]=!0):(e.classList.add("validate--error"),e.nextElementSibling.textContent=a,h[t]=!1)};s.addEventListener("change",(e=>{l=e.target.files[0],d=l.name})),t.addEventListener("change",(e=>(e=>{a.forEach((t=>{let a=document.querySelector(`.btn__next[data-next="${_}"]`);switch(_){case 0:"text"===e.target.type&&E(e.target,"namePet","Escribe el nombre de tu mascota"),c="radio"===e.target.type&&e.target.value,h.namePet&&h.typePet?a.removeAttribute("disabled"):a.setAttribute("disabled","disabled");break;case 1:h.taskPet?a.removeAttribute("disabled"):a.setAttribute("disabled","disabled")}}))})(e))),o.forEach((e=>{e.addEventListener("change",(t=>{c=e.value,h.typePet=!0}))}))};import{async}from"@firebase/util";import{createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,sendPasswordResetEmail}from"firebase/auth";import{doc,setDoc}from"firebase/firestore";forms.forEach((e=>{e.addEventListener("submit",(async t=>{if(t.preventDefault(),e.classList.contains("form__register")){let e=document.querySelector("#user__name").value,t=document.querySelector("#email__register"),a=document.querySelector("#password__register"),n=document.querySelector(".btn__submit--register");createUserWithEmailAndPassword(auth,t.value,a.value).then((()=>{const a=auth.currentUser.uid;newUserDDBB(a,e,t.value),closeModal()})).catch((e=>{"auth/email-already-in-use"==e.code?(n.setAttribute("disabled","disabled"),t.nextElementSibling.textContent="Existe un usuario registrado con esta dirección de correo electrónico"):t.nextElementSibling.textContent=""}))}if(e.classList.contains("form__login")){let e=document.querySelector("#email__login"),t=document.querySelector("#password__login"),a=document.querySelector(".btn__submit--login");signInWithEmailAndPassword(auth,e.value,t.value).then((e=>{closeModal()})).catch((n=>{a.setAttribute("disabled","disabled"),"auth/user-not-found"==n.code?e.nextElementSibling.textContent="La dirección de correo introducida no está asociada a ninguna cuenta":e.nextElementSibling.textContent="","auth/wrong-password"==n.code?t.nextElementSibling.textContent="La contraseña es incorrecta":t.nextElementSibling.textContent=""}))}}))}));let btnGoogle=document.querySelector(".btn--google");btnGoogle.addEventListener("click",(()=>{const e=new GoogleAuthProvider;signInWithPopup(auth,e).then((e=>{GoogleAuthProvider.credentialFromResult(e);const t=e.user;newUserDDBB(t.uid,t.displayName,t.email),closeModal()})).catch((e=>{console.log(e.message)}))}));let linkPassword=document.querySelector(".link__password");linkPassword.addEventListener("click",(()=>{let e=document.querySelector("#email__login");const t=getAuth();sendPasswordResetEmail(t,e.value).then((()=>{e.nextElementSibling.textContent=""})).catch((t=>{""===e.value?e.nextElementSibling.textContent="El campo email no puede estar vacío":"auth/user-not-found"==t.code&&(e.nextElementSibling.textContent="La dirección de correo introducida no está asociada a ninguna cuenta")}))}));const newUserDDBB=(e,t,a)=>{setDoc(doc(db,"users",e),{datos_personales:{nombre:t,email:a}})};import{signOut}from"firebase/auth";let btnLogout=document.querySelectorAll(".interaction__logout"),menuMobile=document.querySelector(".menu__primary");btnLogout.forEach((e=>{e.addEventListener("click",(t=>{signOut(auth).then((t=>{e.classList.contains("user__logged--out")&&e.classList.add("btn--enabled"),e.classList.contains("user__logged--in")&&e.classList.remove("btn--enabled"),menuMobile.classList.remove("menu--active"),btnMenuMobile.classList.remove("btn--enabled")})).catch((e=>{console.log(e)}))}))}));import{query,where,collection,getDocs}from"firebase/firestore";import{getDownloadURL}from"firebase/storage";let sectionEmpty=document.querySelector(".information__pets .section__pets--empty"),section=document.querySelector(".information__pets .section__pets .container__cards"),infoPet=document.querySelector(".pet__info"),icons=document.querySelectorAll(".calendar__header__interaction .icon"),hygiene=["Baño","Cepillado","Corte de pelo","Corte de uñas","Limpieza de oidos","Limpieza de ojos","Limpieza dental"];const showPets=async e=>{const t=query(collection(db,"pets"),where("datos.usuario","==",e)),a=await getDocs(t);if(a.empty)sectionEmpty.classList.add("section__fade--in");else{section.classList.add("section__fade--in");let e=[];a.forEach((t=>{let a=t.data();for(let t in a){let n=document.createElement("article");n.classList.add("article","card"),n.setAttribute("data-pet",`${a[t].mascota.nombre}`),e.push(n);let o=document.createElement("img");if(o.classList.add("card__img"),a[t].mascota.avatar){const e=ref(storage,`${a[t].mascota.avatar}`);getDownloadURL(e).then((e=>{o.setAttribute("src",`${e}`)})).catch((e=>console.log(e)))}else o.setAttribute("src",`/dist/assets/images/avatars/avatar-${a[t].mascota.tipo}.png`);let s=document.createElement("h3");s.classList.add("card__title","title__body--bold"),s.textContent=a[t].mascota.nombre,n.appendChild(o),n.appendChild(s),section.appendChild(n)}})),printCalendar(),e.forEach((e=>{let t=e.dataset.pet;a.forEach((a=>{let n=a.data();for(let a in n)t===n[a].mascota.nombre&&e.addEventListener("click",(e=>{section.classList.replace("section__fade--in","section--hidden");let t=document.createElement("img");if(t.classList.add("card__img"),n[a].mascota.avatar){const e=ref(storage,`${n[a].mascota.avatar}`);getDownloadURL(e).then((e=>{t.setAttribute("src",`${e}`)})).catch((e=>console.log(e)))}else t.setAttribute("src",`/dist/assets/images/avatars/avatar-${n[a].mascota.tipo}.png`);let o=document.createElement("h3");o.classList.add("card__title","title__body--bold"),o.textContent=n[a].mascota.nombre,printTaskCalendar(n[a].fecha_alta,n[a].mascota.tipo,n[a].mascota.tareas,n[a].mascota.temporalizacion,hygiene),infoPet.parentNode.classList.add("section__fade--in"),infoPet.appendChild(t),infoPet.appendChild(o),icons.forEach((e=>{e.addEventListener("click",(t=>{document.querySelectorAll(".day").forEach((e=>e.remove())),e.classList.contains("icon__prev")?(actualMonth--,actualMonth<0&&(actualMonth=11,actualYear--)):e.classList.contains("icon__next")&&(actualMonth++,actualMonth>11&&(actualMonth=0,actualYear++)),setTimeout((()=>{printCalendar(),printTaskCalendar(n[a].fecha_alta,n[a].mascota.tipo,n[a].mascota.tareas,n[a].mascota.temporalizacion,hygiene),showTask()}),100)}))})),showTask()}))}))}))}},showTask=()=>{let e=document.querySelectorAll(".day");e.forEach((t=>{if(t.addEventListener("click",(a=>{t.classList.contains("--task")&&(t.classList.add("--active"),setTimeout((()=>{for(let e in t.dataset){let a=document.createElement("li");a.classList.add("text",""+(hygiene.includes(`${t.dataset[e]}`)?"--hygiene__task":"--cleaning__task")),a.textContent=`${t.dataset[e]}`,infoTask.appendChild(a)}}),150),e.forEach((e=>{if(e.textContent!=a.target.textContent&&(e.classList.remove("--active"),1==infoTask.hasChildNodes())){infoTask.childNodes.forEach((e=>e.remove()))}})))})),t.classList.contains("--today"))if(t.classList.contains("--task"))for(let e in t.dataset){let a=document.createElement("li");a.classList.add("text",""+(hygiene.includes(`${t.dataset[e]}`)?"--hygiene__task":"--cleaning__task")),a.textContent=`${t.dataset[e]}`,infoTask.appendChild(a)}else{let e=document.createElement("span");e.classList.add("text"),e.textContent="No hay tareas para hoy",infoTask.appendChild(e)}}))};import{onAuthStateChanged}from"firebase/auth";let btnInteraction=document.querySelectorAll(".header .interaction .btn"),btnMenuMobile=document.querySelector(".icon__menu"),informationAppLoggedOut=document.querySelector(".information__app"),informationAppLoggedIn=document.querySelector(".information__pets"),page51=document.querySelectorAll(".page-51"),warningPage51=document.querySelectorAll(".private__area__warning"),linksModal=document.querySelectorAll(".private__area__warning .link");onAuthStateChanged(auth,(e=>{e?(btnInteraction.forEach((e=>{e.classList.contains("user__logged--out")&&e.classList.remove("btn--enabled"),e.classList.contains("user__logged--in")&&(window.outerWidth>=768?(e.classList.add("btn--enabled"),btnMenuMobile.classList.remove("btn--enabled")):btnMenuMobile.classList.add("btn--enabled"))})),location.pathname.includes("index")&&(informationAppLoggedOut.classList.remove("section__fade--in"),informationAppLoggedIn.classList.add("section__fade--in"),showPets(e.uid)),location.pathname.includes("mascota")&&formPet(e.uid),page51.forEach((e=>{e.classList.remove("section--hidden")})),warningPage51.forEach((e=>{e.classList.add("section--hidden")})),menu.classList.remove("section--hidden"),showIconMenu()):(btnInteraction.forEach((e=>{e.classList.contains("user__logged--out")&&e.classList.add("btn--enabled"),e.classList.contains("user__logged--in")&&e.classList.remove("btn--enabled"),location.pathname.includes("index")&&(informationAppLoggedOut.classList.add("section__fade--in"),informationAppLoggedIn.classList.remove("section__fade--in")),page51.forEach((t=>{t.classList.add("section--hidden"),openLoginModalAutomatically(e),openModalClick(e)}))})),menu.classList.add("section--hidden"),warningPage51.forEach((e=>{e.classList.remove("section--hidden")})))}));const openLoginModalAutomatically=e=>{setTimeout((()=>{e.classList.contains("interaction__login")&&e.click()}),2600)},openModalClick=e=>{linksModal.forEach((t=>{t.addEventListener("click",(()=>{t.classList.contains("link__login")&&e.classList.contains("interaction__login")&&e.click(),t.classList.contains("link__register")&&e.classList.contains("interaction__register")&&e.click()}))}))};