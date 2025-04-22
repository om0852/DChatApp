import React from 'react';
import Style from './Error.module.css';

const Error = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className={Style.error}>
      <p>{message}</p>
    </div>
  );
};

export default Error;
