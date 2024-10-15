// Archivo: form-validation.js

function showPopup(message) {
  const popup = document.getElementById("confirmation-popup");
  const popupMessage = popup.querySelector("p");
  popupMessage.textContent = message;
  popup.style.display = "block";
}

function closePopup() {
  const popup = document.getElementById("confirmation-popup");
  popup.style.display = "none";
}

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;

    if (name.trim() === "") {
      showPopup("Por favor, ingresa tu nombre completo.");
      event.preventDefault();
    } else if (email.trim() === "" || !validateEmail(email)) {
      showPopup("Por favor, ingresa un correo electrónico válido.");
      event.preventDefault();
    } else if (subject.trim() === "") {
      showPopup("Por favor, ingresa un asunto.");
      event.preventDefault();
    } else {
      showPopup("¡Tu mensaje ha sido enviado con éxito!");
    }
  });

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

document.querySelector(".close").addEventListener("click", closePopup);

window.onclick = function (event) {
  const popup = document.getElementById("confirmation-popup");
  if (event.target === popup) {
    closePopup();
  }
};
