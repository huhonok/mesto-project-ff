function openModal(popup) {
  const popupCloseButton = popup.querySelector(".popup__close");

  const onCloseButtonFunction = (evt) => {
    closeModal(popup);
    removeListeners(popupCloseButton, popup, onCloseButtonFunction, onKeydownFunction, onClickFunction);
  };

  const onKeydownFunction = (evt) => {
    if (evt.key === "Escape") {
      closeModal(popup);
      removeListeners(
        popupCloseButton,
        popup,
        onCloseButtonFunction,
        onKeydownFunction,
        onClickFunction
      );
    }
  };
  const onClickFunction = (evt) => {
    if (evt.currentTarget === evt.target) {
      closeModal(popup);
      removeListeners(
        popupCloseButton,
        popup,
        onCloseButtonFunction,
        onKeydownFunction,
        onClickFunction
      );
    }
  };

  popupCloseButton.addEventListener("click", onCloseButtonFunction);
  document.addEventListener("keydown", onKeydownFunction);
  popup.addEventListener("click", onClickFunction);

  popup.classList.remove("popup_is-animated");
  popup.classList.add("popup_is-opened");
}

function closeModal(popup) {
  popup.classList.add("popup_is-animated");
  popup.classList.remove("popup_is-opened");
}

function removeListeners(
  popupCloseButton,
  popup,
  onCloseButtonFunction,
  onKeydownFunction,
  onClickFunction
) {
  popupCloseButton.removeEventListener("click", onCloseButtonFunction);
  document.removeEventListener("keydown", onKeydownFunction);
  popup.removeEventListener("click", onClickFunction);
}

export { openModal, closeModal };
