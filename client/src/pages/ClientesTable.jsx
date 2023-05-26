import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';

const options = [
  { value: '', label: 'Seleccione un estado' },
  { value: 'en_regla', label: 'En regla' },
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'atrasado', label: 'Atrasado' },
];

export default function ClientesTable() {
  const [clientes, setClientes] = useState([]); //Guarda la tabla que se renderiza constantemente
  const [originalData, setOriginalData] = useState([]); //Guarda la tabla original que se trajo de la BD
  const [sortField, setSortField] = useState(""); //Por cual campo se va ordenar
  const [sortDirection, setSortDirection] = useState("asc"); //en que dirección
  const [searchString, setSearchString] = useState(""); //Que va incluir la busqueda? ej si incluye "an"
  //renderiza la tabla con clientes que contenga "an"
  const [selectedEstado, setSelectedEstado] = useState("");

  const handleEstadoChange = (selectedOption) => {
    setSelectedEstado(selectedOption.value);
  };
  useEffect(() => { //effect hace funcionar este codigo
    handleSearch();
  }, [selectedEstado]);


  useEffect(() => {
    axios.get("http://localhost:8000/planes-de-pagos").then((response) => {
      setClientes(response.data);
      setOriginalData(response.data);
    });
  }, []);

  const colorMap = {
    "En regla": "has-background-success",
    "pendiente": "has-background-warning has-text-black",
    "Atrasado": "has-background-danger"
  };

  const handleSort = (field) => {
    if (sortField === field) {
      //toggle de direccion
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      //cambiar de ordenacion a otro campo
      setSortField(field);
      setSortDirection("asc");
    }
  };
  const sortedData = [...clientes].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue < bValue) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleFilter = (field, searchString) => {
    //filtrar para que incluya
    const filtered = originalData.filter(
      (item) =>
        item[field].toLowerCase().includes(searchString.toLowerCase())
    );
    setClientes(filtered);
  };

  //buscar clientes, pueden ser por varios campos, nombre, estado, etc se agregaran mas
  const handleSearch = () => {
    const nombre = searchString;
    const estado = selectedEstado;

    if (nombre.length > 2 || estado) { //si el nombre es mayor a dos, se hace get, o si se sleeciona estado
      let url = "http://localhost:8000/planes-de-pagos?";

      if (nombre.length > 2) {
        url += `nombre=${nombre}`;
      }

      if (estado) {
        url += `${nombre.length > 2 ? "&" : ""}estado=${estado}`;
      }
      console.log(url)
      axios
        .get(url)
        .then((response) => {
          setClientes(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      handleFilter("str_nombre_cliente", nombre);
    }
  };

  if (!clientes) {
    return <div className='title'>Cargando clientes...</div>;
  }

  return (
    <div>
      <div className="column is-half">
      <input
          className="input"
          type="text"
          placeholder="Buscar..."
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          onKeyUp={() => handleSearch()}
        />
        <Select
          options={options}
          value={selectedEstado ? { value: selectedEstado, label: selectedEstado } : null}
          onChange={handleEstadoChange}
        />
      </div>
      <table className="table table is-bordered tableNew has-background-light is-bordered">
        <thead className='has-text-centered'>
          <tr className='is-size-6'>
            <th style={{ cursor: "pointer" }} className='is-size-5' onClick={() => handleSort("str_nombre_cliente")}>
              <span className={`sortIcon ${sortField === "str_nombre_cliente"
                ? `active ${sortDirection}`
                : ""
                }`}></span> Nombre
            </th>
            <th style={{ cursor: "pointer" }} className='' onClick={() => handleSort("str_modalidad")}>
              <span className={`sortIcon ${sortField === "str_modalidad"
                ? `active ${sortDirection}`
                : ""
                }`}></span> Plan
            </th>
            <th style={{ cursor: "pointer" }} className='' onClick={() => handleSort("estado_de_pago")}>
              <span className={`sortIcon ${sortField === "estado_de_pago"
                ? `active ${sortDirection}`
                : ""
                }`}></span> Estado de Pago
            </th>
            <th style={{ cursor: "pointer" }} className=''></th>
          </tr>
        </thead>
        <tbody>
          {sortedData.length > 0 ? ( //Solo si hay datos en la tabla se mapea
            sortedData.map(cliente => (
              <tr key={cliente.id_cliente}>
                <td className='is-size-5'>{cliente.str_nombre_cliente}</td>
                <td className='is-size-5'>{cliente.str_modalidad}</td>
                <td className='is-size-5'>
                  <button className={` ${colorMap[cliente.estado_de_pago]} button is-static has-text-white`}>
                    {cliente.estado_de_pago}
                  </button>
                </td>
                <td className='is-size-5'>
                  <Link to={`/detallesCliente/${cliente.id_cliente}`}>
                    <button className="button is-link is-rounded is-outlined">Ver Mas</button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}