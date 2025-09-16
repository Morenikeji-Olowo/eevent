import React from 'react';


const FirstPage = ({ handleChange, value }) => {
  return (
    <div className='get-username'>
      <p>Set a username of your choice</p>
      <input
        placeholder='username...'
        type='text'
        onChange={handleChange}
        name='username'
        value={value}
      />
    </div>
  );
};

export default FirstPage;
