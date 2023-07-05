import React, { useRef } from 'react';
import Logo from '../../assets/logo.png';
import { useReactToPrint } from 'react-to-print'

const FacturaImpresa = ({ factura }) => {
    const { numero_factura, date_fecha, str_nombre_cliente, str_ruc_cliente, total, facturas_detalles } = factura;
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Factura',
    });
    return (
        <div>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Detalle de Factura</p>
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
                            <p><strong>RUC: 3222444-4</strong></p>
                            <p><strong>FACTURA</strong></p>
                            <p>N°. 001-001-{numero_factura ? numero_factura : '000001'}</p>
                        </div>
                    </div>

                    <div className="columns is-rounded is-align-items-center">
                        <div className="column is-size-6 ">
                            <p>FECHA DE EMISION: <strong>{date_fecha}</strong></p>
                            <p>NOMBRE O RAZON SOCIAL: <strong>{str_nombre_cliente}</strong></p>
                            <p>RUC/CI N°: <strong>{str_ruc_cliente}</strong></p>
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
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {facturas_detalles.map((detalle) => (
                                <tr key={detalle.id}>
                                    <td>{detalle.id_producto ? (
                                        detalle.producto.str_nombre
                                    ) : (
                                        'Cuota'
                                    )}</td>
                                    <td>{detalle.cantidad}</td>
                                    <td>{detalle.precio.toLocaleString('es-ES')}</td>
                                    <td>{detalle.subtotal.toLocaleString('es-ES')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
                <button className='button' onClick={handlePrint}>Imprimir</button>
            </div>
        </div>

    );
};

export default FacturaImpresa;
