import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, removeCard, handleLikeButton} from './card.js';
import { openPopup, openProfilePopup, closePopup } from './modal.js';

// Переменные для попапа добавления карточки
const addButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');

// Переменные для попапа редактирования профиля
const editButton = document.querySelector('.profile__edit-button');

// Переменные для попапа просмотра изображения
const viewCardImagePopup = document.querySelector('.popup_type_image');
const viewCardImage = viewCardImagePopup.querySelector('.popup__image');
const viewCardCaption = viewCardImagePopup.querySelector('.popup__caption');

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу
initialCards.forEach(item => {
	const cardElement = createCard(item, removeCard);
	placesList.append(cardElement);
});

// ------ Добавление слушателей событий -------
// Профиль
editButton.addEventListener('click', openProfilePopup);
// Добавление карточки
addButton.addEventListener('click', () => openPopup(newCardPopup));
// Просмотр изображения
placesList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('card__image')) {
    viewCardImage.src = evt.target.src;
    viewCardImage.alt = evt.target.alt;
    viewCardCaption.textContent = evt.target.closest('.card').querySelector('.card__title').textContent;
    openPopup(viewCardImagePopup);
  }
});

// Добавление новой карточки listener
newCardPopup.querySelector('.popup__form').addEventListener('submit', (evt) => {
  evt.preventDefault();
  const nameInput = newCardPopup.querySelector('.popup__input_type_card-name');
  const linkInput = newCardPopup.querySelector('.popup__input_type_url');
  const newCard = {
    name: nameInput.value,
    link: linkInput.value
  };
  const cardElement = createCard(newCard, removeCard);
  placesList.prepend(cardElement);
  nameInput.value = '';
  linkInput.value = '';
  closePopup(newCardPopup);
});

// Listener лайка карточки
placesList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('card__like-button')) {
    handleLikeButton(evt.target, 'card__like-button_is-active');
  }
});