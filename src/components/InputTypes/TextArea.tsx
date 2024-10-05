import React, { useState } from "react";
import { BaseFieldProps } from "../../types/Form";

type TextAreaProps = Omit<BaseFieldProps, "type">;

export const TextArea: React.FC<TextAreaProps> = ({
  id,
  value,
  error,
  placeholder,
  required,
  onChange,
}) => (
  <textarea
    id={id}
    value={value || ""}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    required={required}
    className={error ? "error-input" : ""}
  />
);
