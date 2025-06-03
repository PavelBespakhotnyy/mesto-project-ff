const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-39',
  headers: {
    authorization: 'fe078bf1-59cf-4ddf-a5f6-b09976813d40',
    'Content-Type': 'application/json'
  }
};

// Проверка ответа сервера
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject('Error: ' + res.status);
  }
}

// Получение информации о пользователе
export const getUserInfo = () => 
  fetch(`${config.baseUrl}/users/me`, { headers: config.headers }).then(checkResponse);

// Обновление профиля пользователя
export const updateUserProfile = (name, about) => 
  fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  }).then(checkResponse);

// Обновление аватара пользователя
export const updateUserAvatar = avatarUrl => 
  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarUrl })
  }).then(checkResponse);

// Получение карточек
export const getCards = () => 
  fetch(`${config.baseUrl}/cards`, { headers: config.headers }).then(checkResponse);

// Создание новой карточки
export const createCard = ({ name, link }) => 
  fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ name, link })
  }).then(checkResponse);

// Удаление карточки
export const deleteCard = cardId => 
  fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }).then(checkResponse);

// Добавление лайка
export const addLike = cardId => 
  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  }).then(checkResponse);

// Удаление лайка
export const removeLike = cardId => 
  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }).then(checkResponse);