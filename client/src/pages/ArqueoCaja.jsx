import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { isSameDay, parseISO } from 'date-fns';

const ArqueoDeCaja = () => {
  const [ventas, setVentas] = useState([]);
  const [totalVentasDelDia, setTotalVentasDelDia] = useState(0);
  const [compras, setCompras] = useState([]);
  const [totalComprasDelDia, setTotalCmprasDelDia] = useState(0);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const response = await axios.get('http://localhost:8000/facturas');
        setVentas(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchCompras = async () => {
      try {
        const response = await axios.get('http://localhost:8000/facturas-proveedores');
        setCompras(response.data);
      } catch (error) {
        console.error(error);
      }
    };


    fetchVentas();
    fetchCompras();
  }, []);

  useEffect(() => {
    const fechaActual = new Date();

    const ventasDelDia = ventas.filter(venta =>
      isSameDay(parseISO(venta.date_fecha), fechaActual)
    );

    const totalVentas = ventasDelDia.reduce(
      (accum, venta) => accum + parseInt(venta.total, 10),
      0
    );
    setTotalVentasDelDia(totalVentas);
  }, [ventas]);


  useEffect(() => {
    const fechaActual = new Date();

    const comprasDelDia = compras.filter(compra =>
      isSameDay(parseISO(compra.date_fecha), fechaActual)
    );

    const totalCompras = comprasDelDia.reduce(
    (accum, compra) => accum + parseInt(compra.total, 10),
    0
    );
    setTotalCmprasDelDia(totalCompras);
  }, [compras]);


  return (
    <div className="container">
      <h2 className="title">Arqueo de Caja</h2>
      <p className="subtitle">Total de ventas del día: {totalVentasDelDia}</p>
      <p className="subtitle">Total de ventas del día: {totalComprasDelDia}</p>
      {/* Resto de tu código para mostrar la pantalla de arqueo de caja */}
    </div>
  );
};

export default ArqueoDeCaja;
