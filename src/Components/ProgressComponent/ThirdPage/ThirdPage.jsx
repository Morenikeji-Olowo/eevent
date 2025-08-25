import React from 'react';
import './ThirdPage.css';

const ThirdPage = ({ handleChange, value }) => {
  return (
    <div className="get-bio">
      <p>Describe yourself</p>
      <input
        placeholder="Say something about yourself..."
        type="text"
        onChange={handleChange}
        name="bio"
        value={value}
      />
    </div>
  );
};

export default ThirdPage;
