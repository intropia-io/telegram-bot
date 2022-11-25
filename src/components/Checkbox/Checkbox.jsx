import React, { useEffect, useState } from "react";
import "./Checkbox.css";

const Checkbox = ({
  label,
  hint,
  checked,
  icon,
  onChange,
  background,
  round,
  ...rest
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <div
      onClick={() => {
        onChange({ name: rest.name, checked: isChecked });
        setIsChecked((prev) => !prev);
      }}
      className={`checkbox-wrapper ${isChecked || background ? "checked" : ""}`}
    >
      <div className="labelWithIcon">
        {icon && <img src={icon} alt={label} />}
        <label>
          <input {...rest} type="checkbox" checked={checked} readOnly />
          <span>{label}</span>
          {hint && <span className="hint">{hint}</span>}
        </label>
      </div>

      <div
        className={`checkbox ${isChecked ? "checked" : ""} ${
          round ? "round" : ""
        }`}
      />
    </div>
  );
};

export default Checkbox;
