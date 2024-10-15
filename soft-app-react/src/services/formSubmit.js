// src/services/formSubmit.js
export const submitForm = async (data) => {
  const response = await fetch(
    "https://formsubmit.co/gabialberini733@gmail.com",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Error al enviar el formulario");
  }
};
