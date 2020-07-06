const imageContainer = document.querySelector(".image-container");
const commentForm = document.querySelector(".comment-form")
const likesButton = document.querySelector(".likes-section")
const commentsText = document.querySelector(".comments")




function fetchImages(){
  fetch("http://localhost:3000/images")
    .then(resp => resp.json())
    .then(imagesData => renderImages(imagesData))
    .catch(err => console.log(err))
}

function renderImages(imagesData){
  imagesData.forEach(imageData => createImage(imageData))
}

function createImage(imageData){
  const div = `
    <div class="image-card">
    <h2 class="title">${imageData.title} </h2>
      <img src=${imageData.image} class="image" />
  `
  imageContainer.innerHTML += div
}


function fetchComments(){
  fetch("http://localhost:3000/comments")
  .then(resp => resp.json())
  .then(commentsData => createComment(commentsData))
  .catch(err => console.log(err))
}

function createComments(commentsData){
  commentsData.forEach(commentData => createComment(commentData))
}

function createComment(commentData){
}


function addLike(){
  debugger
}

//////////////////COMMENTS//////////////////////
function submitNewComment() {
  event.preventDefault()
  const name = event.target.value
  postNewComment(name)
  event.target.reset()
}

function postCommentObj(name){
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: comment,
    })
  }
}

function postNewComment(name){
  fetch("http://localhost:3000/comments", postCommentObj(comments))
  .then(resp => resp.json())
  .then(commentData => console.log(commentData))
  .catch(err => console.log(err))
}

//////////////////EVENT LISTENERS///////////////////
likesButton.addEventListener("click", addLike)
commentForm.addEventListener("submit", submitNewComment)

///////////////////INVOKED FUNCTIONS////////////////
fetchImages();
fetchComments();