import { Router } from "express";
import {TipoModalidadDePago} from "../controllers/tipos_modalidades_de_pagos.js";

const tiposModalidadesDePagos = new TipoModalidadDePago();
const tipoModalidadPagoRouter = Router();

tipoModalidadPagoRouter.get('/tipos-modalidades-de-pagos', tiposModalidadesDePagos.getAll)

export default tipoModalidadPagoRouter