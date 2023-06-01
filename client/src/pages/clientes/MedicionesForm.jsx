import React from 'react'

const MedicionesForm = ({ mediciones, handleMedicionesChange, handleSubmitMediciones }) => {
    return (
        <>
            <h2 className="title is-2 has-text-centered mt-6">Mediciones</h2>
            <div className="columns">
                <div className="column is-half">
                    <div>
                        <input className="input is-primary mb-4" type="text" name="peso" placeholder="Peso [kg]" value={mediciones.peso} onChange={handleMedicionesChange} />
                    </div>
                    <div>
                        <input className="input is-primary mb-4" type="text" name="altura" placeholder="Altura [cm]" value={mediciones.altura} onChange={handleMedicionesChange} />
                    </div>
                    <div>
                        <input className="input is-primary mb-4" type="text" name="cintura" placeholder="Cintura [cm]" value={mediciones.cintura} onChange={handleMedicionesChange} />
                    </div>
                </div>
                <div className="column is-half">
                    <div>
                        <input className="input is-primary mb-4" type="text" name="piernas" placeholder="Piernas [cm]" value={mediciones.piernas} onChange={handleMedicionesChange} />
                    </div>
                    <div>
                        <input className="input is-primary mb-4" type="text" name="porcentaje_grasa_corporal" placeholder="% de grasa corporal" value={mediciones.porcentaje_grasa_corporal} onChange={handleMedicionesChange} />
                    </div>
                    <div>
                        <input className="input is-primary mb-4" type="text" name="brazos" placeholder="Brazos [cm]" value={mediciones.brazos} onChange={handleMedicionesChange} />
                    </div>
                </div>
            </div>


            <div className="buttons">
                <button className="button is-primary is-outlined mt-2 mx-2" type="button" onClick={handleSubmitMediciones}>Registrar</button>
            </div>
        </>
    )
}

export default MedicionesForm