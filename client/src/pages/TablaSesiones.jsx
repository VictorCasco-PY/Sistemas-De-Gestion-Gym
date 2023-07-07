import React, { useState, useEffect } from 'react';
import { format, isValid, parseISO ,isAfter, isBefore, isWithinInterval, isSameDay} from 'date-fns';

import api from '../services/api';

const TablaSesiones = () => {
  const [sesiones, setSesiones] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchSesiones = async () => {
      try {
        const response = await api.get('/sesiones-cajas');
        const sesionesData = response.data;
        const sesionesWithTotals = await Promise.all(
          sesionesData.map(async (sesion) => {
            const pagosResponse = await api.get(`/pagos?id_sesion_caja=${sesion.id}`);
            const cobrosResponse = await api.get(`/cobros?id_sesion_caja=${sesion.id}`);
            const pagos = pagosResponse.data;
            const cobros = cobrosResponse.data;
            const totalPagos = pagos.reduce((total, pago) => total + parseInt(pago.total), 0);
            const totalCobros = cobros.reduce((total, cobro) => total + parseInt(cobro.total), 0);

            const empleadoResponse = await api.get(`/empleado/${sesion.id_empleado}`);
            const empleado = empleadoResponse.data;

            return {
              ...sesion,
              totalPagos,
              totalCobros,
              empleadoNombre: empleado.str_nombre,
            };
          })
        );

        const filteredSesiones = sesionesWithTotals.filter((sesion) => {
            if (startDate && endDate) {
              const sesionDate = parseISO(sesion.date_fecha);
              const isSesionInRange = isWithinInterval(sesionDate, { start: parseISO(startDate), end: parseISO(endDate) });
              return isSesionInRange || isSameDay(sesionDate, parseISO(startDate)) || isSameDay(sesionDate, parseISO(endDate));
            }
            return true;
          });
          

        filteredSesiones.sort((a, b) => parseISO(b.date_fecha) - parseISO(a.date_fecha));
        setSesiones(filteredSesiones);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSesiones();
  }, [startDate, endDate]);

  const indexOfLastSesion = currentPage * perPage;
  const indexOfFirstSesion = indexOfLastSesion - perPage;
  const currentSesiones = sesiones.slice(indexOfFirstSesion, indexOfLastSesion);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h1 className="title">Sesiones de Caja</h1>

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Fecha de inicio:</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <input
                type="date"
                className="input"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Fecha de fin:</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <input
                type="date"
                className="input"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <table className="table is-bordered is-fullwidth">
        <thead>
          <tr>
            <th>Fecha de Apertura</th>
            <th>Monto Inicial</th>
            <th>Monto Final</th>
            <th>Total Pagos</th>
            <th>Total Cobros</th>
            <th>Usuario</th>
          </tr>
        </thead>
        <tbody>
          {currentSesiones.map((sesion) => (
            <tr key={sesion.id}>
              <td>
                {isValid(parseISO(sesion.date_fecha))
                  ? format(parseISO(sesion.date_fecha), 'dd-MM-yyyy')
                  : 'Fecha inválida'}
              </td>
              <td>{sesion.monto_inicial}</td>
              <td>{sesion.monto_final}</td>
              <td>{sesion.totalPagos}</td>
              <td>{sesion.totalCobros}</td>
              <td>{sesion.empleadoNombre}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        perPage={perPage}
        total={sesiones.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

const Pagination = ({ perPage, total, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination is-centered">
      <ul className="pagination-list">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`pagination-link ${currentPage === number ? 'is-current' : ''}`}
          >
            <a className="pagination-link" onClick={() => paginate(number)} href="#">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TablaSesiones;