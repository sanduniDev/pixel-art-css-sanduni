import React from 'react';

const RadioSelector = ({ name, selected, legend, options, change }) => {
  const availableOptions = ops =>
    ops.map(item => (
      <label key={item.id} htmlFor={`${name}-${item.labelFor}`}>
        <input
          type="radio"
          value={item.value}
          name={name}
          id={`${name}-${item.labelFor}`}
          onChange={() => change(item.value, name)}
          checked={selected === item.value}
        />
        <span>{item.description}</span>
      </label>
    ));

  return (
    <fieldset className="radio-selector">
      {legend && <legend>{legend}</legend>}
      {options && options.length > 0 ? (
        availableOptions(options)
      ) : (
        <p>No options available</p>
      )}
    </fieldset>
  );
};

export default RadioSelector;
