import { createCard } from "./card.js";
import { initialCards } from "./cards.js";
import { openModal, closeModal } from "./modal.js";
import "./index.css";

const placesItems = document.querySelector(".places__list");
const editProfileButton = document.querySelector(".profile__edit-button");
const addProfileButton = document.querySelector(".profile__add-button");

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

const editProfileForm = popupTypeEdit.querySelector(".popup__form");
const createNewCardForm = popupTypeNewCard.querySelector(".popup__form");

let nameInput = document.querySelector(".profile__title").textContent;
let jobInput = document.querySelector(".profile__description").textContent;

initialCards.forEach(function (card) {
  placesItems.append(createCard(card, handleLikeCard, handleOpenImage));
});

function handleLikeCard(element) {
  const classes = element.classList;
  if (classes.contains("card__like-button_is-active")) {
    classes.remove("card__like-button_is-active");
  } else {
    classes.add("card__like-button_is-active");
  }
}

function handleOpenImage(card) {
  popupTypeImage.querySelector(".popup__image").src = card.link;
  popupTypeImage.querySelector(".popup__caption").textContent = card.name;
  openModal(popupTypeImage);
}

function handleCreateCardFormSubmit(evt) {
  evt.preventDefault();
  const placeName = createNewCardForm.elements.place_name.value;
  const link = createNewCardForm.elements.link.value;

  placesItems.prepend(
    createCard(
      {
        name: placeName,
        link: link,
      },
      handleLikeCard,
      handleOpenImage
    )
  );

  closeModal(popupTypeNewCard);
  createNewCardForm.reset();
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  nameInput = editProfileForm.elements.name.value;
  jobInput = editProfileForm.elements.description.value;

  document.querySelector(".profile__title").textContent = nameInput;
  document.querySelector(".profile__description").textContent = jobInput;
  closeModal(popupTypeEdit);
}

function handleEditProfileButtonClick() {
  editProfileForm.elements.name.value = nameInput;
  editProfileForm.elements.description.value = jobInput;
  openModal(popupTypeEdit);
}

popupTypeNewCard.addEventListener("submit", handleCreateCardFormSubmit);
popupTypeEdit.addEventListener("submit", handleEditFormSubmit);
editProfileButton.addEventListener("click", handleEditProfileButtonClick);
addProfileButton.addEventListener("click", () => openModal(popupTypeNewCard));
