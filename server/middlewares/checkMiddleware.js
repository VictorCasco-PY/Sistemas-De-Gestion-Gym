import { check } from "express-validator";

export const checkMiddleWare = (list) => {
    const checks = list.map(value => check(value, `${value} es requerido`).notEmpty());
    return checks;
}