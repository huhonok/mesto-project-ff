import { createCard, handleLikeCard } from "./card.js";
import { initialCards } from "./cards.js";
import { openModal, closeModal } from "./modal.js";
import "./index.css";

const placesItems = document.querySelector(".places__list");
const editProfileButton = document.querySelector(".profile__edit-button");
const addProfileButton = document.querySelector(".profile__add-button");

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

const editProfileForm = document.forms["edit_profile"];
const createNewCardForm = document.forms["new_place"];

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

initialCards.forEach(function (card) {
  placesItems.append(createCard(card, handleLikeCard, handleOpenImage));
});

function handleOpenImage(card) {
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.textContent = card.name;
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
  profileTitle.textContent = editProfileForm.elements.name.value;
  profileDescription.textContent = editProfileForm.elements.description.value;
  closeModal(popupTypeEdit);
}

function handleEditProfileButtonClick() {
  editProfileForm.elements.name.value = profileTitle.textContent;
  editProfileForm.elements.description.value = profileDescription.textContent;
  openModal(popupTypeEdit);
}

popupTypeNewCard.addEventListener("submit", handleCreateCardFormSubmit);
popupTypeEdit.addEventListener("submit", handleEditFormSubmit);
editProfileButton.addEventListener("click", handleEditProfileButtonClick);
addProfileButton.addEventListener("click", () => openModal(popupTypeNewCard));
