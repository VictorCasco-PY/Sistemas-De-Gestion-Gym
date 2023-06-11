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
      <div className='column has-background-light p-3 is-three-quarters-desktop'>
        <div className='listaItems column'>
          <div className='mb-3'>

            <div className="proveedorTab mb-5 is-flex is-align-content-center">
              <p className='is-3 subtitle m-0'>Proveedor</p>
              <div className='is-flex is-align-items-center'>
                <span className='mr-2'>*</span>
                <Select
                  options={options}
                  value={selectedProveedor}
                  className={`${proveedorAceptado ? 'is-danger' : ''}`}
                  onChange={handleProveedorChange}
                  placeholder={"Selecciona un proveedor"}
                />
              </div>
            </div>
          </div>

        </div>

        <div className='precioYOpciones columns column is-flex is-flex-direction-column'>
          <div className="input-container is-flex is-flex-grow-5">
            <div>
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
            <Link className="custom-link" to="/registroProducto">
              <button className='button is-success is-outlined mb-3'>
                <AddIcon />Nuevo Producto
              </button>
            </Link>
          </div>

          <div className='itemsFlexOrGrid columns is-flex'>

            <div className='column is-flex is-justify-content-center is-flex-direction-column m-0 p-0'>
              {(selectedItems.length === 0) && (
                <div>No hay productos seleccionados.</div>
              )}
              <table className="table table is-bordered tableNew has-background-light is-bordered">
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
                    <th ></th>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


            <div className='box column p-4 is-flex is-flex-direction-column is-align-self-flex-start'>
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
    </div>
  );
}
