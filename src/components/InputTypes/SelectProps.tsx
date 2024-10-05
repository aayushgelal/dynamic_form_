import { BaseFieldProps } from "../../types/Form";

interface SelectProps extends BaseFieldProps {
  options: string[];
}

export const Select: React.FC<SelectProps> = ({
  id,
  value,
  error,
  required,
  options,
  onChange,
}) => (
  <select
    id={id}
    value={value || ""}
    onChange={(e) => onChange(e.target.value)}
    required={required}
    className={error ? "error-input" : ""}
  >
    <option value="">Select...</option>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);
