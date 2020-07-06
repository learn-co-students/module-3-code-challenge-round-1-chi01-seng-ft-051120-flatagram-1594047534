///////////  VARIABLES /////////////
document.addEventListener('DOMContentLoaded', function() {
  const commentUrl="http://localhost:3000/comments"
  const imageUrl="http://localhost:3000/images/1"

form.addEventListener("submit", submitNewComment);
collection.addEventListener("click", (event) => {
  if (event.target.className==="like-btn") {
    increaseLike(event)
  } //else if delete, deleteLike(event)
})


function fetchImages()
  fetch(ImageUrl)
  .then(resp => resp.json())
  .then(images => images.forEach(image => renderOneImage(image)))

}

// function fetchComments() {
//   fetch(CommentUrl)
//   .then(resp => resp.json())
//   .then(comments => comments.forEach(comment => renderOneComment(comment)))
//   .catch(err => console.log(err))
// }

function renderOneComment(comment) {
  const commentCard = `<div class="card" data-comment-id= "${comment.id}">
  <h2>${comment.content}</h2>
  <p>${comment.likes} Like(s) </p>
  </div>`
  collection.innerHTML += commentCard
}

function submitNewComment(event) {
  event.preventDefault()
  const formData = {
  content: event.target.content.value
  }

    
    ///post
  const formData = {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }

    fetch(commentUrl, formData)
    .then(resp => resp.json())
    .then(toy => renderOneComment(comment))
  }


  function increaseLike(event) {
    const likeElement = event.target.previousElementSibling
    const likeStr = likeElement.innerText.split(" ")[0]
    const updatedLike = parseInt(likeStr) + 1

    const formData = {
      likes: updatedLike
    }

  fetchComments()
  fetchImages()

});