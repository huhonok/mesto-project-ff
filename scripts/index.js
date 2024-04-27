const cardTemplate = document.querySelector("#card-template").content;
const placesItems = document.querySelector(".places__list");

function addCard(card) {
  const element = cardTemplate.querySelector(".card").cloneNode(true);
  element.querySelector(".card__image").src = card.link;
  element.querySelector(".card__title").textContent = card.name;
  element.querySelector(".card__delete-button").onclick = () =>
    removeCard(element);
  return element;
}

function removeCard(card) {
  card.remove();
}

initialCards.forEach(function (card) {
  placesItems.append(addCard(card));
});
