import React, { useEffect, useState } from "react";
import "./App.css";
import formSchema from "./form.json";

import { DynamicForm } from "./components/DyanmicForm";

import { FormField } from "./components/FormField";

export default function App() {
  return (
    <main>
      <DynamicForm formSchema={formSchema["contact"]} />
      <FormField field={formSchema.contact.fields[0]} />
    </main>
  );
}
