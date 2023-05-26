import { check } from "express-validator";
import { bodyValidator } from "../tools/bodyValidator.js";

export const checkMiddleWare = (list) => {
  
    const checks = list.map((value) =>
    check(value, `${value} es requerido`).notEmpty()
  );

  return (req, res, next) => {
    Promise.all(checks.map((validation) => validation.run(req))).then(() => {
      const result = bodyValidator(req);
      if (result) return res.json(result);
      next();
    });
  };
};