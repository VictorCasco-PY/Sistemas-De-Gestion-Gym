import React from 'react';

function DeudaTable({ onClose }) {
    const handleCancel = () => {
        onClose();
    };

    return (
        <div className="popup-table">
            <div>
                <button className='button' onClick={handleCancel}>Cancelar</button>
            </div>
            <h1>Deudores de (Mes Sleccionado)</h1>
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
    );
}

export default DeudaTable;