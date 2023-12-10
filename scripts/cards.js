const initialCards = [
  {
    name: "Салехард",
    link: "../images/Salekhard.webp",
  },
  {
    name: "Надым",
    link: "../images/Nadym.webp",
  },
  {
    name: "Новый Уренгой",
    link: "../images/NovyYrengoy.webp",
  },
  {
    name: "Муравленко",
    link: "../images/Myravlenko.webp",
  },
  {
    name: "Губкинский",
    link: "../images/Gubkinsky.webp",
  },
  {
    name: "Лабытнанги",
    link: "../images/Labytnangi.webp",
  },
];

const deleteCard = (evt) => evt.target.closest(".places__item").remove();

const cardsTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".places__list");

const createCard = (link, name) => {
  const card = cardsTemplate.querySelector(".places__item").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");

  card.querySelector(".card__image").src = link;
  card.querySelector(".card__image").alt = name;
  card.querySelector(".card__title").textContent = name;

  deleteButton.addEventListener("click", deleteCard);

  return card;
};

initialCards.forEach((card) => cardsList.append(createCard(card.link, card.name)));


