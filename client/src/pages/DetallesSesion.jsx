import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import api from '../services/api';

const DetallesSesion = () => {
  const sesionId = useParams().id; // Obtiene el parámetro de la URL para obtener el ID de la sesión

  const [sesion, setSesion] = useState(null);
  const [compras, setCompras] = useState([]);
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    const fetchSesion = async () => {
      try {
        const response = await api.get(`/sesion-caja/${sesionId}`);
        const sesionData = response.data;
        setSesion(sesionData);

        const comprasResponse = await api.get(`/compras?id_sesion_caja=${sesionId}`);
        const comprasData = comprasResponse.data;
        setCompras(comprasData);

        const pagosResponse = await api.get(`/pagos?id_sesion_caja=${sesionId}`);
        const pagosData = pagosResponse.data;
        setPagos(pagosData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSesion();
  }, [sesionId]);

  if (!sesion) {
    return <div>Cargando...</div>;
  }

  const totalPagos = pagos.reduce((total, pago) => total + parseFloat(pago.monto), 0);
  const totalCobros = compras.reduce((total, compra) => total + parseFloat(compra.total), 0);

  return (
    <div className="container">
      <h1 className="title">Detalles de la Sesión de Caja</h1>

      <div>
        <h2>Información de la Sesión</h2>
        <p>Fecha de Apertura: {sesion.date_fecha}</p>
        <p>Monto Inicial: {sesion.monto_inicial}</p>
        <p>Monto Final: {sesion.monto_final}</p>
        <p>Total Pagos: {totalPagos}</p>
        <p>Total Cobros: {totalCobros}</p>
        <p>Usuario: {sesion.empleadoNombre}</p>
      </div>

      <div>
        <h2>Compras Realizadas</h2>
        <table className="table is-bordered is-fullwidth">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((compra) => (
              <tr key={compra.id}>
                <td>{compra.id}</td>
                <td>{compra.fecha}</td>
                <td>{compra.producto}</td>
                <td>{compra.cantidad}</td>
                <td>{compra.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Pagos Realizados</h2>
        <table className="table is-bordered is-fullwidth">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Monto</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((pago) => (
              <tr key={pago.id}>
                <td>{pago.id}</td>
                <td>{pago.fecha}</td>
                <td>{pago.monto}</td>
                <td>{pago.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetallesSesion;
