import express from 'express'
import { Clientes } from './models/clientes.js';
import { database } from './database/database.js';

const app = express();

app.get('/', async (req,res)=>{
    try {
        const r = await Clientes.findAll({attributes:['str_nombre', 'str_ruc', 'str_direccion']})
        // const r = await database.query('select * from clientes');
    res.json(r[0])
    } catch (error) {
        res.json({error:error.message})
    }
})

app.listen(8000, ()=> console.log('Escuchando en puerto 8000'));