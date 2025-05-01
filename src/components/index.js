import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, removeCard} from './card.js';
import { openPopup, closePopup } from './modal.js';

const editPopup = document.querySelector('.popup_type_edit');
const currentNameProfile = document.querySelector('.profile__title');
const currentJobProfile = document.querySelector('.profile__description');
const nameInputProfile = document.querySelector('.popup__input_type_name');
const jobInputProfile = document.querySelector('.popup__input_type_description');


// Переменные для попапа добавления карточки
const addButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');

// Переменные для попапа редактирования профиля
const editButton = document.querySelector('.profile__edit-button');

// Переменные для попапа просмотра изображения
const viewCardImagePopup = document.querySelector('.popup_type_image');
const viewCardImage = viewCardImagePopup.querySelector('.popup__image');
const viewCardCaption = viewCardImagePopup.querySelector('.popup__caption');

// Переменные для popup добавления карточки
const cardNameInputProfile = newCardPopup.querySelector('.popup__input_type_card-name');
const cardLinkInput = newCardPopup.querySelector('.popup__input_type_url');

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу
initialCards.forEach(item => {
	const cardElement = createCard(item, removeCard, handleCardClick);
	placesList.append(cardElement);
});

// Функция открыия профиля
function openProfilePopup() {
  nameInputProfile.value = currentNameProfile.textContent;
  jobInputProfile.value = currentJobProfile.textContent;
  editPopup.classList.add('popup_is-animated');
  openPopup(editPopup);
}

// Изменение профиля
editPopup.querySelector('.popup__form').addEventListener('submit', (evt) => {
  evt.preventDefault();
  currentNameProfile.textContent = nameInputProfile.value;
  currentJobProfile.textContent = jobInputProfile.value;
  closePopup(editPopup);
});

// Переделать? ---------------------
// Закрытие popup по клику на оверлей
document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});

// Переделать ----------------------
// Кнопка закрытия popup
document.querySelectorAll('.popup__close').forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// ------ Добавление слушателей событий -------
// Профиль
editButton.addEventListener('click', openProfilePopup);
// Добавление карточки
addButton.addEventListener('click', () => openPopup(newCardPopup));

// Просмотр изображения
export function handleCardClick(link, name) {
  viewCardImage.src = link;
  viewCardImage.alt = name;
  viewCardCaption.textContent = name;
  openPopup(viewCardImagePopup);
}

// Добавление новой карточки listener
newCardPopup.querySelector('.popup__form').addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCard = {
    name: cardNameInputProfile.value,
    link: cardLinkInput.value
  };
  const cardElement = createCard(newCard, removeCard, handleCardClick);
  placesList.prepend(cardElement);
  cardNameInputProfile.value = '';
  cardLinkInput.value = '';
  closePopup(newCardPopup);
});

