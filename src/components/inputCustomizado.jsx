import React from 'react';

const InputCustomizado = props => {
  const { label, type, name, value, onChange } = props;
  return (
    <div className='pure-control-group'>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputCustomizado;
