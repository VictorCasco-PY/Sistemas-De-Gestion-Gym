import React, { useEffect, useState } from 'react'
import api from '../../services/api'

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
                    Nombre: {facturaDetalle.str_nombre_cliente}
                    RUC: {facturaDetalle.str_ruc_cliente}
                </section>

            </div>
        </div>
    )
}

export default DetalleFactura;