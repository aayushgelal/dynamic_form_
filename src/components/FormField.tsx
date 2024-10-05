import { FormFieldProps } from "../types/Form";
import { CheckboxGroup } from "./InputTypes/CheckBox";
import { Select } from "./InputTypes/SelectProps";
import { TextArea } from "./InputTypes/TextArea";
import { TextInput } from "./InputTypes/TextInput";

export const FormField: React.FC<FormFieldProps> = ({
  field,
  value,
  error,
  onFieldChange,
}) => {
  const handleChange = (newValue: any) => {
    onFieldChange(field.id, newValue);
  };

  const renderField = () => {
    const commonProps = {
      id: field.id,
      value,
      error,
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
        return <CheckboxGroup {...commonProps} options={field.options || []} />;
      default:
        return <TextInput {...commonProps} type={field.type} />;
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
