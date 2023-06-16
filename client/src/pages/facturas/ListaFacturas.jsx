import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { format, getMonth } from 'date-fns';
import { CircularProgress, TablePagination } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import DetalleFactura from './DetalleFactura';

const ListaFacturas = () => {
    const [facturas, setFacturas] = useState([]);
    const [mesSeleccionado, setMesSeleccionado] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(true);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [activeId, setActiveId] = useState(null);
    const [selectedOption, setSelectedOption] = useState('facturas');
    const [nombreCliente, setNombreCliente] = useState('');

    useEffect(() => {
        fetchData();
        console.log(fechaInicio);
    }, [selectedOption, fechaFin]);

    const fetchData = async () => {
        try {
            let url = '/facturas';

            if (fechaInicio && fechaFin) {
                url += `?fechaIn=${fechaInicio}&fechaFin=${fechaFin}`;
            }
            setSelectedOption(url);
            const response = await api.get(url);
            setFacturas(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

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

    const handleFiltrarPorNombre = (event) => {
        setNombreCliente(event.target.value);
    };

    const handleResetFilters = () => {
        setMesSeleccionado('');
        setNombreCliente('');
        setFechaInicio('');
        setFechaFin('');
    };

    const facturasFiltradas = facturas.filter((factura) => {
        const mesFiltrado =
            mesSeleccionado === '' ||
            getMonth(new Date(factura.date_fecha)) === mesSeleccionado;
        const nombreFiltrado =
            nombreCliente === '' ||
            factura.str_nombre_cliente.toLowerCase().includes(nombreCliente.toLowerCase());
        return mesFiltrado && nombreFiltrado;
    });

    const paginatedFacturas = facturasFiltradas.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );
    const showModal = (id) => {
        setActiveId(id);
    };

    const closeModal = () => {
        setActiveId(null);
    };

    const resetFechas = () => {
        setFechaInicio('');
        setFechaFin('');
    };

    return (
        <div
            className='is-flex is-flex-direction-column p-5 has-background-light ml-auto mr-auto'
            style={{ border: '1px solid #D4D4D4', borderRadius: '8px', maxWidth: '1500px' }}
        >

            <div className='columns column is-flex is-flex-direction-column'>
                <div className='column is-flex is-flex-direction-column'>


                    {activeId !== null && <DetalleFactura id={activeId} onClose={closeModal} />}
                    <h1 className='title is-1'>Facturas
                        <div className='buttons'>
                            <button className='button is-info ml-auto' onClick={handleResetFilters}>
                                Reiniciar filtros
                            </button>
                        </div></h1>

                    <div className='columns'>
                        <div className='column'>
                            <label className='label' htmlFor='mes'>
                                Filtrar por mes:
                            </label>
                            <div className='select mb-3'>
                                <select
                                    id='mes'
                                    onChange={(e) => handleFiltrarPorMes(parseInt(e.target.value))}
                                >
                                    <option value=''>Todos</option>
                                    <option value='0'>Enero</option>
                                    <option value='1'>Febrero</option>
                                    <option value='2'>Marzo</option>
                                    <option value='3'>Abril</option>
                                    <option value='4'>Mayo</option>
                                    <option value='5'>Junio</option>
                                    <option value='6'>Julio</option>
                                    <option value='7'>Agosto</option>
                                    <option value='8'>Septiembre</option>
                                    <option value='9'>Octubre</option>
                                    <option value='10'>Noviembre</option>
                                    <option value='11'>Diciembre</option>
                                </select>
                            </div>
                        </div>
                        <div className='column'>
                            <label htmlFor='nombreCliente' className='label'>
                                Filtrar por nombre de cliente:
                            </label>
                            <input
                                id='nombreCliente'
                                className='input'
                                type='text'
                                value={nombreCliente}
                                onChange={handleFiltrarPorNombre}
                            />
                        </div>
                        <div className='column'>
                            <div className='columns'>
                                <div className='column'>
                                    <label htmlFor='' className='label'>
                                        Fecha Inicio:
                                    </label>
                                    <input
                                        className='input mb'
                                        type='date'
                                        value={fechaInicio}
                                        onChange={(e) => setFechaInicio(e.target.value)}
                                    />
                                </div>
                                <div className='column'>
                                    <label htmlFor='' className='label'>
                                        Fecha Fin:
                                    </label>
                                    <input
                                        className='input'
                                        type='date'
                                        value={fechaFin}
                                        onChange={(e) => setFechaFin(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className='column is-flex is-justify-content-center is-flex-direction-column m-0 p-0'>
                        <table
                            className='table table is-bordered tableNew has-background-light is-bordered p-3'
                            style={{ width: '100%' }}
                        >
                            <thead>
                                <tr>
                                    <th className='is-size-5'>Fecha</th>
                                    <th className='is-size-5'>Nombre</th>
                                    <th className='is-size-5'>Total</th>
                                    <th className='is-size-5'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedFacturas.map((factura, index) => (
                                    <tr key={index}>
                                        <td className='is-size-5'>
                                            {format(new Date(factura.date_fecha), 'dd-MM-yyyy')}
                                        </td>
                                        <td className='is-size-5'>{factura.str_nombre_cliente}</td>
                                        <td className='is-size-5'>
                                            {Number(factura.total).toLocaleString('es-ES')}
                                        </td>
                                        <td className='is-size-5'>
                                            <button
                                                className='button is-text mr-2'
                                                onClick={() => showModal(factura.id)}
                                            >
                                                Detalle
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <TablePagination
                            component='div'
                            count={facturasFiltradas.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            labelRowsPerPage='Filas por página:'
                            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListaFacturas;
