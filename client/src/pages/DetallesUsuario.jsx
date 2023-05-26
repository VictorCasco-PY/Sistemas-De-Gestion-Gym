import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment-timezone';
import { useParams } from "react-router-dom";
import EditableInput from "../components/EditableInput";

const DetallesUsuario = () => {
  const id = useParams().id;
  const [usuario, setUsuario] = useState(null);

    // Función para formatear la cadena de tiempo (hh:mm)
// Función para formatear la cadena de tiempo (hh:mm)
const formatTime = (time) => {
  return moment(time, 'HH:mm').format('HH:mm');
};

  useEffect(() => {
    axios
      .get(`http://localhost:8000/empleado/${id}`)
      .then((response) => {
        setUsuario(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!usuario) {
    return <div>Cargando detalles del usuario...</div>;
  }

  return (
    <div className="box">
      <h1>Detalles del Usuario</h1>
      <div className="columns">
        <div className="column">
          <h4>Nombre</h4>
          <EditableInput
            valorInicial={usuario.str_nombre}
            id={id}
            apiUrl="http://localhost:8000/empleado"
            campoCambiar="str_nombre"
          />
        </div>
        <div className="column">
          <h4>Dirección</h4>
          <EditableInput
            valorInicial={usuario.str_direccion}
            id={id}
            apiUrl="http://localhost:8000/empleado"
            campoCambiar="str_direccion"
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <h4>Rol</h4>
          <p>{usuario.rol}</p>
        </div>
        <div className="column">
          <h4>Número de Cédula</h4>
          <p>{usuario.str_cedula}</p>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <h4>Telefono</h4>
          <EditableInput
            valorInicial={usuario.str_telefono}
            id={id}
            apiUrl="http://localhost:8000/empleado"
            campoCambiar="str_telefono"
          />
        </div>
        <div className="column">
          <h4>Horario de Trabajo</h4>
          <div className="columns is-gapless">
            <div className="column">
              <EditableInput
                valorInicial={formatTime(usuario.time_inicio_trabajo)}
                id={id}
                apiUrl="http://localhost:8000/empleado"
                campoCambiar="time_inicio_trabajo"
              />
            </div>
            <div className="column">
              <p>a</p>
            </div>
            <div className="column">
              <EditableInput
                valorInicial={formatTime(usuario.time_fin_trabajo)}
                id={id}
                apiUrl="http://localhost:8000/empleado"
                campoCambiar="time_fin_trabajo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallesUsuario;