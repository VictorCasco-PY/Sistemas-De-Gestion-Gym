import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { format, getMonth } from 'date-fns';
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { CircularProgress, TablePagination } from '@mui/material';
import Box from '@mui/material/Box';

const ListaFacturas = () => {
    const [facturas, setFacturas] = useState([]);
    const [mesSeleccionado, setMesSeleccionado] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await api.get('/facturas'); // Reemplaza 'API_URL' con la URL de tu API
            setFacturas(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

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

    const deleteFactura = async (id_factura) => {
        try {
            await api.delete(`/factura/${id_factura}`);
            setFacturas((newListFacturas) =>
                newListFacturas.filter((factura) => factura.id !== id_factura)
            );
            console.log("Borrado con exito");
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDeleteFactura = (id_factura) => {
        Swal.fire({
            title: "Confirmar Eliminación",
            text: "¿Estás seguro de que deseas eliminar esta factura?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#ff3860',
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteFactura(id_factura);
                Swal.fire(
                    'Eliminado!',
                    'Factura eliminada.',
                    'success'
                )
            }
        })
    };

    const handleFiltrarPorMes = (mes) => {
        setMesSeleccionado(mes);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Filtrar facturas por mes seleccionado
    const facturasFiltradas = mesSeleccionado
        ? facturas.filter((factura) => getMonth(new Date(factura.date_fecha)) === mesSeleccionado)
        : facturas;

    const paginatedFacturas = facturasFiltradas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div>
            <h1 className='title is-1'>Facturas</h1>
            <label className='label' htmlFor="mes">Filtrar por mes:</label>
            <div className='select mb-3'>
                <select id="mes" onChange={(e) => handleFiltrarPorMes(parseInt(e.target.value))}>
                    <option value="">Todos</option>
                    <option value="0">Enero</option>
                    <option value="1">Febrero</option>
                    <option value="2">Marzo</option>
                    <option value="3">Abril</option>
                    <option value="4">Mayo</option>
                    <option value="5">Junio</option>
                    <option value="6">Julio</option>
                    <option value="7">Agosto</option>
                    <option value="8">Septiembre</option>
                    <option value="9">Octubre</option>
                    <option value="10">Noviembre</option>
                    <option value="11">Diciembre</option>
                </select>
            </div>
            <table className='table is-bordered is-striped is-narrow is-hoverable is-fullwidth'>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Nombre</th>
                        <th>Total</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedFacturas.map((factura, index) => (
                        <tr key={index}>
                            <td>{format(new Date(factura.date_fecha), 'dd-MM-yyyy')}</td>
                            <td>{factura.str_nombre_cliente}</td>
                            <td>{Number(factura.total).toLocaleString('es-ES')}</td>
                            <td>
                                <button className='button is-info is-outlined mr-2'><RemoveRedEyeIcon fontSize='string' /></button>
                                <button className='button is-danger is-outlined' onClick={() => handleDeleteFactura(factura.id)}><DeleteIcon fontSize='string' /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TablePagination
                component="div"
                count={facturasFiltradas.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Filas por página:"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
            />
        </div>
    );
};

export default ListaFacturas;
