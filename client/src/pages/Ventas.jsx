import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import PaymentIcon from '@mui/icons-material/Payment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Ventas = () => {
    const [cliente, setCliente] = useState({});
    const [documentoCliente, setDocumentoCliente] = useState('');
    const [planDePago, setPlanDePago] = useState({});
    const [productos, setProductos] = useState([]);
    const [idProducto, setIdProducto] = useState('');
    const [total, setTotal] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [iva5, setIVA5] = useState(0);
    const [iva10, setIVA10] = useState(0);
    const [precioPlanPago, setPrecioPlanPago] = useState(0);
    const navigate = useNavigate();
    let id_cliente = null;




    useEffect(() => {
        // Calcula el total cada vez que se actualizan los productos
        calcularTotal();
    }, [productos, planDePago]);

    const getCliente = async (ruc) => {
        try {
            const response = await api.get(`/clientes?str_ruc=${ruc}`);
            setCliente(response.data[0]);
            console.log("cliente", response.data[0]);
            id_cliente = response.data[0].id;
            console.log(id_cliente);
        } catch (error) {
            console.log(error.message);
        }
    };

    const getPlanDePago = async (id) => {
        try {
            const response = await api.get(`/planes-de-pagos?id_cliente=${id}`);
            console.log(response.data);
            setPlanDePago(response.data);
            const precio = obtenerPrecioPlanDePago(response.data); // Obtener el precio del plan de pago
            console.log(precio);
            setPrecioPlanPago(precio); // Almacenar el precio del plan de pago
        } catch (error) {
            console.log(error);
        }
    };

    const handleRucChange = (event) => {
        setDocumentoCliente(event.target.value);
    };

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            try {
                await getCliente(documentoCliente);
                await getPlanDePago(id_cliente);
            } catch (error) {
                console.log(error);
                return;
            }
        }
    };

    const handleDeletePlanDePago = () => {
        setPlanDePago({});
    };

    const handleDeleteProducto = (index) => {
        const updatedProductos = [...productos];
        updatedProductos.splice(index, 1);
        setProductos(updatedProductos);
    };

    const handleAddProducto = async () => {
        try {
            const productoId = idProducto;
            const response = await api.get(`/producto/${productoId}`);
            const nuevoProducto = {
                id: productoId,
                str_descripcion: response.data.str_descripcion,
                cantidad: 1,
                iva: response.data.iva,
                precio: response.data.precio,
            };
            setProductos([...productos, nuevoProducto]);
            console.log(response.data);
        } catch (error) {
            alert('El producto no existe');
        }
    };

    const handleBuscadorChange = (event) => {
        setIdProducto(event.target.value);
    };

    const handleKeyDownBuscador = (event) => {
        if (event.key === 'Enter') {
            try {
                handleAddProducto();
                setIdProducto('');
            } catch (error) {
                console.log(error);
                return;
            }
        }
    };

    const handleCantidadChange = (event, index) => {
        const updatedProductos = [...productos];
        updatedProductos[index].cantidad = parseInt(event.target.value);
        setProductos(updatedProductos);
    };

    const obtenerPrecioPlanDePago = (planDePago) => {

        const idTipoModalidadPago = planDePago[0].id_tipo_modalidad_de_pago;

        switch (idTipoModalidadPago) {
            case 1:
                return 10000; // Precio para id_tipo_modalidad_de_pago 1: 10.000
            case 2:
                return 70000; // Precio para id_tipo_modalidad_de_pago 2: 70.000
            case 3:
                return 100000; // Precio para id_tipo_modalidad_de_pago 3: 100.000
            default:
                return 0; // Si el id_tipo_modalidad_de_pago no coincide con ninguno de los casos anteriores, el precio es 0
        }
    };


    const calcularTotal = () => {
        let totalVenta = 0;
        let subtotalVenta = 0;
        let iva5Venta = 0;
        let iva10Venta = 0;
        productos.forEach((producto) => {
            if (producto.iva === '5') {
                iva5Venta += (producto.cantidad * producto.precio * 5) / 100;
            } else if (producto.iva === '10') {
                iva10Venta += (producto.cantidad * producto.precio * 10) / 100;
            }
            subtotalVenta += (producto.cantidad * producto.precio);
        });

        totalVenta = subtotalVenta + iva5Venta + iva10Venta + precioPlanPago;

        setSubtotal(subtotalVenta);
        setIVA5(iva5Venta);
        setIVA10(iva10Venta);
        setTotal(totalVenta);
    };

    const handleSubmitVenta = async () => {
        try {
            const detallesVenta = {
                plan_de_pago: {
                    id_plan_de_pago: planDePago[0].id,
                    subtotal: precioPlanPago,
                    cantidad: 1,
                    precio: precioPlanPago,
                    iva: 0
                },
                productos: productos.map((producto) => ({
                    id: producto.id,
                    cantidad: producto.cantidad,
                    precio: parseInt(producto.precio),
                    iva: parseInt(producto.iva),
                    subtotal: producto.cantidad * producto.precio
                }))
            };

            const dataVentas = {
                id_cliente: cliente.id,
                id_timbrado: 1,
                total: total,
                saldo: 0,
                iva_5: iva5,
                iva_10: iva10,
                iva_exenta: 0,
                detalles: detallesVenta
            };
            console.log(dataVentas);
            const response = await api.post("/ventas", dataVentas);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h1 className="title is-1">Nueva Venta</h1>
            <div className="container box columns m-4">
                <button className="button is-info" onClick={() => navigate(-1)}>
                    <ArrowBackIcon fontSize="string" />
                </button>
                <div className="column">
                    <div className="column is-one-third">
                        <p className='title is-3'>Datos del cliente</p>
                        <label htmlFor="str_ruc">Nro Documento</label>
                        <input
                            className="input is-primary"
                            type="text"
                            name="str_ruc"
                            onChange={handleRucChange}
                            onKeyDown={handleKeyDown}
                        />
                        <label htmlFor="str_nombre">Nombre</label>
                        <input
                            className="input is-primary"
                            type="text"
                            name="str_nombre"
                            readOnly
                            value={cliente?.str_nombre || ' '}
                        />
                    </div>
                    <div className="mt-5">
                        <p className='title is-3'>Productos/Servicios</p>
                        <input
                            className="input is-primary"
                            type="text"
                            name="buscador"
                            placeholder="Buscar producto/servicio"
                            value={idProducto}
                            onChange={handleBuscadorChange}
                            onKeyDown={handleKeyDownBuscador}
                        />

                        <table className="table">
                            <thead>
                                <tr>
                                    <td></td>
                                    <th>Producto/Servicio</th>
                                    <th>Cantidad</th>
                                    <th>Precio(Gs.)</th>
                                    <th>Total(Gs.)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {planDePago.length > 0 && (planDePago[0].estado_de_pago === 'pendiente' || planDePago[0].estado_de_pago === 'atrasado') && (
                                    <tr>
                                        <td>
                                            <button
                                                className="button"
                                                onClick={handleDeletePlanDePago}
                                            >
                                                <DeleteIcon fontSize="string" />
                                            </button>
                                        </td>
                                        <td>Pago Cuota {planDePago[0].str_modalidad}</td>
                                        <td>1</td>
                                        <td>
                                            {planDePago[0].id_tipo_modalidad_de_pago === 1
                                                ? '10.000'
                                                : planDePago[0].id_tipo_modalidad_de_pago === 2
                                                    ? '70.000'
                                                    : planDePago[0].id_tipo_modalidad_de_pago === 3
                                                        ? '100.000'
                                                        : ''}
                                        </td>
                                        <td>
                                            {planDePago[0].id_tipo_modalidad_de_pago === 1
                                                ? '10.000'
                                                : planDePago[0].id_tipo_modalidad_de_pago === 2
                                                    ? '70.000'
                                                    : planDePago[0].id_tipo_modalidad_de_pago === 3
                                                        ? '100.000'
                                                        : ''}
                                        </td>
                                    </tr>
                                )}
                                {productos.map((producto, index) => (
                                    <tr key={index}>
                                        <td>
                                            <button
                                                className="button"
                                                onClick={() => handleDeleteProducto(index)}
                                            >
                                                <DeleteIcon fontSize="string" />
                                            </button>
                                        </td>
                                        <td>{producto.str_descripcion}</td>
                                        <td>
                                            <input
                                                type="number"
                                                min="1"
                                                value={producto.cantidad}
                                                onChange={(event) =>
                                                    handleCantidadChange(event, index)
                                                }
                                            />
                                        </td>
                                        <td>{producto.precio}</td>
                                        <td>{producto.cantidad * producto.precio}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="column is-one-third">
                    <div>
                        <p className='title is-3'>Detalle de venta</p>
                        <div>
                            <label htmlFor="tipo">Sub Total</label>
                            <input
                                type="text"
                                className="input is-primary"
                                disabled
                                value={subtotal}
                            />
                        </div>
                        <div>
                            <label htmlFor="tipo">IVA (5%)</label>
                            <input
                                type="text"
                                className="input is-primary"
                                disabled
                                value={iva5}
                            />
                        </div>
                        <div>
                            <label htmlFor="tipo">IVA (10%)</label>
                            <input
                                type="text"
                                className="input is-primary"
                                disabled
                                value={iva10}
                            />
                        </div>
                        <div>
                            <div>
                                <label htmlFor="tipo">Total(Gs.)</label>
                                <input
                                    type="text"
                                    name="total"
                                    className="input is-primary"
                                    disabled
                                    value={total}
                                />
                            </div>
                        </div>
                        <div className="buttons is-right">
                            <button className="button is-primary mt-6" onClick={handleSubmitVenta}>
                                <PaymentIcon fontSize="medium" />
                                Guardar Venta
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Ventas;
