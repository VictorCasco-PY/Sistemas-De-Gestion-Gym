import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import PaymentIcon from '@mui/icons-material/Payment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Ventas = () => {
    const [cliente, setCliente] = useState({ str_nombre: '' });
    const [documentoCliente, setDocumentoCliente] = useState('');

    const getCliente = async (ruc) => {
        try {
            const response = await axios.get(`http://localhost:8000/clientes?str_ruc=${ruc}`);
            setCliente(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleRucChange = (event) => {
        setDocumentoCliente(event.target.value);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            getCliente(documentoCliente);
        }
    };

    const navigate = useNavigate();
    return (
        <div className='container box columns m-4'>
            <button className='button is-info' onClick={() => navigate(-1)}><ArrowBackIcon fontSize='string' /></button>
            <div className='column'>
                <div className='column is-one-third'>
                    <h3>Datos del cliente</h3>
                    <label htmlFor="str_ruc">Nro Documento</label>
                    <input className='input is-primary' type="text" name="str_ruc" onChange={handleRucChange} onKeyDown={handleKeyDown} />
                    <label htmlFor="str_nombre">Nombre</label>
                    <input className='input is-primary' type="text" name="str_nombre" readOnly value={cliente[0]?.str_nombre || ' '} />
                </div>
                <div className='mt-5'>
                    <h3>Productos/Servicios</h3>
                    <input type="text" name="buscador" placeholder='Buscar producto/servicio' />
                    <table>
                        <thead>
                            <tr>
                                <td></td>
                                <th>Producto/Servicio</th>
                                <th>Cantidad</th>
                                <th>Precio(Gs.)</th>
                                <th>Total(Gs.)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><button className='button is-danger'><DeleteIcon fontSize='string' /></button></td>
                                <td>Creatina</td>
                                <td>1</td>
                                <td>50.000</td>
                                <td>50.000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='column is-one-third'>
                <div>
                    <h3>Detalle de venta</h3>
                    <div className='select is-primary'>
                        <select name="tipo" id="tipo">
                            <option>Tipo</option>
                            <option value="factura">Factura</option>
                            <option value="ticket">Ticket</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="tipo">Sub Total</label>
                        <input type="text" className='input is-primary' disabled value={45000} />
                    </div>
                    <div>
                        <label htmlFor="tipo">IVA (5%)</label>
                        <input type="text" className='input is-primary' disabled />
                    </div>
                    <div>
                        <label htmlFor="tipo">IVA (10%)</label>
                        <input type="text" className='input is-primary' disabled value={5000} />
                    </div>
                    <div>
                        <label htmlFor="tipo">Total</label>
                        <input type="text" className='input is-primary' disabled value={50000} />
                    </div>
                    <div className='buttons is-right'>
                        <button className='button is-primary mt-6'>
                            <PaymentIcon fontSize='medium' />Finalizar Venta
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ventas