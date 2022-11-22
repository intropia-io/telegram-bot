import React, { useState } from "react";
import "./Checkbox.css";

const Checkbox = ({ label, hint, checked, icon, onChange, ...rest }) => {
  const defaultChecked = checked ? checked : false;
  const [isChecked, setIsChecked] = useState(defaultChecked);

  return (
    <div
      onClick={() => {
        setIsChecked((prev) => !prev);
        onChange({ name: rest.name, checked: isChecked });
      }}
      className="checkbox-wrapper"
    >
      <div className="labelWithIcon">
        {icon && <img src={icon} alt={label} />}
        <label>
          <input {...rest} type="checkbox" checked={isChecked} readOnly />
          <span>{label}</span>
          {hint && <span className="hint">{hint}</span>}
        </label>
      </div>

      <div className={`checkbox ${isChecked ? "checked" : ""}`} />
    </div>
  );
};

export default Checkbox;
