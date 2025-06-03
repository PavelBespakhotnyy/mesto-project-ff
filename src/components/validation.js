// Показывает или скрывает ошибку для поля
function handleInputError(validationConfig, formElement, inputElement, errorMessage, show) {
  if (typeof errorMessage === 'undefined') {
    errorMessage = '';
  }
  if (typeof show === 'undefined') {
    show = true;
  }
  const errorElement = formElement.querySelector('#' + inputElement.id + '-error');
  if (show) {
    inputElement.classList.add(validationConfig.inputErrorClass);
    if (errorElement) {
      errorElement.classList.add(validationConfig.errorClass);
      errorElement.textContent = errorMessage;
    }
  } else {
    inputElement.classList.remove(validationConfig.inputErrorClass);
    if (errorElement) {
      errorElement.classList.remove(validationConfig.errorClass);
      errorElement.textContent = errorMessage;
    }
  }
}

// Проверяет, есть ли невалидные поля
function hasInvalidInput(inputList) {
  for (let i = 0; i < inputList.length; i++) {
    if (!inputList[i].validity.valid) {
      return true;
    }
  }
  return false;
}

// Проверяет одно поле
function validateInput(validationConfig, formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }
  handleInputError(
    validationConfig,
    formElement,
    inputElement,
    inputElement.validationMessage,
    !inputElement.validity.valid
  );
}

// Включает или выключает кнопку отправки
function toggleSubmitButton(validationConfig, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}

// Добавляет обработчики событий для валидации
function setupValidationListeners(validationConfig, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  toggleSubmitButton(validationConfig, inputList, buttonElement);

  inputList.forEach(function(input) {
    input.addEventListener('input', function() {
      validateInput(validationConfig, formElement, input);
      toggleSubmitButton(validationConfig, inputList, buttonElement);
    });
  });
}

// Включает валидацию для всех форм
export function enableValidation(validationConfig) {
  const forms = document.querySelectorAll(validationConfig.formSelector);
  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
    });
    setupValidationListeners(validationConfig, form);
  });
}

// Очищает ошибки и сбрасывает кнопку
export function clearValidation(validationConfig, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach(function(input) {
    handleInputError(validationConfig, formElement, input, '', false);
    input.setCustomValidity('');
  });

  toggleSubmitButton(validationConfig, inputList, buttonElement);
}