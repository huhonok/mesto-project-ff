function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}
function handleMouseDown(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (evt.target.classList.contains("popup_is-opened")) {
    closeModal(openedPopup);
  }
  if (evt.target.classList.contains("popup__close")) {
    closeModal(openedPopup);
  }
}

function openModal(popup) {
  popup.classList.remove("popup_is-animated");
  popup.classList.add("popup_is-animated");
  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 1);

  document.addEventListener("keydown", handleEscape);
  document.querySelectorAll(".popup").forEach((popup) => {
    popup.addEventListener("mousedown", handleMouseDown);
  });
}

function closeModal(popup) {
  popup.classList.add("popup_is-animated");
  popup.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", handleEscape);
  document.querySelectorAll(".popup").forEach((popup) => {
    popup.addEventListener("mousedown", handleMouseDown);
  });
}

export { openModal, closeModal };
