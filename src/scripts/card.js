function createCard({ link, name }, handleImageClick, likeCard, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const cardLikeButton = card.querySelector(".card__like-button");
  const deleteButton = card.querySelector(".card__delete-button");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  cardImage.addEventListener("click", handleImageClick);
  cardLikeButton.addEventListener("click", likeCard);
  deleteButton.addEventListener("click", deleteCard);

  return card;
}

function likeCard(evt) {
  const cardLikeButton = evt.target
    .closest(".card")
    .querySelector(".card__like-button");
  cardLikeButton.classList.toggle("card__like-button_is-active");
}

function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

export { createCard, likeCard, deleteCard };
