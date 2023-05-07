import { models } from "../models/models.js";
import {bodyValidator} from "../tools/bodyValidator.js";

const {productos} = models;

export class Clase {
    crear = async (req,res)=>{}
    update = async (req,res)=>{}
    delete = async(req,res)=>{}
    getAll = async(req,res)=>{}

    getByParams = async(req,res)=>{} // obtiene por id

    getById = async(req,res)=>{}
}