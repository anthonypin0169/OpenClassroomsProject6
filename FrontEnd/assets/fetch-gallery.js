//Fonction qui recupere une liste d'objet (correspondant aux travaux) dans le backend grace à l'api.
async function loadWorks() { 
    try {
        const response = await fetch("http://localhost:5678/api/works")//on indique le chemin puis
        const data = await response.json()//on convertis le contenu en tableau d'objet json 
        console.log(data)
        return(data)
    } catch (error) {
        console.error("Erreur lors de la récupération des travaux :", error)
    }
}

//Fonction qui affiche les traveaux dans la galerie
function displayWorks(works){
    const gallery = document.querySelector(".gallery")
    gallery.innerHTML = ""

    works.forEach(element => {
        const card = document.createElement("div")
        card.classList.add("card")
        // imageUrl correspond au chemin vu dans le swagger
        const image = document.createElement("img")
        image.src = element.imageUrl
        image.alt = element.title
        //title correspond au titre vu dans le swagger
        const title = document.createElement("h3")
        title.textContent = element.title
        gallery.appendChild(card)
        card.appendChild(image)
        card.appendChild(title)      
    });
}

//Fonction qui intialse l'affichage
async function startDisplayWorks() {
    const finalDisplay = await loadWorks()
    if (loadWorks) {
        displayWorks(finalDisplay)
    } else {
        console.log("Aucun projet à afficher")
    }
}

//Initialiser quand le DOM est pret
document.addEventListener("DOMContentLoaded",startDisplayWorks)