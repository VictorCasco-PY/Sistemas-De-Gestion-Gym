import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';

const AutoSuggest = ({ productList }) => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    // Método para obtener las sugerencias basadas en el valor de entrada
    const getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0
            ? []
            : productList.filter(
                (product) =>
                    product.str_codigo.toLowerCase().slice(0, inputLength) === inputValue ||
                    product.str_nombre.toLowerCase().slice(0, inputLength) === inputValue
            );
    };

    // Método para renderizar las sugerencias
    const renderSuggestion = (suggestion) => (
        <div>{`${suggestion.codigo} - ${suggestion.nombre}`}</div>
    );

    // Manejador de cambios en el valor de entrada
    const handleChange = (event, { newValue }) => {
        setValue(newValue);
    };

    // Manejador de selección de sugerencias
    const handleSuggestionSelected = (event, { suggestion }) => {
        console.log('Suggestion selected:', suggestion);
        // Aquí puedes realizar acciones adicionales según la sugerencia seleccionada
    };

    // Configuración del componente Autosuggest
    const autosuggestProps = {
        suggestions: suggestions,
        onSuggestionsFetchRequested: ({ value }) => {
            setSuggestions(getSuggestions(value));
        },
        onSuggestionsClearRequested: () => {
            setSuggestions([]);
        },
        getSuggestionValue: (suggestion) => `${suggestion.str_codigo} - ${suggestion.str_nombre}`,
        renderSuggestion: renderSuggestion,
        inputProps: {
            placeholder: 'Buscar producto',
            value: value,
            onChange: handleChange
        },
        onSuggestionSelected: handleSuggestionSelected
    };

    return (
        <Autosuggest {...autosuggestProps} />
    );
};

export default AutoSuggest;
