import { likeCard, dislikeCard } from "./api";

function createCard(cardData, profileId, onLike, onDelete, onOpenImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const cardLikeButton = card.querySelector(".card__like-button");
  const cardLikeCounter = card.querySelector(".card__like-counter");
  const isLiked = cardData.likes.some((likeItem) => likeItem._id === profileId);
  const deleteButton = card.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardLikeCounter.textContent = cardData.likes.length;

  if (cardData.owner._id === profileId) deleteButton.style.display = "block";
  else deleteButton.style.display = "none";

  if (isLiked) cardLikeButton.classList.add("card__like-button_is-active");
  else cardLikeButton.classList.remove("card__like-button_is-active");

  cardImage.addEventListener("click", () => onOpenImage(card));
  cardLikeButton.addEventListener("click", () => onLike(card, cardData));
  deleteButton.addEventListener("click", () => onDelete(card, cardData));

  return card;
}

// лайк карточки
function changeLike(card, cardData) {
  const cardLikeButton = card.querySelector(".card__like-button");
  const cardLikeCounter = card.querySelector(".card__like-counter");

  if (cardLikeButton.classList.contains("card__like-button_is-active")) {
    dislikeCard(cardData._id)
      .then((data) => {
        cardLikeCounter.textContent = data.likes.length;
        cardLikeButton.classList.remove("card__like-button_is-active");
      })
      .catch((error) =>
        console.error("Ошибка при добавлении карточки:", error)
      );
  } else {
    likeCard(cardData._id)
      .then((data) => {
        cardLikeCounter.textContent = data.likes.length;
        cardLikeButton.classList.add("card__like-button_is-active");
      })
      .catch((error) =>
        console.error("Ошибка при добавлении карточки:", error)
      );
  }
}

// удаление карточки
function deleteMyCard(card) {
  card.remove();
}

export { createCard, changeLike, deleteMyCard };
