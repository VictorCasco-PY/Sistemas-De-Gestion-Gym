import { Router } from "express";
import {TipoModalidadDePago} from "../controllers/tipos_modalidades_de_pagos.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const tiposModalidadesDePagos = new TipoModalidadDePago();
const tipoModalidadPagoRouter = Router();

tipoModalidadPagoRouter.get('/tipos-modalidades-de-pagos', authMiddleware(['entrenador','caja']), tiposModalidadesDePagos.getAll)

export default tipoModalidadPagoRouter