import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function EditableInputTwoValues({ valorInicial, id, apiUrl, campoCambiar,
                                                id2, apiUrl2, campoCambiar2 }) { //UTILIZAR EL CUARTO PARAMETRO
  const [title, setTitle] = useState(valorInicial);

  const handleTitleChange = (event) => {
    setTitle(event.target.value.trim());
  };

  useEffect(() => {
    axios.get(`${apiUrl}/${id}`)
      .then(response => setTitle(response.data[campoCambiar]))
      .catch(error => console.error(error));
  }, [id, apiUrl]);

  const handleTitleBlur = (event) => {
    const input = event.target;
    const currentValue = input.value.trim();

    const newItem = { [campoCambiar]: currentValue };
    //ERROR 404 no se por que
    axios.put(`${apiUrl}/${id}`, newItem)  //PUT PARA MODIFICAR
      .then(() => console.log('Actualizado valor 1'))
      .catch((error) => console.error(error));

      input.blur();

    const newItem2 = { [campoCambiar2]: currentValue };
    axios.put(`${apiUrl2}/${id2}`, newItem2)  //PUT PARA MODIFICAR
      .then(() => console.log('Actualizado valor 2'))
      .catch((error) => console.error(error));

      input.blur();
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

export default EditableInputTwoValues;