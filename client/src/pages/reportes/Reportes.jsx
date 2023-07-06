import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { CSVLink } from 'react-csv';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


const Reportes = () => {

    const [reportesVentas, setReportesVentas] = useState([]);
    const [reportesClientesAtrasados, setReportesClientesAtrasados] = useState([]);
    const [value, setValue] = useState('1');
    const [fechaInit, setFechaInit] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getReporteVentas = async () => {
        try {
            const response = await api.get('/reporteventas', {
                params: {
                    fechaInit: fechaInit,
                    fechaFin: fechaFin
                }
            });
            console.log(response.data);
            setReportesVentas(response.data);
        } catch (error) {
            alert(error.message);
        }
    }

    const getReporteDeudores = async () => {
        try {
            const response = await api.get("/reporteatrasados");
            console.log('Deudor', response.data);
            setReportesClientesAtrasados(response.data);
        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => {
        getReporteVentas();
    }, [fechaInit, fechaFin]);

    useEffect(() => {
        getReporteDeudores();
    }, []);

    const handleFechaInitChange = (event) => {
        setFechaInit(event.target.value);
    }

    const handleFechaFinChange = (event) => {
        setFechaFin(event.target.value);
    }

    const dataVentas = [
        ['Nombre', 'Cantidad', 'Monto total(Gs)'],
        ...reportesVentas.map((item) => [
            item.str_nombre,
            item.cantidad,
            item.monto_total
        ])
    ];

    const dataDeudores = [
        ['Nombre', 'Telefono', 'RUC', 'Estado de pago'],
        ...(reportesClientesAtrasados ? reportesClientesAtrasados.map((item) => [
            item.cliente.str_nombre,
            item.cliente.str_telefono,
            item.cliente.str_ruc,
            'Atrasado'
        ]) : [])
    ];


    return (
        <div className='is-flex is-flex-direction-column p-5 has-background-light ml-auto mr-auto'
            style={{ border: "1px solid #D4D4D4", borderRadius: "8px", maxWidth: "1200px" }}>
            <p className='title is-size-2'>Reportes</p>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Ventas" value="1" />
                            <Tab label="Deudores" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <div className='is-flex is-justify-content-center is-align-content-center'>
                            <div className="column">
                                <label className='label' htmlFor="inicio">Fecha Inicio:</label>
                                <input className='input mr-2' type="date" name="inicio" id="" value={fechaInit} onChange={handleFechaInitChange} />
                            </div>
                            <div className="column">
                                <label className='label' htmlFor="fin">Fecha Fin:</label>
                                <input className='input mr-2' type="date" name="fin" id="" value={fechaFin} onChange={handleFechaFinChange} />
                            </div>
                            <div className="column is-flex is-justify-content-end">
                                <label className='label' htmlFor=""></label>
                                <CSVLink data={dataVentas} filename="reporte_ventas.csv" className='button is-info'>
                                    Descargar CSV
                                </CSVLink>
                            </div>
                        </div>
                        <table className='table is-bordered is-striped is-narrow is-hoverable is-fullwidth'>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Cantidad vendida</th>
                                    <th>Monto total(Gs)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportesVentas.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.str_nombre}</td>
                                            <td>{item.cantidad}</td>
                                            <td>{Number(item.monto_total).toLocaleString('es-ES')}</td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </TabPanel>
                    <TabPanel value="2">
                        <div className='is-flex is-justify-content-center is-align-content-center'>
                            <div className="column is-flex is-justify-content-end">
                                <label className='label' htmlFor=""></label>
                                <CSVLink data={dataDeudores} filename="reporte_ventas.csv" className='button is-info'>
                                    Descargar CSV
                                </CSVLink>
                            </div>
                        </div>
                        <table className='table is-bordered is-striped is-narrow is-hoverable is-fullwidth'>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Telefono</th>
                                    <th>RUC</th>
                                    <th>Estado de pago</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportesClientesAtrasados && reportesClientesAtrasados.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.cliente.str_nombre}</td>
                                            <td>{item.cliente.str_telefono}</td>
                                            <td>{item.cliente.str_ruc}</td>
                                            <td>Atrasado</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </TabPanel>
                </TabContext>
            </Box>


        </div>
    )
}

export default Reportes