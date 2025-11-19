//Fonction qui recupere une liste d'objet (correspondant aux filtres) dans le backend grace à l'api.
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

//Fonction qui affiche les filtres dans le container
function displayCategories(filtres){
    //Creation des variables puis ajout de la classe des filtres et enfin placement du container dans la section avant la galerie
    const portfolio = document.getElementById("portfolio")
    const filterContainer = document.createElement("div")
    filterContainer.classList.add(".filters")
    const gallery = document.querySelector(".gallery")
    portfolio.insertBefore(filterContainer,gallery)
    filterContainer.innerHTML = ""
    
    //Ajout avec une boucle des elements present dans reponse.json contenu dans categorie
    filtres.forEach(element => {
        const btn = document.createElement("button")
        btn.classList.add("newBtn")
        //selection du filtre et du texte
        btn.dataset.id = element.id
        btn.textContent = element.name
        //ajout des button au container
        filterContainer.appendChild(btn)  
    });
}

//Fonction qui intialse l'affichage
async function startDisplayCategories() {
    const finalDisplay = await loadCategories()
    if (loadCategories) {
        displayCategories(finalDisplay)
    } else {
        console.log("Aucun projet à afficher")
    }
}

//Initialiser quand le DOM est pret
document.addEventListener("DOMContentLoaded",startDisplayCategories)