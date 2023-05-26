import jwt from "jsonwebtoken";
import {Empleado} from "../controllers/empleados.controller.js";
import {bodyValidator} from "./bodyValidator.js";
import bcrypt from "bcrypt";
import {SECRET_KEY} from "../config.js";

const empleado = new Empleado();

export class Token {
    crear = async (user, password) => {
        try {
            const userEmpleado = await empleado.getByUserName(user);

            if (!userEmpleado) return res.status(404).json({error: "No existe ese usuario"});
            const userPassword = userEmpleado.password;
            const comparePassword = bcrypt.compareSync(password, userPassword);

            if (!comparePassword) return null;

            const payload = {id: userEmpleado.id, nombre: userEmpleado.str_nombre, rol: userEmpleado.rol}

            const token = jwt.sign(payload, SECRET_KEY, {expiresIn:"100000ms"});

            return {
                token,
                nombre: userEmpleado.str_nombre,
                rol: userEmpleado.rol,
                id: userEmpleado.id
            }

        } catch (error) {
            console.log(error.message)
            return null;
        }
    }

    verify = (token) => {
        try{
            const result = jwt.verify(token, SECRET_KEY);
            console.log(result);
            return true;
        }catch (error){
            return false
        }
    }

}