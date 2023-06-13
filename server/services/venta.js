import { Factura } from "../controllers/facturas.controller.js";
import { FacturaDetalle } from "../controllers/facturas_detalles.controller.js";
import {Cobros} from "../controllers/cobros.controller.js"
import {getDateNow, getHourNow} from "../tools/date.js";

const cobroController = new Cobros();
const facturaController = new Factura();
const facturaDetalleController = new FacturaDetalle();

export class Venta {
  crear = async (req, res) => {
    let factura, factura_detalle;
    try {

        //     checkMiddleWare(['id_cliente','id_timbrado','total','saldo','iva_5','iva_10','iva_exenta']),
        const {id_cliente, id_timbrado, total, saldo, iva_5, iva_10, iva_exenta, detalles} = req.body;

        factura = await facturaController.nuevaFactura({id_cliente, id_timbrado, total, saldo, iva_5, iva_10, iva_exenta});

        detalles.id_factura = factura.id;	//guardar el id de la factura
        factura_detalle = await facturaDetalleController.nuevaFacturaDetalle(detalles);

        let cobro = {};
        cobro.id_factura = factura.id;
        cobro.id_sesion_caja = null;
        cobro.date_fecha = getDateNow();
        cobro.time_hora = getHourNow();

        await cobroController.nuevoCobro(cobro);

        const nuevaFactura = facturaController.getById(factura.id);

        res.status(200).json({nuevaFactura});

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

