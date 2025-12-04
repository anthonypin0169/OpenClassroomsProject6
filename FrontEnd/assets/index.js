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
const token = sessionStorage.getItem("token")
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
            sessionStorage.removeItem("token")
            sessionStorage.removeItem("token")
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
const modalePicsContainer = document.createElement("div")
modalePicsContainer.classList.add("modale-pics-container")
modalWrapper.appendChild(modalePicsContainer)

//Photo
const modalPics = document.createElement("article")
modalPics.classList.add("display-modal-pics")
modalePicsContainer.appendChild(modalPics)

//Icone des photos
const bin = document.createElement("p")
bin.classList.add("fa-trash")
bin.innerHTML = `<i class="fa-solid fa-trash"></i>`
modalPics.appendChild(bin)

//Croix
const closeModalBtn = document.querySelector(".fa-xmark")

//Barre de séparation
const modalBar = document.createElement("div")
modalBar.classList.add("modal-bar")
modalWrapper.appendChild(modalBar)

//Bouton ajouter
const modalBtn = document.createElement("button")
modalBtn.classList.add("modal-btn")
modalBtn.innerHTML = `Ajouter une photo`
modalWrapper.appendChild(modalBtn)


let modal = null

function openModal (event){
    event.preventDefault()

    const target = document.getElementById("modal1")
    target.style.display = "flex"
    target.removeAttribute("aria-hidden")
    target.setAttribute("aria-modal", "true")
    modal = target
    modal.addEventListener("click", closeModal)
    closeModalBtn.addEventListener("click", closeModal)
    modalWrapper.addEventListener("click", stopPropagation)
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



//Gestion des vues boite modale
function createAddPhotoWiew (){
    
    //boite modale
    const container = document.getElementById("modal1")
    container.appendChild(addPhotoWiew)

    //Equivalent modalePicsContainer
    const addPhotoWiew = document.createElement("div")
    addPhotoWiew.id = "modal-add-photo-wiew"
    addPhotoWiew.style.display = "none"
    addPhotoWiew.appendChild(backArrow)
    addPhotoWiew.appendChild(title)
    addPhotoWiew.appendChild(form)

    //Fleche retour
    const backArrow = document.createElement("span")
    backArrow.innerHTML = "&larr"
    backArrow.style.cursor = "pointer"

    //Titre
    const title = document.createElement("h2")
    title.innerHTML = `Ajout photo`

    //Dépot de l'image
    const imageInput = document.createElement("input")
    imageInput.type = "file"
    imageInput.id = "input-image"
    imageInput.accept = "image/*"

    //Formulaire
    const form = document.createElement("form")
    form.id = "form-add-work"
    form.enctype = "multipart/form-data"
    form.appendChild(imageInput)
    form.appendChild(titleInput)
    form.appendChild(categorySelect)
    form.appendChild(sumbitBtn)

    //Champ titre
    const titleInput = document.createElement("input")
    titleInput.type = "text"
    titleInput.id = "input-title"
    titleInput.placeholder = "Titre"

    //Champ categories
    const categorySelect = document.createElement("select")
    categorySelect.id = "input-category"

    //Charger les categories
    categories.forEach(cat => {
        const option = document.createElement("option")
        option.value = cat.id
        option.textContent = cat.name
        categorySelect.appendChild(option)
    })
    //Bouton valider
    const sumbitBtn = document.createElement("button")
    sumbitBtn.type = "sumbit"
    sumbitBtn.id = "btn-sumbit-work"
    sumbitBtn.classList.add("modal-btn")
    sumbitBtn.textContent = "Valider"

    //Changement de vue
 
    
 }

//8.2 ajout de photo, fermer modale, tout vider + appel api, utiliser la fonction de chargement


