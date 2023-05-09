import React, { useState } from 'react';
import axios from 'axios';

function EditableTitle({ item, list }) {
  const [title, setTitle] = useState(item.title);

  const handleTitleChange = (event) => {
    setTitle(event.target.value.trim());
  };

  const handleTitleBlur = () => {
    const newItem = { ...item, title };
    axios.put(`/lists/${list.id}/todos/${item.id}`, newItem)
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

export default EditableTitle;