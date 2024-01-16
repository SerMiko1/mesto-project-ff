import "./pages/index.css";
import {
  getProfileInfo,
  editProfileInfo,
  getInitialCards,
  updateAvatar,
  addCard,
  deleteCard,
} from "./scripts/api";
import { createCard, changeLike, deleteMyCard } from "./scripts/cards";
import { openModal, closeModal, closeByOverlay } from "./scripts/modal";
import { enableValidation, clearValidation } from "./scripts/validation";

// конфиг валидаций
const validationConfig = {
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
};

let profileId = null;

const cardsContainer = document.querySelector(".places__list");

const profile = document.querySelector(".profile");
const profileAvatarEditButton = profile.querySelector(".profile__image");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileTitle = profile.querySelector(".profile__title");
const profileDescription = profile.querySelector(".profile__description");
const profileAddButton = profile.querySelector(".profile__add-button");

const profileForm = document.querySelector('.popup__form[name="edit-profile"]');
const profileNameInput = profileForm.querySelector(".popup__input_type_name");
const profileAboutInput = profileForm.querySelector(
  ".popup__input_type_description"
);

const avatarForm = document.querySelector('.popup__form[name="avatar"]');
const avatarLinkInput = avatarForm.querySelector(".popup__input_type_url");

const cardForm = document.querySelector('.popup__form[name="new-place"]');
const cardNameInput = cardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = cardForm.querySelector(".popup__input_type_url");

const popups = document.querySelectorAll(".popup");
const popupAvatar = document.querySelector(".popup_type_edit_avatar");
const popupAvatarButton = popupAvatar.querySelector(
  validationConfig.submitButtonSelector
);
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupEditProfileButton = popupEditProfile.querySelector(
  validationConfig.submitButtonSelector
);
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupNewCardButton = popupNewCard.querySelector(
  validationConfig.submitButtonSelector
);
const popupImageContainer = document.querySelector(".popup_type_image");
const popupImage = popupImageContainer.querySelector(".popup__image");
const popupCaption = popupImageContainer.querySelector(".popup__caption");

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

// редактирование аватарки профиля
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

// редактирование имеени и занятия
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

// добавление картчоки на страницу
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

// удаление личной карточки
function removeCard(card, cardData) {
  deleteCard(cardData._id)
    .then(() => deleteMyCard(card))
    .catch((error) => console.error("Ошибка при добавлении карточки:", error));
}

// открыть изображение
function onOpenImage(cardData) {
  const newCard = cardData.closest(".card"),
    cardImage = newCard.querySelector(".card__image"),
    cardTitle = newCard.querySelector(".card__title");

  popupImage.src = cardImage.src;
  popupImage.alt = cardTitle.alt;
  popupCaption.textContent = cardTitle.textContent;
  openModal(popupImageContainer);
}

// данные попапов
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

// обработчик форм и попапов
profileForm.addEventListener("submit", handleProfileFormSubmit);
profileAvatarEditButton.addEventListener("click", () => openEditAvatarPopup());
profileEditButton.addEventListener("click", () => openEditProfilePopup());
profileAddButton.addEventListener("click", () => openModal(popupNewCard));
avatarForm.addEventListener("submit", handleAvatarFormSubmit);
cardForm.addEventListener("submit", handleNewCardFormSubmit);
popups.forEach((popup) => popup.addEventListener("mousedown", closeByOverlay));

// валидации форм
enableValidation(validationConfig);
clearValidation(avatarForm, validationConfig);
clearValidation(profileForm, validationConfig);
clearValidation(cardForm, validationConfig);
