const card = document.querySelector(".image-card");
const cardTitle = document.querySelector(".title");
const cardImg = document.querySelector(".image");
const cardLikes = document.querySelector(".likes");
const cardComments = document.querySelector(".comments");
const cardForm = document.querySelector(".comment-form");

function main() {
  fetchImgData();
}

// FETCH CARD DATA FUNCTIONS
function fetchImgData() {
  fetch("http://localhost:3000/images/1")
    .then((resp) => resp.json())
    .then((imgData) => renderImgData(imgData));
}

function renderImgData(imgData) {
  // Render card title data
  cardTitle.innerHTML = imgData.title;
  // Render card image data
  cardImg.src = imgData.image;
  // Render card likes data
  cardLikes.innerHTML = `${imgData.likes}` + " likes";
  // Clean up and render card comments
  renderComments(imgData);
}

function renderComments(imgData) {
  cardComments.innerHTML = "";
  imgData.comments.forEach((comment) => {
    cardComments.innerHTML += `
      <li>${comment.content}</li><button data-comment-id="${comment.id}" class="delete">delete</button>
    `;
  });
}

// UPDATE LIKES FUNCTIONS
function updateLikes(likes) {
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ likes }),
  };

  fetch("http://localhost:3000/images/1", configObj)
    .then((resp) => resp.json())
    .then((img) => console.log(img))
    .catch((error) => console.log(error.message));
}

// ADD/UPDATE COMMENTS FUNCTIONS
function addComment(comment) {
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      imageId: 1,
      content: comment,
    }),
  };

  fetch("http://localhost:3000/comments", configObj)
    .then((resp) => resp.json())
    .then((comment) => console.log(comment))
    .catch((error) => console.log(error.message));
}

function downvoteImg(event) {
  let likes = event.target.parentElement.children[0];
  likes.innerText = parseInt(likes.innerText) - 1 + " likes";
  updateLikes(likes.innerText[0]);
}
// DELETE COMMENT FUNCTIONS
function deleteComment(event, commentId) {
  return fetch(`http://localhost:3000/comments` + "/" + commentId, {
    method: "delete",
  })
    .then((response) => response.json())
    .then((comment) => {
      event.target.previousElementSibling.remove();
      event.target.remove();
    });
}
// EVENT LISTENERS
card.addEventListener("click", function (event) {
  if (event.target.className == "like-button") {
    let likes = event.target.parentElement.children[0];
    likes.innerText = parseInt(likes.innerText) + 1 + " likes";
    updateLikes(likes.innerText[0]);
  }

  if (event.target.className == "downvote-button") {
    downvoteImg(event);
  }

  if (event.target.className == "delete") {
    const commentId = parseInt(event.target.dataset.commentId);
    deleteComment(event, commentId);
  }
});

cardForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const comment = event.target["comment"].value;
  cardComments.innerHTML += `
    <li>${comment}</li><button data-comment-id="${comment.id}" class="delete">delete</button>
  `;
  addComment(comment);
});

// INVOKED FUNCTIONS
main();
