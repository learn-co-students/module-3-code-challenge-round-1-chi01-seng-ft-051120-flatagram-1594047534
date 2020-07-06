/////// CONSTANTS //////////
const likeButton = document.getElementById('like-button')
const commentForm = document.querySelector('form')

/////// FUNCTIONS //////////
function fetchImage() {
    fetch('http://localhost:3000/images/1')
    .then(resp => resp.json())
    .then(images => {
        console.log(images.comments[0].content)
        const h2 = document.querySelector('h2')
        h2.innerHTML = images.title
        const span = document.querySelector('span')
        span.innerHTML = `${images.likes} likes`
        const img = document.getElementById('image')
        img.setAttribute('src', `${images.image}`)
        const ul = document.querySelector('ul')
        images.comments.forEach(comment => {
            let li = document.createElement('li')
             li.innerHTML = comment.content
             ul.append(li)
        })
    })
    .catch(err => console.log(err))
}

function patchImgObj(){
    const likeString = event.target.previousElementSibling.innerText.slice(0, -6)
    const likes = parseInt(likeString)
    return {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            likes: likes + 1
        })
    }
}

function renderNewLike(){
    const likeString = event.target.previousElementSibling.innerText.slice(0, -6)
    const likes = parseInt(likeString)
    event.target.previousElementSibling.innerText = `${likes + 1} Likes`
}

function likeImage(){
    const id = event.target.dataset.id
    fetch(`http://localhost:3000/images/${id}`, patchImgObj())
    .then(resp => resp.json())
    .then(image => console.log(image))
    .catch(err => console.log(err))
}

function imageLikeHandler(){
    likeImage()
    renderNewLike()
}

function postCommentObj(){
    const content = event.target[0].value
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            imageId: '1',
            content: content
        })
    }
}
function submitComment(){
    event.preventDefault()
    
    // const id = event.target.dataset.id
    fetch('http://localhost:3000/comments', postCommentObj())
    .then(resp => resp.json())
    .then(comment => {
        const ul = document.querySelector('ul')
        const li = document.createElement('li')
        li.innerHTML = comment.content
        ul.append(li)
        commentForm.reset()
    })
}



/////// EVENT LISTENERS

likeButton.addEventListener('click', imageLikeHandler)
commentForm.addEventListener('submit', submitComment)


////// INVOKED FUNCTIONS /////////

fetchImage()


