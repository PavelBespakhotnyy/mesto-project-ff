import '../pages/index.css';
import { createCard, handleLike, handleDeleteCard } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { 
  getUserInfo, 
  getCards, 
  createCard as createCardApi, 
  updateUserProfile,
  updateUserAvatar
} from './api.js';
import defaultAvatarImage from '../images/avatar.jpg';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const elements = {
  editPopup: document.querySelector('.popup_type_edit'),
  newCardPopup: document.querySelector('.popup_type_new-card'),
  imagePopup: document.querySelector('.popup_type_image'),
  profileName: document.querySelector('.profile__title'),
  profileJob: document.querySelector('.profile__description'),
  nameInput: document.querySelector('.popup__input_type_name'),
  jobInput: document.querySelector('.popup__input_type_description'),
  cardNameInput: document.querySelector('.popup__input_type_card-name'),
  cardLinkInput: document.querySelector('.popup__input_type_url'),
  placesList: document.querySelector('.places__list'),
  editButton: document.querySelector('.profile__edit-button'),
  addButton: document.querySelector('.profile__add-button'),
  popupImage: document.querySelector('.popup__image'),
  popupCaption: document.querySelector('.popup__caption')
};

let userId;

const avatarEditButton = document.querySelector('.profile__image-edit-button');
const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
const profileAvatar = document.querySelector('.profile__image');

// Функция обновления аватара в интерфейсе
const updateAvatarDisplay = (avatarUrl) => {
  const imageUrl = avatarUrl || defaultAvatarImage;
  profileAvatar.style.backgroundImage = `url('${imageUrl}')`;
};

// Открытие попапа редактирования аватара
avatarEditButton.addEventListener('click', () => {
  clearValidation(validationConfig, avatarForm);
  openPopup(avatarPopup);
});

// Функция управления текстом кнопки сабмита
function renderLoading(submitButton, isLoading, buttonText, loadingText) {
  if (buttonText === undefined) {
    buttonText = 'Сохранить';
  }
  if (loadingText === undefined) {
    loadingText = 'Сохранение...';
  }
  if (isLoading) {
    submitButton.textContent = loadingText;
  } else {
    submitButton.textContent = buttonText;
  }
}

// Обработчик формы редактирования профиля
elements.editPopup.querySelector('.popup__form').addEventListener('submit', evt => {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  renderLoading(submitButton, true);

  updateUserProfile(elements.nameInput.value, elements.jobInput.value)
    .then(userData => {
      elements.profileName.textContent = userData.name;
      elements.profileJob.textContent = userData.about;
      closePopup(elements.editPopup);
    })
    .catch(err => console.error('Ошибка обновления профиля:', err))
    .finally(() => {
      renderLoading(submitButton, false);
    });
});

// Обработчик формы добавления новой карточки
elements.newCardPopup.querySelector('.popup__form').addEventListener('submit', evt => {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  renderLoading(submitButton, true, 'Создать', 'Создание...');

  const newCardData = {
    name: elements.cardNameInput.value,
    link: elements.cardLinkInput.value
  };

  createCardApi(newCardData)
    .then(cardData => {
      elements.placesList.prepend(createCard(cardData, handleCardClick, userId, handleLike, handleDeleteCard));
      evt.target.reset();
      closePopup(elements.newCardPopup);
    })
    .catch(err => console.error('Ошибка создания карточки:', err))
    .finally(() => {
      renderLoading(submitButton, false, 'Создать');
    });
});

// Обработчик формы обновления аватара
avatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  renderLoading(submitButton, true);

  const avatarUrl = evt.target.elements.avatar.value;
  
  updateUserAvatar(avatarUrl)
    .then((userData) => {
      updateAvatarDisplay(userData.avatar);
      evt.target.reset();
      closePopup(avatarPopup);
    })
    .catch(err => console.error('Ошибка при обновлении аватара:', err))
    .finally(() => {
      renderLoading(submitButton, false);
    });
});

// Обновляем обработку начальной загрузки данных
Promise.all([getUserInfo(), getCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    elements.profileName.textContent = userData.name;
    elements.profileJob.textContent = userData.about;
    updateAvatarDisplay(userData.avatar);
    cards.forEach(cardData => {
      elements.placesList.append(createCard(cardData, handleCardClick, userId, handleLike, handleDeleteCard));
    });
  })
  .catch(err => console.error('Ошибка загрузки данных:', err));

// Просмотр изображения
const handleCardClick = (link, name) => {
  elements.popupImage.src = link;
  elements.popupImage.alt = name;
  elements.popupCaption.textContent = name;
  openPopup(elements.imagePopup);
};

// Открытие профиля
const openProfilePopup = () => {
  elements.nameInput.value = elements.profileName.textContent;
  elements.jobInput.value = elements.profileJob.textContent;
  clearValidation(validationConfig, elements.editPopup.querySelector('.popup__form'));
  elements.editPopup.classList.add('popup_is-animated');
  openPopup(elements.editPopup);
};

// Обработчики событий
document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('click', evt => evt.target === popup && closePopup(popup));
});

document.querySelectorAll('.popup__close').forEach(button => {
  button.addEventListener('click', () => closePopup(button.closest('.popup')));
});

elements.editButton.addEventListener('click', openProfilePopup);

elements.addButton.addEventListener('click', () => {
  clearValidation(validationConfig, elements.newCardPopup.querySelector('.popup__form'));
  openPopup(elements.newCardPopup);
});

enableValidation(validationConfig);