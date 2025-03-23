// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(item, removeCard) {
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
// @todo: Функция удаления карточки
function removeCard(cardElement) {
	if (cardElement) {
		cardElement.remove();
	}
}

// @todo: Вывести карточки на страницу
initialCards.forEach(item => {
	const cardElement = createCard(item, removeCard);
	placesList.append(cardElement);
});
