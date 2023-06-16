import { models } from "../models/models.js";

const { empleados, cajas, sesiones_cajas } = models;
export class SesionesCajas {
    crear = async (req, res) => {
        try {
            const { body } = req;
            const { id_caja, id_empleado, monto_inicial, monto_final, date_fecha, time_inicio, time_cierre } = body;

            // Verificar si el empleado ya está registrado
            const epmpleadoExistente = await this.getEmpleadoById(id_empleado);
            if (!epmpleadoExistente) {
                return res.status(404).json({ error: "No existe un empleado con ese ID" });
            }

            // Verificar si la caja esta registrada
            const stockExistente = await this.getCajaById(id_caja);
            if (!stockExistente) {
                return res.status(404).json({ error: "No existe una  caja con ese ID" });
            }

            // Crear la relación entre el empleado y la caja
            const result = await this.createSesionCaja(id_empleado, id_caja, monto_inicial, monto_final, date_fecha, time_inicio, time_cierre);
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
    getCajaById = async (id) => {
        try {
            const caja = await cajas.findOne({ where: { id } });
            return caja;
        } catch (error) {
            throw new Error("Error al obtener la caja");
        }
    }

    // Crear una relación entre un empleado y una caja
    createSesionCaja = async (id_empleado, id_caja, monto_inicial, monto_final, date_fecha, time_inicio, time_cierre) => {
        try {
            const result = await sesiones_cajas.create({ id_empleado, id_caja, monto_inicial, monto_final, date_fecha, time_inicio, time_cierre });
            return result;
        } catch (error) {
            throw new Error("Error al crear la relación entre el empleado y la caja");
        }
    }
    //Actualizar la sesion caja
    update = async (req, res) => {
        try {
            const { id } = req.params;
            const { body } = req;
            const [rowsAffected] = await sesiones_cajas.update({ ...body }, { where: { id } });
            if (rowsAffected === 0) {
                return res.status(404).json("No se actualizó ninguna relación empleado-caja");
            }
            res.status(200).send("Relación empleado-caja actualizada");
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    };
    //Eliminar la sesion caja
    delete = async (req, res) => {
        try {
            const { id } = req.params;
            const rowsAffected = await sesiones_cajas.update({activo:false}, {where: { id } });
            if (rowsAffected === 0) {
                return res.status(404).json("No existe una relación empleado-caja con ese ID");
            }
            res.status(200).send("Relación empleado-caja eliminada");
        } catch (error) {
            return res.status(500).json(error);
        }
    };
    //Obtiene todos los objetos
    getAll = async (req, res) => {
        try {
            const result = await sesiones_cajas.findAll({ where: { activo: true } });
            res.json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    };
    getById = async (id) => {
        try {
            console.log("Se busca el  id");
            const result = await sesiones_cajas.findOne({ where: { id } });

            if (!result) {
                return res.status(404).json("No se encontró una relación empleado-caja con ese ID");
            }

            return result;
        } catch (error) {
            throw Error(error.message);
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
    pagar = async (id, monto) => {
        try{
          const sesion = await this.getById(id);
          const newMontoFinal = parseFloat(sesion.monto_final) - parseFloat(monto);
          await sesiones_cajas.update({monto_final:newMontoFinal}, {where:{id}});
        }catch(error){
            console.log(error.message);

          throw new Error("Error a descontar monto en la sesion");
        }
      }
      cobrar = async (id, monto) => {
        try{
          const sesion = await this.getById(id);
          const newMontoFinal = parseFloat(sesion.monto_final) + parseFloat(monto);
          await sesiones_cajas.update({monto_final:newMontoFinal}, {where:{id}});
        }catch(error){
            console.log(error.message);
          throw new Error("Error a descontar monto en la sesion");
        }
      }
}
