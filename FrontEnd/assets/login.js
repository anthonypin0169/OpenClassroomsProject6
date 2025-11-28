const loginSection = document.querySelector("#login")
const form = document.querySelector("form")
const footer = document.querySelector("footer")

const connectBtn = document.createElement("btn")
connectBtn.textContent = "Se connecter"
connectBtn.classList.add("connectBtn")
form.appendChild(connectBtn)

const email = document.getElementById("email")
const password = document.getElementById("password")



form.addEventListener("submit", async function (event)  {
    event.preventDefault()

    const user = {
        email : emailInput.value,
        password : passwordInput.value
    }

    //Partie qui gere les echanges avec l'API
    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(user)
        })
        console.log(response)

        if(!response.ok){
            const errorData = await response.json()
            console.log(errorData.message)
        }
        
        const data = await response.json()
        if(data.token){
            localStorage.setItem("token", data.token)
            window.location.href = "http://127.0.0.1:5500/FrontEnd/index.html"
        }else{
            console.log("ID incorrects.")
        }

    } catch (error) {
        console.log("erreur", error)
    }
})



    






    //Clique sur btn, envoie des infos, si true chargement page d'acceuil, sinon msg erreur. ()

    //appel à l'api, revoi token, stockage dans session storage (ok)

    //si token enregistré ,changement d'affichage (ok)

    //changer le libiele sur filter.js soit avec display soit en changeant l'attribut ()