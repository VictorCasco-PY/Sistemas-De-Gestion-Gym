import React, { useState } from 'react';

const ArqueoCaja = () => {
  const [efectivoInicial, setEfectivoInicial] = useState('');
  const [ventas, setVentas] = useState('');
  const [gastos, setGastos] = useState('');
  const [efectivoFinal, setEfectivoFinal] = useState('');

  const handleEfectivoInicialChange = (event) => {
    setEfectivoInicial(event.target.value);
  };

  const handleVentasChange = (event) => {
    setVentas(event.target.value);
  };

  const handleGastosChange = (event) => {
    setGastos(event.target.value);
  };

  const handleCalcularClick = () => {
    const efectivoInicialValue = parseFloat(efectivoInicial);
    const ventasValue = parseFloat(ventas);
    const gastosValue = parseFloat(gastos);

    const efectivoFinalValue = efectivoInicialValue + ventasValue - gastosValue;

    setEfectivoFinal(efectivoFinalValue.toFixed(2));
  };

  return (
    <div className="container">
      <h1 className="title">Arqueo de Caja</h1>

      <div className="field">
        <label className="label">Efectivo Inicial:</label>
        <div className="control">
          <input
            className="input"
            type="number"
            value={efectivoInicial}
            onChange={handleEfectivoInicialChange}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Ventas:</label>
        <div className="control">
          <input className="input" type="number" value={ventas} onChange={handleVentasChange} />
        </div>
      </div>

      <div className="field">
        <label className="label">Gastos:</label>
        <div className="control">
          <input className="input" type="number" value={gastos} onChange={handleGastosChange} />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <button className="button is-primary" onClick={handleCalcularClick}>Calcular</button>
        </div>
      </div>

      {efectivoFinal !== '' && (
        <div className="field">
          <h3 className="title is-3">Efectivo Final:</h3>
          <p>{efectivoFinal}</p>
        </div>
      )}
    </div>
  );
};

export default ArqueoCaja;
