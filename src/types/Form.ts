export interface FieldType {
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
}

export interface FormFieldProps {
  field: FieldType;
  onFieldChange: (name: string, value: any) => void;
}

export type FormType = "contact" | "job_app" | "user_profile";

export interface FormSelectorProps {
  onFormTypeChange: (formType: FormType) => void;
}
