import React, { useState } from 'react';

export default function Compras() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleItemSelect = (item) => {
    setSelectedItems([...selectedItems, item]);
    setSearchQuery('');
  };

  return (
    <div>
      <h1 className='title'>Compras</h1>
      <div className='has-background-light p-3 columns container'>
        <div className='listaItems column'>
          <div className='mb-3'>
            <input
              type='text'
              className='input'
              placeholder='Buscar item...'
              value={searchQuery}
              onChange={handleInputChange}
            />
          </div>
          {/* Modal to show matching items */}
          {searchQuery && (
            <div className='modal'>
              {/* Render items matching search query */}
              {/* Each item should have an onClick handler to add it to selectedItems */}
            </div>
          )}
          <div className='itemFlexOrGrid is-flex is-flex-direction-column'>
            {/* Render selected items */}
            {selectedItems.map((item, index) => (
              <div key={index} className='compraItem box is-flex is-flex-direction-column mb-1'>
                {/* Display item information */}
              </div>
            ))}
          </div>
        </div>
        <div className='precioYOpciones column'>
          <div className='box column is-two-fifths p-4 is-flex is-flex-direction-column'>
            <h2 className='subtitle mb-3'>Pago Total</h2>
            <div>
              {/* Calculate and display product total */}
              <div className='is-flex'>
                <p className='subtitle mb-1'>Productos:</p>
                <p className='subtitle'>$100</p>
              </div>
              {/* Calculate and display total */}
              <div className='is-flex'>
                <h1 className='title'>Total:</h1>
                <p className='title'>$100</p>
              </div>
            </div>
            <div className='is-align-self-flex-end'>
              <button className='button is-success'>Comprar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
