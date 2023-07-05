import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import api from '../services/api';
import CircularProgress from '@mui/material/CircularProgress';

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
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const sesionCajaId = localStorage.getItem('sesionCajaId');
    if (sesionCajaId) {
      setAbrirCaja(true);
    }
  }, []);

  const handleAbrirCerrarCaja = async () => {
    setLoading(true);
    if (!abrirCaja) {
      if (montoInicial === '' || Number(removeCommasFromString(montoInicial)) < 0) {
        Swal.fire('Error', 'El monto inicial no puede ser menor a 0', 'error');
        return;
      }
      const user = JSON.parse(localStorage.getItem('user'));
      const fechaApertura = new Date();
      const data = {
        id_empleado: user.id,
        id_caja: 1,
        monto_inicial: removeCommasFromString(montoInicial),
        monto_final: removeCommasFromString(montoInicial),
        date_fecha: format(fechaApertura, 'yyyy-MM-dd'),
        time_inicio: format(fechaApertura, 'HH:mm'),
        time_cierre: format(fechaApertura, 'HH:mm'),
      };

      await api.post('/sesiones-cajas', data)
        .then(response => {
          console.log(response.data);
          localStorage.setItem('sesionCajaId', response.data.id);
          Swal.fire('Caja abierta');
        })
        .catch(error => {
          console.log(error);
        });

      setAbrirCaja(true);

    } else {
      const fechaCierre = new Date();
      setHoraCierre(fechaCierre.toLocaleTimeString());
      const data = {
        time_cierre: format(fechaCierre, 'HH:mm'),
      };
      const sesionCajaId = localStorage.getItem('sesionCajaId');
      await api.put(`/sesion-caja/${sesionCajaId}`, data)
        .then(async response => {
          console.log(response.data);
          setAbrirCaja(false);

          await api.get(`/sesion-caja/${sesionCajaId}`)
            .then(response => {
              console.log(response.data);
              setMontoFinal(response.data.monto_final);
              localStorage.removeItem('sesionCajaId'); // Eliminar la clave sesionCajaId del almacenamiento local
              Swal.fire('Caja cerrada', `Monto Final: ${formatNumberWithCommas(response.data.monto_final)}`);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    }
    setMontoInicial('');
    setLoading(false);
  };

  const handleMontoInicialChange = (e) => {
    const value = e.target.value;
    const formattedValue = formatNumberWithCommas(removeCommasFromString(value));
    setMontoInicial(formattedValue);
  };

  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user && user.rol === 'admin';

  return (
    <div className='is-flex is-flex-direction-column p-5 has-background-light column ml-auto mr-auto'
      style={{ border: "1px solid #D4D4D4", borderRadius: "8px", maxWidth: "500px" }}>
      <div className="is-flex is-justify-content-center is-align-items-center vh-100">
        <div>
          <h1 className='title'>Sesión de Caja</h1>
          <div className='is-flex is-flex-wrap-nowrap is-align-content-stretch tags has-addons'>
            <label className='ml-0 pl-0 pr-1 pl-1 mb-0 tag is-info is-light is-large is-size-5' htmlFor="montoInicial"
              style={{ border: "1px solid hsl(217, 71%, 53%)", borderRight: "none" }}>Monto inicial</label>
            <input
              className='input is-link'
              type="text"
              id="montoInicial"
              value={montoInicial}
              onChange={handleMontoInicialChange}
              disabled={abrirCaja}
              required
            />
          </div>
        )}
        {isAdmin && (
          <button className='button is-primary is-outlined is-small'>
            Sesiones de Caja
          </button>
        )}
      </div>
    </div >
  );
};

export default SesionCaja;
