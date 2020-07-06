// write your code here

//// variables ////
const imageContainer = document.querySelector('.image-container')
//const commentButton = document.querySelector('.comment-button')
//// fetch image and comments functions ////
function fetchImages(){
  fetch('http://localhost:3000/images')
  .then(resp => resp.json())
  .then(imagesData => createImageDivs(imagesData))
  .catch(err => console.log(err))
}

function fetchComments(){
  fetch('http://localhost:3000/comments')
  .then(resp => resp.json())
  .then(commentsData => createCommentLists(commentsData))
  .catch(err => console.log(err))
}

function createImageDivs(imagesData){
  imagesData.forEach(imageData => createImageDiv(imageData))
}

function createCommentLists(commentsData){
  commentsData.forEach(commentData => createCommentList(commentData))
}

function createCommentList(commentData){
  const li = `<li>${commentData.content}</li>`
  const ul = document.querySelector('.comments')
  console.log(ul)
  ul.innerHTML += li
}

function createImageDiv(imageData){
  console.log(imageData)
  const div = `
    <div class="image-card">
      <h2 class="title">${imageData.title}</h2>
      <img src=${imageData.image} class="image" />
      <div class="likes-section">
        <span class="likes">${imageData.likes} likes</span>
        <button data-id=${imageData.id} class="like-button">♥</button>
      </div>
      <ul class="comments">
      </ul>
      <form class="comment-form">
        <input
          class="comment-input"
          type="text"
          name="comment"
          value=""
          placeholder="Add a comment..."
        />
        <button class="comment-button" type="submit">Post</button>
      </form>
    </div>
  `
  imageContainer.innerHTML = div
  const commentForm = document.querySelector('.comment-form')
  commentForm.addEventListener('submit', submitNewComment);
}

//// submit comment functions ////
function submitNewComment(){
  event.preventDefault()
  // const comment = event.target.something something
  //unable to get any value from the input so can't do anything with it?  Not sure what I'm missing, I added a value to the new div form... could be because of my choice of handling things earlier?
  debugger
}

//// like image functions ////
function likeImageHandler(){
  if (event.target.className === 'like-button') {
    renderNewLike()
    likeImage()
  }
}

function renderNewLike(){
  const spanTag = event.target.previousElementSibling
  const likeStr = spanTag.innerText.split(" ")[0]
  const likes = parseInt(likeStr)
  spanTag.innerText = `${likes + 1} likes`
}

function likeImage(){
  const id = event.target.dataset.id
  fetch(`http://localhost:3000/images/${id}`, patchObj())
    .then(resp => resp.json())
    .then(imageData => console.log(imageData))
    .catch(err => console.log(err))
}

function patchObj(){
  const likeStr = event.target.previousElementSibling.innerText.split(" ")[0]
  const likes = parseInt(likeStr)
  return {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      likes: likes
    })
  }
}
//// misc functions ////

//// event listeners ////
imageContainer.addEventListener('click', likeImageHandler);

  // I can't for the life of me get this to trigger the event?  I don't know why. On click it should trigger the event that it's listening to and then run the function that follows in the second argument, which will post the comment (but not update the db)

//// invoked functions ////
fetchImages()
fetchComments()
