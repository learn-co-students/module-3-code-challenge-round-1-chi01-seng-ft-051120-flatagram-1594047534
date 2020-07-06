//////// VARIABLES ////////
const imgContainer = document.querySelector(".image-container");


//////// GET IMAGE FUNCTIONS ////////
function displayImage(){
  fetch("http://localhost:3000/images/1")
    .then(resp => resp.json())
    .then(imgData => displayOneImg(imgData))
    .catch(err => console.log(err))
}

function displayOneImg(imgData){
  console.log(imgData)
  imgInfo = `
  <div class="image-card">
        <h2 class="title">${imgData.title}</h2>
        <img src="${imgData.image}" class="image" />
        <div class="likes-section">
          <span class="likes">${imgData.likes} likes</span>
          <button data-id=${imgData.id} class="like-button">♥</button>
        </div>
        <ul class="comments">
          <li>${imgData.comments[0].content}</li>
          <li>${imgData.comments[1].content}</li>
          <li>${imgData.comments[2].content}</li>
          <li>${imgData.comments[3].content}</li>
        </ul>
        <form class="comment-form">
          <input
            class="comment-input"
            type="text"
            name="comment"
            placeholder="Add a comment..."
          />
          <button class="comment-button" type="submit">Post</button>
        </form>
        `
  imgContainer.innerHTML += imgInfo
  
  const commentForm = document.querySelector(".comment-form");
  imgContainer.addEventListener("click", likeImgHandler)
  commentForm.addEventListener("submit", commentHandler)
}

//////// INCREASE LIKES FUNCTIONS ///////
function likeImgHandler(){
  if (event.target.tagName === 'BUTTON'){
    renderNewLike()
    likeImg()
  }
}

function renderNewLike(){
  const likes = event.target.previousElementSibling
  const likesStr = likes.innerText.split(" ")[0]
  const parsedLikes = parseInt(likesStr)
  likes.innerText = `${parsedLikes + 1}`
}

function patchObj(){
  const likeStr = event.target.previousElementSibling.innerText
  const likes = parseInt(likeStr)
  return {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: likes
    })
  }
}

function likeImg(){
  fetch("http://localhost:3000/images/1", patchObj())
    .then(resp => resp.json())
    .then(imgData => console.log(imgData))
    .catch(err => console.log(err))
}

//////// ADD COMMENT FUNCTIONS /////////
function commentHandler(){
  event.preventDefault()
  const commentText = event.target.name
  postNewComment(commentText)
  event.target.reset()
}

function postNewComment(commentText){
  fetch("http://localhost:3000/comments", postCommentObj(commentText))
  .then(resp => resp.json())
  .then(commentData => renderNewComment(commentData))
  .catch(err => console.log(err))
}

function renderNewComment(commentData){
  
}

function postCommentObj(commentText){
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: commentText
    })
  }  
}


//////// EVENT LISTENERS //////////


//////// INVOKED FUNCTIONS ////////
displayImage()