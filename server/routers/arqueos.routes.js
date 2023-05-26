import {Router} from "express"
import {check} from "express-validator";

import { Arqueos } from "../controllers/arqueos.controller.js";

const arqueos = new Arqueos();

const arqueosRoutes = Router();

arqueosRoutes.get('/arqueos', arqueos.getAll);

arqueosRoutes.get('/arqueo/:id', arqueos.getById);

arqueosRoutes.post('/arqueos', [
    check("id_empleado", "id_empleado  es un campo requerido").notEmpty(),
    check("id_sesion_caja", "id_sesion_caja  es un campo requerido").notEmpty(),
    check("date_fecha", "date_fecha  es un campo requerido").notEmpty(),
    check("total", "total  es un campo requerido").notEmpty(),
    ], arqueos.crear);

arqueosRoutes.put('/arqueo/:id', arqueos.update)

arqueosRoutes.delete('/arqueo/:id', arqueos.delete)

export default arqueosRoutes;