const loginSection = document.querySelector("#login")
const form = document.querySelector("form")
const footer = document.querySelector("footer")

const connectBtn = document.createElement("button")
connectBtn.textContent = "Se connecter"
connectBtn.classList.add("connectBtn")
form.appendChild(connectBtn)

const email = document.getElementById("email")
const password = document.getElementById("password")

const errorMessage = document.createElement("p")
errorMessage.classList.add("error-message")
form.appendChild(errorMessage)

function blocBtn () {
    if(email.value.trim() !== "" && password.value.trim() !== ""){
        connectBtn.disabled = false
    } else {
        connectBtn.disabled = true
    }
}

email.addEventListener("input", blocBtn)
password.addEventListener("input", blocBtn)

//Event de test
email.addEventListener("input", () => {
    console.log("Champ de saisie du mail :", email.value)
})
password.addEventListener("input", () => {
    console.log("Champ de saisie du mot de passe :", password.value)
})



form.addEventListener("submit", async function (event)  {
    event.preventDefault()

    //Partie qui gere les echanges avec l'API
    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({
                email: email.value,
                password: password.value
            })
        })
        console.log(response)
        
        const data = await response.json()
        if(!response.ok){
            throw new Error ("Identifiant ou mot de passe incorrect")
        }

        if(data.token){
            localStorage.setItem("token", data.token)
            window.location.href = "http://127.0.0.1:5500/FrontEnd/index.html"
        }

    } catch (error) {
        errorMessage.textContent = error.message
        errorMessage.classList.add("visible")
        console.log("erreur", error)
    }
})

//regarder le msg d'erreur (code retour) en cas d'appel

