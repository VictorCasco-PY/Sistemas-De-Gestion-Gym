import { models } from "../models/models.js";

const { empleados, sesiones_cajas, arqueos } = models;
export class Arqueos {
    crear = async (req, res) => {
        try {
            const { body } = req;
            const { id_sesion_caja, id_empleado, date_fecha, total } = body;

            // Verificar si el empleado ya está registrado
            const epmpleadoExistente = await this.getEmpleadoById(id_empleado);
            if (!epmpleadoExistente) {
                return res.status(404).json({ error: "No existe un empleado con ese ID" });
            }

            // Verificar si la caja esta registrada
            const sesionExistente = await this.getSesionById(id_sesion_caja);
            if (!sesionExistente) {
                return res.status(404).json({ error: "No existe una  sesion con ese ID" });
            }

            // Crear la relación entre el empleado y la caja
            const result = await this.createSesionCaja(id_empleado, id_sesion_caja, date_fecha, total);
            res.json(result);
        } catch (error) {
            const {message} = error;
            return res.status(500).json({error:message});
        }
    };

    // Obtener un empleado por ID
    getEmpleadoById = async (id) => {
        try {
            const empleado = await empleados.findOne({ where: { id } });
            return empleado;
        } catch (error) {
            throw new Error("Error al obtener el empleado");
        }
    }

    // Obtener una caja por ID
    getSesionById = async (id) => {
        try {
            const caja = await sesiones_cajas.findOne({ where: { id } });
            return caja;
        } catch (error) {
            throw new Error("Error al obtener la sesion-caja");
        }
    }

    // Crear una relación entre un empleado y una caja
    createSesionCaja = async (id_empleado, id_sesion_caja, date_fecha, total) => {
        try {
            const result = await arqueos.create({ id_empleado, id_sesion_caja, date_fecha, total });
            return result;
        } catch (error) {
            throw new Error("Error al crear el arqueo");
        }
    }
    //Actualizar la sesion caja
    update = async (req, res) => {
        try {
            const { id } = req.params;
            const { body } = req;
            const [rowsAffected] = await arqueos.update({ ...body }, { where: { id } });
            if (rowsAffected === 0) {
                return res.status(404).json("No se actualizó ningun arqueo");
            }
            res.status(200).send("Arqueo actualizado");
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    };
    //Eliminar la sesion caja
    delete = async (req, res) => {
        try {
            const { id } = req.params;
            const rowsAffected = await arqueos.destroy({ where: { id } });
            if (rowsAffected === 0) {
                return res.status(404).json("No existe un arqueo con ese ID");
            }
            res.status(200).send("Arqueo Eliminado");
        } catch (error) {
            return res.status(500).json(error);
        }
    };
    //Obtiene todos los objetos
    getAll = async (req, res) => {
        try {
            const result = await arqueos.findAll();
            res.json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    };
    getById = async (req, res) => {
        try {
            const { id } = req.params;
            console.log("Se busca el  id");
            const result = await arqueos.findOne({ where: { id } });

            if (!result) {
                return res.status(404).json("No se encontró un arqueo con ese ID");
            }

            res.json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    };
    getByParams = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.getById(id);
            return res.json(result);
        } catch (error) {
            res.json(error).status(500);
        }
    }
}
