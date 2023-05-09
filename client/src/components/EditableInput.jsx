import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditableInput({ defaultValue, id, apiUrl, campoCambiar }) { //UTILIZAR EL TERCER PARAMETRO
  const [title, setTitle] = useState(defaultValue);

  const handleTitleChange = (event) => {
    setTitle(event.target.value.trim());
  };

  useEffect(() => {
    axios.get(`${apiUrl}/${id}`)
      .then(response => setTitle(response.data.str_nombre))
      .catch(error => console.error(error));
  }, [id, apiUrl]);

  const handleTitleBlur = () => {
    const newItem = { str_nombre: title }; //ARREGLAR ESTO
    axios.put(`${apiUrl}/${id}`, newItem)
      .then(() => console.log('Title updated successfully'))
      .catch((error) => console.error(error));
  };

  const handleTitleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleTitleBlur();
    }
  };

  return (
    <input
      type="text"
      className="input subtitle editable-title"
      value={title}
      onChange={handleTitleChange}
      onBlur={handleTitleBlur}
      onKeyDown={handleTitleKeyDown}
    />
  );
}

export default EditableInput;