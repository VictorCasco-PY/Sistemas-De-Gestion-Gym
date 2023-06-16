import { Facturas_proveedores } from "../controllers/facturas_proveedores.controller.js";
import { Facturas_proveedores_detalles } from "../controllers/facturas_proveedores_detalles.controller.js";
import { Pagos_proveedores } from "../controllers/pagos.controller.js";
import { Pagos_proveedores_detalles } from "../controllers/pagos_detalles.controller.js";
import { SesionesCajas } from "../controllers/sesiones_cajas.controller.js";

const facturaProveedorController = new Facturas_proveedores();
const facturaProveedorDetalleController = new Facturas_proveedores_detalles();
const pagoController = new Pagos_proveedores();
const pagoDetallesController = new Pagos_proveedores_detalles();
const sesionController= new SesionesCajas();
export class Compra {
    crear = async (req, res) => {
        let factura_proveedor, factura_proveedor_detalle;
        try {
            const { id_proveedor, id_sesion_caja,date_fecha, nro_factura, str_nombre, _str_ruc, total, detalles, pagos_detalles } = req.body;
            factura_proveedor = await facturaProveedorController.createFacturaProveedor({ id_proveedor, date_fecha, nro_factura, str_nombre, _str_ruc, total });
            console.log("Hecho Factura");
            detalles.id_factura_proveedor = factura_proveedor.id;
            factura_proveedor_detalle = await facturaProveedorDetalleController.createFacturaProveedorDetalle(detalles);
            console.log("hecho factura_detalles");

            const pago = { id_factura_proveedor: factura_proveedor.id, id_sesion_caja:id_sesion_caja , date_fecha,total }
            //sesionController.pagar(id_sesion_caja,total);
            const nuevoPago = (await pagoController.createPagoProveedor(pago)).dataValues;
            console.log("Hecho pago");
            await  pagoDetallesController.crear(nuevoPago.id,...pagos_detalles);
            console.log("nuevo pago");
            console.log(nuevoPago);
            nuevaFactura=await facturaProveedorController.getById(factura_proveedor.id);
            res.status(200).json({ nuevaFactura })

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}
