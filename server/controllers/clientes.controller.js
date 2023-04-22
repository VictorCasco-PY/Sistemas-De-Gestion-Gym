/*

Alumno: Fernando Fabian Brizuela Agüero
Desc: Maneja la logica de Clientes (crear, listar, obtener cliente, modificar, dar de baja)
*/

import {models} from "../models/models.js";
import {bodyValidator} from "../tools/bodyValidator.js";

const {clientes} = models;

/**
 * Crea y registra un nuevo usuario a la DB
 */
export const crearCliente = async (req, res) => {
    try {
        // Verificamos si todos los campos estan
        const validator = bodyValidator(req);
        if (validator) return res.status(400).json(validator);

        // destructura los datos
        const {str_nombre, edad, str_direccion, str_ruc} = req.body;

        // Se comprueba que el ruc ingresado sea unico
        if (await getClienteByRuc({str_ruc})) return res.status(409).json({error: "El ruc ya esta registrado"});

        // Se crea un nuevo usuario y lo devolvemos como respuesta
        const result = await clientes.create({
            str_nombre,
            edad,
            str_direccion,
            str_ruc,
        });

        res.json(result);
    } catch (error) {
        // respondemos con un mensaje de error
        return res.json(error);
    }
};

/**
 * Lista todos clientes registrados
 */
export const getClientes = async (req, res) => {
    try {
        const result = await clientes.findAll();
        res.json(result);
    } catch (error) {
        res.json(error.message).status(500);
    }
};

/**
 * Obtiene el cliente por parametros /:id
 */
export const getClienteByParams = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await getClienteByID(id)
        return res.json(result);
    } catch (error) {
        res.json(error).status(500);
    }
};

/**
 * Obtiene el cliente desde la BD usando su ID
 */
export const getClienteByID = async (id) => {
    try{
        const result = await clientes.findOne({where:{id}});
        return result;
    }catch (error){
        throw new Error("Error al obtener cliente")
    }
}

/**
 * Obtiene el cliente desde la BD usando su ruc
 */
export const getClienteByRuc = async (req) => {
    try {
        const {str_ruc} = req;

        // buscamos en la BD un usuario con ese ruc
        const result = await clientes.findOne({where: {str_ruc}});
        return result;
    } catch (error) {
        return {error: "Algo salio mal"};
    }
};

