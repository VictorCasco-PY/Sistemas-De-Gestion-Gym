import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from '../services/api';

const SesionCaja = () => {
  const [abrirCaja, setAbrirCaja] = useState(false);
  const [montoInicial, setMontoInicial] = useState('');
  const [horaCierre, setHoraCierre] = useState('');

  // Al cargar el componente, verifica si existe una sesión de caja en el almacenamiento local
  useEffect(() => {
    const sesionCajaId = localStorage.getItem('sesionCajaId');
    if (sesionCajaId) {
      // Si hay una sesión de caja existente, significa que la caja está abierta
      setAbrirCaja(true);
    }
  }, []);

  const handleAbrirCerrarCaja = () => {
    if (!abrirCaja) {
      // Si la caja está cerrada, se hace clic en "Abrir Caja"
      const fechaApertura = new Date();
      setAbrirCaja(true);

      const user = JSON.parse(localStorage.getItem('user'));
      const data = {
        id_empleado: user.id,
        id_caja: 1,
        monto_inicial: montoInicial,
        monto_final: montoInicial,
        date_fecha: format(fechaApertura, 'yyyy-MM-dd'),
        time_inicio: format(fechaApertura, 'HH:mm'),
        time_cierre: format(fechaApertura, 'HH:mm'),
      };

      // Realizar la solicitud POST para abrir la caja
      api.post('/sesiones-cajas', data)
        .then(response => {
          console.log(response.data);
          localStorage.setItem('sesionCajaId', response.data.id);
        })
        .catch(error => { console.log(error) });

      } else {
        // Si la caja está abierta, se hace clic en "Cerrar Caja"
        setMontoInicial('');
        const fechaCierre = new Date();
        setHoraCierre(fechaCierre.toLocaleTimeString());
      
        // Obtener el ID de la sesión de caja
        const sesionCajaId = localStorage.getItem('sesionCajaId');
      
        const data = {
          time_cierre: format(fechaCierre, 'HH:mm'),
        };
      
        // Realizar la solicitud PUT para cerrar la caja
        api.put(`/sesion-caja/${sesionCajaId}`, data)
          .then(response => {
            console.log(response.data);
            localStorage.removeItem('sesionCajaId'); // Eliminar el ID de la sesión de caja del almacenamiento local
            setAbrirCaja(false); // Asegurarse de que el estado de abrirCaja esté actualizado correctamente
          })
          .catch(error => { console.log(error) });
      }
  };

  return (
    <div>
      <h1>Sesión de Caja</h1>
      <label htmlFor="montoInicial">Monto inicial:</label>
      <input
        type="number"
        id="montoInicial"
        value={montoInicial}
        onChange={(e) => setMontoInicial(e.target.value)}
        disabled={abrirCaja} // Deshabilitar el campo cuando la caja esté abierta
      />
      <button onClick={handleAbrirCerrarCaja}>
        {abrirCaja ? 'Cerrar Caja' : 'Abrir Caja'}
      </button>
      {horaCierre && (
        <p>Hora de cierre de la sesión: {horaCierre}</p>
      )}
    </div>
  );
};

export default SesionCaja;
