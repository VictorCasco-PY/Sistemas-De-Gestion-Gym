import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditableInput from "../../components/EditableInput";
import api from "../../services/api";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

const DetallesProducto = () => {
  const id = useParams().id;
  const [productos, setproductos] = useState(null);

  // Función para formatear la cadena de tiempo (hh:mm)

  useEffect(() => {
    api
      .get(`producto/${id}`)
      .then((response) => {
        setproductos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!productos) {
    return <div>Cargando detalles del producto...</div>;
  }

  return (
    <div className="box">
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to={`/listaProductos`}>
          <button className="button is-link is-outlined mr-6">
            <ArrowBackIcon fontSize="string" />
          </button>
        </Link>
        <h1 className="title is-3 has-text-primary">Detalles del Producto</h1>
      </div>
      <div className="columns">
        <div className="column">
          <h4>Nombre</h4>
          <EditableInput
            valorInicial={productos.str_nombre}
            id={id}
            apiUrl="http://localhost:8000/producto"
            campoCambiar="str_nombre"
          />
        </div>
        <div className="column">
          <h4>Costo</h4>
          <EditableInput
            valorInicial={productos.costo_compra}
            id={id}
            apiUrl="http://localhost:8000/producto"
            campoCambiar="costo_compra"
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <h4>IVA</h4>
          <EditableInput
            valorInicial={productos.iva}
            id={id}
            apiUrl="http://localhost:8000/producto"
            campoCambiar="iva"
          />
        </div>
        <div className="column">
          <h4>Descripción</h4>
          <EditableInput
            valorInicial={productos.str_descripcion}
            id={id}
            apiUrl="http://localhost:8000/producto"
            campoCambiar="str_descripcion"
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <h4>Codigo</h4>
          <EditableInput
            valorInicial={productos.str_codigo}
            id={id}
            apiUrl="http://localhost:8000/producto"
            campoCambiar="str_codigo"
          />
        </div>
        <div className="column">
          <h4>Cantidad</h4>
          <div className="column">
            <EditableInput
              valorInicial={productos.cantidad}
              id={id}
              apiUrl="http://localhost:8000/producto"
              campoCambiar="cantidad"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallesProducto;