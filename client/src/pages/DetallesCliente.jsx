import React from 'react';
import { useParams } from 'react-router-dom';

export function DetallesCliente(props) {
    const { name } = useParams();

    return (
        <div>
            <div className="clienteHeader">
                <h1>PEdro ppp</h1>
                <div className="headerEstadoPago">
                    <div className="estadoPago1">
                        <p>Estado de Pago</p>
                    </div>
                    <div className="estadoPago2">
                        <p>estadopago ppp</p>
                    </div>
                </div>
            </div>

            <div className='pageMain'>

            </div>
        </div>
    )
}