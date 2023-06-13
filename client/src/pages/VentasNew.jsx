import React, { useEffect, useRef, useState } from 'react';
import api from '../services/api';
import { CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';

const VentasNew = () => {

    const [cliente, setCliente] = useState({});
    const [documentoCliente, setDocumentoCliente] = useState('');
    const [nombreCliente, setNombreCliente] = useState('');
    const [productos, setProductos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const inputRef = useRef(null);
    const [isLoading, setisLoading] = useState(false);
    const [modalidadesPago, setModalidadesPago] = useState([]);
    const [planDePago, setPlanDePago] = useState({});
    const [total, setTotal] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [iva5, setIVA5] = useState(0);
    const [iva10, setIVA10] = useState(0);
    const [PrecioPlanDePago, setPrecioPlanDePago] = useState(0);
    const [cantidadProducto, setCantidadProducto] = useState([]);

    /* Obtencion de datos del cliente */
    const getCliente = async (ruc) => {
        try {
            const response = await api.get(`/clientes?str_ruc=${ruc}`);
            const clienteData = response.data[0];
            setCliente(clienteData);
            setNombreCliente(clienteData.str_nombre);
            if (clienteData.planes_de_pagos && clienteData.planes_de_pagos.length > 0) {
                setPlanDePago(clienteData.planes_de_pagos[0]);

                const modalidadIndex = clienteData.planes_de_pagos[0].id_tipo_modalidad_de_pago - 1;
                if (modalidadesPago && modalidadesPago.length > modalidadIndex) {
                    const precio = modalidadesPago[modalidadIndex].precio;
                    setPrecioPlanDePago(Number(precio));
                }
            }
            console.log(clienteData.planes_de_pagos[0])
        } catch (error) {
            console.log(error.message);
        }
    }

    /*Eventos de seleccion de Cliente por RUC */
    const handleRucChange = (event) => {
        setDocumentoCliente(event.target.value);
    };

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            try {
                await getCliente(documentoCliente);
            } catch (error) {
                console.log(error);
                return;
            }
        }
    };

    /* Obtener productos */
    const fetchProductos = async () => {
        try {
            const response = await api.get("/productos");
            setProductos(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    /* Obtenemos los precios de modalidad de pago */
    const getPrecios = async () => {
        try {
            const response = await api.get('/tipos-modalidades-de-pagos');
            setModalidadesPago(response.data);
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getPrecios();
        fetchProductos();
    }, []);

    const handleBlur = () => {
        //blur deja de seleccionar el input
        setTimeout(() => {
            if (
                !document.activeElement.classList.contains('itemResult') &&
                !inputRef.current.contains(document.activeElement)
            ) {
                setModalVisible(false);
            }
        }, 0);
    };

    const handleMouseDown = (event) => {
        //Esto soluciona el error de hacer click en un item y de repente blur
        event.preventDefault();
    };

    const handleItemSelect = (item) => {
        setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
        setSearchQuery('');
        setModalVisible(false);
    };

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
        setModalVisible(true);
    };

    const handleDeleteProducto = (index) => {
        const updatedProductos = [...selectedItems];
        updatedProductos.splice(index, 1);
        setSelectedItems(updatedProductos);
        setCantidadProducto([]);
    };

    const handleCantidadChange = (event, index) => {
        const newCantidad = parseInt(event.target.value);

        if (!isNaN(newCantidad)) {
            const updatedCantidadProductos = [...cantidadProducto];
            updatedCantidadProductos[index] = newCantidad;
            setCantidadProducto(updatedCantidadProductos);
        }
    };


    /* Calculo del total */
    useEffect(() => {
        // Calcula el total cada vez que se actualizan los productos
        calcularTotal();
    }, [selectedItems, planDePago, cantidadProducto]);

    const calcularTotal = () => {
        let totalVenta = 0;
        let subtotalVenta = 0;
        let iva5Venta = 0;
        let iva10Venta = 0;

        selectedItems.forEach((producto, index) => {
            const cantidadProductos = cantidadProducto[index] || 0;

            if (producto.iva === '5') {
                iva5Venta += (cantidadProductos * producto.precio * 5) / 100;
            } else if (producto.iva === '10') {
                iva10Venta += (cantidadProductos * producto.precio * 10) / 100;
            }

            subtotalVenta += cantidadProductos * producto.precio;
        });

        totalVenta = subtotalVenta + iva5Venta + iva10Venta;

        // Agrega el precio del plan de pago solo si el estado de pago es "pendiente" o "atrasado"
        if (cliente.planes_de_pagos && cliente.planes_de_pagos.length > 0 && planDePago.estado_de_pago === 'pendiente') {
            setPrecioPlanDePago(Number(modalidadesPago[planDePago.id_tipo_modalidad_de_pago - 1].precio));
            console.log('Precio: ' + PrecioPlanDePago);
            totalVenta += PrecioPlanDePago;
        }

        setSubtotal(subtotalVenta);
        setIVA5(iva5Venta);
        setIVA10(iva10Venta);
        setTotal(totalVenta);
    };


    const handleRemovePlanDePago = () => {
        setPlanDePago({ id: null });
        setPrecioPlanDePago(0);
    }


    /* Envio de la venta realizada */
    const handleSubmitVenta = async () => {
        try {
            const detallesVenta = {
                ...(planDePago.estado_de_pago === 'pendiente' && {
                    plan_de_pago: {
                        id_plan_de_pago: planDePago.id,
                        subtotal: PrecioPlanDePago,
                        cantidad: 1,
                        precio: PrecioPlanDePago,
                        iva: 0
                    }
                }),
                productos: selectedItems.map((producto) => ({
                    id: producto.id,
                    cantidad: cantidadProducto,
                    precio: parseInt(producto.precio),
                    iva: parseInt(producto.iva),
                    subtotal: cantidadProducto * parseInt(producto.precio)
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
            console.log(response.data.ok);
            Swal.fire(
                `${response.data.ok}`,
                'Se ha generado una factura nueva!',
                'success'
            )
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='is-serif is-flex is-flex-direction-column'>
            <h1 className='title is-size-2'>Nueva Venta</h1>
            <div className='column has-background-light p-5 is-two-thirds-desktop is-full-tablet is-flex'
                style={{ border: "1px solid #D4D4D4", borderRadius: "8px" }}>
                <div className='listaItems column'>
                    <div className='is-flex mb-6'>
                        <div className="proveedorTab mb-5 is-flex is-align-content-center">
                            <p className='is-3 title m-0 mr-5'>Cliente</p>
                            <div className='is-flex is-flex-direction-column'
                                style={{ "gap": "10px" }}>
                                <div className='is-flex is-flex-direction-column '>
                                    <div className='is-flex'
                                        style={{ "gap": "10px" }}>
                                        <input
                                            className='input input-radius placeholder-black'
                                            style={{ backgroundColor: "#D4D4D4", color: "black", textAlign: "center" }}
                                            type="text"
                                            name="str_ruc"
                                            placeholder='Nro Documento'
                                            onChange={handleRucChange}
                                            onKeyDown={handleKeyDown}
                                        />
                                        <input
                                            className='input input-radius placeholder-black'
                                            style={{ backgroundColor: "#D4D4D4", color: "black", textAlign: "center" }}
                                            type="text"
                                            value={nombreCliente}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='precioYOpciones columns column is-flex is-flex-direction-column'>
                        <div className="input-container is-flex column m-0 p-0"
                            style={{ gap: "1.5rem" }}>
                            {/* Buscador con sugerencias */}
                            <div className='is-flex-grow-1 ml-5'>
                                <input
                                    className='input input-radius'
                                    type="text"
                                    style={{ backgroundColor: "#D4D4D4", color: "black", textAlign: "center" }}
                                    placeholder='Buscar producto...'
                                    value={searchQuery}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    ref={inputRef}
                                />
                                {/* ESTE ES EL MODAL QUE SE MUESTRA AL BUSCAR EN EL INPUT */}
                                {modalVisible && (
                                    <div className='modal-custom'>
                                        {/* renderizar el modal con los productos buscados */}
                                        {productos
                                            .filter((item) =>
                                                item.str_nombre.toLowerCase().includes(searchQuery.toLowerCase())
                                            )
                                            .map((item, index) => (
                                                <div
                                                    key={index}
                                                    className='itemResult'
                                                    onMouseDown={handleMouseDown}
                                                    onClick={() => handleItemSelect(item)}
                                                >
                                                    <div className='is-flex is-justify-content-space-between'>
                                                        <div>
                                                            <p>{item.str_nombre}</p>
                                                            <p>{item.str_descripcion}</p>
                                                        </div>
                                                        <p>
                                                            {parseFloat(item.precio).toLocaleString('en-US', {
                                                                useGrouping: true,
                                                                minimumFractionDigits: 0,
                                                            })}Gs
                                                        </p>
                                                    </div>
                                                    <hr className='itemSeparator m-0 mb-1' />
                                                </div>
                                            ))}
                                    </div>
                                )}
                                {/*  //////// */}
                            </div>
                        </div>
                        <div className='column is-flex is-justify-content-center is-flex-direction-column m-0 p-0'>
                            <table className="table is-bordered tableNew has-background-light is-bordered">
                                <thead className='has-text-centered'>
                                    <tr className='is-size-6'>
                                        <th >
                                            Producto/Servicio
                                        </th>
                                        <th >
                                            Descripcion
                                        </th>
                                        <th >
                                            Precio
                                        </th>
                                        <th >
                                            Cantidad
                                        </th>
                                        <th >

                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cliente.planes_de_pagos && cliente.planes_de_pagos.length > 0 && planDePago.estado_de_pago === 'pendiente' && (
                                        <tr>
                                            <td className='is-size-5'>Pago cuota</td>
                                            <td className='is-size-5'>Cuota {planDePago.str_modalidad}</td>
                                            <td className='is-size-5'>
                                                {modalidadesPago && modalidadesPago.length > 0
                                                    ? Number(modalidadesPago[planDePago.id_tipo_modalidad_de_pago - 1].precio.toLocaleString('es-ES', {
                                                        useGrouping: true,
                                                        minimumFractionDigits: 0,
                                                        maximumFractionDigits: 2,
                                                    }))
                                                    : ''}
                                            </td>
                                            <td className='is-size-5'>1</td>
                                            <td className='is-size-5'>
                                                <button className='button icon-button is-danger is-small is-outlined is-rounded' onClick={handleRemovePlanDePago}>
                                                    <DeleteIcon />
                                                </button>
                                            </td>
                                        </tr>

                                    )}

                                    {selectedItems.map((item, index) => (
                                        <tr key={index}>
                                            <td className='is-size-5'>{item.str_nombre}</td>
                                            <td className='is-size-5'>{item.str_descripcion}</td>
                                            <td className='is-size-5'>{Number(item.precio).toLocaleString('es-ES')}</td>
                                            <td className='is-size-5'>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max={item.cantidad}
                                                    value={cantidadProducto[index] || ''}
                                                    onChange={(event) => handleCantidadChange(event, index)}
                                                />
                                            </td>
                                            <td>
                                                <button className="button icon-button is-danger is-small is-outlined is-rounded" onClick={handleDeleteProducto}>
                                                    <DeleteIcon />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='column is-flex is-flex-direction-column is-align-self-flex-start'
                    style={{ maxWidth: "300px" }}>
                    <div className='is-flex is-flex-direction-column'>
                        <p className='title m-0'>Detalles</p>
                        <div className='is-flex is-flex-direction-column box mt-6'>
                            <div className=' mb-2 is-flex is-flex-direction-column'>
                                <p className='subtitle m-3'>Subtotal: {subtotal.toLocaleString('es-ES')}</p>
                                <p className='subtitle m-3'>IVA(5%): {iva5.toLocaleString('es-ES')}</p>
                                <p className='subtitle m-3'>IVA(10%): {iva10.toLocaleString('es-ES')}</p>
                                <p className='title m-2'>Total:</p>
                                <button className='button is-outlined is-static'>
                                    <p className="is-size-4">
                                        {total.toLocaleString('es-ES')}
                                    </p>
                                </button>
                            </div>

                            <button className='button is-success' onClick={handleSubmitVenta}>
                                Guardar Venta
                            </button>
                            <div className='is-flex is-align-items-center is-justify-content-center'>{isLoading && <CircularProgress />}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default VentasNew