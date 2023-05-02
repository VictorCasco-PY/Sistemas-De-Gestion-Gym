import { Router } from "express";
import {TiposModalidadesDePagos} from "../controllers/tipos_modalidades_de_pagos.js";

const tiposModalidadesDePagos = new TiposModalidadesDePagos();
const tipoModalidadPagoRouter = Router();

tipoModalidadPagoRouter.get('/tipos-modalidades-de-pagos', tiposModalidadesDePagos.getAll)

export default tipoModalidadPagoRouter