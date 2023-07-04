import express from "express";
import cron from "node-cron";
import clientesRouter from "./routers/clientes.routes.js";
import bodyParser from "body-parser";
import planesPagosRouter from "./routers/planes-de-pagos.routes.js";
import medicionesClientesRoutes from "./routers/mediciones-clientes.routes.js";
import tipoModalidadPagoRouter from "./routers/tipos-modalidades-de-pagos.routes.js";
import productosRoutes from "./routers/productos.routes.js"
import proveedoresRoutes from  "./routers/proveedores.routes.js";
import cors from "cors";
import empleadosRoutes from "./routers/empleados.routes.js";
import authRoutes from "./routers/auth.routes.js";
import facturasRoutes from "./routers/facturas.routes.js";
import facturasDetallesRoutes from "./routers/facturas_detalles.routes.js";
import timbradosRoutes from "./routers/timbrados.routes.js";
import cajasRoutes from "./routers/cajas.routes.js";
import sesionesCajasRoutes from "./routers/sesiones-cajas.routes.js";
import arqueosRoutes from "./routers/arqueos.routes.js";
import facturasProveedoresRoutes from "./routers/facturas_proveedores.routes.js";
import facturasProveedoresDetallesRoutes from "./routers/facturas_proveedores_detalles.routes.js";
import ventasRoutes from "./routers/ventas.routes.js";
import comprasRoutes from "./routers/compras.routes.js";
import {actualizarEstados} from "./services/actualizarPlanesDePago.js"
import {getArqueo} from "./services/arqueoCaja.js";
import arqueoCajaRoutes from "./routers/arqueoCaja.routes.js";
import pagosRoutes from "./routers/pagos.routes.js";
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
app.use(empleadosRoutes)
app.use(authRoutes)
app.use(facturasRoutes)
app.use(facturasDetallesRoutes)
app.use(timbradosRoutes)
app.use(cajasRoutes)
app.use(sesionesCajasRoutes)
app.use(arqueosRoutes)
app.use(facturasProveedoresRoutes)
app.use(facturasProveedoresDetallesRoutes)
app.use(ventasRoutes);
app.use(comprasRoutes);
app.use(arqueoCajaRoutes);
app.use(pagosRoutes);


cron.schedule('0 0 * * *', actualizarEstados, {
    timezone: 'America/Asuncion'
})

app.get("/", async (req, res) => {
    res.json({
        title: "Gym Web Api",
    });
});

app.listen(8000);
