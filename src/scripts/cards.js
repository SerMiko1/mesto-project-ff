import nadymImage from "../images/Nadym.webp";
import salekhardImage from "../images/Salekhard.webp";
import myravlenkoImage from "../images/Myravlenko.webp";
import novyYrengoyImage from "../images/NovyYrengoy.webp";
import labytnangiImage from "../images/Labytnangi.webp";
import gubkinskyImage from "../images/Gubkinsky.webp";
import avatarImage from "../images/avatar.jpg";

const initialCards = [
  { name: "Салехард", link: salekhardImage },
  { name: "Надым", link: nadymImage },
  { name: "Новый Уренгой", link: novyYrengoyImage },
  { name: "Муравленко", link: myravlenkoImage },
  { name: "Губкинский", link: gubkinskyImage },
  { name: "Лабытнанги", link: labytnangiImage },
];

function createCard({ link, name }, handleImageClick, cardLike, deleteCard) {
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
  cardLikeButton.addEventListener("click", cardLike);
  deleteButton.addEventListener("click", deleteCard);

  return card;
}

function cardLike(evt) {
  const cardLikeButton = evt.target
    .closest(".card")
    .querySelector(".card__like-button");
  cardLikeButton.classList.toggle("card__like-button_is-active");
}

function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

export { initialCards, createCard, cardLike, deleteCard };
