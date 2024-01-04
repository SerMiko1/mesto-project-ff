import { initialCards } from "./scripts/cards";
import { createCard, deleteCard, likeCard } from "./scripts/card";
import "./pages/index.css";
import { openModal, closeModal } from "./scripts/modal";

const placesList = document.querySelector(".places__list");
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileTitle = profile.querySelector(".profile__title");
const profileDescription = profile.querySelector(".profile__description");
const profileAddButton = profile.querySelector(".profile__add-button");

const profileForm = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = profileForm.querySelector(".popup__input_type_name");
const jobInput = profileForm.querySelector(".popup__input_type_description");

const cardForm = document.querySelector('.popup__form[name="new-place"]');
const cardNameInput = cardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = cardForm.querySelector(".popup__input_type_url");

const popups = document.querySelectorAll(".popup");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImageContainer = document.querySelector(".popup_type_image");
const popupImage = popupImageContainer.querySelector(".popup__image");
const popupCaption = popupImageContainer.querySelector(".popup__caption");

initialCards.forEach((cardItem) =>
  placesList.append(createCard(cardItem, handleImageClick, likeCard, deleteCard))
);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEditProfile);
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard(
    { name: cardNameInput.value, link: cardLinkInput.value },
    handleImageClick,
    likeCard,
    deleteCard
  );
  placesList.prepend(newCard);
  closeModal(popupNewCard);
  cardForm.reset();
}

function handleImageClick(evt) {
  const card = evt.target.closest(".card");
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");

  popupImage.src = cardImage.src;
  popupImage.alt = cardTitle.alt;
  popupCaption.textContent = cardTitle.textContent;

  openModal(popupImageContainer);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleNewCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEditProfile);
});

profileAddButton.addEventListener("click", () => openModal(popupNewCard));

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.matches(".popup_is-opened, .popup__close")) {
      closeModal(popup);
    }
  });
});
