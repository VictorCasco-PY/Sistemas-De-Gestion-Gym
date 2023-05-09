import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function EditableInput({ defaultValue, id, apiUrl, campoCambiar }) { //UTILIZAR EL TERCER PARAMETRO
  const [title, setTitle] = useState(defaultValue);
  const inputRef = useRef(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value.trim());
  };

  useEffect(() => {
    axios.get(`${apiUrl}/${id}`)
      .then(response => setTitle(response.data.str_nombre))
      .catch(error => console.error(error));
  }, [id, apiUrl]);

  const handleTitleBlur = (event) => {
    const input = event.target;
    const currentValue = input.value.trim();

    const newItem = { ...title, str_nombre: currentValue };
    axios.put(`${apiUrl}/${id}`, newItem)
      .then(() => console.log('Title updated successfully'))
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
      className="input subtitle editable-title"
      value={title}
      onChange={handleTitleChange}
      onBlur={handleTitleBlur}
      onKeyDown={handleTitleKeyDown}
    />
  );
}

export default EditableInput;