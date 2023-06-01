import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EditableInput from '../components/EditableInput';
import EditableInputTwoValues from '../components/EditableInputTwoValues';
import moment from 'moment';
import Swal from 'sweetalert2'
import api from '../services/api';
import CircularProgress from '@mui/material/CircularProgress';

export function DetallesCliente() {
    const id = useParams().name;

    const [cliente, setCliente] = useState(null);
    const [clientePers, setClientePers] = useState(null);
    const [clienteMed, setClienteMed] = useState(null);

    const [isAdding, setIsAdding] = useState(false);
    const [nuevaMedicion, setNuevaMedicion] = useState({
        id_cliente: id,
        date_fecha_medicion: moment().format('YYYY-MM-DD'),
        peso: '',
        brazos: '',
        piernas: '',
        altura: '',
        cintura: '',
        porcentaje_grasa_corporal: '',
    });
    const [formAceptado, setFormAceptado] = useState(false);

    const [sortDirection, setSortDirection] = useState("asc"); //en que dirección

    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await api.get(`/cliente/${id}/medicion-cliente`);
                setClienteMed(response1.data);
                const response2 = await api.get(`/cliente/${id}/plan-de-pago`);
                setCliente(response2.data);
                const response3 = await api.get(`/cliente/${id}`);
                setClientePers(response3.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setNotFound(true);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (isLoading) {
        return <div
            className='column'
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh',
            }}
        >
            <div className='p-5'>
                <CircularProgress />
            </div>
        </div>
    }

    if (notFound) {
        return (<div className='column'><h1>Cliente No Encontrado...</h1></div>)
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
        setNuevaMedicion((prevMedicion) => ({ ...prevMedicion, [name]: value }));
    };
    //al hacer click aceptar y enviar la medicion
    const handleAccept = () => {
        console.log(nuevaMedicion);

        //checkear si hay valores vacios
        if (Object.values(nuevaMedicion).some((valor) => valor.trim() === '')) {
            setFormAceptado(true);
            return;
        }

        axios
            .post('http://localhost:8000/mediciones-clientes', nuevaMedicion)
            .then(response => {
                console.log('Añadido satisfactoriamente');
                fetchClienteMed();
            })
            .catch(error => console.error(error));

        stopAdding();
    };
    //dejar de renderizar inputs
    const stopAdding = () => {
        setNuevaMedicion({ //restaurar valores
            id_cliente: id,
            date_fecha_medicion: moment().format('YYYY-MM-DD'),
            peso: '',
            brazos: '',
            piernas: '',
            cintura: '',
            altura: '',
            porcentaje_grasa_corporal: ''
        });
        setIsAdding(false);
        setFormAceptado(false);
    };
    ////////
    // delete una medicion
    const handleDelete = (medicionId) => {
        Swal.fire({ //ALERTA DE BORRADO
            title: 'Confirmacion de borrado',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '',

            confirmButtonText: 'Borrar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Borrado',
                )
                axios.delete(`http://localhost:8000/mediciones-clientes/${medicionId}`)
                    .then(() => {
                        console.log('deleted');
                        fetchClienteMed();
                    })
                    .catch((error) => console.error(error));
            }
        })

    };

    ///SORTING por fecha
    const handleSort = () => {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    };
    const sortedData = [...clienteMed].sort((a, b) => {
        const aValue = moment(a.date_fecha_medicion, 'YYYY-MM-DD');
        const bValue = moment(b.date_fecha_medicion, 'YYYY-MM-DD');

        if (aValue.isBefore(bValue)) {
            return sortDirection === "asc" ? -1 : 1;
        }
        if (aValue.isAfter(bValue)) {
            return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
    });

    return (
        <div className=' is-flex-direction-column is-align-content-center is-multiline is-centered'>
            <div className=" columns headerTitle clienteHeader m-2">
                <div className='title is-flex is-justify-content-center is-align-items-center column headerTitle has-text-centered'>
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <EditableInputTwoValues
                            valorInicial={clientePers.str_nombre}
                            id={id}
                            apiUrl="http://localhost:8000/cliente"
                            campoCambiar="str_nombre"
                            id2={cliente.id}
                            apiUrl2="http://localhost:8000/planes-de-pagos"
                            campoCambiar2="str_nombre_cliente"
                        />
                    )}
                </div>
                <div className="column">
                    <div className="infoBubble">
                        <div className="bubbleTitle has-text-white">
                            <p className='is-size-6'>Estado de Pago</p>
                        </div>
                        <div className="bubbleInfo">
                            {isLoading ? (
                                <CircularProgress />
                            ) : (
                                <p className='is-size-5'>{cliente.estado_de_pago}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className='box is-flex is-flex-direction-column is-justify-content-center p-6 pageMain has-background-light'>
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
                                {isLoading ? (
                                    <CircularProgress />
                                ) : (
                                    <EditableInput
                                        valorInicial={clientePers.str_direccion}
                                        id={id}
                                        apiUrl="http://localhost:8000/cliente"
                                        campoCambiar="str_direccion"
                                    />
                                )}
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
                                {isLoading ? (
                                    <CircularProgress />
                                ) : (
                                    <EditableInput
                                        valorInicial={clientePers.str_ruc}
                                        id={id}
                                        apiUrl="http://localhost:8000/cliente"
                                        campoCambiar="str_ruc"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="is-flex is-justify-content-center is-flex-direction-column">
                    <div>
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            <button className="button is-success is-outlined"
                                onClick={handleAdd}
                                disabled={isAdding}>
                                <span className="material-symbols-outlined"> add </span> Añadir
                            </button>
                        )}
                    </div>

                    <table className="table table-text-2 is-bordered tableNew has-background-light is-bordered">
                        <thead>
                            <tr>
                                <th style={{ cursor: "pointer" }} onClick={() => handleSort()}>Fecha</th>
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
                                        <p>{nuevaMedicion.date_fecha_medicion}</p>
                                    </td>
                                    <td>
                                        <input
                                            className={`${formAceptado && nuevaMedicion.peso.trim() === '' ? 'is-danger' : ''
                                                } input is-small`}

                                            type="text"
                                            name="peso"
                                            value={nuevaMedicion.peso}
                                            onChange={handleInputChange}
                                            placeholder="Peso"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className={`${formAceptado && nuevaMedicion.brazos.trim() === '' ? 'is-danger' : ''
                                                } input is-small`}
                                            type="text"
                                            name="brazos"
                                            value={nuevaMedicion.brazos}
                                            onChange={handleInputChange}
                                            placeholder="Brazos"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className={`${formAceptado && nuevaMedicion.piernas.trim() === '' ? 'is-danger' : ''
                                                } input is-small`}
                                            type="text"
                                            name="piernas"
                                            value={nuevaMedicion.piernas}
                                            onChange={handleInputChange}
                                            placeholder="Piernas"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className={`${formAceptado && nuevaMedicion.cintura.trim() === '' ? 'is-danger' : ''
                                                } input is-small`}
                                            type="text"
                                            name="cintura"
                                            value={nuevaMedicion.cintura}
                                            onChange={handleInputChange}
                                            placeholder="Cintura"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className={`${formAceptado && nuevaMedicion.altura.trim() === '' ? 'is-danger' : ''
                                                } input is-small`}
                                            type="text"
                                            name="altura"
                                            value={nuevaMedicion.altura}
                                            onChange={handleInputChange}
                                            placeholder="Altura"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className={`${formAceptado && nuevaMedicion.porcentaje_grasa_corporal.trim() === '' ? 'is-danger' : ''
                                                } input is-small`}
                                            type="text"
                                            name="porcentaje_grasa_corporal"
                                            value={nuevaMedicion.porcentaje_grasa_corporal}
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
                                                <span className="material-symbols-outlined">
                                                    close
                                                </span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}

                            {/* Mapeo de los datos, mapea Mediciones de clientes */}
                            {isLoading ? (
                                <tr>
                                    <td colSpan="8" className="has-background-grey-light has-text-centered">Cargando...</td>
                                </tr>
                            ) : sortedData.length > 0 ? (
                                sortedData.map((med, index) => (
                                    <tr key={index}>
                                        <td>{med.date_fecha_medicion}</td>
                                        <td>{med.peso}</td>
                                        <td>{med.brazos}</td>
                                        <td>{med.piernas}</td>
                                        <td>{med.cintura}</td>
                                        <td>{med.altura}</td>
                                        <td>{med.porcentaje_grasa_corporal}</td>
                                        <td>
                                            <button
                                                className="button icon-button is-danger is-outlined is-small"
                                                onClick={() => handleDelete(med.id)}
                                            >
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="has-background-grey-light has-text-centered" colSpan="8">Sin mediciones.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}