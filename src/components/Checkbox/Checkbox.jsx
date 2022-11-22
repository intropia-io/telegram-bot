import React, { useState } from 'react';
import './Checkbox.css';

const Checkbox = ({label, hint, checked, ...rest}) => {
    const defaultChecked = checked ? checked : false;
    const [isChecked, setIsChecked] = useState(defaultChecked);

    return (
        <div onClick={() => setIsChecked((prev) => !prev)} className="checkbox-wrapper">
        <label>
          <input {...rest} type="checkbox" checked={isChecked} />
          <span>{label}</span>
        </label>
      </div>
    );
};

export default Checkbox;