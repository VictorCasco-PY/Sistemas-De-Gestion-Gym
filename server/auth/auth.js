import bcrypt from "bcrypt";
import {bodyValidator} from "../tools/bodyValidator.js";
import {Token} from "../tools/token.js";
import { Empleado } from "../controllers/empleados.controller.js";

const empleado = new Empleado();
const _token = new Token();

export class Auth {
    login = async (req,res) => {
        try{
            const validator = bodyValidator(req);
            if (validator) return res.status(400).json(validator);

            const {body} = req;

            const token = await _token.crear(body.user, body.password);

            if(!token) return res.status(404).json({error:"Error de autenticacion"});
            return res.status(200).json(token);

        }catch (error){
            res.status(500).send(error.message);
        }
    }
}