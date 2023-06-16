import React from 'react';

const FacturaImpresa = ({ factura }) => {
    const { numero_factura, date_fecha, str_nombre_cliente, str_ruc_cliente, total, facturas_detalles } = factura;


    return (
        <div>

            <div className="factura" >
                <h2 className="title is-4">Factura #{numero_factura}</h2>
                <p>Fecha: {date_fecha}</p>
                <p>Cliente: {str_nombre_cliente}</p>
                <p>RUC: {str_ruc_cliente}</p>

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
                                <td>{detalle.precio}</td>
                                <td>{detalle.subtotal}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <p className="title is-5">Total: {parseInt(total).toLocaleString()}</p>
            </div>
        </div>

    );
};

export default FacturaImpresa;
