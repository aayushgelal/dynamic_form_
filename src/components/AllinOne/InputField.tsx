import React, { useState, useEffect } from "react";
import { FieldType, FormType } from "../../types/Form";
import { validateField } from "../../validation/validation";
import formFields from "../../form.json";

interface InputFieldProps {
  id: string;
}

const InputField: React.FC<InputFieldProps> = ({ id }) => {
  const [field, setField] = useState<FieldType | null>(null);
  const [value, setValue] = useState<any>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const findFieldById = (id: string) => {
      for (const section in formFields) {
        console.log(section);
        if (formFields[section as FormType]) {
          const foundField = formFields[section as FormType].fields.find(
            (field: FieldType) => field.id === id,
          );
          if (foundField) return foundField;
        }
      }
      return null;
    };

    const fieldData = findFieldById(id);
    setField(fieldData);
  }, [id, formFields]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    let newValue: any = e.target.value;

    if (field?.type === "file") {
      newValue = e.target.files ? e.target.files[0] : null;
    }
    if (field?.type === "checkbox") {
      newValue = e.target.checked;
    }

    setValue(newValue);

    const validationError = validateField(newValue, field!);
    setError(validationError);
  };

  if (!field) {
    return <div>Field not found</div>;
  }

  return (
    <div>
      <label htmlFor={id}>{field.label}</label>

      {field.type === "textarea" && (
        <textarea
          id={id}
          placeholder={field.placeholder}
          value={value}
          onChange={handleChange}
        />
      )}
      {field.type === "checkbox" &&
        field.options?.map((option) => {
          return (
            <label key={option}>
              <input type="checkbox" value={option} onChange={handleChange} />
              {option}
            </label>
          );
        })}

      {field.type === "file" && (
        <input id={id} type="file" onChange={handleChange} />
      )}

      {/* {field.type !== "textarea" && field.type !== "file" && (
        <input
          id={id}
          type={field.type}
          placeholder={field.placeholder}
          value={value}
          onChange={handleChange}
        />
      )} */}

      {error && <span style={{ color: "red" }}>{error}</span>}
    </div>
  );
};

export default InputField;
