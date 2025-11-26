const loginSection = document.querySelector("#login")
const form = document.querySelector("form")
const footer = document.querySelector("footer")

const connectBtn = document.createElement("btn")
connectBtn.textContent = "Se connecter"
connectBtn.classList.add("connectBtn")
loginSection.appendChild(connectBtn)

const email = document.getElementById("email")
const password = document.getElementById("password")


function formManagement () {

    email.addEventListener("change", () => {
        console.log(email) 
    })
    password.addEventListener("change", () => {
        console.log(password)
    })

    form.addEventListener("sumbit", (event) => {
        event.preventDefault()
    })
    

}

// function sendInfo () {
// Lier le btn au form, quand je clique sur le btn j'envoie les infos, si elles sont true je charge la page d'acceuil, sinon message d'erreur.
//appel à l'api, revoi du token, stockage dans le session storage
//si le token est rentré je change l'affichage
//changer le libiele sur filter.js soit avec display soit en changeant l'attribut
// }
