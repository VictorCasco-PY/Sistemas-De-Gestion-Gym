import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EditableInput from '../components/EditableInput';
import EditableInputTwoValues from '../components/EditableInputTwoValues';
import moment from 'moment';
import { format } from 'date-fns';
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
                const response = await api.get(`/cliente/${id}`);
                console.log(response.data)
                setClientePers(response.data);
                setClienteMed(response.data.mediciones_clientes);
                setCliente(response.data.planes_de_pagos[0]);
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
    const fetchClienteMed = async () => {
        try {
            const response = await api.get(`/cliente/${id}/medicion-cliente`);
            setClienteMed(response.data);
        } catch (error) {
            console.log(error);
        }
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
    const handleAccept = async () => {
        console.log(nuevaMedicion);

        //checkear si hay valores vacios
        if (Object.values(nuevaMedicion).some((valor) => valor.trim() === '')) {
            setFormAceptado(true);
            return;
        }

        try {
            const response = await api.post(`/mediciones-clientes`, nuevaMedicion);
            fetchClienteMed();
        } catch (error) {
            console.log(error);
        }

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
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Borrado',
                )
                try {
                    const response = await api.delete(`/mediciones-clientes/${medicionId}`);
                    console.log('deleted');
                    fetchClienteMed();
                } catch (error) {
                    console.log(error);
                }
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

        <div className='is-flex is-flex-direction-column'>
            <div className='mr-auto ml-auto'>
                <h1 className='title'>Detalles del Cliente</h1>
            </div>
            <hr />
            <div className='is-serif is-flex is-flex-direction-column is-align-content-center is-multiline is-centered column mr-auto ml-auto'
                style={{ maxWidth: "1250px" }}>


                <div className=" columns headerTitle clienteHeader m-2">
                    <div className='is-half title is-flex is-justify-content-center is-align-items-center column headerTitle has-text-centered'>
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            <div>
                                <EditableInputTwoValues
                                    valorInicial={clientePers.str_nombre}
                                    id={id}
                                    apiUrl="/cliente"
                                    campoCambiar="str_nombre"
                                    id2={cliente.id}
                                    apiUrl2="/planes-de-pagos"
                                    campoCambiar2="str_nombre_cliente"
                                />
                            </div>
                        )}
                    </div>
                    <div className="column is-one-fifth">
                        <div className="infoBubble">
                            <div className="bubbleTitle has-text-white">
                                <p className='is-size-6'>Estado</p>
                            </div>
                            <div className="bubbleInfo">
                                {isLoading ? (
                                    <CircularProgress />
                                ) : (
                                    <p className='is-size-5'>
                                        {cliente.estado_de_pago
                                            .split(' ')
                                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                            .join(' ')
                                        }
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='box is-flex is-flex-direction-column is-justify-content-center p-6 pageMain has-background-light'
                    style={{ border: "1px solid #D4D4D4", borderRadius: "8px" }}>
                    <div className="mainClientInfo columns">
                        <div className="bubble column is-half is-flex is-flex-direction-column is-align-content-center is-flex-wrap-wrap">
                            <div className="infoBubble">
                                <div className="bubbleTitle has-text-white">
                                    <p className='is-size-6'>Telefono</p>
                                </div>
                                <div className="bubbleInfo">
                                    {isLoading ? (
                                        <CircularProgress />
                                    ) : (
                                        <EditableInput
                                            valorInicial={clientePers.str_telefono}
                                            id={id}
                                            apiUrl="/cliente"
                                            campoCambiar="str_telefono"
                                        />
                                    )}
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
                                            apiUrl="/cliente"
                                            campoCambiar="str_direccion"
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="infoBubble">
                                <div className="bubbleTitle has-text-white">
                                    <p className='is-size-6'>RUC</p>
                                </div>
                                <div className="bubbleInfo">
                                    {isLoading ? (
                                        <CircularProgress />
                                    ) : (
                                        <EditableInput
                                            valorInicial={clientePers.str_ruc}
                                            id={id}
                                            apiUrl="/cliente"
                                            campoCambiar="str_ruc"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className=" bubble column is-half is-flex is-flex-direction-column is-align-content-center is-flex-wrap-wrap">
                            <div className='box'>
                                <h1 className='title mb-2'>Informe de Plan</h1>
                                <div className='has-background-primary p-1'>
                                    <div className='is-flex is-justify-content-space-between'>
                                        <p className='is-size-6'>Plan</p>
                                        <p>
                                            {cliente.str_modalidad
                                                .split(' ')
                                                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                                .join(' ')
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className='has-background-warning p-1'>
                                    <div className='is-flex is-justify-content-space-between'>
                                        <p className='is-size-6'>Fecha a Pagar</p>
                                        <p>
                                            {format(new Date(cliente.date_fecha_de_vencimiento), 'dd-MM-yyyy')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="is-flex is-justify-content-center is-flex-direction-column">
                        <div>
                            {isLoading ? (
                                <CircularProgress />
                            ) : (
                                <button className="button is-success"
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
                                                    className="button is-success is-small"
                                                    onClick={handleAccept}
                                                >
                                                    Aceptar
                                                </button>
                                                <button
                                                    className="button is-info is-small"
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
                                                    className="button icon-button is-danger is-small"
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
        </div>
    )
}