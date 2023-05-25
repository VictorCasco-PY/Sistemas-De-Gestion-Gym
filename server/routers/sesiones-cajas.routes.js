import {Router} from "express"
import {check} from "express-validator";

import { SesionesCajas } from "../controllers/sesiones_cajas.controller.js";

const sesiones_cajas = new SesionesCajas();

const sesionesCajasRoutes = Router();

sesionesCajasRoutes.get('/sesiones-cajas', sesiones_cajas.getAll);

sesionesCajasRoutes.get('/sesion-caja/:id', sesiones_cajas.getById);

sesionesCajasRoutes.post('/sesiones-cajas', [
    check("id_empleado", "id_empleado  es un campo requerido").notEmpty(),
    check("id_caja", "id_caja  es un campo requerido").notEmpty(),
    check("monto_inicial", "monto_inicial  es un campo requerido").notEmpty(),
    check("monto_final", "monto_final  es un campo requerido").notEmpty(),
    check("date_fecha", "date_fecha  es un campo requerido").notEmpty(),
    check("time_inicio", "time_inicio  es un campo requerido").notEmpty(),
    check("time_cierre", "time_cierre  es un campo requerido").notEmpty(),
    ], sesiones_cajas.crear);

sesionesCajasRoutes.put('/sesion-caja/:id', sesiones_cajas.update)

sesionesCajasRoutes.delete('/sesion-caja/:id', sesiones_cajas.delete)

export default sesionesCajasRoutes;