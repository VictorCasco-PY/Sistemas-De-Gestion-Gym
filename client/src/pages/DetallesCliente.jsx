import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export function DetallesCliente() {
    const id = useParams().name;

    const [cliente, setCliente] = useState(null);
    const [clientePers, setClientePers] = useState(null);
    const [clienteMed, setClienteMed] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/cliente/${id}/medicion-cliente`)
            .then(response => setClienteMed(response.data))
            .catch(error => console.log(error));


        axios.get(`http://localhost:8000/cliente/${id}/plan-de-pago`)
            .then(response => setCliente(response.data))
            .catch(error => console.log(error));

        axios.get(`http://localhost:8000/cliente/${id}`)
            .then(response => setClientePers(response.data))
            .catch(error => console.log(error));
        console.log(id)
    }, []);

    if (!cliente || !clientePers) {
        return <div className='title'>Cliente no encontrado.</div>;
    }

    return (
        <div className='columns is-flex-direction-column is-align-content-center is-multiline is-centered'>
            <div className="column columns is-half headerTitle clienteHeader m-2">
                <div className='is-flex is-justify-content-center column headerTitle has-text-centered'>
                    <h1>{cliente.str_nombre_cliente}</h1>
                </div>
                <div className="column">
                    <div className="infoBubble">
                        <div className="bubbleTitle has-text-white">
                            <p className='is-size-6'>Estado de Pago</p>
                        </div>
                        <div className="bubbleInfo">
                            <p className='is-size-5'>{cliente.estado_de_pago}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='column is-half is-flex is-flex-direction-column is-justify-content-center p-6 pageMain has-background-light'>
                <div className="mainClientInfo columns">
                    <div className="clientInfoLeft d-flex ">
                        <div className="infoBubble">
                            <div className="bubbleTitle has-text-white">
                                <p className='is-size-5'>Telefono</p>
                            </div>
                            <div className="bubbleInfo">
                                <p>-</p>
                            </div>
                        </div>
                        <div className="infoBubble">
                            <div className="bubbleTitle has-text-white">
                                <p className='is-size-5'>Dirección</p>
                            </div>
                            <div className="bubbleInfo">
                                <p>{clientePers.str_direccion}</p>
                            </div>
                        </div>
                    </div>
                    <div className="clientInfoRight">
                        <div className="infoBubble">
                            <div className="bubbleTitle has-background-primary-dark has-text-white">
                                <p className='is-size-5'>Plan</p>
                            </div>
                            <div className="bubbleInfo has-background-primary-light">
                                <p>{cliente.str_modalidad}</p>
                            </div>
                        </div>
                        <div className="infoBubble">
                            <div className="bubbleTitle has-background-link-dark has-text-white">
                                <p className='is-size-5'>RUC</p>
                            </div>
                            <div className="bubbleInfo has-background-link-light">
                                <p>{clientePers.str_ruc}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="is-flex is-justify-content-center">
                    <table class="table table-text-2 is-bordered tableNew has-background-light is-bordered">
                        <thead>
                            <th>Fecha</th>
                            <th>Peso</th>
                            <th>Brazos</th>
                            <th>Piernas</th>
                        </thead>
                        <tbody>
                            {clienteMed ? <tr>
                                <td>{clienteMed.date_fecha_medicion}</td>
                                <td>{clienteMed.peso}</td>
                                <td>{clienteMed.cintura}</td>
                                <td>{clienteMed.piernas}</td>
                            </tr>
                                : <tr>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}