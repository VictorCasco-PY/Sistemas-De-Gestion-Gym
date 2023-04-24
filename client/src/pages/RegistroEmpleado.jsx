import React, { useState, useEffect } from "react";

const RegistroEmpleado = () => {
    const [empleados, setEmpleados] = useState(
        {
            user: "",
            pass: "",
            str_nombre: "",
            time_inicio_trabajo: "",
            time_fin_trabajo: "",
            str_telefono: "",
            str_cedula: "",
            str_direccion: "",
        }
    );
    const handleChange = (event) => {
        setEmpleados({
            ...empleados,
            [event.target.name]: event.target.value,
        });
    };

    // función para manejar el envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(empleados);
    };

    return (
        <div className="columns is-centered">
            <div className="column is-three-fifths-desktop">
                <div className="box">
                    <form onSubmit={handleSubmit}>
                        <h2>Registrar Empleado</h2>
                        <div>
                            <input className="input" type="email" name="user" value={empleados.user} placeholder="Corre Electronico" onChange={handleChange} />
                        </div>
                        <div>
                            <input className="input mt-2" type="password" name="pass" value={empleados.pass} placeholder="Contraseña" onChange={handleChange} />
                        </div>
                            <div className="column is-one-quarter">
                            < h2>Rol: </h2>
                            </div>
                            <div className="field">
                            <div className="control">
                        <label className="radio">
                        <input type="radio" name="question"/>
                            Cajero
                        </label>
                        <label className="radio">
                        <input type="radio" name="question"/>
                            Entrenador
                        </label>
                        </div>
                        </div>
                        <div className="columns">
                            <div className="column is-three-fifths">
                                <input className="input" type="text" name="str_nombre" value={empleados.str_nombre} onChange={handleChange} placeholder='Nombres Y Apellidos' />
                            </div>
                            <div className="column is-4 is-offset-0">
                                <input className="input" type="date" name="time_fin_trabajo" value={empleados.time_fin_trabajo} onChange={handleChange} placeholder='Fecha de Nac' />
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-three-fifths">
                                <input className="input" type="text" name="str_telefono" value={empleados.str_telefono} onChange={handleChange} placeholder='Teléfono' />
                            </div>
                            <div className="column">
                                <input className="input" type="text" name="str_cedula" value={empleados.str_cedula} onChange={handleChange} placeholder='Cédula' />
                            </div>
                                </div>
                                <div>
                                    <input className="input" type="text" name="str_direccion" value={empleados.str_direccion} onChange={handleChange} placeholder='Dirección' />
                                </div>
                                <div className="columns is-mobile">
                                <div className="column is-4 is-offset-8">
                                <button className="button is-primary" type='submit'>Registrar</button>
                                </div>
                                </div>
            </form>
        </div>
        </div>
        </div>
    )
}

export default RegistroEmpleado;