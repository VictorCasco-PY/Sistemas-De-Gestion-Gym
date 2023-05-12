import {check} from "express-validator";
import {Router} from "express";
import {Empleado} from "../controllers/empleados.controller.js";

const empleado = new Empleado();
const empleadosRoutes = Router();

empleadosRoutes.post('/empleados', [
        check('user', 'El campo user es requerido').notEmpty(),
        check('password', 'El campo password es requerido').notEmpty(),
        check('str_nombre', 'El campo str_nombre es requerido').notEmpty(),
        check('str_telefono', 'El campo str_telefono es requerido').notEmpty(),
        check('str_direccion', 'El campo str_direccion es requerido').notEmpty(),
        check('str_cedula', 'El campo str_cedula es requerido').notEmpty(),
        check('time_inicio_trabajo', 'El campo time_inicio_trabajo es requerido').notEmpty(),
        check('time_fin_trabajo', 'El campo time_fin_trabajo es requerido').notEmpty(),
        check('rol', 'El campo rol es requerido').notEmpty(),
        check('rol', 'El campo rol necesita ser valido (caja, entrenador o admin').isIn(["caja", "entrenador", "admin"])
    ],
    empleado.crear
);

empleadosRoutes.get('/empleados', empleado.getAll)

empleadosRoutes.get('/empleado/:id', empleado.getByParams);

empleadosRoutes.put('/empleado/:id', empleado.update)

empleadosRoutes.delete('/empleado/:id', empleado.delete)

export default empleadosRoutes;