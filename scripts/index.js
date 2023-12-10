const deleteCard = (evt) => evt.target.closest(".places__item").remove();

const cardsTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".places__list");

const createCard = (cardData, deleteHandler) => {
  const { link, name } = cardData;

  const card = cardsTemplate.querySelector(".places__item").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");

  card.querySelector(".card__image").src = link;
  card.querySelector(".card__image").alt = name;
  card.querySelector(".card__title").textContent = name;

  deleteButton.addEventListener("click", deleteHandler);

  return card;
};

initialCards.forEach((card) => cardsList.append(createCard(card, deleteCard)));
