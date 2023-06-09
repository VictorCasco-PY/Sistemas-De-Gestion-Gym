import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from "../services/api";
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2'
import Select from 'react-select';

export default function Compras() {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const inputRef = useRef(null);
  const [productos, setProductos] = useState([]);

  const [compraAceptado, setCompraAceptado] = useState(false);
  const [proveedorAceptado, setProveedorAceptado] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [proveedores, setProveedores] = useState([]);
  const [selectedProveedor, setSelectedProveedor] = useState(null);

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
    console.log(productos[0]);
  }, []);

  const options = proveedores.map((proveedor) => ({
    value: proveedor.id,
    label: proveedor.str_nombre,
  }));
  const handleProveedorChange = (selectedOption) => {
    setSelectedProveedor(selectedOption);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    setModalVisible(true);
  };

  const handleItemSelect = (item) => {
    setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    setSearchQuery('');
    setModalVisible(false);
  };

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
      id_proveedor: selectedProveedor ? selectedProveedor.value : null,
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
    <div className='is-serif'>
      <h1 className='title is-size-2'>Nueva Compra</h1>
      <div className='has-background-light p-3 columns container'>
        <div className='listaItems column'>
          <div className='mb-3'>

            <div className="proveedorTab mb-5">
              <header className='card-header has-background-info mb-3'>
                <p className='title is-3 has-text-light p-3'>Proveedor</p>
              </header>
              <div className='is-flex is-align-items-center'>
                <span className='mr-2'>*</span>
                <Select
                  options={options}
                  value={selectedProveedor}
                  className={`${proveedorAceptado ? 'is-danger' : ''}`}
                  onChange={handleProveedorChange}
                  placeholder={"Selecciona un proveedor"}
                />
                <span className='ml-2'>RUC: 111111</span>
              </div>
            </div>
            <header className='card-header has-background-info mb-3'>
              <p className='title is-3 has-text-light p-3'>Productos</p>
            </header>

            <Link className="custom-link" to="/registroProducto">
              <button className='button is-success is-outlined mb-3'>
                <AddIcon />Nuevo Producto
              </button>
            </Link>
            <div className="input-container">
              <input
                type='text'
                className={`input ${compraAceptado ? 'is-danger' : ''}`}
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
             {/*  //////// */}

                </div>
              )}
            </div>
          </div>
          <div className='itemsFlexOrGrid is-flex is-flex-direction-column'>
            {(selectedItems.length === 0) && (
              <div>No hay productos seleccionados.</div>
            )}
            <ol>
              {selectedItems.map((item, index) => (
                <li key={index}>
                  <div
                    key={index}
                    className='compraItem is-flex is-flex-direction-column mb-0'
                  >
                    <div className='compra-custom is-flex is-justify-content-space-between box p-0'>
                      <div className='has-background-light p-3'>
                        <h2 className='is-size-4'>
                          <b>{item.str_nombre}</b>
                        </h2>
                        <p>
                          <b>Descripcion:</b> {item.str_descripcion}
                        </p>
                        <div className='is-flex is-align-items-center'>
                          <p><b>Cantidad:</b></p>
                          <input
                            type='number'
                            name='cantidad'
                            id='cantidad'
                            className='input custom-number-input'
                            value={item.quantity}
                            onChange={(event) => handleQuantityChange(event, index)}
                          />
                        </div>
                      </div>
                      <div className='is-align-self-center p-3'>
                        <p className='title'>
                          {parseFloat(item.precio).toLocaleString('en-US', {
                            useGrouping: true,
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          })}Gs
                        </p>
                      </div>
                    </div>
                  </div>
                </li>

              ))}
            </ol>
          </div>
        </div>
        <div className='precioYOpciones column is-flex is-flex-direction-column'>
          <header className='card-header has-background-white has-text-black mb-3 column is-half p-0'>
            <p className='title is-3 has-text-black p-3'>Detalles</p>
          </header>
          <div className='box column is-half p-4 is-flex is-flex-direction-column'>
            <h2 className='subtitle mb-3'>Pago Total</h2>
            <div>
              <div className='is-flex is-justify-content-space-between'>
                <p className='subtitle mb-1'>Productos:</p>
                <p className='subtitle'>
                  {parseFloat(calculateTotal()).toLocaleString('en-US', {
                    useGrouping: true,
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })}Gs</p>
              </div>
              <div className='is-flex is-justify-content-space-between'>
                <h1 className='title'>Total:</h1>
                <p className='title'>{parseFloat(calculateTotal()).toLocaleString('en-US', {
                  useGrouping: true,
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}Gs</p>
              </div>
            </div>
            <div className='is-flex is-justify-content-space-between'>
              <div className=''>{isLoading && <CircularProgress />}</div>
              <button className='button is-success' onClick={handleSubmit}>
                Guardar
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
