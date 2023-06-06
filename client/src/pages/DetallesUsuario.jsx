import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import { useParams } from "react-router-dom";
import EditableInput from "../components/EditableInput";
import api from "../services/api";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

const DetallesUsuario = () => {
  const id = useParams().id;
  const [usuario, setUsuario] = useState(null);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));


  const handleNombreChange = (nuevoNombre) => {
    setUser({ ...user, nombre: nuevoNombre });
  };
  

  // Función para formatear la cadena de tiempo (hh:mm)
  const formatTime = (time) => {
    return moment(time, "HH:mm").format("HH:mm");
  };

  useEffect(() => {
    api
      .get(`empleado/${id}`)
      .then((response) => {
        setUsuario(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  if (!usuario) {
    return <div>Cargando detalles del usuario...</div>;
  }

  return (
    <div className="box">
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to={`/listaEmpleados`}>
          <button className="button is-link is-outlined mr-6">
            <ArrowBackIcon fontSize="string" />
          </button>
        </Link>
        <h1 className="title is-3 has-text-primary">Detalles del Usuario</h1>
      </div>
      <div className="columns">
        <div className="column">
          <h4>Nombre</h4>
          <EditableInput
            valorInicial={usuario.str_nombre}
            id={id}
            apiUrl="http://localhost:8000/empleado"
            campoCambiar="str_nombre"
            onValueChange={handleNombreChange}
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
          <EditableInput
            valorInicial={usuario.str_cedula}
            id={id}
            apiUrl="http://localhost:8000/empleado"
            campoCambiar="str_cedula"
          />
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
