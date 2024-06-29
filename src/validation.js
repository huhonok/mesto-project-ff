const showInputError = (formElement, inputElement, config, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  const buttonElement = formElement.querySelector(
    config["submitButtonSelector"]
  );

  inputElement.classList.add(config["errorClass"]);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config["inputErrorClass"]);
  buttonElement.disabled = true;
  buttonElement.classList.add(config["inactiveButtonClass"]);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  const buttonElement = formElement.querySelector(
    config["submitButtonSelector"]
  );

  inputElement.classList.remove(config["errorClass"]);
  errorElement.textContent = "";
  errorElement.classList.remove(config["inputErrorClass"]);
  buttonElement.disabled = false;
  buttonElement.classList.remove(config["inactiveButtonClass"]);
};

const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      config,
      inputElement.dataset.errorMessage
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config["inputSelector"])
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(
    document.querySelectorAll(config["formSelector"])
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

const clearValidation = (config, popup) => {
  const inputList = Array.from(popup.querySelectorAll(config["inputSelector"]));
  inputList.forEach((inputElement) => {
    const errorElement = popup.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = "";
  });
};

export { enableValidation, clearValidation };
