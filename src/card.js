import { addLike, removeLike } from "./api.js";
const cardTemplate = document.querySelector("#card-template").content;

function createCard(card, likeCard, openImage, deleteCard, myId) {
  const element = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = element.querySelector(".card__image");
  const cardTitle = element.querySelector(".card__title");
  const cardDeleteButton = element.querySelector(".card__delete-button");
  const cardLikeButton = element.querySelector(".card__like-button");
  const cardLikes = element.querySelector(".card__like-caption");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardLikes.textContent = card.likes.length;
  cardTitle.textContent = card.name;

  if (card.owner._id !== myId) {
    cardDeleteButton.classList.add("card__delete-button-hidden");
  } else {
    cardDeleteButton.addEventListener("click", () => deleteCard(element, card));
  }
  cardLikeButton.addEventListener("click", () =>
    likeCard(cardLikeButton, cardLikes, card)
  );
  cardImage.addEventListener("click", () => openImage(card));
  if (isLikedByMe(card.likes, myId)) {
    cardLikeButton.classList.toggle("card__like-button_is-active");
  }
  return element;
}

function handleLikeCard(button, caption, card) {
  const cardId = card._id;
  let response;
  if (button.classList.contains("card__like-button_is-active")) {
    response = removeLike(cardId);
  } else {
    response = addLike(cardId);
  }
  response.then((res) => {
    caption.textContent = res.likes.length;
    button.classList.toggle("card__like-button_is-active");
  });
}

function isLikedByMe(likes, myId) {
  for (let i = 0; i < likes.length; i++) {
    if (likes[i]._id === myId) {
      return true;
    }
  }
  return false;
}
export { createCard, handleLikeCard };
