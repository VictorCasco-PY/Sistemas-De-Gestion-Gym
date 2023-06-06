import React from 'react'

const DatosClienteForm = ({ cliente, handleChangeCliente, datosCompletos, handleSubmitCliente }) => {
    return (
        <>
            <h2 className="title is-2 has-text-centered mt-6">Datos del cliente</h2>
            <div className="columns">
                <div className="column is-half">
                    <input className="input is-primary mb-2" type="text" name="str_nombre" placeholder="Nombre Y Apellido" value={cliente.str_nombre} onChange={handleChangeCliente} />
                </div>
                <div className="column is-half">
                    <input className="input is-primary mb-2" type="number" name="edad" placeholder="Edad" value={cliente.edad} onChange={handleChangeCliente} />
                </div>
            </div>

            <div className="columns">
                <div className="column is-half">
                    <input className="input is-primary mb-2" type="text" name="str_direccion" placeholder="Dirección" value={cliente.str_direccion} onChange={handleChangeCliente} />
                </div>
                <div className="column is-half">
                    <input className="input is-primary mb-2" type="text" name="str_ruc" placeholder="RUC" value={cliente.str_ruc} onChange={handleChangeCliente} />
                </div>
            </div>

            <div className="columns">
                <div className="column is-half">
                    <input className="input is-primary mb-2" type="text" name="str_cedula" placeholder="Cédula de Identidad" value={cliente.str_cedula} onChange={handleChangeCliente} />
                </div>
                <div className="column is-half">
                    <input className="input is-primary mb-2" type="text" name="str_telefono" placeholder="Teléfono" value={cliente.str_telefono} onChange={handleChangeCliente} />
                </div>
            </div>

            <div className="buttons">
                <button className="button is-primary is-outlined mt-2 ml-auto" type='button' disabled={!datosCompletos} onClick={handleSubmitCliente}>Siguiente</button>
            </div>
        </>
    )
}

export default DatosClienteForm;