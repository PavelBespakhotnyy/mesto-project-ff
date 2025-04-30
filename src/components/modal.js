const editPopup = document.querySelector('.popup_type_edit');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  popup.classList.add('popup_is-animated');
  document.addEventListener('keydown', handleEscClose);
}
  
// Функция открыия профиля
export function openProfilePopup() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  editPopup.classList.add('popup_is-animated');
  openPopup(editPopup);
}

// Изменение профиля
editPopup.querySelector('.popup__form').addEventListener('submit', (evt) => {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(editPopup);
});

// Функция закрытия popup
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
}
  
  // Закрытие popup по клавише Escape
function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) closePopup(openedPopup);
  }
}
  
  // Закрытие popup по клику на оверлей
document.addEventListener('click', (evt) => {
  const openedPopup = document.querySelector('.popup_is-opened');
  if (openedPopup && evt.target === openedPopup) {
    closePopup(openedPopup);
  }
});
  
  // Кнопка закрытия popup
document.querySelectorAll('.popup__close').forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});