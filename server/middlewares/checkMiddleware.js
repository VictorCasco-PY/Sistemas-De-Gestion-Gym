import { check } from "express-validator";

export const checkMiddleWare = (list, token) => {
    const checks = list.map(value => check(value, `${value} es requeido`).notEmpty());
    return checks;
}