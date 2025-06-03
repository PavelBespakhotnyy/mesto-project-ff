import { addLike, removeLike, deleteCard } from './api.js';
import { openPopup, closePopup } from './modal.js';

const deleteConfirmPopup = document.querySelector('.popup_type_delete-confirm');
const deleteConfirmForm = deleteConfirmPopup.querySelector('.popup__form');
const cardTemplate = document.querySelector('#card-template').content;
let cardToDelete = null;

// Обработка удаления карточки
export const handleDeleteCard = cardElement => {
  cardToDelete = cardElement;
  openPopup(deleteConfirmPopup);
};

deleteConfirmForm.addEventListener('submit', evt => {
  evt.preventDefault();
  deleteCard(cardToDelete.getAttribute('id'))
    .then(() => {
      cardToDelete.remove();
      closePopup(deleteConfirmPopup);
      cardToDelete = null;
    })
    .catch(error => console.error('Ошибка при удалении карточки:', error));
});

// Обработка лайков
export const handleLike = (cardId, likeButton, likeCounter) => {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  (isLiked ? removeLike : addLike)(cardId)
    .then(card => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeCounter.textContent = card.likes.length;
    })
    .catch(error => console.error('Ошибка при обработке лайка:', error));
};

// Создание карточки
export const createCard = function(cardData, handleClickOnImage, userId, handleLikeCallback, handleDeleteCallback) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardImage.onclick = function() {
    handleClickOnImage(cardData.link, cardData.name);
  };

  cardTitle.textContent = cardData.name;
  cardElement.id = cardData._id;

  if (cardData.owner) {
    cardElement.dataset.ownerId = cardData.owner._id;
  }

  if (likeCounter) {
    if (cardData.likes && cardData.likes.length) {
      likeCounter.textContent = cardData.likes.length;
    } else {
      likeCounter.textContent = 0;
    }
  }

  likeButton.addEventListener('click', function() {
    handleLikeCallback(cardData._id, likeButton, likeCounter);
  });

  if (!cardData.owner || cardData.owner._id === userId) {
    deleteButton.addEventListener('click', function() {
      handleDeleteCallback(cardElement);
    });
  } else {
    deleteButton.remove();
  }

  if (cardData.likes) {
    for (let i = 0; i < cardData.likes.length; i++) {
      if (cardData.likes[i]._id === userId) {
        likeButton.classList.add('card__like-button_is-active');
      }
    }
  }

  return cardElement;
};