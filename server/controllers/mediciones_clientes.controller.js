import {models} from "../models/models.js";

const {mediciones_clientes} = models;

export const crearMedicionCliente = async (req, res) => {
    try {
        // destructura el objeto recibido, si recibe del body (req.body) o de una peticion de la api misma (req)
        const {
            entrenador_id, cliente_id, peso, altura,
            cintura, piernas, porcentaje_masa_corporal
        } = req.body;

        const result = mediciones_clientes.create({
            entrenador_id,
            cliente_id,
            date_fecha_medicion: getDateNow(),
            peso,
            altura,
            cintura,
            piernas,
            porcentaje_masa_corporal
        })

        res.json(result);

    } catch (e) {
        res.json(e)
    }
}