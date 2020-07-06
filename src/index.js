// write your code here
////// VARIABLES //////
const likeBtn = document.querySelector(".like-button");
const commentContainer = document.querySelector(".comments")
const commentButton = document.querySelector(".comment-button")

////// FETCH IMAGES //////
function fetchImg(){
  fetch("http://localhost:3000/images")
    .then(resp => resp.json())
    .then(imgData => showImg(imgData))
    .catch(err => console.log(err))
}

function showImg(imgData){
  document.getElementById("dog-image").src = `${imgData[0].image}`
  document.getElementById("h2-text").innerText = `${imgData[0].title}`
  document.getElementById("like-id").innerText = `${imgData[0].likes} likes`
}

////// FETCH COMMENTS //////
function fetchComments(){
  fetch("http://localhost:3000/comments")
    .then(resp => resp.json())
    .then(commentData => commentsLoop(commentData))
    .catch(err => console.log(err))

}

function commentsLoop(commentsData){
  commentsData.forEach(commentData => showComments(commentData))
}

function showComments(showData){
  const newComment = `<li>${showData.content}</li>`
  //comment = commentContainer.replaceWith(newComment)
  commentContainer.innerHTML += newComment
}

////// ADD LIKE //////
function likePost(){
  fetch(`http://localhost:3000/images/${id}`)
    .then(resp => resp.json())
    .then(likeData => console.log(likeData))
    .catch(err => console.log(err))
}

function addLike(){
  //when clicked, like count in json increases
}


////// ADD COMMENT //////




////// EVENT LISTENERS //////
likeBtn.addEventListener("click", addLike());
//commentButton.addEventListener("submit", addNewComment());

////// INVOKED FUNCTIONS //////
fetchImg()
fetchComments()