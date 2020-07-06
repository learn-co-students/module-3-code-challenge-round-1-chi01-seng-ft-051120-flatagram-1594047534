const BASE_URL = "http://localhost:3000"
const IMG_URL = `${BASE_URL}/images/1`
const COMMENT_URL = `${BASE_URL}/comments`
const imgArea = document.getElementsByClassName("image")[0]
const titleArea = document.getElementsByClassName("title")[0]
const likeArea = document.getElementsByClassName("likes")[0]
const commentArea = document.getElementsByClassName("comments")[0]
const likeBttn = document.getElementsByClassName("like-button")[0]
const dislikeBttn = document.getElementsByClassName("dislike-button")[0]
const postBttn = document.getElementsByClassName("comment-button")[0]
const commentField = document.getElementsByClassName("comment-input")[0]

function loadImg() {
  fetch(IMG_URL)
  .then(resp => resp.json())
  .then(img => {
    titleArea.innerText= img.title
    imgArea.src = img.image
    likeArea.innerText= `${img.likes} likes`
    commentArea.innerHTML=""
    img.comments.forEach(comment => {
      commentArea.innerHTML += `<li>${comment.content} <button>delete</button><li>`})
    
  })
}


function likeImg() {
  likeBttn.addEventListener("click", () => {
  const likeNode = document.getElementsByClassName("likes")[0]
  let likes = likeNode.innerText.split(" ")[0]
  let numLikes = parseInt(likes)
  const reqObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "likes": numLikes +=1 
    })
  }
  fetch(IMG_URL, reqObj)
  setTimeout(() => loadImg(), 3)
  })
}

function addComment(){
  postBttn.addEventListener("click", (event) => {
    const reqObjTwo = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "imageId": 1,
        "content": `${commentField.value}`
      })
    }
    event.preventDefault()
    const imgId = document.getElementsByClassName("1")[0]
    fetch(COMMENT_URL, reqObjTwo)
    commentField.value = ""
    setTimeout(() => loadImg(), 3)
  })
  
}


function dislikeImg() {
  dislikeBttn.addEventListener("click", () => {
    const likeNode = document.getElementsByClassName("likes")[0]
    let likes = likeNode.innerText.split(" ")[0]
    let numLikes = parseInt(likes)
    const reqObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "likes": numLikes -=1 
      })
    }
    fetch(IMG_URL, reqObj)
    setTimeout(() => loadImg(), 3)
    })
}


loadImg()
likeImg()
dislikeImg()
addComment()