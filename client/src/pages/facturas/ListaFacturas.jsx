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
    const [isActive, setisActive] = useState("");
    const [activeId, setActiveId] = useState(null);
    const [showFacturas, setShowFacturas] = useState(false);
    const [showVentas, setShowVentas] = useState(false);
    const [selectedOption, setSelectedOption] = useState('facturas');

    useEffect(() => {
        fetchData();
    }, [selectedOption]);

    const fetchData = async () => {
        try {
            let url = '/facturas';

            if (fechaInicio && fechaFin) {
                url += `?fechaIn=${fechaInicio}&fechaFin=${fechaFin}`;
            }

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

    const facturasFiltradas = mesSeleccionado
        ? facturas.filter(
            (factura) => getMonth(new Date(factura.date_fecha)) === mesSeleccionado
        )
        : facturas;

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

    return (
        <div className="column is-flex is-flex-direction-column">
            {activeId !== null && (
                <DetalleFactura id={activeId} onClose={closeModal} />
            )}
            <h1 className='title is-1'>Facturas</h1>
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
                    <div className='column is-one-third'>
                        <label htmlFor=''>Fecha Inicio:</label>
                        <input
                            className='input mb'
                            type='date'
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                        />
                        <label htmlFor=''>Fecha Fin:</label>
                        <input
                            className='input'
                            type='date'
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="column is-flex is-justify-content-center is-flex-direction-column m-0 p-0">
                <div className='table table is-bordered tableNew has-background-light is-bordered p-3' style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Nombre</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedFacturas.map((factura, index) => (
                            <tr key={index}>
                                <td>{format(new Date(factura.date_fecha), 'dd-MM-yyyy')}</td>
                                <td>{factura.str_nombre_cliente}</td>
                                <td>{Number(factura.total).toLocaleString('es-ES')}</td>
                                <td>
                                    <button className='button is-text mr-2' onClick={() => showModal(factura.id)}>Detalle</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </div>
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
    );
};

export default ListaFacturas;
