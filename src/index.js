// write your code here

const imageContainer = document.querySelector(".image-card");
const commentsContainer = document.querySelector(".comments");
const likeButton = document.querySelector(".like-button");
const viewLikes = document.getElementByClassName("likes");
const commentForm = document.querySelector(".comment-button")

/////////////////////////// FETCH  IMAGES

function fetchImages() {
  fetch("http://localhost:3000/images/1")
    .then((resp) => resp.json())
    .then((imageData) => createImageDiv(imageData))
    .catch((err) => console.log(err));
}

function createImageDiv(imageData) {
  const div = `
  <div class="image-card">
  <h2 class="title">${imageData.title} </h2>
  <img src=${imageData.image} class="image" />
  <div class="likes-section">
    <span class="likes">${imageData.likes} likes</span>
    <button class="like-button">♥</button>
  </div>
  `;
  imageContainer.innerHTML = div;
}

///////////////////////// FETCH COMMENTS

function fetchComments() {
  fetch("http://localhost:3000/comments")
    .then((resp) => resp.json())
    .then((commentsData) => createCommentUl(commentsData))
    .catch((err) => console.log(err));
}

function createCommentUl(commentsData) {
  commentsData.forEach((commentData) => createCommentLi(commentData));
}

function createCommentLi(commentData) {
  const ul = `<ul class="comments">
    <li>${commentData.content}</li>
    </ul>`;
  commentsContainer.innerHTML += ul;
}
////////////////////////// LIKE POST

function liked(){
  frontendLike()
  backendLike()
}

function frontendLike(){
  const likeString = viewLikes.innerText.split(" ")[0]
  const likes = parseInt(likeString)
  viewLikes.innerText = `${likes + 1}`
}
function backendLike() {
  fetch("http://localhost:3000/images/1", patchObj())
    .then((resp) => resp.json())
    .then((imageData) => console.log(imageData)
    .catch((err) => console.log(err))
}

function patchObj() {
  return {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      likes: likes + 1
    }),
  };
}

///////////////////////// MAKE COMMENTS

function commented(){
    event.preventDefault()
    const commentData = event.target.content.value
    makeComment(commentData)
    event.target.reset()
  }


function postCommentObj(commentData){
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      imageId: 1,
      content: commentData,
    })
  }
}
function makeComment(commentData){
  fetch("http://localhost:3000/comments", postCommentObj(commentData))
      .then(resp => resp.json())
      .then(commentData => createCommentLi(commentData))
      .catch(err => console.log(err))
  }

/////////////////////////EVENT LISTENERS

likeButton.addEventListener("click", liked());
commentForm.addEventListener("submit", commented())

/////////////////////////CALL FUNCTIONS

fetchImages();
fetchComments();



/* 
  to delete a comment, I would attach a data-id field to a delete button 
  for each comment within the comments container. 
  then add an event listener waiting for a click. 
  once that happens, then i would make a delete request/fetch.
 
  i made an error in the beginning where i made 2 get fetch requests rather than 
  1. I should have called imageData.comments and looped over each comment and append it 
  to the commentsContainer. 
  */
