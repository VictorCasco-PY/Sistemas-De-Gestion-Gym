import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import api from '../services/api';

function EditableInput({ valorInicial, id, apiUrl, campoCambiar, onValueChange }) {
  const [title, setTitle] = useState(valorInicial);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTitleBlur = async (event) => {
    const input = event.target;
    const currentValue = input.value.trim();

    const newItem = { [campoCambiar]: currentValue };

    try {
      const response = await api.put(`${apiUrl}/${id}`, newItem);
      console.log('Actualizado.');
      setTitle(currentValue); // Actualizar el estado local del título
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