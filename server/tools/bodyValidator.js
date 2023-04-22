import {validationResult} from "express-validator";

export const bodyValidator = (req) =>{
    const errors = validationResult(req);

    // Si hay errores, los agrupamos y devolvemos eso
    if (!errors.isEmpty()) {
        const e = errors.array().map((e, n) => {
            return `${e.msg}`;
        });
        return {error: e};
    }
    // Si no hay errores, devolvemos un boolean false
    return false;
}