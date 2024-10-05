import React from "react";
import { FieldType, BaseFieldProps } from "../../types/Form";

interface TextInputProps extends BaseFieldProps {
  type: "text" | "email" | "password" | "number";
}

export const TextInput: React.FC<TextInputProps> = ({
  id,
  type,
  value,
  error,
  placeholder,
  required,
  onChange,
}) => (
  <input
    type={type}
    id={id}
    value={value || ""}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    required={required}
    className={error ? "error-input" : ""}
  />
);





