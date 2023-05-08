import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import clientesRouter from "./routers/clientes.routes.js";
import planesPagosRouter from "./routers/planes-de-pagos.routes.js";
import empleadosRouter from "./routers/empleados.routes.js";
import authRouter from "./routers/auth.routes.js";
import medicionesClientesRoutes from "./routers/mediciones-clientes.routes.js";
import tipoModalidadPagoRouter from "./routers/tipos-modalidades-de-pagos.routes.js";
import productosRoutes from "./routers/productos.routes.js"
import proveedoresRoutes from  "./routers/proveedores.routes.js";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

// Usamos los enrutadores
app.use(planesPagosRouter);
app.use(clientesRouter);
app.use(medicionesClientesRoutes);
app.use(tipoModalidadPagoRouter);

app.use(productosRoutes);
//app.use(proveedoresRoutes);
app.use(empleadosRouter)
app.use(authRouter);


app.get("/", async (req, res) => {
    res.json({
        title: "Gym Web Api",
    });
});

app.listen(8000);
