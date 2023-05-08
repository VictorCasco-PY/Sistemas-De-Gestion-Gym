import { Sequelize } from "sequelize";
import {DB_HOST, DB_NAME, DB_PASS, DB_USER} from "../config.js";


export const database = new Sequelize(DB_NAME ,DB_USER, DB_PASS, {
    'dialect':'mysql',
    'host':DB_HOST,
    'logging':false
} )