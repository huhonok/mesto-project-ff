function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

function openModal(popup) {
  popup.classList.add("popup_is-animated");
  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 1);

  document.addEventListener("keydown", handleEscape);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", handleEscape);
}

export { openModal, closeModal };
