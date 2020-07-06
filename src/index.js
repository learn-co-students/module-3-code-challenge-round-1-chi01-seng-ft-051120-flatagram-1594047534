// write your code here
document.addEventListener("DOMContentLoaded", renderPage)

function renderPage() {
    fetchImage();
    
}

function fetchImage() {
    fetch("http://localhost:3000/images/1")
    .then(resp => resp.json())
    .then(json => renderJSON(json))
}

function renderJSON(json) {
    const title = document.getElementsByClassName("title")[`${json.id - 1}`]
    title.innerHTML = json.title 
    title.nextElementSibling.src = `${json.image}`
    var likesMessage 
    if (json.likes === 1) {
        likesMessage = "like"
    } else {
        likesMessage = "likes"
    }
    title.nextElementSibling.nextElementSibling.innerHTML = `<span id="likes-${json.id}"
    class="likes">${json.likes} ${likesMessage}</span>
    <button data-photo-id="${json.id}" data-likes-count="${json.likes}" class="like-button">♥</button>
    <button data-photo-id="${json.id}" data-likes-count="${json.likes}" class="downvote-button">BOO!</button>`
    renderComments(json);
    renderLikeEvent();
    renderDownvoteEvent();
    renderCommentEvent();
    renderDeleteEvent()
}

function renderComments(json) {
    const commentList = document.getElementsByClassName("comments")[`${json.id - 1}`]
    commentList.innerHTML = ``
    json.comments.forEach(comment => {
        renderComment(commentList, comment)
    })
}

function renderComment(commentList, comment) {
    commentList.innerHTML += `<hr><li id="comment-${comment.id}">${comment.content}<button style="float:right" class="delete" data-comment-id="${comment.id}">Delete</button><br><br></li>`
}

function handleEvents(event) {
    if (event.target.className = "like-button") {
        addLike(event)
    }
}

function addLike(event) {
    const url = "http://localhost:3000/images/1"
    const likesNumber = parseInt(event.target.dataset.likesCount) 
    const payload = {likes: likesNumber + 1}
    const reqObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }
    fetch(url, reqObj)
    .then(resp => resp.json())
    .then(json => fetchImage())
}

function addDownvote(event) {
    const url = "http://localhost:3000/images/1"
    const likesNumber = parseInt(event.target.dataset.likesCount) 
    const payload = {likes: likesNumber - 1}
    const reqObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }
    fetch(url, reqObj)
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