import React, { useState, useEffect } from "react";
import axios from "axios"

const RegistroCliente = () => {
    const [cliente, setCliente] = useState(
        {
            str_nombre: "",
            edad: "",
            str_direccion: "",
            str_ruc: "",
        }
    );

    const [pasoActual, setPasoActual] = useState(1);
    const [datosCompletos, setDatosCompletos] = useState(false);

    // función para manejar cambios en los inputs
    const handleChange = (event) => {
        setCliente({
            ...cliente,
            [event.target.name]: event.target.value,
        });
    };

    // función para manejar el envío del formulario
    const handleSubmitCliente = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/clientes", cliente);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
        //setPasoActual(2);
        console.log(cliente);
    };


    // comprueba si esos campos estan vacios
    useEffect(() => {
        const camposCompletos =
            cliente.str_nombre !== "" &&
            cliente.edad !== "" &&
            cliente.str_direccion !== "" &&
            cliente.str_ruc !== "";
        setDatosCompletos(camposCompletos);
    }, [cliente]);

    return (
        <div className="columns is-centered">
            <div className="column is-three-fifths-desktop">
                <div className="box is-background-primary">
                    <h1 className="title is-1 is-centered">Registro De Cliente</h1>
                    <form>
                        {pasoActual === 1 && (
                            <>
                                <h2 className="title is-2">Datos del cliente</h2>
                                <div className="columns">
                                    <div className="column is-three-fifths">
                                        <input className="input is-primary is-background-link" type="text" name="str_nombre" value={cliente.str_nombre} onChange={handleChange} placeholder='Nombres Y Apellidos' />
                                    </div>
                                    <div className="column">
                                        <input className="input is-primary" type="number" name="edad" value={cliente.edad} onChange={handleChange} placeholder='Edad' />
                                    </div>
                                </div>
                                <div className="columns">
                                    <div className="column is-three-fifths">
                                        <input className="input is-primary" type="text" name="str_direccion" value={cliente.str_direccion} onChange={handleChange} placeholder='Dirección' />
                                    </div>
                                    <div className="column">
                                        <input className="input is-primary" type="text" name="str_ruc" value={cliente.str_ruc} onChange={handleChange} placeholder='RUC' />
                                    </div>
                                </div>
                                <button className="button is-primary is-outlined mt-2" type='button' onClick={handleSubmitCliente} disabled={!datosCompletos}>Siguiente</button>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegistroCliente;