import { Factura } from "../controllers/facturas.controller.js";
import { FacturaDetalle } from "../controllers/facturas_detalles.controller.js";
import {CobrosDetalles} from "../controllers/cobros_detalles.controller.js";
import {Cobros} from "../controllers/cobros.controller.js"
import {getDateNow, getHourNow} from "../tools/date.js";
import { SesionesCajas } from "../controllers/sesiones_cajas.controller.js";

const cobroDetalleController = new CobrosDetalles();
const cobroController = new Cobros();
const facturaController = new Factura();
const facturaDetalleController = new FacturaDetalle();
const sesionController= new SesionesCajas();
export class Venta {
  crear = async (req, res) => {
    let factura, factura_detalle;
    try {

        const {id_cliente,id_sesion_caja, id_timbrado, total, saldo, iva_5,iva_10, iva_exenta, detalles, cobros_detalles} = req.body;

        factura = await facturaController.nuevaFactura({id_cliente, id_timbrado, total, saldo, iva_5, iva_10, iva_exenta});
        console.log("hecho: factura")
        detalles.id_factura = factura.id;	//guardar el id de la factura
        await facturaDetalleController.nuevaFacturaDetalle(detalles); // se guardan los detalles
        console.log("hecho: factura_detalle")

        const date_fecha = getDateNow();
        const time_hora = getHourNow();
        const cobro = {
            id_factura: factura.id,
            id_sesion_caja: id_sesion_caja,
            date_fecha,
            time_hora,
        };
        sesionController.cobrar(id_sesion_caja,total);
        const nuevoCobro = (await cobroController.nuevoCobro(cobro)).dataValues;

        await cobroDetalleController.crear(nuevoCobro.id, ...cobros_detalles);

        const nuevaFactura = await facturaController.getById(factura.id);


        res.status(200).json({nuevaFactura});

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

