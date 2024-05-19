import { initialCards } from "./cards";
const cardTemplate = document.querySelector("#card-template").content;

function createCard(card, likeCard, openImage) {
  const element = cardTemplate.querySelector(".card").cloneNode(true);
  element.querySelector(".card__image").src = card.link;
  element.querySelector(".card__title").textContent = card.name;
  element.querySelector(".card__delete-button").onclick = () =>
    removeCard(element);

  element.querySelector(".card__like-button").onclick = () =>
    likeCard(element.querySelector(".card__like-button"));
  element.querySelector(".card__image").onclick = () => openImage(card);
  return element;
}

function removeCard(card) {
  card.remove();
}

export { createCard, initialCards };
