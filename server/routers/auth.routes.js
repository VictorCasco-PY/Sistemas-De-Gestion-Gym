import {Router} from "express";
import {check} from "express-validator";
import {Auth} from "../auth/auth.js";

const authRoutes = Router();
const auth = new Auth();
authRoutes.post('/auth',
    [check('user', 'user es un campo requerido').notEmpty(),
        check('password', 'password es un campo requerido').notEmpty()
    ], auth.login)


export default authRoutes;