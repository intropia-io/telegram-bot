import React from 'react';
import './Checkbox.css';

const Checkbox = ({label, hint, ...rest}) => {
    return (
        <div className="checkbox-wrapper">
        <label>
          <input {...rest} type="checkbox" />
          <span>{label}</span>
        </label>
      </div>
    );
};

export default Checkbox;