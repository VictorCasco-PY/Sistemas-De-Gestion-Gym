import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const DataComponent = () => {
    const [facturas, setFacturas] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await api.get('/facturas'); // Reemplaza 'API_URL' con la URL de tu API
            setFacturas(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Facturas</h1>
            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Nombre</th>
                        <th>Total</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {facturas.map((item, index) => (
                        <tr key={index}>
                            <td>{item.date_fecha}</td>
                            <td>{item.str_nombre_cliente}</td>
                            <td>{item.total}</td>
                            <td>
                                {/* Agrega las acciones que desees para cada fila */}
                                <button >Editar</button>
                                <button >Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataComponent;
