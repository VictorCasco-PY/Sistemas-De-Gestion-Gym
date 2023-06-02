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

    let id = null;

    useEffect(() => {
        // Calcula el total cada vez que se actualizan los productos
        calcularTotal();
    }, [productos]);

    const getCliente = async (ruc) => {
        try {
            const response = await api.get(`/clientes?str_ruc=${ruc}`);
            setCliente(response.data[0]);
            console.log(response.data[0]);
            id = response.data[0].id;
        } catch (error) {
            console.log(error.message);
        }
    };

    const getPlanDePago = async (id) => {
        try {
            const response = await api.get(`/planes-de-pagos/${id}`);
            console.log(response.data);
            setPlanDePago(response.data);
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
                await getPlanDePago(id);
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

    const calcularTotal = () => {
        let totalVenta = 0;
        let subtotalVenta = 0;
        let iva5Venta = 0;
        let iva10Venta = 0;
        console.log(productos)
        productos.forEach((producto) => {
            subtotalVenta += producto.cantidad * producto.precio;
            if (producto.iva === '5') {
                iva5Venta += (producto.cantidad * producto.precio * 5) / 100;
            } else if (producto.iva === '10') {
                iva10Venta += (producto.cantidad * producto.precio * 10) / 100;
            }
        });

        totalVenta = subtotalVenta + iva5Venta + iva10Venta;

        setSubtotal(subtotalVenta);
        setIVA5(iva5Venta);
        setIVA10(iva10Venta);
        setTotal(totalVenta);
    };


    const navigate = useNavigate();
    return (
        <>
            <h1 className="title is-1">Nueva Venta</h1>
            <div className="container box columns m-4">
                <button className="button is-info" onClick={() => navigate(-1)}>
                    <ArrowBackIcon fontSize="string" />
                </button>
                <div className="column">
                    <div className="column is-one-third">
                        <h3>Datos del cliente</h3>
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
                        <h3>Productos/Servicios</h3>
                        <input
                            className="input is-primary"
                            type="text"
                            name="buscador"
                            placeholder="Buscar producto/servicio"
                            value={idProducto}
                            onChange={handleBuscadorChange}
                            onKeyDown={handleKeyDownBuscador}
                        />
                        <button
                            className="button is-info mt-2 mr-2"
                            onClick={handleAddProducto}
                        >
                            Agregar
                        </button>
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
                                {planDePago.estado_de_pago === 'pendiente' && (
                                    <tr>
                                        <td>
                                            <button
                                                className="button"
                                                onClick={handleDeletePlanDePago}
                                            >
                                                <DeleteIcon fontSize="string" />
                                            </button>
                                        </td>
                                        <td>Pago Cuota {planDePago.str_modalidad}</td>
                                        <td>1</td>
                                        <td>
                                            {planDePago.id_tipo_modalidad_de_pago === 1
                                                ? '10.000'
                                                : planDePago.id_tipo_modalidad_de_pago === 2
                                                    ? '70.000'
                                                    : planDePago.id_tipo_modalidad_de_pago === 3
                                                        ? '100.000'
                                                        : ''}
                                        </td>
                                        <td>
                                            {planDePago.id_tipo_modalidad_de_pago === 1
                                                ? '10.000'
                                                : planDePago.id_tipo_modalidad_de_pago === 2
                                                    ? '70.000'
                                                    : planDePago.id_tipo_modalidad_de_pago === 3
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
                        <h3>Detalle de venta</h3>
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
                            <button className="button is-primary mt-6">
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
