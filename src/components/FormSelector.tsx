import React, { useState } from "react";
import { FormSelectorProps, FormType } from "../types/Form";

export const FormSelector: React.FC<FormSelectorProps> = ({
  onFormTypeChange,
}) => {
  const [selectedForm, setSelectedForm] = useState<FormType>("user_profile");

  const handleFormSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFormType = e.target.value as FormType;
    setSelectedForm(newFormType);
    onFormTypeChange(newFormType);
  };

  return (
    <div>
      <label htmlFor="formSelect">Select Form:</label>
      <select id="formSelect" value={selectedForm} onChange={handleFormSelect}>
        <option value="contact">Contact</option>
        <option value="user_profile">User Profile</option>
        <option value="job_app">Job Application</option>
      </select>
    </div>
  );
};
