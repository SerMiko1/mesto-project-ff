// будущий конфиг с токеном и индификатором  URL https://mesto.nomoreparties.co/v1/wff-cohort-5 ТОКЕН 4897b25e-3ced-41b1-a5e9-edb938580261

const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-5",
  headers: {
    authorization: "4897b25e-3ced-41b1-a5e9-edb938580261",
    "Content-Type": "application/json",
  },
};

// добавил универсальную функцию запроса с проверкой ответа
function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

// Функция проверки ответа
function checkResponse(res) {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
}

// Функция отправки обновленных данных профиля
function editProfileInfo(name, about) {
  return request(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
}

// Функция получения обновленных данных профиля
function getProfileInfo() {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  });
}

// Функция получения списка карточек
function getInitialCards() {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers,
  });
}

// Функция обновления аватара
function updateAvatar(avatar) {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  });
}

// Функция создания карточки
function addCard(name, link) {
  return request(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  });
}

// Функция удаления карточки
function deleteCard(cardId) {
  return request(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
}

// Функция лайка карточки
function likeCard(cardId) {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  });
}

// Функция дизлайка карточки
function dislikeCard(cardId) {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
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
