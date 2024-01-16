// будущий конфиг с токеном и индификатором  URL https://mesto.nomoreparties.co/v1/wff-cohort-5 ТОКЕН 4897b25e-3ced-41b1-a5e9-edb938580261

const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-5",
  headers: {
    authorization: "4897b25e-3ced-41b1-a5e9-edb938580261",
    "Content-Type": "application/json",
  },
};

function checkResponse(res) {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
}

// получение данных профиля
function getProfileInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

// отправление обновленных данных профиля
function editProfileInfo(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => checkResponse(res));
}

// получение обновленных данных профиля
function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

// обновление аватара
function updateAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  }).then((res) => checkResponse(res));
}

// создание карточки
function addCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => checkResponse(res));
}

// удаление карточки
function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

// лайк карточки
function likeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

// дизлайк картчоки
function dislikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

export {
  getProfileInfo,
  editProfileInfo,
  getInitialCards,
  updateAvatar,
  addCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
