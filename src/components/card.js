// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция для создания карточки
export function createCard(item, removeCard) {
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

  return cardElement;
}

// Функция обработки удаления карточки
export function removeCard(cardElement) {
	if (cardElement) {
		cardElement.remove();
	}
}

// Функция обработки лайка
export function handleLikeButton(button, className) {
    if (button.classList.contains(className)) {
      button.classList.remove(className);
    } else {
      button.classList.add(className);
    }
}