import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';

const ListaProveedores = () => {
    const navigate = useNavigate();
    const [proveedores, setProveedores] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    //  Obtener proveedores
    const getProveedores = async () => {
        try {
            const response = await axios.get("http://localhost:8000/proveedores");
            setProveedores(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            getProveedores();
        }, 250);

        return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta antes de que se cumpla el tiempo de espera
    }, []);

    // Eliminar proveedores
    const deleteProveedor = async (id_proveedor) => {
        try {
            await axios.delete(`http://localhost:8000/proveedor/${id_proveedor}`);
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
            title: 'Estas seguro de eliminar?',
            text: "No puedes revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminalo!'
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

    // Editar proveedores


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
        <div className='table-container'>
            <table className='table is-bordered'>
                <thead className='title is-3'>
                    <tr>
                        <th>RUC</th>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th>Correo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody className='subtitle is-5'>
                    {proveedores.map((proveedor) => (
                        <tr key={proveedor.id}>
                            <td>{proveedor.str_ruc}</td>
                            <td>{proveedor.str_nombre}</td>
                            <td>{proveedor.str_telefono}</td>
                            <td>{proveedor.str_direccion}</td>
                            <td>{proveedor.str_correo}</td>
                            <td>
                                <button className='button is-info' onClick={() => navigate(`/proveedor/detalle/${proveedor.id}`)}><EditIcon fontSize='string' /></button>
                                <button className='button is-danger ml-2' onClick={() => handleDeleteProveedor(proveedor.id)}><DeleteIcon fontSize='string' /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListaProveedores