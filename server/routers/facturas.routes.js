import {check} from "express-validator";
import {Router} from "express";
import { Factura } from "../controllers/facturas.controller";

const factura = new Factura();
const facturasRoutes = Router();

facturasRoutes.post('/facturas', [
        check('id_cliente', 'El campo id_cliente es requerido').notEmpty(),
        check('id_timbrado', 'El campo id_timbrado es requerido').notEmpty(),
        check('numero_factura', 'El campo numero_factura es requerido').notEmpty(),
        check('date_fecha', 'El campo date_fecha es requerido').notEmpty(),
        check('str_nombre_cliente', 'El campo str_nombre_cliente es requerido').notEmpty(),
        check('str_ruc_cliente', 'El campo str_ruc_cliente es requerido').notEmpty(),
        check('condicion', 'El campo condicion es requerido').notEmpty(),
        check('total', 'El campo total es requerido').notEmpty(),
        check('saldo', 'El campo saldo es requerido').notEmpty(),
        check('iva_5', 'El campo iva_5 es requerido').notEmpty(),
        check('iva_10', 'El campo iva_10 es requerido').notEmpty(),
        check('iva_exenta', 'El campo iva_exenta es requerido').notEmpty(),
    ],
    factura.crear
);

facturasRoutes.get('/facturas', factura.getAll)

facturasRoutes.get('/factura/:id', factura.getByParams);

facturasRoutes.put('/factura/:id', factura.update)

facturasRoutes.delete('/factura/:id', factura.delete)

export default facturasRoutes;