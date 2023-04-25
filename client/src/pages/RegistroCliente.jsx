import React, { useState, useEffect } from "react";
import axios from "axios"

const RegistroCliente = () => {
    let id_cliente = null;

    // Crea una constante con los valores correspondientes a cada tipo de modalidad de pago
    const valoresMontoAPagar = {
        1: "10.000 Gs.",
        2: "50.000 Gs.",
        3: "150.000 Gs."
    };

    const [cliente, setCliente] = useState(
        {
            str_nombre: "",
            edad: "",
            str_direccion: "",
            str_ruc: "",
        }
    );

    const [planDePago, setPlanDePago] = useState({
        cliente_id: "",
        tipo_modalidad_de_pago_id: "",
        date_fecha_de_vencimiento: "",
        entrenador_id: null,
    });

    const [mediciones, setMediciones] = useState({
        cliente_id: "",
        peso: "",
        altura: "",
        cintura: "",
        piernas: "",
        porcentaje_grasa_corporal: ""
    });

    const [pasoActual, setPasoActual] = useState(1);
    const [datosCompletos, setDatosCompletos] = useState(false);

    // función para manejar cambios en los inputs
    const handleChangeCliente = (event) => {
        setCliente({
            ...cliente,
            [event.target.name]: event.target.value,
        });
    };

    // función para manejar el envío datos del cliente
    const handleSubmitCliente = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/clientes", cliente);
            id_cliente = response.data.id;
            console.log(response.data);
            console.log("id del cliente:", id_cliente);

            // Seteamos la id del cliente en el plan de pago
            setPlanDePago({
                ...planDePago,
                cliente_id: id_cliente
            });

            // Seteamos la id del cliente en las mediciones
            setMediciones({
                ...mediciones,
                cliente_id: id_cliente
            });


        } catch (error) {
            console.log(error);
        }
        setPasoActual(2);
    };


    // Función para manejar la selección del tipo de modalidad de pago
    const handleTipoModalidadDePago = (tipoModalidadDePagoId) => {
        setPlanDePago({
            ...planDePago,
            tipo_modalidad_de_pago_id: tipoModalidadDePagoId
        });
    };

    const handlePlanDePagoChange = (event) => {
        setPlanDePago({
            ...planDePago,
            [event.target.name]: event.target.value,
        });
    };

    // funcion para manejar el envio de plan de pago del cliente
    const handleSubmitPlanDePago = async (event) => {
        event.preventDefault();
        setPasoActual(3);
        /* try {
             const fechaFormateada = new Date(planDePago.date_fecha_de_vencimiento).toLocaleDateString('es-PY', { day: '2-digit', month: '2-digit', year: 'numeric' });
             const response = await axios.post("http://localhost:8000/planes-de-pagos", {
                 ...planDePago,
                 date_fecha_de_vencimiento: fechaFormateada
             });
             console.log(response.data);
         } catch (error) {
             console.log(error)
         }*/
    }

    // manejo de inputs de mediciones
    const handleMedicionesChange = (event) => {
        event.preventDefault();
        setMediciones({
            ...mediciones,
            [event.target.name]: event.target.value,
        })
    }

    // envio de mediciones
    const handleMedicionesSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/mediciones-clientes", mediciones);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

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
        <div className="columns is-centered mt-6">
            <div className="container is-max-desktop is-centered">
                <div className="box is-centered">
                    <h1 className="title is-1 mb-6">Registro De Cliente</h1>
                    <hr />
                    <form>
                        {pasoActual === 1 && (
                            <>
                                <h2 className="title is-2 has-text-centered mt-6">Datos del cliente</h2>
                                <div className="columns">
                                    <div className="column is-three-fifths">
                                        <input className="input has-background-grey-light has-text-centered has-placeholder-centered has-text-weight-bold" type="text" name="str_nombre" value={cliente.str_nombre} onChange={handleChangeCliente} placeholder='Nombres Y Apellidos' />
                                    </div>
                                    <div className="column">
                                        <input className="input has-background-grey-light has-text-centered has-placeholder-centered has-text-weight-bold" type="number" name="edad" value={cliente.edad} onChange={handleChangeCliente} placeholder='Edad' />
                                    </div>
                                </div>
                                <div className="columns">
                                    <div className="column is-three-fifths">
                                        <input className="input has-background-grey-light has-text-centered has-placeholder-centered has-text-weight-bold" type="text" name="str_direccion" value={cliente.str_direccion} onChange={handleChangeCliente} placeholder='Dirección' />
                                    </div>
                                    <div className="column">
                                        <input className="input has-background-grey-light has-text-centered has-placeholder-centered has-text-weight-bold" type="text" name="str_ruc" value={cliente.str_ruc} onChange={handleChangeCliente} placeholder='RUC' />
                                    </div>
                                </div>
                                <div className="buttons">
                                    <button className="button is-primary is-outlined mt-2 ml-auto" type='button' onClick={handleSubmitCliente} disabled={!datosCompletos}>Siguiente</button>
                                </div>
                            </>
                        )}
                        {pasoActual === 2 && (
                            <>
                                <h2 className="title is-2 has-text-centered mt-6">Elige el Plan de Pago</h2>
                                <div className="is-flex is-justify-content-center">
                                    <button className="button is-primary is-outlined mx-1" type='button' onClick={() => handleTipoModalidadDePago(1)}>Diario</button>
                                    <button className="button is-primary is-outlined mx-1" type='button' onClick={() => handleTipoModalidadDePago(2)}>Semanal</button>
                                    <button className="button is-primary is-outlined mx-1" type='button' onClick={() => handleTipoModalidadDePago(3)}>Mensual</button>
                                </div>
                                <div className="title is-5 has-text-centered mt-2">Monto a Pagar: {valoresMontoAPagar[planDePago.tipo_modalidad_de_pago_id]}</div>
                                <div className="has-text-centered">
                                    <h3 className="title is-3">Fecha de Pago</h3>
                                    <input className="input" type="date" name="date_fecha_de_vencimiento" value={planDePago.date_fecha_de_vencimiento} onChange={handlePlanDePagoChange} />
                                </div>
                                <div className="buttons">
                                    <button className="button is-outlined mt-2 ml-auto" type='button' onClick={() => setPasoActual(1)}>Atrás</button>
                                    <button className="button is-primary is-outlined mt-2 mx-2" type='button' onClick={handleSubmitPlanDePago}>Siguiente</button>
                                </div>
                            </>
                        )}

                        {pasoActual === 3 && (
                            <>
                                <h2 className="title is-2 has-text-centered mt-6">Mediciones</h2>
                                <div>
                                    <input className="input is-primary mt-2" type="number" name="altura" value={mediciones.altura} onChange={handleMedicionesChange} placeholder='Altura' />
                                </div>
                                <div>
                                    <input className="input is-primary mt-2" type="number" name="peso" value={mediciones.peso} onChange={handleMedicionesChange} placeholder='Peso' />
                                </div>
                                <div>
                                    <input className="input is-primary mt-2" type="number" name="cintura" value={mediciones.cintura} onChange={handleMedicionesChange} placeholder='Cintura' />
                                </div>
                                <div>
                                    <input className="input is-primary mt-2" type="number" name="piernas" value={mediciones.piernas} onChange={handleMedicionesChange} placeholder='Piernas' />
                                </div>
                                <div>
                                    <input className="input is-primary mt-2" type="number" name="porcentaje_grasa_corporal" value={mediciones.porcentaje_grasa_corporal} onChange={handleMedicionesChange} placeholder='% de Grasa Corporal' />
                                </div>
                                <button className="button is-outlined mt-2" type='button' onClick={() => setPasoActual(2)}>Atrás</button>
                                <button className="button is-primary is-outlined mt-2 mx-2" type="button" onClick={handleMedicionesSubmit}>Registrar</button>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegistroCliente;