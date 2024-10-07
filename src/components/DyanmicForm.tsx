import React, { useState, useEffect } from "react";
import { FormField } from "./FormField";
import { FieldType, FormType } from "../types/Form";
import { validateField } from "../validation/validation";

interface DynamicFormProps {
  formType: FormType;
  formSchema: any;
  onSubmit: (formData: any) => void;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  formType,
  formSchema,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentForm, setCurrentForm] = useState<any>(null);

  useEffect(() => {
    setCurrentForm(formSchema[formType]);
    setFormData({});
    setErrors({});
  }, [formType, formSchema]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    currentForm.fields.forEach((field: FieldType) => {
      const error = validateField(formData[field.id], field);
      if (error) {
        console.log("err");
        newErrors[field.id] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldId]: value,
    }));

    const field = currentForm.fields.find((f: FieldType) => f.id === fieldId);
    if (field) {
      const error = validateField(value, field);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldId]: error || "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  if (!currentForm) return null;

  return (
    <form onSubmit={handleSubmit}>
      {currentForm.fields.map((field: FieldType) => (
        <FormField
          key={field.id}
          field={field}
          value={formData[field.id]}
          error={errors[field.id]}
          onFieldChange={handleFieldChange}
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};
