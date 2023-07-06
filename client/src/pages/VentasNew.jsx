import React, { useEffect, useRef, useState } from 'react';
import api from '../services/api';
import { CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import FacturaImpresa from './facturas/FacturaImpresa';

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
    const [fechaActual, setFechaActual] = useState('');
    const [efectivo, setEfectivo] = useState('');
    const [credito, setCredito] = useState('');
    const [debito, setDebito] = useState('');
    const inputRefNroDoc = useRef(null);
    const idCaja = localStorage.getItem('sesionCajaId');
    const [facturaPrint, setFacturaPrint] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const resetFields = () => {
        setCliente({});
        setDocumentoCliente('');
        setNombreCliente('');
        setProductos([]);
        setModalVisible(false);
        setSelectedItems([]);
        setSearchQuery('');
        setisLoading(false);
        setModalidadesPago([]);
        setPlanDePago({});
        setTotal(0);
        setSubtotal(0);
        setIVA5(0);
        setIVA10(0);
        setPrecioPlanDePago(0);
        setCantidadProducto([]);
        setEfectivo('');
        setCredito('');
        setDebito('');
        inputRefNroDoc.current.value = '';
    };

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
            Swal.fire({
                icon: 'error',
                title: 'Lo siento...',
                text: 'El cliente con ese RUC no existe!',
            })
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


        selectedItems.forEach((producto, index) => {
            const cantidadProductos = cantidadProducto[index] || 1;
            subtotalVenta += cantidadProductos * producto.precio;
        });

        totalVenta = subtotalVenta;

        // Agrega el precio del plan de pago solo si el estado de pago es "pendiente" o "atrasado"
        if (cliente.planes_de_pagos && cliente.planes_de_pagos.length > 0 && (planDePago.estado_de_pago === 'pendiente' || planDePago.estado_de_pago === 'atrasado')) {
            setPrecioPlanDePago(Number(modalidadesPago[planDePago.id_tipo_modalidad_de_pago - 1].precio));
            console.log('Precio: ' + PrecioPlanDePago);
            totalVenta += PrecioPlanDePago;
        }

        setSubtotal(subtotalVenta);
        setTotal(totalVenta);
    };


    const handleRemovePlanDePago = () => {
        setPlanDePago({ id: null });
        setPrecioPlanDePago(0);
    }


    /* Envio de la venta realizada */
    const handleSubmitVenta = async () => {
        const detallesVenta = {
            ...((planDePago.estado_de_pago === 'pendiente' || planDePago.estado_de_pago === 'atrasado') && {
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

        const detallesCobro = [];
        if (efectivo) {
            detallesCobro.push({ id_forma_de_pago: 1, monto: parseInt(efectivo) });
        }

        if (credito) {
            detallesCobro.push({ id_forma_de_pago: 2, monto: parseInt(credito) });
        }

        if (debito) {
            detallesCobro.push({ id_forma_de_pago: 3, monto: parseInt(debito) });
        }

        let totalC = 0;
        for (const detalle of detallesCobro) {
            totalC += detalle.monto;
        }

        // Comprobación de los detalles
        /*  if (detallesVenta.productos.length === 0) {
              Swal.fire({
                  icon: 'error',
                  title: 'Lo siento...',
                  text: 'No hay productos seleccionados!',
              })
              return;
          }*/

        total == totalC ? console.log('Igual') : console.log('No Igual')
        const dataVentas = {
            id_sesion_caja: idCaja,
            id_cliente: cliente.id,
            id_timbrado: 1,
            total: total,
            saldo: 0,
            iva_5: iva5,
            iva_10: iva10,
            iva_exenta: 0,
            detalles: detallesVenta,
            cobros_detalles: detallesCobro
        };
        console.log(dataVentas);

        if (total == totalC) {
            try {
                const response = await api.post("/ventas", dataVentas);
                console.log(response.data.nuevaFactura);
                setFacturaPrint(response.data.nuevaFactura);
                Swal.fire(
                    'Factura guardada',
                    'Se ha generado una factura nueva!',
                    'success'
                );
                resetFields();
                setShowModal(true);
            } catch (error) {
                console.log(error);
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Lo siento...',
                text: 'El total no coincide con el cobro!',
            })
        }
    }

    useEffect(() => {
        const obtenerFechaActual = () => {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const fecha = `${year}-${month}-${day}`;
            setFechaActual(fecha);
        };

        obtenerFechaActual();
    }, []);


    const closeModal = () => {
        setShowModal(false);
    };


    if (!idCaja) {
        return (
            <div>
                <div className='is-serif is-flex is-flex-direction-column'>
                    <h1 className='title is-size-2'>Nueva Venta</h1>
                    <hr />
                    <div className='column has-background-light p-5 is-flex is-flex-direction-column mr-auto ml-auto'
                        style={{ border: "1px solid #D4D4D4", borderRadius: "8px", width: "100%", maxWidth: "800px" }}>
                        <div class="notification is-warning is-flex is-flex-direction-column">
                            <p className='title'>Error</p>
                            <p className='subtitle'>La caja no esta abierta</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className='is-serif is-flex is-flex-direction-column'>
            <h1 className='title is-size-2'>Nueva Venta</h1>
            <hr />
            <div className='column has-background-light p-5 is-flex mr-auto ml-auto'
                style={{ border: "1px solid #D4D4D4", borderRadius: "8px", width: "100%", maxWidth: "1200px" }}>
                {showModal && (
                    <div className="modal is-active">
                        <div className="modal-background" onClick={closeModal}></div>
                        <div className="modal-content">
                            <div className="box">
                                <FacturaImpresa factura={facturaPrint} />
                            </div>
                        </div>
                        <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
                    </div>
                )}
                <div className='listaItems column'>
                    <div className='is-flex mb-6'>
                        <div className="proveedorTab mb-5 is-flex is-align-content-center">
                            <p className='is-3 title m-0 mr-5'
                                style={{ width: "120px" }}>Cliente</p>
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
                                            placeholder='Ingrese RUC'
                                            onChange={handleRucChange}
                                            onKeyDown={handleKeyDown}
                                            ref={inputRefNroDoc}
                                        />
                                        <input
                                            className='input input-radius placeholder-black'
                                            style={{ backgroundColor: "#D4D4D4", color: "black", textAlign: "center" }}
                                            type="text"
                                            value={nombreCliente}
                                            readOnly
                                        />

                                        <input
                                            className='input input-radius placeholder-black'
                                            style={{ backgroundColor: "#D4D4D4", color: "black", textAlign: "center" }}
                                            type="date"
                                            value={fechaActual}
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
                                                // Agregar condición para verificar si la cantidad es mayor que 0
                                                item.cantidad > 0 && (
                                                    <div
                                                        key={index}
                                                        className='itemResult'
                                                        onMouseDown={handleMouseDown}
                                                        onClick={() => handleItemSelect(item)}
                                                    >
                                                        <div className='is-flex is-justify-content-space-between'>
                                                            <div>
                                                                <p className='has-text-weight-bold is-size-5 m-0'>{item.str_nombre}</p>
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
                                                )
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
                                            Precio Unitario(Gs)
                                        </th>
                                        <th>
                                            IVA(%)
                                        </th>
                                        <th >
                                            Cantidad
                                        </th>
                                        <th>
                                            Subtotal
                                        </th>
                                        <th >

                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cliente.planes_de_pagos && cliente.planes_de_pagos.length > 0 && (planDePago.estado_de_pago === 'pendiente' || planDePago.estado_de_pago === 'atrasado') && (
                                        <tr>
                                            <td className='is-size-5'>Pago cuota</td>
                                            <td className='is-size-5'>Cuota {planDePago.str_modalidad}</td>
                                            <td className='is-size-5'>
                                                {modalidadesPago && modalidadesPago.length > 0
                                                    ? (Number(modalidadesPago[planDePago.id_tipo_modalidad_de_pago - 1].precio).toLocaleString('es-ES'))
                                                    : ''}
                                            </td>
                                            <td className='is-size-5'>10</td>
                                            <td className='is-size-5'>1</td>
                                            <td className='is-size-5'>
                                                {modalidadesPago && modalidadesPago.length > 0
                                                    ? (Number(modalidadesPago[planDePago.id_tipo_modalidad_de_pago - 1].precio).toLocaleString('es-ES'))
                                                    : ''}
                                            </td>
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
                                            <td className='is-size-5'>{item.iva}</td>
                                            <td className='is-size-5'>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max={item.cantidad}
                                                    value={cantidadProducto[index] || 1}
                                                    onChange={(event) => handleCantidadChange(event, index)}
                                                />
                                            </td>
                                            <td className='is-size-5'>
                                                {(item.precio * (cantidadProducto[index] || 1)).toLocaleString('es-ES')}
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
                        <label htmlFor='efectivo'>Efectivo</label>
                        <input
                            type='text'
                            id='efectivo'
                            className='input'
                            value={efectivo}
                            onChange={(e) => setEfectivo(e.target.value)}
                        />

                        <label htmlFor='credito'>Tarjeta(Credito)</label>
                        <input
                            type='text'
                            id='credito'
                            className='input'
                            value={credito}
                            onChange={(e) => setCredito(e.target.value)}
                        />

                        <label htmlFor='debito'>Tarjeta(Debito)</label>
                        <input
                            type='text'
                            id='debito'
                            className='input'
                            value={debito}
                            onChange={(e) => setDebito(e.target.value)}
                        />
                        <div className='is-flex is-flex-direction-column box mt-6'>
                            <div className=' mb-2 is-flex is-flex-direction-column'>
                                <p className='title m-2'>Total:</p>
                                <button className='button is-outlined is-static'>
                                    <p className="is-size-4">
                                        Gs. {total.toLocaleString('es-ES')}
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
};

export default VentasNew