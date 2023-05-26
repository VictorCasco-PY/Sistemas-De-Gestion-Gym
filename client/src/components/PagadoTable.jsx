import React from 'react';
import { Link } from 'react-router-dom';

function PagadoTable({ onClose }) {
    const handleCancel = () => {
        onClose();
    };

    return (
        <div className="popup-table">
            <div>
                <button className='button' onClick={handleCancel}>Cancelar</button>
            </div>
            <div className="is-serif">
                <div className='m-2'>
                    <h1>Pagados de (Mes Sleccionado)</h1>
                </div>
                <table className='table is-bordered is-striped is-hoverable'>
                    <thead className=''>
                        <tr>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='is-size-5'>Pedro Juan</td>
                            <td className=''>
                                <Link to={`/detallesCliente/`}>
                                    <button className="button is-link is-rounded is-outlined">Ver Mas</button>
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PagadoTable;