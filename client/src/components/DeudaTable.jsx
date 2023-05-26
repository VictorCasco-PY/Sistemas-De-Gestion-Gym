import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function DeudaTable({ onClose }) {
    const handleCancel = () => {
        onClose();
    };

    return (
        <div className="popup-table">
            <div>
                <button className='button is-link' onClick={handleCancel}><ArrowBackIcon /></button>
            </div>
            <div className="is-serif">
                <div className='m-2'>
                    <h2>Deudores de (Mes Sleccionado)</h2>
                </div>
                <table className='table is-bordered'>
                    <thead className=''>
                        <tr>
                            <th>Nombre</th>
                            <th>Acciones</th>
                            <th>Deuda</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DeudaTable;