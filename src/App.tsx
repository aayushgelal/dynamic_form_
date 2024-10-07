import React, { useEffect, useState } from "react";
import "./App.css";
import formSchema from "./form.json";
import { FormSelector } from "./components/FormSelector";
import { FormType } from "./types/Form";
import { DynamicForm } from "./components/DyanmicForm";
import { MyForm } from "./components/IndividualForm";
import InputField from "./components/AllinOne/InputField";
import { FormField } from "./components/FormField";

export default function App() {
  // const handleFormSubmit = (formData: any) => {
  //   console.log("Form Data:", formData);
  //   fetch(`https://mywebsite.example/${formSchema[currentFormType].url}/`, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(formData),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Success:", data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  return (
    <main>

      <DynamicForm formSchema={formSchema["contact"]} />
      <FormField
        field={formSchema.contact.fields.find(
          (field: any) => field.id === "name",
        )}
      />

    </main>
  );
}
