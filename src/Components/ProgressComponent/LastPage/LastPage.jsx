import React from 'react';
import './LastPage.css';

const LastPage = ({ handleFileChange, pfp }) => {
  return (
    <div className='get-pfp'>
      <p>Profile Picture</p>
      <label className="file-box">
        <span>{pfp ? pfp.name : 'Click to upload or drag your image here'}</span>
        <input
          type="file"
          onChange={handleFileChange}
          name="pfp"
          accept="image/*"
        />
      </label>
      {pfp && (
        <img
          src={URL.createObjectURL(pfp)}
          alt="preview"
          style={{ width: '80px', height: '80px', marginTop: '10px', borderRadius: '50%' }}
        />
      )}
    </div>
  );
};

export default LastPage;
