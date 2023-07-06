import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import api from '../services/api';

const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const removeCommasFromString = (string) => {
  return string.replace(/,/g, '');
};

const SesionCaja = () => {
  const [abrirCaja, setAbrirCaja] = useState(false);
  const [montoInicial, setMontoInicial] = useState('');
  const [montoFinal, setMontoFinal] = useState('');
  const [horaCierre, setHoraCierre] = useState('');
  const [totalEgresos, setTotalEgresos] = useState(null);
  const [totalIngresos, setTotalIngresos] = useState(null);

  useEffect(() => {
    const sesionCajaId = localStorage.getItem('sesionCajaId');
    if (sesionCajaId) {
      setAbrirCaja(true);
      api.get(`/sesion-caja/${sesionCajaId}`)
        .then(response => {
          setMontoInicial(response.data.monto_inicial);
          setMontoFinal(response.data.monto_final);
        })
        .catch(error => {
          console.log(error);
        });
      api.get(`/pagos?id_sesion_caja=${sesionCajaId}`)
        .then(response => {
          const egresos = response.data.reduce((total, pago) => total + pago.total, 0);
          setTotalEgresos(egresos || 0);
        })
        .catch(error => {
          console.log(error);
        });
      api.get(`/cobros?id_sesion_caja=${sesionCajaId}`)
        .then(response => {
          const ingresos = response.data.reduce((total, cobro) => total + cobro.total, 0);
          setTotalIngresos(ingresos || 0);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, []);

  const handleAbrirCerrarCaja = () => {
    if (!abrirCaja) {
      if (montoInicial === '' || Number(removeCommasFromString(montoInicial)) < 0) {
        Swal.fire('Error', 'El monto inicial no puede ser menor a 0', 'error');
        return;
      }

      const fechaApertura = new Date();
      setAbrirCaja(true);

      const user = JSON.parse(localStorage.getItem('user'));
      const data = {
        id_empleado: user.id,
        id_caja: 1,
        monto_inicial: removeCommasFromString(montoInicial),
        monto_final: removeCommasFromString(montoInicial),
        date_fecha: format(fechaApertura, 'yyyy-MM-dd'),
        time_inicio: format(fechaApertura, 'HH:mm'),
        time_cierre: format(fechaApertura, 'HH:mm'),
      };

      api.post('/sesiones-cajas', data)
        .then(response => {
          localStorage.setItem('sesionCajaId', response.data.id);
          setMontoInicial(response.data.monto_inicial);
          setMontoFinal(response.data.monto_final);
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
          setAbrirCaja(false);
          setMontoFinal(response.data.monto_final);
          localStorage.removeItem('sesionCajaId');
          Swal.fire('Caja cerrada', `Monto de Apertura: ${formatNumberWithCommas(montoInicial)}\nMonto de Cierre: ${formatNumberWithCommas(response.data.monto_final)}`, 'success');
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const handleMontoInicialChange = (e) => {
    const value = e.target.value;
    const formattedValue = formatNumberWithCommas(removeCommasFromString(value));
    setMontoInicial(formattedValue);
  };

  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user && user.rol === 'admin';

  return (
    <div className="is-flex is-justify-content-center is-align-items-center vh-100">
      <div>
        <h1 className='title'>Sesión de Caja</h1>
        <div className='tags has-addons'>
          <label className='tag is-info is-light is-large' htmlFor="montoInicial">Monto inicial:</label>
          <input
            className='tag is-large'
            type="text"
            id="montoInicial"
            value={montoInicial}
            onChange={handleMontoInicialChange}
            disabled={abrirCaja}
            required
          />
        </div>
        {montoInicial && (
          <p className='subtitle'>Monto de Apertura: {formatNumberWithCommas(montoInicial)}</p>
        )}
        {totalIngresos !== null && (
          <p className='subtitle'>Ingresos: {formatNumberWithCommas(totalIngresos)}</p>
        )}
        {totalEgresos !== null && (
          <p className='subtitle'>Egresos: {formatNumberWithCommas(totalEgresos)}</p>
        )}
        {montoFinal && (
          <p className='subtitle'>Monto de Cierre: {formatNumberWithCommas(montoFinal)}</p>
        )}
        <button className='button is-primary is-outlined is-small' onClick={handleAbrirCerrarCaja}>
          {abrirCaja ? 'Cerrar Caja' : 'Abrir Caja'}
        </button>
        {horaCierre && (
          <p className='subtitle'>Hora de cierre de la sesión: {horaCierre}</p>
        )}
        {isAdmin && (
          <button className='button is-primary is-outlined is-small'>
            Sesiones de Caja
          </button>
        )}
      </div>
    </div>
  );
};

export default SesionCaja;
