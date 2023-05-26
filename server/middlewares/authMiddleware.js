import { check } from "express-validator";
import { Token } from "../tools/token.js";

const _token = new Token();

// Permite acceso a los roles (recibe una lista)
export const authMiddleware = (roles) => {
  try {

    return (req, res, next) => {
      const { token } = req.headers;
      if (!token) return res.status(401).json({ error: "Debes autenticarte" });
      const verify = _token.verify(token);
      if (!verify) return res.json({ error: "Token expirado" });

      if (verify.rol !== "admin") {
        const [result] = roles.filter((rol) => rol=== verify.rol);
        // Si el resultado coincide con algunos requisitos, tiene acceso
        if (!result)
          return res
            .status(401)
            .json({ error: "No tienes autorizacion para acceder aqui" });
      }

      next();
    };

  } catch (error) {
    return res.status(401).json({ error: "Token de autenticación inválido" });
  }
};
