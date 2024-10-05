import React, { useState, useEffect } from "react";
import { FieldType } from "../types/Form";
import { FormField } from "./FormField";

interface DynamicFormProps {
  formType: string;
  formSchema: any;
  onSubmit: (formData: any) => void;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  formType,
  formSchema,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<any>({});
  const [currentForm, setCurrentForm] = useState<any>(null);

  useEffect(() => {
    setCurrentForm(formSchema[formType]);
    setFormData({}); // form data reset huncha
  }, [formType, formSchema]);

  const handleFieldChange = (name: string, value: any) => {
    setFormData((prevData:any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!currentForm) return null;

  return (
    <form onSubmit={handleSubmit}>
      {currentForm.fields.map((field: FieldType, index: number) => (
        <FormField
          key={index}
          field={field}
          onFieldChange={handleFieldChange}
        />
      ))}
      <input type="submit" value="Submit" />
    </form>
  );
};
