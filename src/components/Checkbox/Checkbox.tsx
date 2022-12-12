import React, { useEffect, useState } from "react";
import "./Checkbox.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string | null;
  background?: boolean;
  round?: boolean;
  hint?: string | null;
  label: string;
  onDataChange?: (name: string, checked: boolean) => void;
}

const Checkbox: React.FC<Props> = ({
  icon,
  background,
  round,
  hint,
  label,
  onDataChange,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(!!props.checked);
  }, [props.checked]);

  return (
    <div
      onClick={() => {
        onDataChange && onDataChange(props.name!, !isChecked);
        !round && setIsChecked((prev) => !prev);
      }}
      className={`checkbox-wrapper ${isChecked || background ? "checked" : ""}`}
    >
      <div className="labelWithIcon">
        {icon && <img src={icon} alt={label} />}
        <label>
          <input {...props} type="checkbox" readOnly />
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
