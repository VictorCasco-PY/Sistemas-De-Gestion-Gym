import { Facturas_proveedores } from "../controllers/facturas_proveedores.controller.js";
import { Facturas_proveedores_detalles } from "../controllers/facturas_proveedores_detalles.controller.js";

const facturaProveedorController = new Facturas_proveedores();
const facturaProveedorDetalleController = new Facturas_proveedores_detalles();

export class Compra {
    crear = async (req, res) => {
        let factura_proveedor, factura_proveedor_detalle;
        try {
            const { id_proveedor, str_nombre, _str_ruc, total, detalles } = req.body;
            factura_proveedor = await facturaProveedorController.createFacturaProveedor({ id_proveedor, str_nombre, _str_ruc, total });
            detalles.id_factura_proveedor = factura_proveedor.id;
            factura_proveedor_detalle = await facturaProveedorDetalleController.createFacturaProveedorDetalle(detalles);
            res.status(200).json({ ok: "Compra realizada correctamente" })

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}
