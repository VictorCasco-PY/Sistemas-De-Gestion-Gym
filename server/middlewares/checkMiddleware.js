import { check } from "express-validator";
import { bodyValidator } from "../tools/bodyValidator.js";

/**
 * Checkea si los campos necesarios han sido enviados
 * @param {array} list 
 * @returns 
 */
export const checkMiddleWare = (list) => {
  
  // Revisa que todos los campos esten
  const checks = list.map((value) => check(value, `${value} es requerido`).notEmpty());

  /**
   * Si no estan todos los campos, se retorna un mensaje de error
   * sino, se sigue
   */
  return (req, res, next) => {
    Promise.all(checks.map((validation) => validation.run(req))).then(() => {
      const result = bodyValidator(req);
      if (result) return res.json(result);
      next();
    });
  };
};
