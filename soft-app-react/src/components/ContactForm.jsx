// src/components/ContactForm.jsx
import { useState } from "react";
import { submitForm } from "../services/formSubmit";
import "../styles/Home.css";

const ContactForm = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitForm({ message });
    setMessage("");
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>Consulta</h2>
      <textarea
        className="contact-textarea" // Clase añadida para el textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe tu consulta aquí..."
        required
      />
      <button className="contact-button" type="submit">
        Enviar
      </button>{" "}
      {/* Clase añadida para el botón */}
    </form>
  );
};

export default ContactForm;
