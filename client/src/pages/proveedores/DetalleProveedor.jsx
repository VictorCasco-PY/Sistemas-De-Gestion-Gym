import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Swal from 'sweetalert2';

const DetalleProveedor = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [proveedores, setProveedores] = useState({});

    const getProveedor = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/proveedor/${id}`);
            setProveedores(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProveedor();
    }, []);

    // Antes de los campos de entrada
    if (!Object.keys(proveedores).length) {
        return <p>Cargando proveedor...</p>;
    }

    const handleChange = (event) => {
        setProveedores({
            ...proveedores,
            [event.target.name]: event.target.value,
        });
    };

    const handleEditProveedor = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8000/proveedor/${id}`, proveedores);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: response.data,
                showConfirmButton: false,
                timer: 1500
            })
            navigate(-1);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="columns is-centered mt-6">
            <div className="column is-three-fifths-desktop">
                <div className="box">
                    <button className='button is-info' onClick={() => navigate(-1)}><ArrowBackIcon fontSize='string' /></button>
                    <form onSubmit={handleEditProveedor}>
                        <center>
                            <h1 className="mb-2 title is-3 has-text-primary">
                                Editar Proveedor
                            </h1>
                        </center>
                        <div className="columns">
                            <div className="column">
                                <input
                                    className="input is-primary has-text-centered"
                                    type="text"
                                    name="str_nombre"
                                    value={proveedores.str_nombre || ''}
                                    onChange={handleChange}
                                    placeholder="Nombres y Apellidos"
                                />
                            </div>
                            <div className="column">
                                <input
                                    className="input is-primary has-text-centered"
                                    type="text"
                                    name="str_telefono"
                                    value={proveedores.str_telefono || ''}
                                    onChange={handleChange}
                                    placeholder="Teléfono"
                                />
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column">
                                <input
                                    className="input is-primary is-primary has-text-centered"
                                    type="text"
                                    name="str_ruc"
                                    value={proveedores.str_ruc || ''}
                                    onChange={handleChange}
                                    placeholder="Cédula"
                                />
                            </div>
                            <div className="column">
                                <input
                                    className="input is-primary has-text-centered"
                                    type="text"
                                    name="str_direccion"
                                    value={proveedores.str_direccion || ''}
                                    onChange={handleChange}
                                    placeholder="Dirección"
                                />
                            </div>
                        </div>
                        <div>
                            <input
                                className="input is-primary has-text-centered"
                                type="email"
                                name="str_correo"
                                value={proveedores.str_correo || ''}
                                onChange={handleChange}
                                placeholder="Correo Electronico"
                            />
                        </div>
                        <div className="buttons">
                            <button
                                className="ml-auto mt-2 button is-primary is-outlined"
                                type="submit"
                            >
                                Guardar cambios
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DetalleProveedor