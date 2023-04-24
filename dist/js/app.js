let calendar=document.querySelector(".pet__info__calendar"),dateCalendar=document.querySelector(".calendar__header__interaction .calendar__actual__date"),days=document.querySelector(".calendar__main"),infoTask=document.querySelector(".pet__calendar .about__task"),date=new Date,currentMonth=date.getMonth(),currentYear=date.getFullYear();const months=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],printCalendar=()=>{let e=new Date(currentYear,currentMonth,0).getDay(),t=new Date(currentYear,currentMonth+1,0).getDate(),a=new Date(currentYear,currentMonth,0).getDate(),n=new Date(currentYear,currentMonth,t).getDay();dateCalendar.textContent=`${months[currentMonth]} ${currentYear}`;for(let t=e;t>0;t--){let e=document.createElement("li");e.classList.add("day","text","--light"),e.textContent=""+(a-t+1),days.appendChild(e)}for(let e=1;e<=t;e++){let t=document.createElement("li");t.classList.add("day","text"),t.textContent=e,days.appendChild(t),e===date.getDate()&&currentMonth===(new Date).getMonth()&&currentYear===(new Date).getFullYear()&&t.classList.add("--today")}if(n>0)for(let e=n;e<7;e++){let t=document.createElement("li");t.classList.add("day","text","--light"),t.textContent=""+(e-n+1),days.appendChild(t)}},printTaskCalendar=(e,t,a,n,r)=>{let i=document.querySelectorAll(".day"),s=new Date,o=e.split("/");s.setDate(o[0]),s.setMonth(o[1]-1),s.setFullYear(o[2]);let l=new Date,c=parseInt(o[2]);let d,u;c={perro:c+15,gato:c+15,ave:c+10,tortuga:c+30}[t],l.setFullYear(c);for(let e in a)for(let t in a)if(e===t){let o=[a[e],n[t]];u=r.includes(o[0])?"--hygiene__task":"--cleaning__task";d={"1_semana":6048e5,"1_mes":2592e6,"2_mes":1296e6,"1_año":31536e6,"2_año":157248e5,"3_año":104544e5}[o[1]];for(let e=s;e<=l;e=new Date(e.getTime()+d))i.forEach((t=>{t.classList.contains("--light")||t.textContent==e.getDate()&&currentMonth==e.getMonth()&&currentYear==e.getFullYear()&&(t.classList.add("--task",u),t.setAttribute(`data-${o[0].replaceAll(" ","_")}`,`${o[0]}`))}))}},printYear=()=>{let e=document.querySelector(".attribution__year"),t=document.querySelector(".attribution__year").dataset.create,a=(new Date).getFullYear();t==a?e.textContent=t:t<=a&&(e.textContent=`${t} - ${a}`)};printYear();let btnInteraction=document.querySelectorAll(".header .interaction .btn"),modalLogin=document.querySelector(".modal__container"),forms=document.querySelectorAll(".modal .form"),inputs=document.querySelectorAll(".form .input__group input"),linkOtherForm=document.querySelectorAll(".link__login"),iconClose=document.querySelectorAll(".icon__close"),iconPass=document.querySelectorAll(".input__icon");const regExpres={user:/^[a-zA-Z]{3,16}$/,email:/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,password:/^[a-z0-9_-]{8,18}$/},isValidateInput={user:!1,email:!1,password:!1,password2:!1};btnInteraction.forEach((e=>{e.classList.contains("user__logged--out")&&e.addEventListener("click",(()=>{modalLogin.classList.replace("modal__container","modal__container--active"),e.classList.contains("interaction__login")?modalLogin.firstChild.classList.add("modal--active"):e.classList.contains("interaction__register")&&modalLogin.lastChild.classList.add("modal--active")}))})),iconClose.forEach((e=>{e.addEventListener("click",(()=>{e.parentNode.parentNode.classList.remove("modal--active"),modalLogin.classList.contains("modal__container--active")&&modalLogin.classList.replace("modal__container--active","modal__container"),resetForm()}))}));const closeModal=()=>{modalLogin.classList.add("modal__container"),modalLogin.classList.remove("modal__container--active"),modalLogin.firstChild.classList.remove("modal--active"),modalLogin.lastChild.classList.remove("modal--active"),location.reload()};linkOtherForm.forEach(((e,t)=>{e.addEventListener("click",(()=>{0===t?(modalLogin.firstChild.classList.remove("modal--active"),modalLogin.lastChild.classList.add("modal--active")):(modalLogin.lastChild.classList.remove("modal--active"),modalLogin.firstChild.classList.add("modal--active"))}))}));const validateForm=e=>{switch(e.target.name){case"user__name":""!==e.target.value&&validateInput(regExpres.user,e.target.value,e.target,"user");break;case"email__register":case"email__login":validateInput(regExpres.email,e.target.value,e.target,"email","La dirección de correo electrónico no es válida");break;case"password__register":case"password__login":validateInput(regExpres.password,e.target.value,e.target,"password","La contraseña no cumple con los requisitos");break;case"repeat__password__register":e.target.value==document.querySelector("#password__register").value?(e.target.classList.remove("validate--error"),e.target.nextElementSibling.textContent="",isValidateInput.password2=!0):(e.target.classList.add("validate--error"),e.target.nextElementSibling.textContent="Las contraseñas no coinciden",isValidateInput.password2=!1)}forms.forEach((e=>{e.classList.contains("form__login")&&(isValidateInput.email&&isValidateInput.password?document.querySelector(".form__login--withEmail .btn__submit").removeAttribute("disabled"):document.querySelector(".form__login--withEmail .btn__submit").setAttribute("disabled","disabled")),e.classList.contains("form__register")&&(isValidateInput.user&&isValidateInput.email&&isValidateInput.password&&isValidateInput.password2?document.querySelector(".form__register--create .btn__submit").removeAttribute("disabled"):document.querySelector(".form__register--create .btn__submit").setAttribute("disabled","disabled"))}))},validateInput=(e,t,a,n,r)=>{""!=a.value?e.test(t)?(a.classList.remove("validate--error"),a.nextElementSibling.textContent="",isValidateInput[n]=!0):(a.classList.add("validate--error"),a.nextElementSibling.textContent=r,isValidateInput[n]=!1):a.classList.contains("validate--error")&&(a.classList.remove("validate--error"),a.nextElementSibling.textContent="")},resetForm=()=>{inputs.forEach((e=>{e.value=""}));for(let e in isValidateInput)isValidateInput[e]=!1};iconPass.forEach((e=>{e.addEventListener("click",(()=>{let t=e.previousElementSibling.previousElementSibling;""!==t.value&&("password"===t.getAttribute("type")?(t.setAttribute("type","text"),e.setAttribute("src","assets/icons/icon-eye-open.png")):(t.setAttribute("type","password"),e.setAttribute("src","assets/icons/icon-eye-close.png")))}))})),inputs.forEach((e=>{e.addEventListener("keyup",(e=>validateForm(e))),e.addEventListener("blur",(e=>validateForm(e))),"user__name"===e.name&&""===e.value&&(isValidateInput.user=!0)}));const rotateImages=()=>{let e=document.querySelector(".information__app__img img");setInterval((()=>{let t=Math.round(4*Math.random()+1);e.setAttribute("src",`assets/images/decoratives/pets${t}.png`)}),5e3)},header=document.querySelector(".header"),btnMenu=document.querySelector(".icon__menu"),menu=document.querySelector(".menu__primary"),btnLogout=document.querySelector(".interaction .interaction__logout");btnMenu.addEventListener("click",(()=>{window.innerWidth<=768&&(menu.classList.toggle("menu--active"),btnMenu.classList.toggle("icon--active"),menu.classList.contains("menu--active")?btnMenu.setAttribute("aria-expanded","true"):btnMenu.setAttribute("aria-expanded","false"))}));const showIconMenu=()=>{window.addEventListener("resize",(()=>{window.innerWidth>=768?(btnMenu.classList.remove("btn--enabled"),btnLogout.classList.contains("btn--enabled")&&(btnLogout.style.display="inline-flex")):(btnMenu.classList.add("btn--enabled"),btnLogout.classList.contains("btn--enabled")&&(btnLogout.style.display="none"))}))};