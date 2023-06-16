import { models } from "../models/models.js";

const {pagos_proveedores_detalles} = models;

export class Pagos_proveedores_detalles {

    crear = async (id_pago_proveedor, values) => {
        try {
            const result = await pagos_proveedores_detalles.create({ id_pago_proveedor,...values });
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

}
