import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import api from '../services/api';

const SesionCaja = () => {
  const [abrirCaja, setAbrirCaja] = useState(false);
  const [montoInicial, setMontoInicial] = useState('');
  const [montoFinal, setMontoFinal] = useState('');
  const [horaCierre, setHoraCierre] = useState('');

  useEffect(() => {
    const sesionCajaId = localStorage.getItem('sesionCajaId');
    if (sesionCajaId) {
      setAbrirCaja(true);
    }
  }, []);

  const handleAbrirCerrarCaja = () => {
    if (!abrirCaja) {
      if (montoInicial === '' || Number(montoInicial) < 0) {
        Swal.fire('Error', 'El monto inicial no puede ser menor a 0', 'error');
        return;
      }

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

      api.post('/sesiones-cajas', data)
        .then(response => {
          console.log(response.data);
          localStorage.setItem('sesionCajaId', response.data.id);
        })
        .catch(error => {
          console.log(error);
        });

    } else {
      setMontoInicial('');
      const fechaCierre = new Date();
      setHoraCierre(fechaCierre.toLocaleTimeString());

      const sesionCajaId = localStorage.getItem('sesionCajaId');

      const data = {
        time_cierre: format(fechaCierre, 'HH:mm'),
      };

      api.put(`/sesion-caja/${sesionCajaId}`, data)
        .then(response => {
          console.log(response.data);
          setAbrirCaja(false);

          api.get(`/sesion-caja/${sesionCajaId}`)
            .then(response => {
              console.log(response.data);
              setMontoFinal(response.data.monto_final);
              localStorage.removeItem('sesionCajaId'); // Eliminar la clave sesionCajaId del almacenamiento local
              Swal.fire('Caja cerrada', `Monto Final: ${response.data.monto_final}`, 'success');
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <h1>Sesión de Caja</h1>
      <label htmlFor="montoInicial">Monto inicial:</label>
      <input
        className='input is-primary'
        type="number"
        id="montoInicial"
        value={montoInicial}
        onChange={(e) => setMontoInicial(e.target.value)}
        disabled={abrirCaja}
        required
        min="0"
      />
      <button className='button is-primary is-outlined' onClick={handleAbrirCerrarCaja}>
        {abrirCaja ? 'Cerrar Caja' : 'Abrir Caja'}
      </button>
      {horaCierre && (
        <p>Hora de cierre de la sesión: {horaCierre}</p>
      )}
      {montoFinal && (
        <div>
          <p>Monto Final de la sesión: {montoFinal}</p>
          <p>Sesión de caja finalizada. La sesión ha sido eliminada.</p>
        </div>
      )}
    </div>
  );
};

export default SesionCaja;
