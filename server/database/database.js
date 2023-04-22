import { Sequelize } from "sequelize";


export const database = new Sequelize('gymdb' ,'root', '12345678', {
    'dialect':'mysql',
    'host':'localhost',
    // 'logging':false
} )