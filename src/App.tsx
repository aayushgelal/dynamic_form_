import React, { useEffect, useState } from "react";
import "./App.css";
import formSchema from "./form.json";
import { FormSelector } from "./components/FormSelector";
import { FormType } from "./types/Form";
import { DynamicForm } from "./components/DyanmicForm";

export default function App() {
  const [currentFormType, setCurrentFormType] =
    useState<FormType>("user_profile");

  const handleFormSubmit = (formData: any) => {
    console.log("Form Data:", formData);
    fetch(`https://mywebsite.example/${formSchema[currentFormType].url}/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <main>
      <FormSelector onFormTypeChange={setCurrentFormType} />
      <DynamicForm
        formType={currentFormType}
        formSchema={formSchema}
        onSubmit={handleFormSubmit}
      />
    </main>
  );
}
