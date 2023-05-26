import { check } from "express-validator";
import { Token } from "../tools/token.js";

const _token = new Token();

export const authMiddleware = (req, res) => {
  try {
    const { token } = req.headers;

    if (!token) return res.status(400).json({ error: "Debes autenticarte" });
    const result = _token.verify(token);
    if (!result) return res.json({ error: "Token expirado" });
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token de autenticación inválido" });
  }
};
