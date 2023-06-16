import express from 'express';
import { getArqueo } from '../services/arqueoCaja';

const arqueoCajaRoutes = Router();

// Ruta para obtener el arqueo
arqueoCajaRoutes.get('/arqueo', getArqueo);

export default arqueoCajaRoutes;