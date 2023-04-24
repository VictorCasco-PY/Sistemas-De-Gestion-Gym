import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export function DetallesCliente(props) {
    const { id } = useParams();
  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/cliente/${id}`).then((response) => {
      setClientData(response.data);
    });
  }, [id]);
    
      if (!clientData) {
        return <div className='title'>Loading client data...</div>;
      }

    return (
        <div className='columns is-multiline is-centered'>
            <div className="column is-full headerTitle is-four-fifths clienteHeader">
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

            <div className='columns is-four-fifths is-flex is-justify-content-center p-6 pageMain has-background-light'>
                <div className="mainClientInfo column">
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

                <div className="column">
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
        </div>
    )
}