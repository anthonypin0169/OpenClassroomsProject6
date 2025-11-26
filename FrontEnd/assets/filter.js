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
