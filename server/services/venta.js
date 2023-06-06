import { models } from "../models/models.js";
import { Factura } from "../controllers/facturas.controller.js";
import { FacturaDetalle } from "../controllers/facturas_detalles.controller.js";
import { Cliente } from "../controllers/clientes.controller.js";

const facturaController = new Factura();
const facturaDetalleController = new FacturaDetalle();

export class Venta {
  crear = async (req, res) => {
    let factura, factura_detalle;
    try {

        //     checkMiddleWare(['id_cliente','id_timbrado','total','saldo','iva_5','iva_10','iva_exenta']),
        const {id_cliente, id_timbrado, total, saldo, iva_5, iva_10, iva_exenta, detalles} = req.body;

        factura = await facturaController.crearInterno(id_cliente, id_timbrado, total, saldo, iva_5, iva_10, iva_exenta);

        detalles.id_factura = factura.id; 			//guardar el id de la factura
        factura_detalle = await facturaDetalleController.crearInterno(detalles);

        res.status(200).json({ok:"Venta realizada correctamente"})

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

