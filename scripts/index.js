// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(item, removeCard) {
  var cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  var cardImage = cardElement.querySelector('.card__image');
  var cardTitle = cardElement.querySelector('.card__title');
  var deleteButton = cardElement.querySelector('.card__delete-button');

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