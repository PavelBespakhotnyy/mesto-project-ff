// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция для создания карточки
export function createCard(item, removeCard, handleCardClick) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  deleteButton.addEventListener('click', function() {
    removeCard(cardElement);
  });

  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', function () {
    likeCard(cardLikeButton);
  });

  cardImage.addEventListener('click', function () {    
    handleCardClick(item.link, item.name); 
  });

  return cardElement;
}

// Функция обработки удаления карточки
export function removeCard(cardElement) {
	if (cardElement) {
		cardElement.remove();
	}
}

// Функция обработки лайка
function likeCard(card) {
  if (card) {
    card.classList.toggle('card__like-button_is-active');
  }
}

