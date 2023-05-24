import {Router} from "express";

import {Empleado} from "../controllers/empleados.controller.js";
import { checkMiddleWare } from "../middlewares/checkMiddleware.js";

const empleado = new Empleado();
const empleadosRoutes = Router();

empleadosRoutes.post('/empleados', 
    checkMiddleWare(['user', 'password', 'str_nombre', 'str_telefono', 'str_direccion', 'str_cedula', 'time_inicio_trabajo', 'time_fin_trabajo', 'rol']),
    empleado.crear
);

empleadosRoutes.get('/empleados', empleado.getAll)

empleadosRoutes.get('/empleado/:id', empleado.getByParams);

empleadosRoutes.put('/empleado/:id', empleado.update)

empleadosRoutes.delete('/empleado/:id', empleado.delete)

export default empleadosRoutes;