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
const modifyBtn = document.createElement("button")
const modifyContainer = document.createElement("div")



function gestionMode (){

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
            sessionStorage.removeItem("token")
            window.location.href = "http://127.0.0.1:5500/FrontEnd/index.html"
        })    

        // Display none - block / filter
        filterContainer.style.display = "none"
        
        // Ajouter le btn modifier
        modifyBtn.classList.add("modify-btn")
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

gestionMode ()
