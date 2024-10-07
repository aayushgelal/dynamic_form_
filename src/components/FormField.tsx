import { useEffect, useState } from "react";
import { FieldType } from "../types/Form";
import { CheckboxGroup } from "./InputTypes/CheckBox";
import { Select } from "./InputTypes/SelectProps";
import { TextArea } from "./InputTypes/TextArea";
import { TextInput } from "./InputTypes/TextInput";
import { validateField } from "../validation/validation";
import formFields from "../form.json";

export const FormField: React.FC<{ id: string; options?: Array<string> }> = ({
  id,
  options,
}) => {
  const [field, setField] = useState<FieldType | null>(null);
  const [value, setValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const findFieldById = (id: string) => {
      const foundField = formFields["contact"].fields.find(
        (field: FieldType) => field.id === id,
      );
      return foundField || null;
    };

    const fieldData = findFieldById(id);
    setField(fieldData);
  }, [id]);

    const handleChange = (newValue: any) => {
      if (field) {
        let valueToSet = newValue;

        if (field.type === "checkbox") {
          valueToSet = newValue.target.checked;
        } else if (field.type === "file") {
          valueToSet = newValue.target.files;
        } else if (field.type === "text") {
          valueToSet = newValue.target.value;
        }

        setValue(valueToSet);

        const validationError = validateField(valueToSet, field);
        setError(validationError);
      }
    };
  

  const renderField = () => {
    if (!field) return null;

    const commonProps = {
      id: field.id,
      value: value || "",
      error: field.validation?.errorMessage,
      placeholder: field.placeholder,
      required: field.required,
      onChange: handleChange,
    };

    switch (field.type) {
      case "textarea":
        return <TextArea {...commonProps} />;
      case "select":
        return <Select {...commonProps} options={field.options || []} />;
      case "checkbox":
        return <CheckboxGroup {...commonProps} options={options!} />;
      default:
        return <TextInput {...commonProps} type={field.type} />;
    }
  };

  if (!field) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-field">
      <label htmlFor={field.id}>{field.label}</label>
      {renderField()}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};
