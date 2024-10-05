import { FieldType } from "../types/Form";

export const validateField = (value: any, field: FieldType): string | null => {
  console.log("here");

  if (!field.validation) return null;

  const { validation } = field;

  if (
    validation.required &&
    (!value || (typeof value === "string" && value.trim() === ""))
  ) {
    return validation.errorMessage || "This field is required";
  }

  if (typeof value === "string") {
    if (validation.minLength && value.length < validation.minLength) {
      return `Minimum length is ${validation.minLength} characters`;
    }
    if (validation.maxLength && value.length > validation.maxLength) {
      return `Maximum length is ${validation.maxLength} characters`;
    }
    if (validation.pattern && !new RegExp(validation.pattern).test(value)) {
      return validation.errorMessage || "Invalid format";
    }
  }

  return null;
};
