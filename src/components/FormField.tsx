import React from "react";
import { FieldType } from "../types/Form";

interface FormFieldProps {
  field: FieldType;
  value: any;
  error?: string;
  onFieldChange: (fieldId: string, value: any) => void;
}

export const FormField: React.FC<FormFieldProps> = ({
  field,
  value,
  error,
  onFieldChange,
}) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    if (field.type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      onFieldChange(field.id, checkbox.checked);
    } else {
      onFieldChange(field.id, e.target.value);
    }
  };

  const renderField = () => {
    switch (field.type) {
      case "textarea":
        return (
          <textarea
            id={field.id}
            value={value || ""}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            className={error ? "error-input" : ""}
          />
        );
      case "select":
        return (
          <select
            id={field.id}
            value={value || ""}
            onChange={handleChange}
            required={field.required}
            className={error ? "error-input" : ""}
          >
            <option value="">Select...</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "checkbox":
        return (
          <div>
            {field.options?.map((option) => (
              <label key={option}>
                <input
                  type="checkbox"
                  value={option}
                  checked={value?.includes(option)}
                  onChange={(e) => {
                    const newValue = value ? [...value] : [];
                    if (e.target.checked) {
                      newValue.push(option);
                    } else {
                      const index = newValue.indexOf(option);
                      if (index > -1) {
                        newValue.splice(index, 1);
                      }
                    }
                    onFieldChange(field.id, newValue);
                  }}
                />
                {option}
              </label>
            ))}
          </div>
        );
      default:
        return (
          <input
            type={field.type}
            id={field.id}
            value={value || ""}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            className={error ? "error-input" : ""}
          />
        );
    }
  };

  return (
    <div className="form-field">
      <label htmlFor={field.id}>{field.label}</label>
      {renderField()}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};
