import { check } from "express-validator";
import { Token } from "../tools/token.js";

const _token = new Token();

/**
 * Permite acceso a los roles (recibe una lista)
 * @param {array} roles
 * @returns
 */
export const authMiddleware = (roles = []) => {
  try {
    return (req, res, next) => {
      const { token } = req.headers;
      console.log(token);
      if (!token) return res.status(401).json({ error: "Debes autenticarte" });
      const verify = _token.verify(token);
      if (!verify) return res.json({ error: "Token expirado" });
      console.log(verify);
      if (verify.rol !== "admin") {
        let result;
        if (roles.length !== 0) {
          [result] = roles.filter((rol) => rol === verify.rol);
        }
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
