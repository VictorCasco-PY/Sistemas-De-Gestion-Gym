import { Router } from "express";
import { getTipoModalidadDePago } from "../controllers/tipos_modalidades_de_pagos.js";

const tipoModalidadPagoRouter = Router();

tipoModalidadPagoRouter.get('/tipos-modalidades-de-pagos', getTipoModalidadDePago)

export default tipoModalidadPagoRouter