import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { isSameDay, parseISO } from 'date-fns';

const SesionCaja = () => {
  const [ventas, setVentas] = useState([]);
  const [totalVentasDelDia, setTotalVentasDelDia] = useState(0);
  const [compras, setCompras] = useState([]);
  const [totalComprasDelDia, setTotalComprasDelDia] = useState(0);
  const [cajaAbierta, setCajaAbierta] = useState(false);
  const [valorCaja, setValorCaja] = useState('');
  const [efectivoFinal, setEfectivoFinal] = useState(null);

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

    setTotalComprasDelDia(totalCompras);
  }, [compras]);

  const toggleCaja = () => {
    if (!cajaAbierta) {
      setCajaAbierta(true);
      //setVentasCerradas(ventas);
      //setComprasCerradas(compras);
    } else {
      setCajaAbierta(false);
      setValorCaja('');
      setEfectivoFinal(null);
    }
  };

  const calcularEfectivoFinal = () => {
    const efectivoFinalValue =
      parseInt(valorCaja, 10) + totalVentasDelDia - totalComprasDelDia;

    setEfectivoFinal(efectivoFinalValue);
  };

  return (
    <div className="container">
      <h2 className="title">Sesión Caja</h2>
      {!cajaAbierta ? (
        <button className="button" onClick={toggleCaja}>
          Abrir caja
        </button>
      ) : (
        <button className="button" onClick={toggleCaja}>
          Cerrar caja
        </button>
      )}

      {cajaAbierta && (
        <div>
          <input
            type="text"
            value={valorCaja}
            onChange={e => setValorCaja(e.target.value)}
            placeholder="Ingrese el valor de la caja física"
          />

          {valorCaja && (
            <p className="subtitle">Valor ingresado: {valorCaja}</p>
          )}

          {/*<p className="subtitle">Total de ventas del día: {totalVentasDelDia}</p>
          //<p className="subtitle">Total de compras del día: {totalComprasDelDia}</p>*/}

          <button className="button" onClick={calcularEfectivoFinal}>
            Calcular efectivo final
          </button>

          {efectivoFinal !== null && (
            <p className="subtitle">Efectivo final: {efectivoFinal}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SesionCaja;
