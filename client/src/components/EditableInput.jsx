import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import api from '../services/api';

function EditableInput({ valorInicial, id, apiUrl, campoCambiar, onValueChange }) { //UTILIZAR EL CUARTO PARAMETRO
  const [title, setTitle] = useState(valorInicial);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  useEffect(() => {
    axios.get(`${apiUrl}/${id}`)
      .then(response => setTitle(response.data[campoCambiar]))
      .catch(error => console.error(error));
  }, [id, apiUrl]);

  const handleTitleBlur = async (event) => {
    const input = event.target;
    const currentValue = input.value.trim();

    const newItem = { [campoCambiar]: currentValue };
    //ERROR 404 NO SE POR QUE
    input.blur();
    try {
      const response = await api.put(`${apiUrl}/${id}`, newItem);
      console.log('Actualizado.');
      onValueChange(currentValue); // Llamar a la función onValueChange con el nuevo valor
    } catch (error) {
      console.log(error);
    }
    
  };

  const handleTitleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleTitleBlur(event);
    }
  };

  return (
    <input
      type="text"
      className="editable-title"
      value={title}
      onChange={handleTitleChange}
      onBlur={handleTitleBlur}
      onKeyDown={handleTitleKeyDown}
    />
  );
}

export default EditableInput;