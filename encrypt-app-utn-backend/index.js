import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // Obtener el directorio actual

const app = express();
app.use(cors());
app.use(express.json()); // Para poder parsear JSON en las peticiones

// Ruta -> /api/key
// Verbo HTTP -> GET
const key = process.env.KEY;

app.get("/api/key", (request, response) => {
  response.json({ key: key });
});

// Ruta -> /api/messages
// Verbo HTTP -> GET
app.get("/api/messages", (req, res) => {
  const messagesFilePath = path.join(__dirname, "messages.json");
  fs.readFile(messagesFilePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error al leer los mensajes." });
    }
    const messages = JSON.parse(data);
    res.json(messages);
  });
});

// Ruta -> /api/messages
// Verbo HTTP -> POST
app.post("/api/messages", (req, res) => {
  const newMessage = req.body; // Contiene el mensaje encriptado, estado, etc.
  const messagesFilePath = path.join(__dirname, "messages.json");

  fs.readFile(messagesFilePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error al leer los mensajes." });
    }
    const messages = JSON.parse(data);
    messages.push(newMessage); // Agregar el nuevo mensaje
    fs.writeFile(messagesFilePath, JSON.stringify(messages, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Error al guardar el mensaje." });
      }
      res.status(201).json(newMessage);
    });
  });
});

// Ruta -> /api/messages/:id
// Verbo HTTP -> DELETE
app.delete("/api/messages/:id", (req, res) => {
  const messageId = parseInt(req.params.id);
  const messagesFilePath = path.join(__dirname, "messages.json");

  fs.readFile(messagesFilePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error al leer los mensajes." });
    }
    const messages = JSON.parse(data);
    if (messageId < 0 || messageId >= messages.length) {
      return res.status(404).json({ error: "Mensaje no encontrado." });
    }
    messages.splice(messageId, 1); // Eliminar el mensaje por su índice
    fs.writeFile(messagesFilePath, JSON.stringify(messages, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Error al eliminar el mensaje." });
      }
      res.status(204).send();
    });
  });
});

app.listen(1234, () => {
  console.log("Server on http://localhost:1234");
});
