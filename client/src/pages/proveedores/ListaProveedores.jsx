import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';
import api from '../../services/api';

const ListaProveedores = () => {
    const navigate = useNavigate();
    const [proveedores, setProveedores] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    //  Obtener proveedores
    const getProveedores = async () => {
        try {
            const response = await api.get("/proveedores");
            setProveedores(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getProveedores();
    }, []);

    // Eliminar proveedores
    const deleteProveedor = async (id_proveedor) => {
        try {
            await api.delete(`/proveedor/${id_proveedor}`);
            // Si la eliminación fue exitosa, actualizar la lista de cuentas
            setProveedores((newListProveedores) =>
                newListProveedores.filter((proveedor) => proveedor.id !== id_proveedor)
            );
            console.log("Borrado con exito");
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteProveedor = (id_proveedor) => {
        Swal.fire({
            title: "Confirmar Eliminación",
            text: "¿Estás seguro de que deseas eliminar este usuario?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#ff3860',
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProveedor(id_proveedor);
                Swal.fire(
                    'Eliminado!',
                    'El proveedor ha sido eliminado.',
                    'success'
                )
            }
        })
    }

    // Otros
    if (isLoading) {
        return <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            <CircularProgress />
        </Box>;
    }
    if (error) {
        return <p>Error al cargar los proveedores: {error}</p>;
    }
    return (
        <div className='column is-flex is-flex-direction-column'>
            <div className="column is-flex mb-0 pb-0">
                <div style={{ width: "20rem" }}>
                    <input
                        className="input"
                        type="search"
                        placeholder="Buscar por RUC"

                    />
                </div>
            </div>
            <div className='column is-flex is-justify-content-center is-flex-direction-column m-0 p-0'>
                <table className='table table is-bordered tableNew has-background-light is-bordered p-3' style={{ width: "100%" }}>
                    <thead >
                        <tr>
                            <th className='is-size-5'>RUC</th>
                            <th className='is-size-5'>Nombre</th>
                            <th className='is-size-5'>Teléfono</th>
                            <th className='is-size-5'>Dirección</th>
                            <th className='is-size-5'>Correo</th>
                            <th className='is-size-5'></th>
                        </tr>
                    </thead>
                    <tbody >
                        {proveedores.map((proveedor) => (
                            <tr key={proveedor.id}>
                                <td className='is-size-5'>{proveedor.str_ruc}</td>
                                <td className='is-size-5'>{proveedor.str_nombre}</td>
                                <td className='is-size-5'>{proveedor.str_telefono}</td>
                                <td className='is-size-5'>{proveedor.str_direccion}</td>
                                <td className='is-size-5'>{proveedor.str_correo}</td>
                                <td className='is-size-5'>
                                    <button className='button is-rounded is-info is-outlined' onClick={() => navigate(`/proveedor/detalle/${proveedor.id}`)}><EditIcon fontSize='string' /></button>
                                    <button className='button is-rounded is-danger is-outlined ml-2' onClick={() => handleDeleteProveedor(proveedor.id)}><DeleteIcon fontSize='string' /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>

    )
}

export default ListaProveedores