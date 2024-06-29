import { createCard, handleLikeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getInfoAboutMe,
  editInfoAboutMe,
  getInitialCards,
  addCard,
  deleteCard,
  updateAvatar,
} from "./api.js";
import "./index.css";

const placesItems = document.querySelector(".places__list");
const profileImage = document.querySelector(".profile__image");

const editProfileButton = document.querySelector(".profile__edit-button");
const addProfileButton = document.querySelector(".profile__add-button");
const editProfileAvatarButton = document.querySelector(
  ".edit__profile__image__button"
);

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeAvatarEdit = document.querySelector(".popup_type_avatar_edit");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const editProfileForm = document.forms["edit_profile"];
const createNewCardForm = document.forms["new_place"];
const updateAvatarForm = document.forms["update_avatar"];

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

let myId;

Promise.all([getInfoAboutMe(), getInitialCards()])
.then((results) => {
  const info = results[0];
  profileTitle.textContent = info.name;
  profileDescription.textContent = info.about;
  profileImage.src = info.avatar;
  myId = info._id;

  Array.from(results[1]).forEach(function (card) {
    placesItems.append(
      createCard(card, handleLikeCard, handleOpenImage, handleDeleteCard, myId)
    );
  });
})
.catch((err) => {
  console.log(err);
});

const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

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

  evt.submitter.textContent = "Сохранение...";
  addCard(placeName, link)
    .then((res) => {
      placesItems.prepend(
        createCard(res, handleLikeCard, handleOpenImage, handleDeleteCard, myId)
      );

      closeAndClearModal(popupTypeNewCard);
      createNewCardForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });
}

function closeAndClearModal(popup) {
  closeModal(popup);
  clearValidation(config, popup);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";

  editInfoAboutMe(
    editProfileForm.elements.name.value,
    editProfileForm.elements.description.value
  )
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closeAndClearModal(popupTypeEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });
}

function handleUpdateAvatarSubmit(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";
  updateAvatar(updateAvatarForm.elements.link.value)
    .then((res) => {
      profileImage.src = res.avatar;
      closeAndClearModal(popupTypeAvatarEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });
  updateAvatarForm.reset();
}

function handleEditProfileButtonClick() {
  editProfileForm.elements.name.value = profileTitle.textContent;
  editProfileForm.elements.description.value = profileDescription.textContent;
  openModal(popupTypeEdit);
}

function handleMouseDown(evt) {
  if (
    evt.target.classList.contains("popup_is-opened") ||
    evt.target.classList.contains("popup__close")
  ) {
    closeAndClearModal(evt.currentTarget);
    createNewCardForm.reset();
  }
}

function handleDeleteCard(element, card) {
  deleteCard(card._id).then((res) => {
    element.remove();
  })
  .catch((err) => {
    console.log(err);
  });
}

function handleEditProfileAvatarClick() {
  openModal(popupTypeAvatarEdit);
}

function handleAddProfileButtonClick() {
  openModal(popupTypeNewCard);
}

popupTypeNewCard.addEventListener("submit", handleCreateCardFormSubmit);
popupTypeEdit.addEventListener("submit", handleEditFormSubmit);
popupTypeAvatarEdit.addEventListener("submit", handleUpdateAvatarSubmit);

editProfileButton.addEventListener("click", handleEditProfileButtonClick);
addProfileButton.addEventListener("click", handleAddProfileButtonClick);
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", handleMouseDown);
});
editProfileAvatarButton.addEventListener("click", handleEditProfileAvatarClick);

enableValidation(config);
