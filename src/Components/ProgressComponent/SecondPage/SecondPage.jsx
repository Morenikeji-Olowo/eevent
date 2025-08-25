import React from 'react';
import './SecondPage.css';

const SecondPage = ({ handleChange, value }) => {
  return (
    <div className='get-displayName'>
      <p>Set a display name</p>
      <input
        placeholder='eg. fineshyt122...'
        type='text'
        onChange={handleChange}
        name='displayName'
        value={value}
      />
    </div>
  );
};

export default SecondPage;
