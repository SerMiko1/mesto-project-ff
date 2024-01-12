import "./pages/index.css";
import { deleteCard } from "./components/api";
import { createCard, changeLike, deleteMyCard } from "./components/cards";
import { openModal, closeModal, closeByOverlay } from "./components/modal";
import { enableValidation, clearValidation } from "./components/validation";
import {
  getProfileInfo,
  editProfileInfo,
  updateAvatar,
  getInitialCards,
  addCard
} from "./components/api";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

let profileId = null;

const cardsContainer = document.querySelector(".places__list");

const profile = document.querySelector(".profile"),
  profileAvatarEditButton = profile.querySelector(".profile__image"),
  profileEditButton = profile.querySelector(".profile__edit-button"),
  profileTitle = profile.querySelector(".profile__title"),
  profileDescription = profile.querySelector(".profile__description"),
  profileAddButton = profile.querySelector(".profile__add-button");

const avatarForm = document.querySelector('.popup__form[name="avatar"]'),
  avatarLinkInput = avatarForm.querySelector(".popup__input_type_url");

const profileForm = document.querySelector('.popup__form[name="edit-profile"]'),
  profileNameInput = profileForm.querySelector(".popup__input_type_name"),
  profileAboutInput = profileForm.querySelector(
    ".popup__input_type_description"
  );

const cardForm = document.querySelector('.popup__form[name="new-place"]'),
  cardNameInput = cardForm.querySelector(".popup__input_type_card-name"),
  cardLinkInput = cardForm.querySelector(".popup__input_type_url");

const popups = document.querySelectorAll(".popup"),
  popupAvatar = document.querySelector(".popup_type_edit_avatar"),
  popupAvatarButton = popupAvatar.querySelector(
    validationConfig.submitButtonSelector
  ),
  popupEditProfile = document.querySelector(".popup_type_edit"),
  popupEditProfileButton = popupEditProfile.querySelector(
    validationConfig.submitButtonSelector
  ),
  popupNewCard = document.querySelector(".popup_type_new-card"),
  popupNewCardButton = popupNewCard.querySelector(
    validationConfig.submitButtonSelector
  ),
  popupImageContainer = document.querySelector(".popup_type_image"),
  popupImage = popupImageContainer.querySelector(".popup__image"),
  popupCaption = popupImageContainer.querySelector(".popup__caption");
// Профиль + карточки --- данные
Promise.all([getProfileInfo(), getInitialCards()])
  .then(([profileData, cardsData]) => {
    profileId = profileData._id;
    profileAvatarEditButton.style.backgroundImage = `url(\\${profileData.avatar})`;
    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;

    cardsData.forEach((cardData) => {
      cardsContainer.append(
        createCard(cardData, profileId, changeLike, removeCard, onOpenImage)
      );
    });
  })
  .catch((error) =>
    console.error("Ошибка при получении данных пользователя:", error)
  );
// Редактор аватарки
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const originalButtonText = popupAvatarButton.textContent;
  popupAvatarButton.textContent = "Сохранение...";

  updateAvatar(avatarLinkInput.value)
    .then((profileData) => {
      profileAvatarEditButton.style.backgroundImage = `url(\\${profileData.avatar})`;
      closeModal(popupAvatar);
    })
    .catch((error) =>
      console.error("Ошибка при получении данных пользователя:", error)
    )
    .finally(() => (popupAvatarButton.textContent = originalButtonText));

  clearValidation(avatarForm, validationConfig);
}
// Редактор имени и занятия
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const originalButtonText = popupEditProfileButton.textContent;
  popupEditProfileButton.textContent = "Сохранение...";

  editProfileInfo(profileNameInput.value, profileAboutInput.value)
    .then((profileData) => {
      profileTitle.textContent = profileData.name;
      profileDescription.textContent = profileData.about;
      closeModal(popupEditProfile);
    })
    .catch((error) =>
      console.error("Ошибка получения данных пользователя:", error)
    )
    .finally(() => (popupEditProfileButton.textContent = originalButtonText));

  clearValidation(profileForm, validationConfig);
}
// генерация карточки
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const originalButtonText = popupNewCardButton.textContent;
  popupNewCardButton.textContent = "Добаление...";

  addCard(cardNameInput.value, cardLinkInput.value)
    .then((cardData) => {
      const newCard = createCard(
        cardData,
        profileId,
        changeLike,
        removeCard,
        onOpenImage
      );

      cardsContainer.prepend(newCard);
      closeModal(popupNewCard);
      cardForm.reset();
    })
    .catch((error) => console.error("Ошибка при добавлении карточки:", error))
    .finally(() => (popupNewCardButton.textContent = originalButtonText));

  clearValidation(cardForm, validationConfig);
}
// удаление добавленной карточки
function removeCard(card, cardData) {
  deleteCard(cardData._id)
    .then(() => deleteMyCard(card))
    .catch((error) => console.error("Ошибка при добавлении карточки:", error));
}

function onOpenImage(cardData) {
  const newCard = cardData.closest(".card"),
    cardImage = newCard.querySelector(".card__image"),
    cardTitle = newCard.querySelector(".card__title");

  popupImage.src = cardImage.src;
  popupImage.alt = cardTitle.alt;
  popupCaption.textContent = cardTitle.textContent;

  openModal(popupImageContainer);
}

function openEditAvatarPopup() {
  avatarLinkInput.value = profileAvatarEditButton.style.backgroundImage.replace(
    /url\(["']?(.*?)["']?\)/,
    "$1"
  );

  openModal(popupAvatar);
}

function openEditProfilePopup() {
  profileNameInput.value = profileTitle.textContent;
  profileAboutInput.value = profileDescription.textContent;

  openModal(popupEditProfile);
}
// обработчики + попапы
avatarForm.addEventListener("submit", handleAvatarFormSubmit);
profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleNewCardFormSubmit);

profileAvatarEditButton.addEventListener("click", () => openEditAvatarPopup());
profileEditButton.addEventListener("click", () => openEditProfilePopup());
profileAddButton.addEventListener("click", () => openModal(popupNewCard));

popups.forEach((popup) => popup.addEventListener("mousedown", closeByOverlay));

enableValidation(validationConfig);
clearValidation(avatarForm, validationConfig);
clearValidation(profileForm, validationConfig);
clearValidation(cardForm, validationConfig);
