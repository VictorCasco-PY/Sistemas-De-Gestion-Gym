import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import api from '../services/api';

const estadosOptions = [
  { value: '', label: 'Seleccione un estado' },
  { value: 'en_regla', label: 'En regla' },
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'atrasado', label: 'Atrasado' },
];
const planesOptions = [
  { value: '', label: 'Seleccione un plan' },
  { value: 'diario', label: 'Diario' },
  { value: 'mensual', label: 'Mensual' },
  { value: 'anual', label: 'Anual' },
];

export default function ClientesTable() {
  const [clientes, setClientes] = useState([]); //Guarda la tabla que se renderiza constantemente
  const [originalData, setOriginalData] = useState([]); //Guarda la tabla original que se trajo de la BD
  const [sortField, setSortField] = useState(""); //Por cual campo se va ordenar
  const [sortDirection, setSortDirection] = useState("asc"); //en que dirección
  const [searchString, setSearchString] = useState(""); //Que va incluir la busqueda? ej si incluye "an" //renderiza la tabla con clientes que contenga "an"
  const [selectedEstado, setSelectedEstado] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleEstadoChange = (selectedOption) => {
    setSelectedEstado(selectedOption.value);
  };
  const handlePlanesChange = (selectedOption) => {
    setSelectedPlan(selectedOption.value);
  };
  useEffect(() => { //effect hace funcionar este codigo
    handleSearch();
  }, [selectedEstado, selectedPlan]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/planes-de-pagos");
        setClientes(response.data);
        setOriginalData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const colorMap = {
    "pagado": "has-background-success",
    "pendiente": "has-background-warning has-text-black",
    "atrasado": "has-background-danger"
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
  const handleSearch = async () => {
    const nombre = searchString;
    const estado = selectedEstado;
    const plan = selectedPlan;

    if (nombre.length > 2 || estado || plan) {
      let url = "http://localhost:8000/planes-de-pagos?";

      if (nombre.length > 2) {
        url += `nombre=${nombre}`;
      }

      if (estado) {
        url += `${nombre.length > 2 ? "&" : ""}estado=${estado}`;
      }

      if (plan) {
        url += `${nombre.length > 2 || estado ? "&" : ""}plan=${plan}`;
      }

      console.log(url);

      try {
        const response = await api.get(url);
        setClientes(response.data);
      } catch (error) {
        console.log(error);
      }
      
    } else {
      console.log("Filtrado sin get");
      handleFilter("str_nombre_cliente", nombre);
    }
  };

  if (!clientes) {
    return <div className='title'>Cargando clientes...</div>;
  }

  return (
    <div className='is-flex is-flex-direction-column'>
      <div className="column is-flex mb-0 pb-0"
        style={{ gap: '10px' }}>
        <div
          style={{ width: "20rem" }}>
          <input
            className="input"
            type="text"
            placeholder="Buscar..."
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            onKeyUp={() => handleSearch()}
          />
        </div>
        <div className=''
          style={{ width: "20rem" }}>
          <Select
            options={estadosOptions}
            value={selectedEstado ? estadosOptions.find(option => option.value === selectedEstado) : null}
            onChange={handleEstadoChange}
            placeholder="Estado..."
          />
        </div>
        <div className=''
          style={{ width: "20rem" }}>
          <Select
            options={planesOptions}
            value={selectedPlan ? planesOptions.find(option => option.value === selectedPlan) : null}
            onChange={handlePlanesChange}
            placeholder="Planes..."
          />
        </div>
      </div>

      <div className='column is-flex is-justify-content-center m-0 p-0'>
        <table className="table table is-bordered tableNew has-background-light is-bordered"
          style={{ width: "100%" }}>
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
                  <td className='is-size-5'>
                    {cliente.str_modalidad //para poner en mayuscula
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')
                      }
                  </td>
                  <td className='is-size-5'>
                    <button className={` ${colorMap[cliente.estado_de_pago]} button is-static has-text-white`}>
                      {cliente.estado_de_pago
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')
                      }
                    </button>
                  </td>
                  <td className='is-size-5'>
                    <Link to={`/detallesCliente/${cliente.id_cliente}`}>
                      <button className="button is-link is-rounded">Ver Mas</button>
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
    </div>
  )
}