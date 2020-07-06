// write your code here
const imageURL = "http://localhost:3000/images/1"
const commentsURL = "http://localhost:3000/comments"
const eventRenders = [renderLikeEvent, renderDownvoteEvent, renderCommentEvent, renderDeleteEvent]

document.addEventListener("DOMContentLoaded", renderPage)

function renderPage() {
    fetchImage();
}

function fetchImage() {
    fetch(imageURL)
    .then(resp => resp.json())
    .then(image => renderImage(image))
}

function renderImage(image) {
    const title = document.getElementsByClassName("title")[`${image.id - 1}`]
    title.innerHTML = image.title 
    title.nextElementSibling.src = `${image.image}`
    var likesMessage 
    if (image.likes === 1) {
        likesMessage = "like "
    } else {
        likesMessage = "likes"
    }
    title.nextElementSibling.nextElementSibling.innerHTML = `<span id="likes-${image.id}"
    class="likes">${image.likes} ${likesMessage}</span>
    <button data-photo-id="${image.id}" data-likes-count="${image.likes}" class="like-button">♥</button>
    <button data-photo-id="${image.id}" data-likes-count="${image.likes}" class="downvote-button">😠</button>`
    renderComments(image);
    eventRenders.forEach(render => {
        render();
    })
}

function renderComments(image) {
    const commentList = document.getElementsByClassName("comments")[`${image.id - 1}`]
    commentList.innerHTML = ``
    image.comments.forEach(comment => {
        renderComment(commentList, comment)
    })
}

function renderComment(commentList, comment) {
    commentList.innerHTML += `<hr><li id="comment-${comment.id}">${comment.content}<button style="float:right" class="delete" data-comment-id="${comment.id}">Delete</button><br><br></li>`
}

function addLike(event) {
    const likesNumber = parseInt(event.target.dataset.likesCount) 
    const payload = {likes: likesNumber + 1}
    patchLikes(payload)
}

function addDownvote(event) {
    const likesNumber = parseInt(event.target.dataset.likesCount) 
    const payload = {likes: likesNumber - 1}
    patchLikes(payload)
}

function patchLikes(payload) {
    const reqObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }
    fetch(imageURL, reqObj)
    .then(resp => resp.json())
    .then(json => fetchImage())
}

function renderLikeEvent() {
    const likeButtons = document.getElementsByClassName("like-button")
    for (let i=0; i<likeButtons.length; i++) {
        likeButtons[i].addEventListener("click", addLike)
    }
}

function renderCommentEvent() {
    const commentsForms = document.getElementsByClassName("comment-form")
    for (let i=0; i<commentsForms.length; i++) {
        commentsForms[i].addEventListener("submit", addComment)
    }
}

function renderDownvoteEvent() {
    const downvoteButtons = document.getElementsByClassName("downvote-button")
    for (let i=0; i<downvoteButtons.length; i++) {
        downvoteButtons[i].addEventListener("click", addDownvote)
    }
}

function addComment() {
    event.preventDefault();
    const comment = event.target.comment.value 
    const payload = {
        imageId: 1,
        content: comment
    }
    event.target.reset();

    const reqObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }
    fetch("http://localhost:3000/comments", reqObj)
    .then(resp => resp.json())
    .then(json => fetchImage())
}

function renderDeleteEvent() {
    const deleteButtons = document.getElementsByClassName("delete")
    for (let i=0; i<deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", deleteComment)
    }
}

function deleteComment(event) {
    const comment = event.target.dataset.commentId 
    const url = "http://localhost:3000/comments" + "/" + comment 
    const reqObj = {method: "DELETE"}
    fetch(url, reqObj)
    .then(resp => resp.json())
    .then(json => fetchImage())
}