import express from 'express'
import clientesRouter from './routers/clientes.routes.js';
import bodyParser from 'body-parser';

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(clientesRouter)

app.get('/', async (req,res)=>{
    try {
        res.json({
            title:"GymBRO Web Api"
        })
    } catch (error) {
        res.json({error:error.message})
    }
})

app.listen(8000, ()=> console.log('Escuchando en puerto 8000'));