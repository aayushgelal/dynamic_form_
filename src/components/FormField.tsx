import { useEffect, useState } from "react";
import { FieldType } from "../types/Form";
import { CheckboxGroup } from "./InputTypes/CheckBox";
import { Select } from "./InputTypes/SelectProps";
import { TextArea } from "./InputTypes/TextArea";
import { TextInput } from "./InputTypes/TextInput";
import { validateField } from "../validation/validation";

interface FormFieldProps {
  options?: Array<string>;
  field: FieldType;
  errorExist?: (hasError: boolean) => void;
  onChange?: (value: any, error: string | null) => void;
}

export const FormField: React.FC<FormFieldProps> = ({
  options,
  field,
  errorExist,
  onChange,
}) => {
  const [value, setValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (errorExist && field.required) {
      errorExist(true);
    }
  }, []);

  const handleChange = (newValue: any) => {
    if (!field) return;

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

    if (errorExist) {
      errorExist(!!validationError);
    }

    if (onChange) {
      onChange(valueToSet, validationError);
    }
  };

  const renderField = () => {
    if (!field) return null;

    const commonProps = {
      id: field.id,
      value: value || "",
      error: error || field.validation?.errorMessage,
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
        return <TextInput {...commonProps} type={field.type as any} />;
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
