import React, { useState, useEffect } from "react";

const RegistroCliente = () => {
    const [monto, setMonto] = useState("");
    const [datos, setDatos] = useState(
        {
            nombresYApellidos: "",
            fechaDeNacimiento: "",
            telefono: "",
            ruc: "",
            direccion: "",
            planDePago: "",
            monto: monto,
            fechaDePago: "",
            altura: "",
            peso: "",
            edad: "",
            cintura: "",
            brazos: "",
            piernas: "",
            grasaCorporal: "",
        }
    );
    const [pasoActual, setPasoActual] = useState(1);
    const [montoAPagar, setMontoAPagar] = useState(0);
    const [datosCompletos, setDatosCompletos] = useState(false);

    // función para manejar cambios en los inputs
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

    // actualiza "monto" cada vez que "montoAPagar" cambia
    useEffect(() => {
        setMonto(montoAPagar);
    }, [montoAPagar]);

    // comprueba si esos campos estan vacios
    useEffect(() => {
        const camposCompletos =
            datos.nombresYApellidos !== "" &&
            datos.fechaDeNacimiento !== "" &&
            datos.telefono !== "" &&
            datos.ruc !== "" &&
            datos.direccion !== "";
        setDatosCompletos(camposCompletos);
    }, [datos]);

    return (
        <div className="columns is-centered">
            <div className="column is-three-fifths-desktop">
                <div className="box">
                    <h1>Registro De Cliente</h1>
                    <form onSubmit={handleSubmit}>
                        {pasoActual === 1 && (
                            <>
                                <h2>Datos del cliente</h2>
                                <div className="columns">
                                    <div className="column is-three-fifths">
                                        <input type="text" name="nombresYApellidos" value={datos.nombresYApellidos} onChange={handleChange} placeholder='Nombres Y Apellidos' />
                                    </div>
                                    <div className="column">
                                        <input type="date" name="fechaDeNacimiento" value={datos.fechaDeNacimiento} onChange={handleChange} placeholder='Fecha de Nac' />
                                    </div>
                                </div>
                                <div className="columns">
                                    <div className="column is-three-fifths">
                                        <input type="text" name="telefono" value={datos.telefono} onChange={handleChange} placeholder='Teléfono' />
                                    </div>
                                    <div className="column">
                                        <input type="text" name="ruc" value={datos.ruc} onChange={handleChange} placeholder='RUC' />
                                    </div>
                                </div>
                                <div>
                                    <input type="text" name="direccion" value={datos.direccion} onChange={handleChange} placeholder='Dirección' />
                                </div>
                                <button className="button is-primary" type='button' onClick={() => setPasoActual(2)} disabled={!datosCompletos}>Siguiente</button>
                            </>
                        )}

                        {pasoActual === 2 && (
                            <>
                                <h2>Elige el Plan de Pago</h2>
                                <div>
                                    <button type='button' onClick={() => setMontoAPagar(10000)}>Diario</button>
                                    <button type='button' onClick={() => setMontoAPagar(70000)}>Semanal</button>
                                    <button type='button' onClick={() => setMontoAPagar(100000)}>Mensual</button>
                                </div>
                                <div>Monto a Pagar: {montoAPagar.toLocaleString('es-ES')} Gs.</div>
                                <div>
                                    <p>Fecha de Pago</p>
                                    <input type="date" name="fechaDePago" value={datos.fechaDePago} onChange={handleChange} />
                                </div>
                                <button type='button' onClick={() => setPasoActual(1)}>Atrás</button>
                                <button type='button' onClick={() => setPasoActual(3)}>Siguiente</button>
                            </>
                        )}

                        {pasoActual === 3 && (
                            <>
                                <h2>Mediciones</h2>
                                <div>
                                    <input type="number" name="altura" value={datos.altura} onChange={handleChange} placeholder='Altura' />
                                </div>
                                <div>
                                    <input type="number" name="peso" value={datos.peso} onChange={handleChange} placeholder='Peso' />
                                </div>
                                <div>
                                    <input type="number" name="edad" value={datos.edad} onChange={handleChange} placeholder='Edad' />
                                </div>
                                <div>
                                    <input type="number" name="cintura" value={datos.cintura} onChange={handleChange} placeholder='Cintura' />
                                </div>
                                <div>
                                    <input type="number" name="brazos" value={datos.brazos} onChange={handleChange} placeholder='Brazos' />
                                </div>
                                <div>
                                    <input type="number" name="piernas" value={datos.piernas} onChange={handleChange} placeholder='Piernas' />
                                </div>
                                <div>
                                    <input type="number" name="grasaCorporal" value={datos.grasaCorporal} onChange={handleChange} placeholder='% de Grasa Corporal' />
                                </div>
                                <button type='button' onClick={() => setPasoActual(2)}>Atrás</button>
                                <button type="submit">Registrar</button>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegistroCliente;