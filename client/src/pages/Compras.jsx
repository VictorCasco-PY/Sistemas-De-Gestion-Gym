import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from "../services/api";
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2'
import DeleteIcon from '@mui/icons-material/Delete';

export default function Compras() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalProveedorVisible, setModalProveedorVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [proveedorSearchQuery, setProveedorSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const inputRef = useRef(null);
  const [productos, setProductos] = useState([]);

  const [compraAceptado, setCompraAceptado] = useState(false);
  const [proveedorAceptado, setProveedorAceptado] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [proveedores, setProveedores] = useState([]);
  const [selectedProveedor, setSelectedProveedor] = useState(null);

  const [emailProveedor, setEmailProveedor] = useState('');
  const [telefonoProveedor, setTelefonoProveedor] = useState('');
  const [RUCProveedor, setRUCProveedor] = useState('');
  const [direccionProveedor, setDireccionProveedor] = useState('');

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await api.get("/productos");
        setProductos(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchProveedores = async () => {
      try {
        const response = await api.get('/proveedores');
        setProveedores(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductos();
    fetchProveedores();
  }, []);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    setModalVisible(true);
  };

  const handleProveedorInputChange = (event) => {
    setProveedorSearchQuery(event.target.value);
    setModalProveedorVisible(true);
  };

  const handleItemSelect = (item) => {
    setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    setSearchQuery('');
    setModalVisible(false);
  };

  const handleProveedorSelect = (item) => {
    setSelectedProveedor(item);
    setProveedorSearchQuery(item.str_nombre);
    setModalProveedorVisible(false);
  };
  const updateProveedorInfo = () => {
    console.log(selectedProveedor);
    setEmailProveedor(selectedProveedor?.str_correo || '');
    setTelefonoProveedor(selectedProveedor?.str_telefono || '');
    setRUCProveedor(selectedProveedor?.str_ruc || '');
    setDireccionProveedor(selectedProveedor?.str_direccion || '');
  };
  useEffect(() => {
    updateProveedorInfo();
  }, [selectedProveedor]);

  const handleBlur = () => {
    //blur deja de seleccionar el input
    setTimeout(() => {
      if (
        !document.activeElement.classList.contains('itemResult') &&
        !inputRef.current.contains(document.activeElement)
      ) {
        setModalVisible(false);
      }
    }, 0);
  };

  const handleMouseDown = (event) => {
    //Esto soluciona el error de hacer click en un item y de repente blur
    event.preventDefault();
  };

  const handleQuantityChange = (event, index) => {
    const updatedItems = [...selectedItems];
    updatedItems[index].quantity = parseInt(event.target.value, 10);
    setSelectedItems(updatedItems);
  };

  const calculateTotal = () => {
    return selectedItems.reduce(
      (total, item) => total + item.precio * item.quantity,
      0
    );
  };

  const handleSubmit = async () => {
    if (selectedItems.length === 0) { //si el carrito esta vacio
      setCompraAceptado(true);
      return;
    }

    if (!selectedProveedor) { //si no hay proveedor
      setProveedorAceptado(true);
      return;
    }

    const cargaDeCompras = {
      id_proveedor: selectedProveedor ? selectedProveedor.id : null,
      total: calculateTotal(),
      detalles: {
        productos: selectedItems.map((item) => ({
          id: item.id,
          subtotal: item.precio * item.quantity,
          cantidad: item.quantity,
          precio: item.precio,
          iva: item.iva,
        })),
      },
    };

    try {
      setIsLoading(true);
      const response = await api.post("/compras", cargaDeCompras);
      console.log(response.data);
      setIsLoading(false);
      setSearchQuery('');
      setSelectedItems([]);
      Swal.fire({
        title: 'Compra Realizada',
        cancelButtonColor: '',
        confirmButtonText: 'Aceptar',
      })
      setCompraAceptado(false);
      setProveedorAceptado(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='is-serif is-flex is-flex-direction-column'>
      <h1 className='title is-size-2'>Nueva Compra</h1>
      <hr />
      <div className='column has-background-light p-5 is-flex'
        style={{ border: "1px solid #D4D4D4", borderRadius: "8px", maxWidth:"1100px"}}>
        <div className='listaItems column '>
          <div className='is-flex mb-6'>
            <div className="proveedorTab mb-5 is-flex is-align-content-center">
              <p className='is-3 subtitle m-0 mr-5'>Proveedor</p>
              <div className='is-flex is-flex-direction-column'
                style={{ "gap": "10px" }}>
                <div className='is-flex is-flex-direction-column'>
                  <input
                    type='text'
                    className={`input input-radius placeholder-black ${proveedorAceptado ? 'is-danger' : ''}`}
                    style={{ backgroundColor: "#D4D4D4", color: "black", textAlign: "center" }}
                    placeholder='Selecciona un proveedor'
                    value={proveedorSearchQuery}
                    onChange={handleProveedorInputChange}
                    onBlur={handleBlur}
                    ref={inputRef}
                  />
                  {/* ESTE ES EL MODAL QUE SE MUESTRA AL BUSCAR EN EL INPUT */}
                  {modalProveedorVisible && (
                    <div className='modal-custom-2'>
                      {/* renderizar el modal con los productos buscados */}
                      {proveedores
                        .filter((item) =>
                          item.str_nombre.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((item, index) => (
                          <div
                            key={index}
                            className='itemResult'
                            onMouseDown={handleMouseDown}
                            onClick={() => handleProveedorSelect(item)}
                          >
                            <div className='is-flex is-flex-direction-column'>
                              <p>{item.str_nombre}</p>
                              <p>{item.str_ruc}</p>
                            </div>
                            <hr className='itemSeparator m-0 mb-1' />
                          </div>
                        ))}
                    </div>
                  )}
                </div>
                {/*  //////// */}

                <fieldset disabled>
                  <div className='is-flex'
                    style={{ "gap": "10px" }}>
                    <input
                      type="text"
                      className="input input-radius"
                      placeholder="Telefono"
                      style={{ backgroundColor: "#D4D4D4", color: "black" }}
                      value={telefonoProveedor || ''}
                      readOnly
                    />
                    <input
                      type="text"
                      className="input input-radius"
                      placeholder="Email"
                      style={{ backgroundColor: "#D4D4D4", color: "black" }}
                      value={emailProveedor || ''}
                      readOnly
                    />
                  </div>
                </fieldset>

              </div>
            </div>
          </div>

          <div className='precioYOpciones columns column is-flex is-flex-direction-column'>
            <div className="input-container is-flex column m-0 p-0"
              style={{ gap: "1.5rem" }}>
              <div className='is-flex-grow-1 ml-5'>
                <input
                  type='text'
                  className={`input input-radius ${compraAceptado ? 'is-danger' : ''}`}
                  style={{ backgroundColor: "#D4D4D4", color: "black", textAlign: "center" }}
                  placeholder='Buscar item...'
                  value={searchQuery}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  ref={inputRef}
                />
                {/* ESTE ES EL MODAL QUE SE MUESTRA AL BUSCAR EN EL INPUT */}
                {modalVisible && (
                  <div className='modal-custom'>
                    {/* renderizar el modal con los productos buscados */}
                    {productos
                      .filter((item) =>
                        item.str_nombre.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((item, index) => (
                        <div
                          key={index}
                          className='itemResult'
                          onMouseDown={handleMouseDown}
                          onClick={() => handleItemSelect(item)}
                        >
                          <div className='is-flex is-justify-content-space-between'>
                            <div>
                              <p>{item.str_nombre}</p>
                              <p>{item.str_descripcion}</p>
                            </div>
                            <p>
                              {parseFloat(item.precio).toLocaleString('en-US', {
                                useGrouping: true,
                                minimumFractionDigits: 0,
                              })}Gs
                            </p>
                          </div>
                          <hr className='itemSeparator m-0 mb-1' />
                        </div>
                      ))}
                  </div>
                )}
                {/*  //////// */}

              </div>
              <Link className="custom-link" to="/registroProducto">
                <button className='button is-success is-outlined mb-3'>
                  <AddIcon />Nuevo Producto
                </button>
              </Link>
            </div>

            <div className='column is-flex is-justify-content-center is-flex-direction-column m-0 p-0'>

              <table className="table is-bordered tableNew has-background-light is-bordered">
                <thead className='has-text-centered'>
                  <tr className='is-size-6'>
                    <th >
                      Producto
                    </th>
                    <th >
                      Descripcion
                    </th>
                    <th >
                      Precio
                    </th>
                    <th >
                      Cantidad
                    </th>
                    <th >

                    </th>
                  </tr>
                </thead>
                <tbody>

                  {selectedItems.map((item, index) => (
                    <tr key={index}>
                      <td className='is-size-5'>{item.str_nombre}</td>
                      <td className='is-size-5'>{item.str_descripcion}</td>
                      <td className='is-size-5'>{parseFloat(item.precio).toLocaleString('en-US', {
                        useGrouping: true,
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      })}Gs</td>
                      <td className='is-size-5'>
                        <input
                          type='number'
                          name='cantidad'
                          id='cantidad'
                          className='input custom-number-input'
                          value={item.quantity}
                          onChange={(event) => handleQuantityChange(event, index)}
                        />
                      </td>
                      <td>
                        <button
                          className="button icon-button is-danger is-small is-outlined is-rounded"

                        >
                          <DeleteIcon fontSize="string" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {(selectedItems.length === 0) && (
                <div className=''>
                  No hay productos seleccionados.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='column p-4 is-flex is-flex-direction-column is-align-self-flex-start'
          style={{ maxWidth: "300px" }}>

          <div className='is-flex is-flex-direction-column'>
            <p className='subtitle m-0'>Detalles del Proveedor</p>
            <fieldset disabled>
              <input
                type="text"
                className="input input-radius"
                placeholder="RUC"
                style={{ backgroundColor: "#D4D4D4", color: "black" }}
                value={RUCProveedor || ''}
                readOnly
              />
              <input
                type="text"
                className="input input-radius"
                placeholder="Direccion"
                style={{ backgroundColor: "#D4D4D4", color: "black" }}
                value={direccionProveedor || ''}
                readOnly
              />
            </fieldset>
          </div>

          <div className='is-flex is-flex-direction-column box mt-6'>
            <div className=' mb-2 is-flex is-flex-direction-column'>
              <h1 className='title m-2'>Total:</h1>
              <button className='button is-danger is-outlined is-static'>
                <p className="is-size-4">
                  {parseFloat(calculateTotal()).toLocaleString('en-US', {
                    useGrouping: true,
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })}Gs
                </p>
              </button>
            </div>

            <button className='button is-success' onClick={handleSubmit}>
              Guardar
            </button>
            <div className='is-flex is-align-items-center is-justify-content-center'>{isLoading && <CircularProgress />}</div>
          </div>

        </div>
      </div>
    </div>
  );
}
