import { initialCards } from "./cards";
const cardTemplate = document.querySelector("#card-template").content;

function createCard(card, likeCard, openImage) {
  const element = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = element.querySelector(".card__image");
  const cardTitle = element.querySelector(".card__title");
  const cardDeleteButton = element.querySelector(".card__delete-button");
  const cardLikeButton = element.querySelector(".card__like-button");

  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardTitle.textContent = card.name;
  cardDeleteButton.addEventListener("click", () => removeCard(element));
  cardLikeButton.addEventListener("click", () => likeCard(cardLikeButton));
  cardImage.addEventListener("click", () => openImage(card));
  return element;
}

function removeCard(card) {
  card.remove();
}
function handleLikeCard(element) {
  element.classList.toggle("card__like-button_is-active");
}

export { createCard, handleLikeCard };
