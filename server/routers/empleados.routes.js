import {Router} from "express";

import {Empleado} from "../controllers/empleados.controller.js";
import { checkMiddleWare } from "../middlewares/checkMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const empleado = new Empleado();
const empleadosRoutes = Router();

empleadosRoutes.post('/empleados',
    authMiddleware(),
    checkMiddleWare(['user', 'password', 'str_nombre', 'str_telefono', 'str_direccion', 'str_cedula', 'time_inicio_trabajo', 'time_fin_trabajo', 'rol']),
    empleado.crear
);

empleadosRoutes.get('/empleados', authMiddleware(), empleado.getAll)

empleadosRoutes.get('/empleado/:id', authMiddleware(), empleado.getByParams);

empleadosRoutes.put('/empleado/:id', authMiddleware(), empleado.update)

empleadosRoutes.delete('/empleado/:id', authMiddleware(), empleado.delete)

export default empleadosRoutes;