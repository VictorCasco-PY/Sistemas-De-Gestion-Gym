import React from 'react';
import { useParams } from 'react-router-dom';

export function DetallesCliente(props) {
    const { name } = useParams();

    return (
        <div>
            <div className="clienteHeader">
                <h1>PEdro ppp</h1>
                <div className="infoBubble">
                    <div className="bubbleTitle">
                        <p>Estado de Pago</p>
                    </div>
                    <div className="bubbleInfo">
                        <p>estadopago ppp</p>
                    </div>
                </div>
            </div>

            <div className='pageMain'>
                <div className="mainClientInfo">
                    <div className="clientInfoLeft">
                        <div className="infoBubble">
                            <div className="bubbleTitle">
                                <p>Telefono</p>
                            </div>
                            <div className="bubbleInfo">
                                <p>1231234</p>
                            </div>
                        </div>
                        <div className="infoBubble">
                            <div className="bubbleTitle">
                                <p>Dirección</p>
                            </div>
                            <div className="bubbleInfo">
                                <p>calle 1 calle 2</p>
                            </div>
                        </div>
                    </div>
                    <div className="clientInfoRight">
                        <div className="infoBubble variant1">
                            <div className="bubbleTitle">
                                <p>Plan</p>
                            </div>
                            <div className="bubbleInfo">
                                <p>Diario</p>
                            </div>
                        </div>
                        <div className="infoBubble variant2">
                            <div className="bubbleTitle">
                                <p>RUC</p>
                            </div>
                            <div className="bubbleInfo">
                                <p>12341234</p>
                            </div>
                        </div>
                    </div>
                </div>

                <table>
                    <thead>
                        <th>Fecha</th>
                        <th>Peso</th>
                        <th>Brazos</th>
                        <th>Piernas</th>
                    </thead>
                    <tbody>
                        MAPEO
                    </tbody>
                </table>
            </div>
        </div>
    )
}