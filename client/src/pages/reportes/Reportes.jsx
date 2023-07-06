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

    useEffect(() => {
        getReporteVentas();
    }, [fechaInit, fechaFin]);

    const handleFechaInitChange = (event) => {
        setFechaInit(event.target.value);
    }

    const handleFechaFinChange = (event) => {
        setFechaFin(event.target.value);
    }

    const data = [
        ['Nombre', 'Cantidad', 'Monto total(Gs)'],
        ...reportesVentas.map((item) => [
            item.str_nombre,
            item.cantidad,
            item.monto_total
        ])
    ];


    return (
        <>
            <p className='title is-size-2'>Reporte de ventas</p>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Ventas" value="1" />
                            <Tab label="Compras" value="2" />
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
                            <div className="column">
                                <label className='label' htmlFor="fin">.</label>
                                <CSVLink data={data} filename="reporte_ventas.csv" className='button is-primary mb-6'>
                                    Descargar CSV
                                </CSVLink>
                            </div>
                        </div>
                        <table className='table is-bordered is-striped is-narrow is-hoverable is-fullwidth'>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Cantidad</th>
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
                    <TabPanel value="2">Compras</TabPanel>
                </TabContext>
            </Box>


        </>
    )
}

export default Reportes