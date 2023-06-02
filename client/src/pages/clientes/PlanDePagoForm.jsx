import React from 'react'

const PlanDePagoForm = ({ planDePago, handleTipoModalidadDePago, handlePlanDePagoChange, handleSubmitPlanDePago, valoresMontoAPagar }) => {

    return (
        <>
            <h2 className="title is-2 has-text-centered mt-6">Elige el Plan de Pago</h2>
            <div className="is-flex is-justify-content-center">
                <button className="button is-primary is-outlined mx-1" type='button' onClick={() => handleTipoModalidadDePago(1)}>Diario</button>
                <button className="button is-primary is-outlined mx-1" type='button' onClick={() => handleTipoModalidadDePago(2)}>Semanal</button>
                <button className="button is-primary is-outlined mx-1" type='button' onClick={() => handleTipoModalidadDePago(3)}>Mensual</button>
            </div>
            <div className="title is-5 has-text-centered mt-2">Monto a Pagar: {valoresMontoAPagar[planDePago.id_tipo_modalidad_de_pago]}</div>
            <div className="has-text-centered">
                <h3 className="title is-3">Fecha de Pago</h3>
                <div className="is-flex is-justify-content-center">
                    <input className="column is-one-fifth input" type="date" name="date_fecha_de_vencimiento" value={planDePago.date_fecha_de_vencimiento} onChange={handlePlanDePagoChange} />
                </div>
            </div>
            <div className="buttons">
                <button className="button is-primary is-outlined mt-2 ml-auto" type='button' onClick={handleSubmitPlanDePago}>Siguiente</button>
            </div>
        </>
    )
}

export default PlanDePagoForm