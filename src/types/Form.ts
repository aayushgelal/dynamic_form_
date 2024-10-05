export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  errorMessage?: string;
}

export interface FieldType {
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  id: string;
  validation?: ValidationRule;
}

export interface FormFieldProps {
  field: FieldType;
  value: any;
  error?: string;
  onFieldChange: (name: string, value: any) => void;
}

export type FormType = "contact" | "job_app" | "user_profile";

export interface FormSelectorProps {
  selectedForm: FormType;
  onFormTypeChange: (formType: FormType) => void;
}
