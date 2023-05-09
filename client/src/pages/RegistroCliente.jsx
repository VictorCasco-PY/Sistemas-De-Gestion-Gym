import React, { useState, useEffect } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const RegistroCliente = () => {
    let id_cliente = null;
    const navigate = useNavigate();
    const [pasoActual, setPasoActual] = useState(1);
    const [datosCompletos, setDatosCompletos] = useState(false);

    // FUNCIONES DE DATOS DEL CLIENTE
    const [cliente, setCliente] = useState(
        {
            str_nombre: "",
            edad: "",
            str_direccion: "",
            str_ruc: "",
            str_cedula: ""
        }
    );
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

    // comprueba si esos campos estan vacios
    useEffect(() => {
        const camposCompletos =
            cliente.str_nombre !== "" &&
            cliente.edad !== "" &&
            cliente.str_direccion !== "" &&
            cliente.str_ruc !== "" &&
            cliente.str_cedula !== "";
        setDatosCompletos(camposCompletos);
    }, [cliente]);

    // FUNCIONES DE PLAN DE PAGO
    const [planDePago, setPlanDePago] = useState({
        cliente_id: "",
        tipo_modalidad_de_pago_id: "",
        date_fecha_de_vencimiento: "",
        entrenador_id: null,
    });
    // valores correspondientes a cada tipo de modalidad de pago
    const valoresMontoAPagar = {
        1: "10.000 Gs.",
        2: "50.000 Gs.",
        3: "150.000 Gs."
    };
    // Función para manejar la selección del tipo de modalidad de pago
    const handleTipoModalidadDePago = (tipoModalidadDePagoId) => {
        setPlanDePago({
            ...planDePago,
            tipo_modalidad_de_pago_id: tipoModalidadDePagoId
        });
    };

    //manejo de los cambios de plan de pago
    const handlePlanDePagoChange = (event) => {
        setPlanDePago({
            ...planDePago,
            [event.target.name]: event.target.value,
        });
    };

    // envio de plan de pago del cliente
    const handleSubmitPlanDePago = async (event) => {
        event.preventDefault();
        setPasoActual(3);
        try {
            const response = await axios.post("http://localhost:8000/planes-de-pagos", planDePago);
            console.log(response.data);
        } catch (error) {
            console.log(error)
        }
    }
    // FUNCIONES DE MEDICIONES
    const [mediciones, setMediciones] = useState({
        cliente_id: "",
        peso: "",
        altura: "",
        cintura: "",
        piernas: "",
        porcentaje_grasa_corporal: ""
    });
    // manejo de inputs de mediciones
    const handleMedicionesChange = (event) => {
        event.preventDefault();
        setMediciones({
            ...mediciones,
            [event.target.name]: event.target.value,
        })
    }
    // post de mediciones
    const handleSubmitMediciones = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/mediciones-clientes", mediciones);
            console.log(response.data);
            navigate("/listaClientes");
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div className="columns is-centered mt-6">
            <div className="container is-max-desktop is-centered">
                <div className="box is-centered has-background-white-ter">
                    <h1 className="title is-1 mb-6">Registro De Cliente</h1>
                    <hr />
                    <form>
                        {pasoActual === 1 && (
                            <>
                                <h2 className="title is-2 has-text-centered mt-6">Datos del cliente</h2>
                                <div className="columns">
                                    <div className="column is-half">
                                        <input className="input is-primary mb-2" type="text" name="str_nombre" placeholder="Nombre Y Apellido" value={cliente.str_nombre} onChange={handleChangeCliente} />
                                    </div>
                                    <div className="column is-half">
                                        <input className="input is-primary mb-2" type="text" name="edad" placeholder="Edad" value={cliente.edad} onChange={handleChangeCliente} />
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
                                    <div className="is-flex is-justify-content-center">
                                        <input className="column is-one-fifth input" type="date" name="date_fecha_de_vencimiento" value={planDePago.date_fecha_de_vencimiento} onChange={handlePlanDePagoChange} />
                                    </div>
                                </div>
                                <div className="buttons">
                                    <button className="button is-primary is-outlined mt-2 mx-2" type='button' onClick={handleSubmitPlanDePago}>Siguiente</button>
                                </div>
                            </>
                        )}

                        {pasoActual === 3 && (
                            <>
                                <h2 className="title is-2 has-text-centered mt-6">Mediciones</h2>
                                <div className="columns">
                                    <div className="column is-half">
                                        <div className="field is-horizontal">
                                            <div className="field-body is-flex is-align-items-center is-justify-content-center">
                                                <label htmlFor="altura" className="label has-text-centered mr-2">Altura</label>
                                                <div className="field">
                                                    <input className="input has-text-centered mt-2" type="number" name="altura" value={mediciones.altura} onChange={handleMedicionesChange} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="field is-horizontal">
                                            <div className="field-body is-flex is-align-items-center is-justify-content-center">
                                                <label htmlFor="peso" className="label has-text-centered mr-2">Peso</label>
                                                <div className="field">
                                                    <input className="input has-text-centered mt-2" type="number" name="peso" value={mediciones.peso} onChange={handleMedicionesChange} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="field is-horizontal">
                                            <div className="field-body is-flex is-align-items-center is-justify-content-center">
                                                <label htmlFor="cintura" className="label has-text-centered mr-2">Cintura</label>
                                                <div className="field">
                                                    <input className="input has-text-centered mt-2" type="number" name="cintura" value={mediciones.cintura} onChange={handleMedicionesChange} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-half">
                                        <div className="field is-horizontal">
                                            <div className="field-body is-flex is-align-items-center is-justify-content-center">
                                                <label htmlFor="piernas" className="label has-text-centered mr-2">Piernas</label>
                                                <div className="field">
                                                    <input className="input has-text-centered mt-2" type="number" name="piernas" value={mediciones.piernas} onChange={handleMedicionesChange} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="field is-horizontal">
                                            <div className="field-body is-flex is-align-items-center is-justify-content-center">
                                                <label htmlFor="porcentaje_grasa_corporal" className="label has-text-centered mr-2">% grasa corporal</label>
                                                <div className="field">
                                                    <input className="input has-text-centered mt-2" type="number" name="porcentaje_grasa_corporal" value={mediciones.porcentaje_grasa_corporal} onChange={handleMedicionesChange} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="buttons">
                                    <button className="button is-primary is-outlined mt-2 mx-2" type="button" onClick={handleSubmitMediciones}>Registrar</button>
                                </div>

                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegistroCliente;