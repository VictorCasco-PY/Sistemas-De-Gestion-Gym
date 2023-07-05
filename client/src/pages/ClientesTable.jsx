import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import Select from 'react-select';
import api from '../services/api';
import CircularProgress from '@mui/material/CircularProgress';

const estadosOptions = [
  { value: '', label: 'Seleccione un estado' },
  { value: 'pagado', label: 'Pagado' },
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'atrasado', label: 'Atrasado' },
];
const planesOptions = [
  { value: '', label: 'Seleccione un plan' },
  { value: 'diario', label: 'Diario' },
  { value: 'semanal', label: 'Semanal' },
  { value: 'mensual', label: 'Mensual' },
];

export default function ClientesTable() {
  const [clientes, setClientes] = useState([]); //Guarda la tabla que se renderiza constantemente
  const [originalData, setOriginalData] = useState([]); //Guarda la tabla original que se trajo de la BD
  const [sortField, setSortField] = useState(""); //Por cual campo se va ordenar
  const [sortDirection, setSortDirection] = useState("asc"); //en que dirección
  const [searchString, setSearchString] = useState(""); //Que va incluir la busqueda? ej si incluye "an" //renderiza la tabla con clientes que contenga "an"
  const [selectedEstado, setSelectedEstado] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  //PAGINACION
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(10); // Number of clients per page

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

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
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
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

  const handleDeleteClient = async (cliente) => {
    Swal.fire({ //ALERTA DE BORRADO
      title: 'Confirmacion de borrado',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Borrado',
        )
        try {
          const response = await api.delete(`/planes-de-pagos/${cliente.id}`);
          setClientes((prevClientes) => prevClientes.filter((c) => c.id_cliente !== cliente.id));
          console.log(response)
        } catch (error) {
          console.log(error);
        }
      }
    })

  };

  // Calculate pagination indexes
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = sortedData.slice(indexOfFirstClient, indexOfLastClient);

  //CALCULAR NUMERO DE PAGINAS
  const totalClients = sortedData.length;
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalClients / clientsPerPage); i++) {
    pageNumber.push(i);
  }

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
      let url = "/planes-de-pagos?";

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
        setIsLoading(true);
        const response = await api.get(url);
        setClientes(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
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
    <div className='column is-flex is-flex-direction-column'>
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

      <div className='column is-flex is-justify-content-center is-flex-direction-column m-0 p-0'>
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
            {isLoading ? (
              <tr>
                <td><CircularProgress /></td>
                <td><CircularProgress /></td>
                <td><CircularProgress /></td>
                <td><CircularProgress /></td>
              </tr>
            ) : (
              currentClients.length > 0 ? (
                currentClients.map((cliente) => (
                  <tr key={cliente.id_cliente}>
                    <td className='is-size-5'>{cliente.str_nombre_cliente}</td>
                    <td className='is-size-5'>
                      {cliente.str_modalidad
                        .split(' ')
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}
                    </td>
                    <td className='is-size-5'>
                      <button className={` ${colorMap[cliente.estado_de_pago]} button is-static has-text-white`}>
                        {cliente.estado_de_pago
                          .split(' ')
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(' ')}
                      </button>
                    </td>
                    <td className='is-size-5 is-flex is-justify-content-center' style={{ width:'400px',gap: '8px' }}>
                      <Link to={`/detallesCliente/${cliente.id_cliente}`}>
                        <button className="button is-link is-rounded is-outlined">Ver Mas</button>
                      </Link>
                      <button className="button is-danger is-rounded is-outlined" onClick={() => handleDeleteClient(cliente)}>Borrar</button>
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
              )
            )}
          </tbody>
        </table>
        {/* Pagination */}
        <nav className="pagination is-centered" role="navigation">
          <ul className="pagination-list">
            {pageNumber.map((number) => (
              <li key={number}>
                <button
                  className={`pagination-link ${currentPage === number ? 'is-current' : ''
                    }`}
                  onClick={() => paginate(number)}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}