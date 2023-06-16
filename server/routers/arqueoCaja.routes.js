import express from 'express';
import { Router } from 'express';
import { getArqueo } from '../services/arqueoCaja.js';

const arqueoCajaRoutes = Router();

// Ruta para obtener el arqueo
arqueoCajaRoutes.get('/arqueoCaja/:id', getArqueo);

export default arqueoCajaRoutes;