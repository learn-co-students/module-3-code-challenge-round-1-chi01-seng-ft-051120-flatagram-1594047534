// write your code here
const imgURL = "http://localhost:3000/images/1"
const commentsURL = "http://localhost:3000/comments"
const title = document.getElementsByClassName("title")[0]
const img = document.getElementsByClassName("image")[0]
const commentSection = document.getElementsByClassName("comments")[0]
const eventRL = [renderLikeEvent, renderCommentEvent]
const likeBtn = document.getElementsByClassName("like-button")

function fetchImage() {
    fetch(imgURL)
    .then(resp => resp.json())
    .then(image => renderImage(image))
    .catch(err => console.log(err))
}

function renderImage(image) {
    title.innerHTML = image.title 
    img.src = `${image.image}`
    img.nextElementSibling.innerHTML = `<span id="likes-${image.id}"
    class="likes">${image.likes} like(s) </span>
    <button data-photo-id="${image.id}" data-likes-count="${image.likes}" class="like-button">♥</button>`
    
    renderComments(image);
    function renderComments(image) {
        commentSection.innerHTML=" "
        image.comments.forEach(comment => {
            commentSection.innerHTML += `<li>${comment.content} <button>delete</button><li>`
            })
        }
        eventRL.forEach(render => {
            render();
    })
}



function addLike(event) {
    const likes = parseInt(event.target.dataset.likesCount) 
    patchLike()
    function patchLike() {
        const reqObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
              likes: likes 
            })
        }
            fetch(imgURL,reqObj)
            .then(resp => resp.json())
            .then(json => fetchImage())
    }
}

function addComment() {
    event.preventDefault();
    const comment = event.target.comment.value 
    event.target.reset();

    const reqObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            imageId: 1,
            content: comment})
    }

    fetch(commentsURL, reqObj)
    .then(resp => resp.json())
    .then(json => fetchImage())
}


function renderLikeEvent() {
    const likeBtn = document.getElementsByClassName("like-button")
    for (let i=0; i<likeBtn.length; i++) {
        likeBtn[i].addEventListener("click", addLike)
    }
}

function renderCommentEvent() {
    const commentForm = document.getElementsByClassName("comment-form")
    for (let i=0; i<commentForm.length; i++) {
        commentForm[i].addEventListener("submit", addComment)
    }
}



//invoke     
fetchImage();