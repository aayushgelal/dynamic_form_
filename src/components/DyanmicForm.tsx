import React, { useState, useEffect } from "react";
import { FieldType } from "../types/Form";
import { FormField } from "./FormField";

interface DynamicFormProps {
  formSchema: any;
}

type ErrorState = {
  [key: string]: boolean;
};

type FormDataState = {
  [key: string]: string | boolean | File[] | null;
};

export const DynamicForm: React.FC<DynamicFormProps> = ({ formSchema }) => {
  const [fieldErrors, setFieldErrors] = useState<ErrorState>(() => {
    const initialErrors: ErrorState = {};
    formSchema.fields.forEach((field: FieldType) => {
      if (field.required) {
        initialErrors[field.id] = true;
      }
    });
    return initialErrors;
  });

  const [formData, setFormData] = useState<FormDataState>({});

  const handleFieldError = (fieldId: string, hasError: boolean) => {
    setFieldErrors((prev) => ({
      ...prev,
      [fieldId]: hasError,
    }));
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const hasAnyError = Object.values(fieldErrors).some((error) => error);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasAnyError) {
      const formDataToSend = new FormData();

  
      try {
        const response = await fetch(
          `https://mywebsite.example/${formSchema.url}/`,
          {
            method: "POST",
            body: formDataToSend, // Send FormData instead of JSON
          },
        );

        const data = await response.json();
        console.log("Success:", data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {formSchema.fields!.map((field: FieldType, index: number) => (
        <FormField
          key={field.id || index}
          field={field}
          errorExist={(hasError) => handleFieldError(field.id, hasError)}
          onChange={(value) => handleFieldChange(field.id, value)}
        />
      ))}
      <button type="submit" disabled={hasAnyError}>
        Submit
      </button>
    </form>
  );
};
