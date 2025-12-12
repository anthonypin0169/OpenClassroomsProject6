//Fonctions fetch
async function loadCategories() { 

    try {
        const response = await fetch("http://localhost:5678/api/categories")
        const categories = await response.json()
        console.log(categories)
        return(categories)
    } catch (error) {
        console.error("Erreur lors de la récupération des filtres :", error)
    }
}

async function loadWorks() { 
    
    try {
        const R = await fetch("http://localhost:5678/api/works")
        const data = await R.json()
        console.log(data)
        return(data)
    } catch (E) {
        console.error("Erreur lors de la récupération des travaux :", E)
    }
}

//Variables
const portfolio = document.getElementById("portfolio")
const filterContainer = document.createElement("div")
filterContainer.classList.add("filters")
const gallery = document.querySelector(".gallery")
portfolio.insertBefore(filterContainer,gallery)
filterContainer.innerHTML = ""

//Fonctions de créations d'éléments
function displayCategories(filtres){
  
    filtres.forEach(element => {
        const btn = document.createElement("button")
        btn.classList.add("newBtn")
        btn.dataset.id = element.id
        btn.textContent = element.name
        filterContainer.appendChild(btn)  
    });
}

function displayWorks(works){

    gallery.innerHTML = ""

    works.forEach(element => {
        const card = document.createElement("figcaption")
        card.classList.add("card")
        card.dataset.category = element.categoryId
        const image = document.createElement("img")
        image.src = element.imageUrl
        image.alt = element.title
        const title = document.createElement("h3")
        title.textContent = element.title
        gallery.appendChild(card)
        card.appendChild(image)
        card.appendChild(title)      
    });
}

//Fonctions de lancement
async function startDisplay() {

    const categories = await loadCategories()
    const works = await loadWorks()
    
    displayCategories(categories)
    displayWorks(works)
    selectFilter()
}

document.addEventListener("DOMContentLoaded",startDisplay)

//Fonction de tri
function selectFilter() {

    const buttons = document.querySelectorAll(".newBtn"); 

    buttons.forEach(button => {
        button.addEventListener("click", () => {

        const filterId = parseInt(button.dataset.id); 
        const cards = document.querySelectorAll(".card"); 

            cards.forEach(card => {
                const cardId = parseInt(card.dataset.category);

                if (filterId === cardId) {
                card.style.display = "block";
                } else {
                card.style.display = "none";
                }
            });
        });
    });
}



//Variables
const token = localStorage.getItem("token")
const body = document.querySelector("body")
const header = document.querySelector("header")
const banner = document.createElement("div")
const bannerTxt = document.createElement("p")

const nav = document.querySelector("nav ul")
const login = document.querySelector("ul li:nth-child(3)")
const logout = document.createElement("li")
const instaIcon = document.querySelector("nav img")

const h2modify = document.querySelector("#portfolio h2")
const modifyBtn = document.createElement("a")
modifyBtn.classList.add("modify-btn")
const modifyContainer = document.createElement("div")



function managementMode (){

    if (token) {
        // Ajouter la banniere
        banner.classList.add("banner")
        bannerTxt.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>Mode édition`
        body.insertBefore(banner, header)
        banner.appendChild(bannerTxt)
        
        // Display none - block / login - logout
        logout.innerHTML = `logout`
        nav.appendChild(instaIcon)
        nav.insertBefore(logout, instaIcon)
        login.style.display = "none"
        logout.style.display = "block"
        
        // Logout deconnexion
        logout.addEventListener("click", () => {
            localStorage.removeItem("token")
            localStorage.removeItem("token")
            window.location.href = "http://127.0.0.1:5500/FrontEnd/index.html"
        })    

        // Display none - block / filter
        filterContainer.style.display = "none"
        
        // Ajouter le btn modifier
        modifyBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>Modifier projet`
        h2modify.style.marginBottom = "10px"
        portfolio.insertBefore(modifyBtn, filterContainer)
        modifyContainer.classList.add("modifyContainer")
        modifyContainer.appendChild(h2modify)
        modifyContainer.appendChild(modifyBtn)
        portfolio.prepend(modifyContainer)
        
        console.log("Mode éditeur")
    } else {
        login.style.display = "block"
        logout.style.display = "none"
        filterContainer.style.display = "flex"
        console.log("Mode visiteur")
    }
}

managementMode ()

//Ouverture - Fermeture boite modale
//Conteneur de photo
const modalWrapper = document.querySelector(".modal-wrapper")
modalWrapper.id = "modal-gallery-view"
const modalePicsContainer = document.createElement("div")
modalePicsContainer.classList.add("modale-pics-container")
modalWrapper.appendChild(modalePicsContainer)

//Photo
const modalPics = document.createElement("article")
modalPics.classList.add("display-modal-pics")
modalePicsContainer.appendChild(modalPics)

//Icone des photos
const bin = document.createElement("span")
bin.classList.add("fa-trash", "fa-solid")
modalPics.appendChild(bin)

//Croix
const closeModalBtn = document.querySelector(".fa-xmark")
const xMark = document.createElement("span")
xMark.classList.add("fa-xmark", "fa-solid")

//Barre de séparation
const modalBar = document.createElement("div")
modalBar.classList.add("modal-bar")
modalWrapper.appendChild(modalBar)

//Bouton ajouter
const modalBtn = document.createElement("button")
modalBtn.classList.add("modal-btn")
modalBtn.id = "btn-add-pics"
modalBtn.innerHTML = `Ajouter une photo`
modalWrapper.appendChild(modalBtn)

//Gestion des vues boite modale
function createAddPhotoWiew (categories){
    
    const container = document.getElementById("modal1")

    const addPhotoWiew = document.createElement("div")
    addPhotoWiew.classList.add("modal-wrapper")
    addPhotoWiew.id = "modal-add-photo-view"
    addPhotoWiew.style.display = "none"

    addPhotoWiew.innerHTML=""

    const backArrow = document.createElement("span")
    backArrow.innerHTML = `<i class="fa-solid fa-arrow-left"></i>`
    backArrow.style.cursor = "pointer"

    const quitContainer = document.createElement("div")
    quitContainer.classList.add("quit-container")

    const title = document.createElement("h2")
    title.innerHTML = `Ajout photo`
    title.id = "title-page2"

    const form = document.createElement("form")
    form.id = "form-add-work"
    form.enctype = "multipart/form-data"

    const uploadArea = document.createElement("div");
    uploadArea.classList.add("upload-area");

    const uploadIcon = document.createElement("i");
    uploadIcon.classList.add("fa-regular", "fa-image", "upload-icon");

    const uploadButton = document.createElement("label");
    uploadButton.classList.add("upload-button");
    uploadButton.setAttribute("for", "input-image");
    uploadButton.innerText = "+ Ajouter photo";

    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.id = "input-image";
    imageInput.accept = "image/*"; 

    const uploadInfo = document.createElement("p");
    uploadInfo.classList.add("upload-info");
    uploadInfo.innerText = "jpg, png · 4mo max";

    uploadArea.appendChild(uploadIcon);
    uploadArea.appendChild(uploadButton);
    uploadArea.appendChild(imageInput);
    uploadArea.appendChild(uploadInfo);

    form.appendChild(uploadArea);

    const titleInputText = document.createElement("h2")
    titleInputText.innerHTML = "Titre"
    titleInputText.classList.add("input-h2")
    const titleInput = document.createElement("input")
    titleInput.type = "text"
    titleInput.id = "input-title"
    titleInput.placeholder = ""

    const titleCategory = document.createElement("h2")
    titleCategory.innerHTML = "Catégories"
    titleCategory.classList.add("input-h2")
    const categorySelect = document.createElement("select")
    categorySelect.id = "input-category"

    categories.forEach(cat => {
        const option = document.createElement("option")
        option.value = cat.id
        option.textContent = cat.name
        categorySelect.appendChild(option)
    })

    const sumbitBtn = document.createElement("button")
    sumbitBtn.type = "sumbit"
    sumbitBtn.id = "btn-sumbit-work"
    sumbitBtn.classList.add("modal-btn")
    sumbitBtn.textContent = "Valider"

    container.appendChild(addPhotoWiew)
    addPhotoWiew.appendChild(quitContainer)
    quitContainer.appendChild(backArrow)
    quitContainer.appendChild(xMark)
    addPhotoWiew.appendChild(title)
    addPhotoWiew.appendChild(form)
    form.appendChild(imageInput)
    form.appendChild(titleInputText)
    form.appendChild(titleInput)
    form.appendChild(titleCategory)
    form.appendChild(categorySelect)
    addPhotoWiew.appendChild(modalBar)
    addPhotoWiew.appendChild(sumbitBtn)

    addPhotoWiew.addEventListener("click", stopPropagation)
    xMark.addEventListener("click", (e)=>{
        e.stopPropagation()
        closeModal(e)
    })
    //Aller au formulaire
    modalBtn.addEventListener("click", ()=>{
        document.getElementById("modal-gallery-view").style.display = "none"
        document.getElementById("modal-add-photo-view").style.display = "flex"
        
    })

    //Retour vue 1
    backArrow.addEventListener("click", ()=>{
        document.getElementById("modal-gallery-view").style.display = "flex"
        document.getElementById("modal-add-photo-view").style.display = "none"
        
    })

    return addPhotoWiew
}



let modal = null

async function openModal(event) {
event.preventDefault();

let categories = [];
try {
categories = await loadCategories();
} catch (err) {
console.error("Impossible de charger les catégories :", err);
}

createAddPhotoWiew(categories);

const target = document.getElementById("modal1");
const page1 = modalWrapper || document.getElementById("modal-gallery-view"); 
const page2 = document.getElementById("modal-add-photo-view");
const closeBtn = closeModalBtn || document.querySelector(".fa-xmark");

if (!target) {
console.error("openModal : #modal1 introuvable");
return;
}

if (page1) page1.style.display = "flex"; 
if (page2) page2.style.display = "none";

target.style.display = "flex";
target.removeAttribute("aria-hidden");
target.setAttribute("aria-modal", "true");

modal = target;

modal.removeEventListener("click", closeModal);
if (page1) page1.removeEventListener("click", stopPropagation);
if (page2) page2.removeEventListener("click", stopPropagation);
if (closeBtn) closeBtn.removeEventListener("click", closeModal);

modal.addEventListener("click", closeModal); 
if (page1) page1.addEventListener("click", stopPropagation); 
if (page2) page2.addEventListener("click", stopPropagation); 
if (closeBtn) closeBtn.addEventListener("click", closeModal);
}

function closeModal (e){
    if (modal === null) return
    e.preventDefault()
    
    modal.style.display = "none"
    modal.setAttribute("aria-hidden", "true")
    modal.removeAttribute("aria-modal")
    modal.removeEventListener("click", closeModal)
    closeModalBtn.removeEventListener("click", closeModal)
    modalWrapper.removeEventListener("click", stopPropagation)
    modal = null
}

function stopPropagation (e){
    e.stopPropagation()
}

modifyBtn.addEventListener("click", (event) => {
    openModal(event)
})
//Supprimer les travaux

//Appel de l'api pour supprimer une photo
async function deleteWorks() { 
    
  bin.forEach(trashBtn => {
    trashBtn.addEventListener("click", async (event)=>{
        event.stopPropagation()

        const photo = event.target.closest(modalPics)
        const id = photo.dataset.id

        try {
        const response = await fetch(`http://localhost:5678/api/works/${id}`,{
            method:"DELETE",
            headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}
        })
       if(!response.ok){
        throw new Error("Erreur lors de la suppression")
        }
        
        photo.remove()
        console.log(`Photo ${id} suprimée`)

        } catch (E) {
            console.error("Impossible de supprimer la photo :", E)
        }
    })
  })
 
}
//8.2 ajout de photo, fermer modale, tout vider + appel api, utiliser la fonction de chargement

