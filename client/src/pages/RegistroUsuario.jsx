import React, { useState, useEffect } from "react";

const RegistroUsuario = () => {
    const [datos, setDatos] = useState(
        {
            email: "",
            pass: "",
            nombresYApellidos: "",
            fechaDeNacimiento: "",
            telefono: "",
            ruc: "",
            direccion: "",
            rol: "",
        }
    );
    const handleChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
        });
    };

    // función para manejar el envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(datos);
    };

    return (
        <div className="columns is-centered">
            <div className="column is-three-fifths-desktop">
                <div className="box">
                    <form onSubmit={handleSubmit}>
                        <h2>Registrar Empleado</h2>
                        <div>
                            <input className="input" type="email" name="email" value={datos.email} placeholder="Corre Electronico" onChange={handleChange} />
                        </div>
                        <div>
                            <input className="input" type="password" name="pass" value={datos.pass} placeholder="Contraseña" onChange={handleChange} />
                        </div>
                            <div className="column is-one-quarter">
                            < h2>Rol: </h2>
                            </div>
                            <div class="field">
                            <div class="control">
                        <label class="radio">
                        <input type="radio" name="question"/>
                            Cajero
                        </label>
                        <label class="radio">
                        <input type="radio" name="question"/>
                            Entrenador
                        </label>
                        </div>
                        </div>
                        <div className="columns">
                            <div className="column is-three-fifths">
                                <input className="input" type="text" name="nombresYApellidos" value={datos.nombresYApellidos} onChange={handleChange} placeholder='Nombres Y Apellidos' />
                            </div>
                            <div className="column is-4 is-offset-0">
                                <input type="date" name="fechaDeNacimiento" value={datos.fechaDeNacimiento} onChange={handleChange} placeholder='Fecha de Nac' />
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-three-fifths">
                                <input className="input" type="text" name="telefono" value={datos.telefono} onChange={handleChange} placeholder='Teléfono' />
                            </div>
                            <div className="column">
                                <input className="input" type="text" name="ruc" value={datos.ruc} onChange={handleChange} placeholder='RUC' />
                            </div>
                                </div>
                                <div>
                                    <input className="input" type="text" name="direccion" value={datos.direccion} onChange={handleChange} placeholder='Dirección' />
                                </div>
                                <div className="columns is-mobile">
                                <div className="column is-4 is-offset-8">
                                <button className="button is-primary" type='submit'>Siguiente</button>
                                </div>
                                </div>
            </form>
        </div>
        </div>
        </div>
    )
}

export default RegistroUsuario;