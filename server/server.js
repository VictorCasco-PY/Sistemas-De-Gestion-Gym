import express from "express";
import clientesRouter from "./routers/clientes.routes.js";
import bodyParser from "body-parser";
import planesPagosRouter from "./routers/planes-de-pagos.routes.js";
import medicionesClientesRoutes from "./routers/mediciones-clientes.routes.js";
import tipoModalidadPagoRouter from "./routers/tipos-modalidades-de-pagos.routes.js";
import productosRoutes from "./routers/productos.routes.js"
import proveedoresRoutes from  "./routers/proveedores.routes.js";
import cors from "cors";

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
app.use(proveedoresRoutes);

app.get("/", async (req, res) => {
    res.json({
        title: "Gym Web Api",
    });
});

app.listen(8000);
