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

      // comprueba si el token es valido o ha expirado
      const verify = _token.verify(token);
      if (!verify) return res.json({ error: "Token expirado" });

      // si el token es valido, si no es admin se comprueba si el usuario tiene acceso
      if (verify.rol !== "admin") {
        let result;
        if (roles.length !== 0) {
          // se comprueba que el usuario logueado tiene acceso a la ruta
          [result] = roles.filter((rol) => rol === verify.rol);
        }

        // si no hay un resultado favorable, el usuario no tiene acceso
        if (!result)
          return res
            .status(401)
            .json({ error: "No tienes autorizacion para acceder aqui" });
      }

      // si el token es valido y tiene acceso, puede acceder
      next();
    };
  } catch (error) {
    return res.status(401).json({ error: "Token de autenticación inválido" });
  }
};
