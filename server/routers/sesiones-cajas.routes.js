import { Router } from "express"
import { check } from "express-validator";

import { SesionesCajas } from "../controllers/sesiones_cajas.controller.js";

const sesiones_cajas = new SesionesCajas();

const sesionesCajasRoutes = Router();

sesionesCajasRoutes.get('/sesiones-cajas', sesiones_cajas.getAll);

sesionesCajasRoutes.get('/sesion-caja/:id', sesiones_cajas.getById);

sesionesCajasRoutes.post('/sesiones-cajas',
    authMiddleware(['caja', 'entrenador']),
    checkMiddleWare(['id_empleado', 'id_caja', 'monto_inicial', 'monto_final', 'date_fecha', 'time_inicio',"time_cierre"]), 
    sesiones_cajas.crear
);

sesionesCajasRoutes.put('/sesion-caja/:id', sesiones_cajas.update)

sesionesCajasRoutes.delete('/sesion-caja/:id', sesiones_cajas.delete)

export default sesionesCajasRoutes;