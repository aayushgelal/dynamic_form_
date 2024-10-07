import React, { useState, useEffect } from "react";
import { FormField } from "./FormField";
import { FieldType, FormType } from "../types/Form";
import { validateField } from "../validation/validation";

interface DynamicFormProps {
  formSchema: any;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ formSchema }) => {
  console.log(formSchema.fields);
  return (
    <form>
      {formSchema.fields!.map((field: any, index: any) => (
        <FormField key={index}  field={field} />
      ))}
    </form>
  );
};
