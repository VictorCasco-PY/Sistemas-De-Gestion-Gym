import DatosClienteForm from "./DatosClienteForm";
import MedicionesForm from "./MedicionesForm";
import PlanDePagoForm from "./PlanDePagoForm";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const WizardFormCliente = () => {
    let getIdCliente = null;
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
            const response = await api.post("/clientes", cliente);
            getIdCliente = response.data.id;
            console.log(response.data);
            console.log("id del cliente:", getIdCliente);

            // Seteamos la id del cliente en el plan de pago
            setPlanDePago({
                ...planDePago,
                id_cliente: getIdCliente
            });

            // Seteamos la id del cliente en las mediciones
            setMediciones({
                ...mediciones,
                id_cliente: getIdCliente
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
        id_cliente: "",
        id_tipo_modalidad_de_pago: "",
        date_fecha_de_vencimiento: null,
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
            id_tipo_modalidad_de_pago: tipoModalidadDePagoId
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
        try {
            const response = await api.post("/planes-de-pagos", planDePago);
            console.log(response.data);
            setPasoActual(3);
        } catch (error) {
            console.log(error);
        }
    }
    // FUNCIONES DE MEDICIONES
    const [mediciones, setMediciones] = useState({
        id_cliente: "",
        peso: "",
        altura: "",
        cintura: "",
        piernas: "",
        porcentaje_grasa_corporal: "",
        brazos: ""
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
            const response = await api.post("/mediciones-clientes", mediciones);
            console.log(response.data);
            navigate("/listaClientes");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="columns is-centered mt-6">
            <div className="container is-max-desktop is-centered">
                <div className="box is-centered">
                    <h1 className="title is-1 mb-6">Registro De Cliente</h1>
                    <hr />
                    <form>
                        {pasoActual === 1 && (
                            <DatosClienteForm
                                cliente={cliente}
                                handleChangeCliente={handleChangeCliente}
                                handleSubmitCliente={handleSubmitCliente}
                                datosCompletos={datosCompletos}
                                setPasoActual={setPasoActual}
                            />
                        )}
                        {pasoActual === 2 && (
                            <PlanDePagoForm
                                planDePago={planDePago}
                                handleTipoModalidadDePago={handleTipoModalidadDePago}
                                handlePlanDePagoChange={handlePlanDePagoChange}
                                handleSubmitPlanDePago={handleSubmitPlanDePago}
                                valoresMontoAPagar={valoresMontoAPagar}
                            />
                        )}
                        {pasoActual === 3 && (
                            <MedicionesForm
                                mediciones={mediciones}
                                handleMedicionesChange={handleMedicionesChange}
                                handleSubmitMediciones={handleSubmitMediciones}
                            />
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default WizardFormCliente