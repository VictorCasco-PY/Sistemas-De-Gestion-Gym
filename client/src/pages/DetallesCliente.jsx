import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EditableInput from '../components/EditableInput';
import moment from 'moment';

export function DetallesCliente() {
    const id = useParams().name;

    const [cliente, setCliente] = useState(null);
    const [clientePers, setClientePers] = useState(null);
    const [clienteMed, setClienteMed] = useState(null);

    const [isAdding, setIsAdding] = useState(false);
    const [newData, setNewData] = useState({
        id_cliente: id,
        date_fecha_medicion: moment().format('YYYY-MM-DD'),
        peso: '',
        brazos: '',
        piernas: '',
        altura: '',
        cintura: '',
        porcentaje_grasa_corporal: '',
    });
    const [showInputs, setShowInputs] = useState(false);

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
    }, []);

    if (!cliente || !clientePers) {
        return <div className='title'>Cliente no encontrado.</div>;
    }

    //recargar mediciones
    const fetchClienteMed = () => {
        axios.get(`http://localhost:8000/cliente/${id}/medicion-cliente`)
            .then(response => setClienteMed(response.data))
            .catch(error => console.log(error));
    };
    //////////// enviar una medicion
    //al hacer click se dispara handleAdd, hace que se renderize los inputs
    const handleAdd = () => {
        setIsAdding(true);
    };
    //onchange de los inputs
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewData((prevData) => ({ ...prevData, [name]: value }));
    };
    //al hacer click aceptar y enviar la medicion
    const handleAccept = () => {
        console.log(newData)
        axios
            .post('http://localhost:8000/mediciones-clientes', newData)
            .then(response => {
                console.log('Añadido satisfactoriamente');
                fetchClienteMed();
            })
            .catch(error => console.error(error));

        stopAdding();
    };
    //dejar de renderizar inputs
    const stopAdding = () => {
        setNewData({
            date_fecha_medicion: moment().format('YYYY-MM-DD'),
            peso: '',
            brazos: '',
            piernas: '',
            cintura: '',
            altura: '',
            porcentaje_grasa_corporal: ''
        });
        setIsAdding(false);
    };
    ////////
    // delete una medicion
    const handleDelete = (medicionId) => {
        axios.delete(`http://localhost:8000/mediciones-clientes/${medicionId}`)
            .then(() => {
                console.log('deleted');
                fetchClienteMed();
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className='columns is-flex-direction-column is-align-content-center is-multiline is-centered'>
            <div className="column columns is-half headerTitle clienteHeader m-2">
                <div className='title is-flex is-justify-content-center is-align-items-center column headerTitle has-text-centered'>
                    <EditableInput
                        valorInicial={clientePers.str_nombre}
                        id={id}
                        apiUrl="http://localhost:8000/cliente"
                        campoCambiar="str_nombre"
                    />
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
                    <div className="bubble column is-half is-flex is-flex-direction-column is-align-content-center is-flex-wrap-wrap">
                        <div className="infoBubble">
                            <div className="bubbleTitle has-text-white">
                                <p className='is-size-6'>Telefono</p>
                            </div>
                            <div className="bubbleInfo">
                                <p>-</p>
                            </div>
                        </div>
                        <div className="infoBubble">
                            <div className="bubbleTitle has-text-white">
                                <p className='is-size-6'>Dirección</p>
                            </div>
                            <div className="bubbleInfo">
                                <EditableInput
                                    valorInicial={clientePers.str_direccion}
                                    id={id}
                                    apiUrl="http://localhost:8000/cliente"
                                    campoCambiar="str_direccion"
                                />
                            </div>
                        </div>
                    </div>
                    <div className=" bubble column is-half is-flex is-flex-direction-column is-align-content-center is-flex-wrap-wrap">
                        <div className="infoBubble">
                            <div className="bubbleTitle has-background-primary-dark has-text-white">
                                <p className='is-size-6'>Plan</p>
                            </div>
                            <div className="bubbleInfo has-background-primary-light">
                                <p>{cliente.str_modalidad}</p>
                            </div>
                        </div>
                        <div className="infoBubble">
                            <div className="bubbleTitle has-background-link-dark has-text-white">
                                <p className='is-size-6'>RUC</p>
                            </div>
                            <div className="bubbleInfo has-background-link-light">
                                <EditableInput
                                    valorInicial={clientePers.str_ruc}
                                    id={id}
                                    apiUrl="http://localhost:8000/cliente"
                                    campoCambiar="str_ruc"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="is-flex is-justify-content-center is-flex-direction-column">
                    <div>
                        <button className="button is-success is-outlined"
                            onClick={handleAdd}
                            disabled={isAdding}>
                            <span className="material-symbols-outlined"> add </span> Añadir
                        </button>
                    </div>

                    <table className="table table-text-2 is-bordered tableNew has-background-light is-bordered">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Peso</th>
                                <th>Brazos</th>
                                <th>Piernas</th>
                                <th>Cintura</th>
                                <th>Altura</th>
                                <th>Grasa Corporal %</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {/* Esto se renderiza si estas añadiendo una nueva meidicon, deja de renderizarse cuando isAdding es false */}
                            {isAdding && (
                                <tr>
                                    <td>
                                        <p>{newData.date_fecha_medicion}</p>
                                    </td>
                                    <td>
                                        <input
                                            className="input is-small"
                                            type="text"
                                            name="peso"
                                            value={newData.peso}
                                            onChange={handleInputChange}
                                            placeholder="Peso"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="input is-small"
                                            type="text"
                                            name="brazos"
                                            value={newData.brazos}
                                            onChange={handleInputChange}
                                            placeholder="Brazos"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="input is-small"
                                            type="text"
                                            name="piernas"
                                            value={newData.piernas}
                                            onChange={handleInputChange}
                                            placeholder="Piernas"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="input is-small"
                                            type="text"
                                            name="cintura"
                                            value={newData.cintura}
                                            onChange={handleInputChange}
                                            placeholder="Cintura"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="input is-small"
                                            type="text"
                                            name="altura"
                                            value={newData.altura}
                                            onChange={handleInputChange}
                                            placeholder="Altura"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="input is-small"
                                            type="text"
                                            name="porcentaje_grasa_corporal"
                                            value={newData.porcentaje_grasa_corporal}
                                            onChange={handleInputChange}
                                            placeholder="Grasa Corporal"
                                        />
                                    </td>
                                    <td>
                                        <div className='is-flex is-flex-direction-row'>
                                            <button
                                                className="button is-success is-outlined is-small"
                                                onClick={handleAccept}
                                            >
                                                Aceptar
                                            </button>
                                            <button
                                                className="button is-info is-outlined is-small"
                                                onClick={stopAdding}
                                            >
                                                <span class="material-symbols-outlined">
                                                    close
                                                </span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}

                            {/* Mapeo de los datos, mapea Mediciones de clientes */}
                            {clienteMed.length > 0 ? (
                                clienteMed.map((med, index) => (
                                    <tr key={index}>
                                        <td>{med.date_fecha_medicion}</td>
                                        <td>{med.peso}</td>
                                        <td>{med.brazos}</td>
                                        <td>{med.piernas}</td>
                                        <td>{med.cintura}</td>
                                        <td>{med.altura}</td>
                                        <td>{med.porcentaje_grasa_corporal}</td>
                                        <td><button className="button icon-button is-danger is-outlined is-small" onClick={() => handleDelete(med.id)}><span className="material-symbols-outlined">
                                            delete
                                        </span></button></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}