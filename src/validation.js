const showInputError = (formElement, inputElement, config, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config["errorClass"]);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config["inputErrorClass"]);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config["errorClass"]);
  errorElement.textContent = "";
  errorElement.classList.remove(config["inputErrorClass"]);
};

const toggleButtonState = (submitButton, inputList, config) => {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(config.inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(config.inactiveButtonClass);
    submitButton.disabled = false;
  }
};

function hasInvalidInput(inputList) {
  for (let i = 0; i < inputList.length; i++) {
    if (!inputList[i].validity.valid) {
      return true;
    }
  }
  return false;
}

const isValid = (formElement, inputElement, config) => {
  let errorMessage;
  if (inputElement.validity.patternMismatch) {
    errorMessage = inputElement.dataset.errorMessage;
  } else if (!inputElement.validity.valid) {
    errorMessage = inputElement.validationMessage;
  }

  if (errorMessage) {
    showInputError(formElement, inputElement, config, errorMessage);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config["inputSelector"])
  );
  const buttonElement = formElement.querySelector(
    config["submitButtonSelector"]
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, config);
      toggleButtonState(buttonElement, inputList, config);
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
  inputList.forEach((inputElement) =>
    hideInputError(popup, inputElement, config)
  );
  const buttonElement = popup.querySelector(config["submitButtonSelector"]);
  buttonElement.disabled = true;
};

export { enableValidation, clearValidation };
