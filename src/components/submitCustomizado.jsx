import React from 'react';

const SubmitCustomizado = props => {
  const { label } = props;
  return (
    <div className='pure-control-group'>
      <label></label>
      <button type='submit' className='pure-button pure-button-primary'>
        {label}
      </button>
    </div>
  );
};

export default SubmitCustomizado;
