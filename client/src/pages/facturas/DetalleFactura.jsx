import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const DetalleFactura = ({ id, onClose }) => {
    const [facturaDetalle, setFacturaDetalle] = useState({});

    useEffect(() => {
        const getFacturaById = async () => {
            try {
                const response = await api.get(`/factura/${id}`);
                setFacturaDetalle(response.data);
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
        <div className={`modal is-active`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Detalle de Factura</p>
                    <button className="delete" aria-label="close" onClick={onClose}></button>
                </header>
                <section className="modal-card-body">
                    <table className="table is-fullwidth">
                        <tbody>
                            <tr>
                                <td>Nombre:</td>
                                <td>{facturaDetalle.str_nombre_cliente}</td>
                            </tr>
                            <tr>
                                <td>RUC:</td>
                                <td>{facturaDetalle.str_ruc_cliente}</td>
                            </tr>
                            <tr>
                                <td>Fecha:</td>
                                <td>{facturaDetalle.date_fecha}</td>
                            </tr>
                            <tr>
                                <td>Total:</td>
                                <td>{facturaDetalle.total}</td>
                            </tr>
                            <tr>
                                <td>Iva 5%:</td>
                                <td>{facturaDetalle.iva_5}</td>
                            </tr>
                            <tr>
                                <td>Iva 10%:</td>
                                <td>{facturaDetalle.iva_10}</td>
                            </tr>
                            <tr>
                                <td>Iva exenta:</td>
                                <td>{facturaDetalle.iva_exenta}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>Productos/Servicios:</p>
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
                                        <td>{detalle.id_producto}</td>
                                        <td>{detalle.subtotal}</td>
                                        <td>{detalle.cantidad}</td>
                                        <td>{detalle.precio}</td>
                                        <td>{detalle.iva}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
};

export default DetalleFactura;
