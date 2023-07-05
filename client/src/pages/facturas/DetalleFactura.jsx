import React, { useEffect, useRef, useState } from 'react';
import api from '../../services/api';
import Logo from '../../assets/logo.png';
import { useReactToPrint } from 'react-to-print'


const DetalleFactura = ({ id, onClose }) => {
    const [facturaDetalle, setFacturaDetalle] = useState({});
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Factura',
    });

    useEffect(() => {
        const getFacturaById = async () => {
            try {
                const response = await api.get(`/factura/${id}`);
                setFacturaDetalle(response.data);
                console.log(response.data)
            } catch (error) {
                console.log(error);
            }
        };

        getFacturaById();

        // Limpia el detalle de la factura al cerrar el modal
        return () => {
            setFacturaDetalle({});
        };
    }, [id]);

    return (
        <div>
            <div className={`modal is-active`} >
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Detalle de Factura</p>
                        <button className="delete" aria-label="close" onClick={onClose}></button>
                    </header>
                    <section className="modal-card-body" ref={componentRef}>
                        <div className="columns">
                            <div className="column has-text-centered">
                                <img src={Logo} alt="logo" width={'150px'} />
                                <p>Avda. Caballero c/ Gral. Artigas</p>
                                <p>Encarnacion - Paraguay</p>
                                <p>Tel. (+595) 777 888</p>
                            </div>
                            <div className="column has-text-centered">
                                <p>TIMBRADO N°. xxxxxxxx</p>
                                <p>Fecha Inicio Vigencia: 14/06/2023</p>
                                <p>Fecha Fin Vigencia: 30/06/2024</p>
                                <p><strong>RUC: xxxxxxx-x</strong></p>
                                <p><strong>FACTURA</strong></p>
                                <p>N°. 001-001-0000259</p>
                            </div>
                        </div>

                        <div className="columns is-rounded is-align-items-center">
                            <div className="column is-size-6 ">
                                <p>FECHA DE EMISION: <strong>{facturaDetalle.date_fecha}</strong></p>
                                <p>NOMBRE O RAZON SOCIAL: <strong>{facturaDetalle.str_nombre_cliente}</strong></p>
                                <p>RUC/CI N°: <strong>{facturaDetalle.str_ruc_cliente}</strong></p>
                            </div>
                            <div className="column">
                                <p>CONDICION DE VENTA: <strong>CONTADO</strong></p>
                                <p>VENCIMIENTO: <strong>23/06/2023</strong></p>
                                <p>NOTA DE REMISION N°: <strong>123</strong></p>
                            </div>
                        </div>

                        <table className="table is-fullwidth">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Subtotal</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                    <th>IVA</th>
                                </tr>
                            </thead>
                            <tbody>
                                {facturaDetalle.facturas_detalles &&
                                    facturaDetalle.facturas_detalles.map((detalle) => (
                                        <tr key={detalle.id}>
                                            <td>
                                                {detalle.id_producto ? (
                                                    detalle.producto.str_nombre
                                                ) : (
                                                    'Cuota'
                                                )}
                                            </td>
                                            <td>{(detalle.subtotal).toLocaleString('es-ES')}</td>
                                            <td>{detalle.cantidad}</td>
                                            <td>{detalle.precio.toLocaleString('es-ES')}</td>
                                            <td>{detalle.iva}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </section>
                </div>
                <button className='button' onClick={handlePrint}>Imprimir</button>
            </div>
        </div>
    );
};

export default DetalleFactura;
