import {Router} from "express"
import {check} from "express-validator";

import { Arqueos } from "../controllers/arqueos.controller.js";
import { checkMiddleWare } from "../middlewares/checkMiddleware.js";

const arqueos = new Arqueos();

const arqueosRoutes = Router();

arqueosRoutes.get('/arqueos', arqueos.getAll);

arqueosRoutes.get('/arqueo/:id', arqueos.getById);

arqueosRoutes.post('/arqueos',checkMiddleWare(['id_empleado',"id_sesion","date_fecha","total"]), arqueos.crear);

arqueosRoutes.put('/arqueo/:id', arqueos.update)

arqueosRoutes.delete('/arqueo/:id', arqueos.delete)

export default arqueosRoutes;