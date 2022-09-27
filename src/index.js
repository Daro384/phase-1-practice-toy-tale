let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn")
  const toyFormContainer = document.querySelector(".container")
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyFormContainer.style.display = "block"
    } else {
      toyFormContainer.style.display = "none"
    }


  })
  const createCard = toy => {
    const theDiv = document.createElement("div")
    theDiv.className = "card"

    const title = document.createElement("h2")
    title.textContent = toy.name
    theDiv.append(title)
    
    const imgUrl = document.createElement("img")
    imgUrl.src = toy.image
    imgUrl.className = "toy-avatar"
    theDiv.append(imgUrl)

    const likesText = document.createElement("p")
    likesText.textContent = `${toy.likes} Likes`
    theDiv.append(likesText)

    const button = document.createElement("button")
    button.className = "like-btn"
    button.id = toy.id
    button.textContent = "Like ❤️"
    theDiv.append(button)
    button.addEventListener("click", event => {
      toy.likes++
      likesText.textContent = `${toy.likes} Likes`
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "content-type":"application/json",
          "accept":"application/json",
        },
        body: JSON.stringify(toy)
      })
    })
    
    document.getElementById("toy-collection").append(theDiv)
  }


  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toyObject => {
    toyObject.forEach(toy => createCard(toy))
  })

  const newToyButton = document.querySelector("input.submit")
  newToyButton.addEventListener("click", event => {
    event.preventDefault()
    newToyObject = {
      id:document.getElementsByClassName("card").length + 1,
      name: document.querySelector("div form input.input-text").value,
      image: document.querySelector("div form br + input").value,
      likes: 0,
    
    }
    createCard(newToyObject)
    const serverPost = {
      method: "post",
      headers: {
        "content-type":"application/json",
        "accept":"application/json",
      },
      body: JSON.stringify(newToyObject)
    }
    fetch("http://localhost:3000/toys", serverPost)
    .then(resp => resp.json)
    .then(text => console.log(text))
    })
})
