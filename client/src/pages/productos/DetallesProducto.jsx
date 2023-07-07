import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Swal from "sweetalert2";

const DetallesProducto = () => {
  const id = useParams().id;
  const [productos, setProductos] = useState(null);
  const focusedInputRef = useRef(null); // Referencia al input actualmente enfocado

  useEffect(() => {
    api
      .get(`producto/${id}`)
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductos((prevProductos) => ({
      ...prevProductos,
      [name]: value
    }));
  };

  
const handleInputKeyDown = (event) => {
  if (event.key === "Enter") {
    const { name, value } = event.target;

    // Realizar PUT para el campo actual
    api
      .put(`producto/${id}`, { [name]: value })
      .then((response) => {
        // Actualizar el estado de productos con el campo actualizado
        setProductos((prevProductos) => ({
          ...prevProductos,
          [name]: value
        }));

        // Si el campo actual es "costo_compra", calcular el nuevo precio
        if (name === "costo_compra") {
          const costo = parseFloat(value);

          const preci0 = costo + costo * 0.4;
          const precio = Math.round(preci0 / 500) * 500;

          // Realizar PUT para el campo de "precio"
          api
            .put(`producto/${id}`, { precio })
            .then((response) => {
              // Actualizar el estado de productos con el precio actualizado
              setProductos((prevProductos) => ({
                ...prevProductos,
                precio
              }));

              focusedInputRef.current.blur(); // Quitar el foco del input actualmente enfocado

              // Mostrar mensaje de éxito
              Swal.fire({
                text: "Campo actualizado correctamente!",
                position: 'top-end',
                toast: true,
                icon: 'success',
                showConfirmButton: false,
                timer: 3000
            })
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          focusedInputRef.current.blur(); // Quitar el foco del input actualmente enfocado

          // Mostrar mensaje de éxito
          Swal.fire({
            text: "Campo actualizado correctamente!",
            icon: "success",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
};


  
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
        <div className="column tags has-addons">
          <label className="tag is-info is-light">Nombre</label>
          <input
            type="text"
            className="tag"
            value={productos.str_nombre}
            name="str_nombre"
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            ref={focusedInputRef} // Establecer la referencia al input actualmente enfocado
          />
        </div>
        <div className="column tags has-addons">
          <label className="tag is-info is-light">Costo</label>
          <input
            type="text"
            className="tag"
            value={productos.costo_compra}
            name="costo_compra"
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            ref={focusedInputRef} 
          />
        </div>
      </div>
      <div className="columns">
        <div className="column tags has-addons">
          <label className="tag is-info is-light">IVA</label>
          <input
            type="text"
            className="tag"
            value={productos.iva}
            name="iva"
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            ref={focusedInputRef} 
          />
        </div>
        <div className="column tags has-addons">
          <label className="tag is-info is-light">Descripción</label>
          <input
            type="text"
            className="tag"
            value={productos.str_descripcion}
            name="str_descripcion"
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            ref={focusedInputRef} 
          />
        </div>
      </div>
      <div className="columns">
        <div className="column tags has-addons">
          <label className="tag is-info is-light">Código</label>
          <input
            type="text"
            className="tag"
            value={productos.str_codigo}
            name="str_codigo"
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            ref={focusedInputRef} 
          />
        </div>
        <div className="column tags has-addons">
          <label className="tag is-info is-light">Cantidad</label>
          <input
            type="text"
            className="tag"
            value={productos.cantidad}
            name="cantidad"
            readOnly
          />
        </div>
      </div>
      <div className="columns">
        <div className="column tags has-addons">
          <label className="tag is-info is-light">Precio</label>
          <input
            type="text"
            className="tag"
            value={productos.precio}
            name="precio"
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default DetallesProducto;
