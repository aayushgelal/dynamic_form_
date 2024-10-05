import React, { useState } from "react";
import { FormFieldProps } from "../types/Form";

export const FormField: React.FC<FormFieldProps> = ({
  field,
  onFieldChange,
}) => {
  const [fieldValue, setFieldValue] = useState<any>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;
    let newValue: any;

    if (type === "checkbox") {
      newValue = checked ? value : "";
    } else if (type === "file") {
      newValue = files ? files[0] : null;
    } else {
      newValue = value;
    }

    setFieldValue(newValue);
    onFieldChange(name, newValue);
  };

  if (field.type === "checkbox" && field.options) {
    return (
      <div>
        <label>{field.label}</label>
        {field.options.map((value: string, index: number) => (
          <div key={index}>
            <input
              type="checkbox"
              name={field.label}
              value={value}
              checked={fieldValue === value}
              required={field.required}
              onChange={handleInputChange}
            />
            <label>{value}</label>
          </div>
        ))}
      </div>
    );
  }

  if (field.type === "file") {
    return (
      <div>
        <label>{field.label}</label>
        <input
          type="file"
          name={field.label}
          required={field.required}
          onChange={handleInputChange}
        />
      </div>
    );
  }

  return (
    <div>
      <label>{field.label}</label>
      <input
        type={field.type}
        name={field.label}
        value={fieldValue}
        placeholder={field.placeholder}
        required={field.required}
        onChange={handleInputChange}
      />
    </div>
  );
};
