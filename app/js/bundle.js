import{deleteUser,reauthenticateWithCredential,reauthenticateWithPopup,EmailAuthProvider}from"firebase/auth";const linkDelete=document.querySelector(".delete__count"),modalReauthenticate=document.querySelector(".modal__reauthenticate");let btnconfirmDelete=document.querySelector(".form__reauthenticate .btn__submit--reauthenticate"),stepsReauthenticate=document.querySelectorAll(".form__reauthenticate .form__reauthenticate__step");const deleteUserAccount=e=>{linkDelete.addEventListener("click",(async()=>{menu.classList.contains("menu--active")&&menu.classList.remove("menu--active"),main.classList.contains("main--fadeOut")&&main.classList.remove("main--fadeOut");const t=query(collection(db,"pets"),where("datos.usuario","==",e.uid)),a=await getDocs(t);a.empty||a.forEach((e=>{let t=e.data();for(let a in t)t[a].mascota.avatar&&deleteImageStorage(t[a].mascota.avatar),deletePetDDBB(e.id)})),setTimeout((()=>{for(let t in e.providerData)if("google.com"==e.providerData[t].providerId){const e=new GoogleAuthProvider;reauthenticateWithPopup(auth.currentUser,e).then((e=>{const t=e.user;GoogleAuthProvider.credentialFromResult(e);deleteUser(t),deleteUserDDBB(t.uid),setTimeout((()=>{modalLogin.classList.replace("modal__container","modal__container--active"),modalReauthenticate.classList.add("modal--active"),stepsReauthenticate.forEach(((e,t)=>1==t?e.classList.add("step--show"):e.classList.remove("step--show")))}),500),setTimeout((()=>{location.pathname.includes("mascota")||modalLogin.classList.replace("modal__container--active","modal__container"),modalReauthenticate.classList.remove("modal--active")}),2500)})).catch((e=>console.log(e.message)))}else if("password"==e.providerData[t].providerId){modalLogin.classList.replace("modal__container","modal__container--active"),modalReauthenticate.classList.add("modal--active");let t=document.querySelector("#password__reauthenticate");btnconfirmDelete.addEventListener("click",(()=>{const a=EmailAuthProvider.credential(e.email,t.value);reauthenticateWithCredential(e,a).then((()=>{deleteUser(e),deleteUserDDBB(e.uid),setTimeout((()=>{stepsReauthenticate.forEach(((e,t)=>1==t?e.classList.add("step--show"):e.classList.remove("step--show")))}),150),setTimeout((()=>{stepsReauthenticate.forEach(((e,t)=>0==t?e.classList.add("step--show"):e.classList.remove("step--show"))),location.pathname.includes("mascota")||modalLogin.classList.replace("modal__container--active","modal__container"),modalReauthenticate.classList.remove("modal--active")}),3e3)})).catch((e=>passwordWrong(e,t)))}))}}),600)}))};import{initializeApp}from"firebase/app";import{getFirestore}from"@firebase/firestore";import{getAuth}from"firebase/auth";import{getStorage}from"firebase/storage";const firebaseConfig={apiKey:"AIzaSyBlbGMnS8UVk3ZUrlNDgYsX0q4jLum-aWA",authDomain:"pet-tracking-79e8a.firebaseapp.com",projectId:"pet-tracking-79e8a",storageBucket:"pet-tracking-79e8a.appspot.com",messagingSenderId:"248212976670",appId:"1:248212976670:web:8fb86899b7441a291e2a0f"},app=initializeApp(firebaseConfig),db=getFirestore(app),auth=getAuth(app),storage=getStorage(app),formPet=async e=>{const t=document.querySelector(".form__add__pet"),a=Array.from(document.querySelectorAll(".form__pet__tab")),o=document.querySelectorAll(".detail__task"),s=document.querySelectorAll("input[name='type__pet']"),n=document.querySelector("input[name='avatar__pet']"),i=document.querySelector(".form__add__pet .drop__zone"),r=document.querySelector(".form__add__pet .text--success");let c="",l="",d="",u="",m=[],p=[],h=[],g=[];const _={namePet:!1,avatarPet:!1,typePet:!1,taskPet:!1};let f=a.findIndex((e=>e.classList.contains("tab--active")));const b=()=>{a.forEach(((e,t)=>{t===f?e.classList.add("tab--active"):e.classList.remove("tab--active")}))},L=()=>{f=0,a[f].classList.add("tab--active"),b()};f<0&&L(),t.addEventListener("click",((a,o)=>{if(a.target.classList.contains("btn__next")){if(a.preventDefault(),0==f){E(l);for(let e in m)for(let t in h)h[t]===m[e].value&&m[e].click()}1==f&&y(),f++}else if(a.target.classList.contains("btn__prev")){if(a.preventDefault(),1==f){document.querySelectorAll(".checkbox__group").forEach((e=>{e.remove()})),s.forEach((e=>{e.addEventListener("change",(e=>{h.length=0,g.length=0}))}))}if(2==f){document.querySelectorAll(".container__task--checked .group__task").forEach((e=>{e.remove()}))}f--}else if(a.target.classList.contains("btn__submit")){a.preventDefault();let o=document.querySelector("input[name='name__pet']").value,s=new Date;s=s.toLocaleDateString();let n=Math.random().toString(30);newPetDDBB(n,o,l,h,g,s,e),d&&_.avatarPet&&updatePetDDBB(n,u),d&&_.avatarPet&&newImageStorage(u,d),r.classList.add("text--show"),setTimeout((()=>{r.classList.remove("text--show"),h.length=0,g.length=0,document.querySelectorAll(".message--error").forEach((e=>e.textContent="")),t.reset();for(let e in _)_[e]=!1;document.querySelectorAll(".btn__next").forEach((e=>e.setAttribute("disabled","disabled"))),document.querySelectorAll(".checkbox__group").forEach((e=>e.remove())),i.childNodes.forEach(((e,t)=>t>2&&e.remove()))}),2800),setTimeout((()=>{L()}),3e3)}_.typePet=""!==l,_.taskPet=h.length>0,b()})),o.forEach((e=>{e.addEventListener("click",(()=>{!e.hasAttribute("open")&&o.forEach((e=>e.removeAttribute("open")))}))}));const v=(e,t)=>{let a=e[t].replace("de ","").toLowerCase().replace(" ","_");c=document.createElement("div"),c.classList.add("checkbox__group");let o=document.createElement("input");o.classList.add("input"),o.setAttribute("id",`${a}`),o.setAttribute("type","checkbox"),o.setAttribute("name",`${a}`),o.setAttribute("value",`${e[t]}`),m.push(o);let s=document.createElement("label");s.classList.add("label"),s.setAttribute("for",`${a}`),s.textContent=e[t],c.appendChild(o),c.appendChild(s)},E=e=>{let t="",a=[],s=[];switch(e){case"perro":a.push("Baño","Cepillado","Corte de pelo","Corte de uñas","Limpieza de oidos","Limpieza de ojos","Limpieza dental"),s.push("Cama","Comedero","Bebedero","Juguetes","Collar");break;case"gato":a.push("Baño","Cepillado","Corte de pelo","Corte de uñas","Limpieza de oidos","Limpieza de ojos","Limpieza dental"),s.push("Cama","Arenero","Rascador","Comedero","Bebedero","Juguetes","Collar");break;case"ave":a.push("Corte de uñas"),s.push("Jaula","Comedero","Bebedero");break;case"tortuga":a.push("Baño"),s.push("Terrario","Acuario","Comedero","Bebedero");break;case"pez":s.push("Acuario","Pecera");break;case"conejo":case"cobaya":a.push("Cepillado","Corte de pelo","Corte de uñas","Limpieza de oidos","Limpieza de ojos"),s.push("Jaula","Cama","Comedero","Bebedero","Juguetes");break;case"hamster":a.push("Cepillado"),s.push("Jaula","Casa","Comedero","Bebedero","Rueda ejercicio","Juguetes")}o.forEach((e=>{if(t=e.firstElementChild.childNodes[1].textContent,"Higiene"===t){for(let t in a)v(a,t),e.appendChild(c);0==a.length&&e.remove()}let o=[...new Set(s)];if("Limpieza"===t)for(let t in o)v(o,t),e.appendChild(c)})),m.forEach((e=>{e.addEventListener("click",(t=>{if(e.checked)h.includes(t.target.value)||(h.push(t.target.value),g.push("1_semana"));else if(h.includes(t.target.value)){let e=h.indexOf(t.target.value);h.splice(e,1),g.splice(e,1)}}))}))},y=()=>{for(let e in h){let t=["1 vez a la semana","1 vez al mes","2 veces al mes","1 vez al año","2 veces al año","3 veces al año"],a=document.createElement("div");a.classList.add("group__task");let o=document.createElement("label");o.setAttribute("for",`${h[e]}`),o.textContent=`${h[e]}`;let s=document.createElement("select");s.classList.add("select"),p.push(s);for(let e in t){let a=document.createElement("option");a.setAttribute("value",`${t[e].replace(/vez |veces |al |la |a /g,"").replace(" ","_")}`),a.textContent=`${t[e]}`,s.appendChild(a)}a.appendChild(o),a.appendChild(s),document.querySelector(".container__task--checked").appendChild(a)}p.forEach(((e,t)=>{e.addEventListener("change",(e=>{g.splice(t,1,`${e.target.value}`)}))}))},C=(e,t,a)=>{regExpres.user.test(e.value)?(e.classList.remove("validate--error"),e.nextElementSibling.textContent="",_[t]=!0):(e.classList.add("validate--error"),e.nextElementSibling.textContent=a,_[t]=!1)},A=(e,t,a)=>{/([a-zA-Z0-9\s_\\.\-\(\):])+(.jpeg|.jpg|.png|.webp)$/.test(t)?(_.avatarPet=!0,a.textContent=""):(_.avatarPet=!1,a.textContent="El fichero no es válido. Selecciona una imagen.")};n.addEventListener("change",(e=>{d=e.target.files[0],u=d.name,A(0,u,e.target.parentNode.parentNode.nextElementSibling),S(d)})),i.addEventListener("dragover",(e=>{e.preventDefault()})),i.addEventListener("drop",(e=>{e.preventDefault(),d=e.dataTransfer.files[0],u=d.name,A(0,u,document.querySelector(".drop__zone").nextElementSibling),S(d)}));const S=e=>{const t=new FileReader;t.readAsDataURL(e),t.addEventListener("load",(e=>{let t=document.createElement("picture");i.childNodes.forEach(((e,t)=>t>2&&e.remove())),t.classList.add("picture__preview");let a=document.createElement("img");a.classList.add("img__preview"),a.setAttribute("src",e.target.result),t.appendChild(a),i.appendChild(t)}))};t.addEventListener("change",(e=>(e=>{a.forEach((t=>{let a=document.querySelector(`.btn__next[data-next="${f}"]`);switch(f){case 0:"text"===e.target.type&&C(e.target,"namePet","Escribe el nombre de tu mascota"),_.namePet&&_.typePet?a.removeAttribute("disabled"):a.setAttribute("disabled","disabled");break;case 1:_.taskPet?a.removeAttribute("disabled"):a.setAttribute("disabled","disabled")}}))})(e))),s.forEach((e=>{e.addEventListener("change",(t=>{l=e.value,_.typePet=!0}))}))};import{createUserWithEmailAndPassword,signInWithEmailAndPassword,sendPasswordResetEmail,GoogleAuthProvider,signInWithPopup}from"firebase/auth";forms.forEach((e=>{e.addEventListener("submit",(async t=>{if(t.preventDefault(),e.classList.contains("form__register")){let e=document.querySelector("#user__name").value,t=document.querySelector("#email__register"),a=document.querySelector("#password__register"),o=document.querySelector(".btn__submit--register");createUserWithEmailAndPassword(auth,t.value,a.value).then((()=>{const a=auth.currentUser.uid;newUserDDBB(a,e,t.value),setTimeout((()=>closeModal()),1e3)})).catch((e=>{"auth/email-already-in-use"==e.code?(o.setAttribute("disabled","disabled"),t.nextElementSibling.textContent="Existe un usuario registrado con esta dirección de correo electrónico"):t.nextElementSibling.textContent=""}))}if(e.classList.contains("form__login")){let e=document.querySelector("#email__login"),t=document.querySelector("#password__login"),a=document.querySelector(".btn__submit--login");signInWithEmailAndPassword(auth,e.value,t.value).then((e=>{closeModal()})).catch((o=>{a.setAttribute("disabled","disabled"),userNotFound(o,e),passwordWrong(o,t)}))}}))}));let btnGoogle=document.querySelector(".btn--google");btnGoogle.addEventListener("click",(()=>{const e=new GoogleAuthProvider;signInWithPopup(auth,e).then((e=>{GoogleAuthProvider.credentialFromResult(e);const t=e.user;newUserDDBB(t.uid,t.displayName,t.email),setTimeout((()=>closeModal()),1e3)})).catch((e=>console.log(e.message)))}));let linkPassword=document.querySelector(".link__password");linkPassword.addEventListener("click",(()=>{let e=document.querySelector("#email__recovery"),t=document.querySelector(".btn__submit--resetPassword"),a=document.querySelectorAll(".form__reset__step");modalLogin.firstChild.classList.remove("modal--active"),modalLogin.firstChild.nextSibling.classList.add("modal--active"),""!=e&&t.addEventListener("click",(o=>{o.preventDefault();const s=getAuth();sendPasswordResetEmail(s,e.value).then((()=>{a.forEach(((e,t)=>1==t?e.classList.add("step--show"):e.classList.remove("step--show"))),setTimeout((()=>{modalLogin.firstChild.nextSibling.classList.remove("modal--active"),modalLogin.firstChild.classList.add("modal--active"),a.forEach(((e,t)=>0==t?e.classList.add("step--show"):e.classList.remove("step--show")))}),1e4)})).catch((a=>{userNotFound(a,e),t.setAttribute("disabled","disabled"),isValidateInput.email=!1}))}))}));const userNotFound=(e,t)=>{t.nextElementSibling.textContent="auth/user-not-found"==e.code||"auth/missing-email"==e.code?"La dirección de correo introducida no está asociada a ninguna cuenta":""},passwordWrong=(e,t)=>{t.nextElementSibling.textContent="auth/wrong-password"==e.code?"La contraseña es incorrecta":""};import{signOut}from"firebase/auth";let btnLogout=document.querySelectorAll(".interaction__logout"),menuMobile=document.querySelector(".menu__primary");btnLogout.forEach((e=>{e.addEventListener("click",(t=>{signOut(auth).then((()=>{e.classList.contains("user__logged--out")&&e.classList.add("btn--enabled"),e.classList.contains("user__logged--in")&&e.classList.remove("btn--enabled"),main.classList.contains("main--fadeOut")&&main.classList.remove("main--fadeOut"),menuMobile.classList.remove("menu--active"),btnMenuMobile.classList.remove("btn--enabled")})).catch((e=>console.log(e)))}))}));import{query,where,collection,getDocs}from"firebase/firestore";import{getDownloadURL}from"firebase/storage";let sectionEmpty=document.querySelector(".information__pets .section__pets--empty"),section=document.querySelector(".information__pets .section__pets .container__cards"),infoPet=document.querySelector(".pet__info"),deleteInfo=document.querySelector(".pet__info--delete"),icons=document.querySelectorAll(".calendar__header__interaction .icon"),hygiene=["Baño","Cepillado","Corte de pelo","Corte de uñas","Limpieza de oidos","Limpieza de ojos","Limpieza dental"];const showPets=async e=>{const t=query(collection(db,"pets"),where("datos.usuario","==",e)),a=await getDocs(t);if(a.empty)sectionEmpty.classList.replace("section--hidden","section__fade--in");else{section.parentNode.classList.remove("section--hidden"),section.classList.add("section__fade--in");let e=[];a.forEach((t=>{let a=t.data();for(let o in a){let s=document.createElement("article");s.classList.add("article","card"),s.setAttribute("data-pet",`${t.id}`),e.push(s),printDataBasicPet(s,a[o].mascota.avatar,a[o].mascota.tipo,a[o].mascota.nombre),section.appendChild(s)}})),printCalendar(),e.forEach((e=>{let t=e.dataset.pet;a.forEach((a=>{let o=a.data();for(let s in o)t===a.id&&e.addEventListener("click",(e=>{section.classList.replace("section__fade--in","section--hidden"),infoPet.parentNode.classList.add("section__fade--in"),printDataBasicPet(infoPet,o[s].mascota.avatar,o[s].mascota.tipo,o[s].mascota.nombre),setAvatar(infoPet,a.id,o[s].mascota.avatar),printTaskCalendar(o[s].fecha_alta,o[s].mascota.tipo,o[s].mascota.tareas,o[s].mascota.temporalizacion,hygiene),icons.forEach((e=>{e.addEventListener("click",(t=>{document.querySelectorAll(".day").forEach((e=>e.remove())),e.classList.contains("icon__prev")?(currentMonth--,currentMonth<0&&(currentMonth=11,currentYear--)):e.classList.contains("icon__next")&&(currentMonth++,currentMonth>11&&(currentMonth=0,currentYear++)),setTimeout((()=>{printCalendar(),printTaskCalendar(o[s].fecha_alta,o[s].mascota.tipo,o[s].mascota.tareas,o[s].mascota.temporalizacion,hygiene),printTask()}),200)}))})),printTask(),deleteInfo.addEventListener("click",(e=>{o[s].mascota.avatar&&deleteImageStorage(o[s].mascota.avatar),deletePetDDBB(a.id),setTimeout((()=>location.reload()),1e3)}))}))}))}))}},printTask=()=>{let e=document.querySelectorAll(".day");e.forEach((t=>{if(t.addEventListener("click",(a=>{t.classList.contains("--task")&&(t.classList.add("--active"),setTimeout((()=>{for(let e in t.dataset){let a=document.createElement("li");a.classList.add("text",""+(hygiene.includes(`${t.dataset[e]}`)?"--hygiene__task":"--cleaning__task")),a.textContent=`${t.dataset[e]}`,infoTask.appendChild(a)}}),100),e.forEach((e=>{if(e.textContent!=a.target.textContent&&(e.classList.remove("--active"),1==infoTask.hasChildNodes())){infoTask.childNodes.forEach((e=>e.remove()))}})))})),t.classList.contains("--today"))if(t.classList.contains("--task"))for(let e in t.dataset){let a=document.createElement("li");a.classList.add("text",""+(hygiene.includes(`${t.dataset[e]}`)?"--hygiene__task":"--cleaning__task")),a.textContent=`${t.dataset[e]}`,infoTask.appendChild(a)}else if(0==infoTask.hasChildNodes()){let e=document.createElement("span");e.classList.add("text"),e.textContent="No hay tareas para hoy",infoTask.appendChild(e)}}))},printDataBasicPet=(e,t,a,o)=>{let s=document.createElement("picture");s.classList.add("picture");let n=document.createElement("img");if(n.classList.add("card__img"),t){newImageStorage(n,t);const e=ref(storage,`${t}`);getDownloadURL(e).then((e=>{n.setAttribute("src",`${e}`)})).catch((e=>console.log(e)))}else n.setAttribute("src",`assets/images/avatars/avatar-${a}.webp`);n.setAttribute("alt",`Avatar de ${o}`);let i=document.createElement("h3");i.classList.add("card__title","title__body--bold"),i.textContent=o,s.appendChild(n),e.appendChild(s),e.appendChild(i)},setAvatar=(e,t,a)=>{if(!a){let a=document.createElement("label"),o="set__avatar__pet";a.setAttribute("for",`${o}`);let s=document.createElement("img");s.classList.add("icon"),s.setAttribute("src","assets/icons/icon-upload-img.webp"),s.setAttribute("alt","Cambiar imagen");let n=document.createElement("input");n.setAttribute("type","file"),n.setAttribute("id",`${o}`),n.setAttribute("name",`${o}`),a.appendChild(s),a.appendChild(n),e.appendChild(a),n.addEventListener("change",(e=>{let o=e.target.files[0],s=o.name;updatePetDDBB(t,s),newImageStorage(s,o);const n=new FileReader;n.readAsDataURL(o),n.addEventListener("load",(e=>{const t=new FileReader;t.readAsDataURL(o),t.addEventListener("load",(e=>{let t=document.createElement("picture");t.classList.add("picture");let a=document.createElement("img");a.classList.add("card__img"),a.setAttribute("src",e.target.result),t.appendChild(a),infoPet.insertBefore(t,document.querySelector(".pet__info .card__title"))})),infoPet.firstChild.remove(),a.remove()}))}))}};import{onAuthStateChanged}from"firebase/auth";import{getDoc}from"firebase/firestore";let btnInteraction=document.querySelectorAll(".header .interaction .btn"),btnMenuMobile=document.querySelector(".icon__menu"),greeting=document.querySelector(".greeting"),informationAppLoggedOut=document.querySelector(".information__app"),informationAppLoggedIn=document.querySelector(".information__pets"),page51=document.querySelectorAll(".page-51"),warningPage51=document.querySelectorAll(".private__area__warning"),linksModal=document.querySelectorAll(".private__area__warning .link");onAuthStateChanged(auth,(async e=>{if(e){const t=doc(db,"users",e.uid),a=await getDoc(t);if(a.exists()){let e=a.data();for(let t in e)greeting.textContent=e[t].nombre&&`Hola, ${e[t].nombre}`}btnInteraction.forEach((e=>{e.classList.contains("user__logged--out")&&e.classList.remove("btn--enabled"),e.classList.contains("user__logged--in")&&(window.outerWidth>=1024?(e.classList.add("btn--enabled"),btnMenuMobile.classList.remove("btn--enabled")):btnMenuMobile.classList.add("btn--enabled"),window.addEventListener("resize",(()=>{window.innerWidth>=1024?e.classList.add("btn--enabled"):e.classList.remove("btn--enabled")})))})),location.href.includes("mascota")||(informationAppLoggedOut.classList.remove("section__fade--in"),informationAppLoggedIn.classList.replace("section--hidden","section__fade--in"),showPets(e.uid)),location.pathname.includes("mascota")&&formPet(e.uid),page51.forEach((e=>{e.classList.remove("section--hidden")})),warningPage51.forEach((e=>{e.classList.add("section--hidden")})),menu.classList.remove("section--hidden"),showIconMenu(),deleteUserAccount(e)}else greeting.textContent="",rotateImages(),btnInteraction.forEach((e=>{e.classList.contains("user__logged--out")&&e.classList.add("btn--enabled"),e.classList.contains("user__logged--in")&&e.classList.remove("btn--enabled"),btnMenuMobile.classList.contains("btn--enabled")&&btnMenuMobile.classList.remove("btn--enabled"),location.href.includes("mascota")||(informationAppLoggedOut.classList.add("section__fade--in"),informationAppLoggedIn.classList.replace("section__fade--in","section--hidden")),page51.forEach((t=>{t.classList.add("section--hidden"),openLoginModalAutomatically(e),openModalClick(e)}))})),menu.classList.add("section--hidden"),warningPage51.forEach((e=>{e.classList.remove("section--hidden")}))}));const openLoginModalAutomatically=e=>{setTimeout((()=>{e.classList.contains("interaction__login")&&e.click()}),2600)},openModalClick=e=>{linksModal.forEach((t=>{t.addEventListener("click",(()=>{t.classList.contains("link__login")&&e.classList.contains("interaction__login")&&e.click(),t.classList.contains("link__register")&&e.classList.contains("interaction__register")&&e.click()}))}))};import{doc,setDoc,deleteDoc}from"firebase/firestore";const newUserDDBB=(e,t,a)=>{setDoc(doc(db,"users",e),{datos_personales:{nombre:t,email:a}})},deleteUserDDBB=e=>{deleteDoc(doc(db,"users",e))},newPetDDBB=(e,t,a,o,s,n,i)=>{setDoc(doc(db,"pets",e),{datos:{mascota:{nombre:t,tipo:a,tareas:o,temporalizacion:s},fecha_alta:n,usuario:i}},{merge:!0})},updatePetDDBB=(e,t)=>{setDoc(doc(db,"pets",e),{datos:{mascota:{avatar:`images/${t}`}}},{merge:!0})},deletePetDDBB=e=>{deleteDoc(doc(db,"pets",e))};import{deleteObject,ref,uploadBytes}from"firebase/storage";const newImageStorage=(e,t)=>{const a=ref(storage,`images/${e}`);uploadBytes(a,t).then((e=>{console.log("Imagen almacenada con éxito")})).catch((e=>console.log(e)))},deleteImageStorage=e=>{const t=ref(storage,`${e}`);deleteObject(t).then((()=>console.log("Imagen eliminada"))).catch((e=>console.log(e)))};