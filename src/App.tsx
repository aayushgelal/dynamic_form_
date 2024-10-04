import { useEffect, useState } from "react";
import "./App.css";
import formSchema from "./form.json";

interface fieldType {
  type: string;
  label: string;
  required: boolean;
  placeholder: string;
}
type FormType = "contact" | "job_app" | "user_profile";

export default function App() {
  const [selectedForm, setSelectedForm] = useState<FormType>("user_profile");

  const [form, setForm] = useState<any>();
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    setForm(formSchema.user_profile);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFormSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedForm(value as FormType);
    setForm(formSchema[value as FormType]);
  };
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(`https://mywebsite.example/${form.url}/`, {
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
      <div>
        <label htmlFor="formSelect">Select Form:</label>
        <select
          id="formSelect"
          value={selectedForm}
          onChange={handleFormSelect}
        >
          <option value="contact">Contact</option>
          <option value="user_profile">User Profile</option>
          <option value="job_app">Job</option>
        </select>
      </div>
      <form onSubmit={onSubmit}>
        {form?.fields.map((field: fieldType, index: number) => (
          <div key={index}>
            <label>{field.label}</label>
            <input
              type={field.type}
              name={field.label}
              placeholder={field.placeholder}
              required={field.required}
              onChange={handleInputChange}
            />
          </div>
        ))}
        <input type="submit" value="Submit" />
      </form>
    </main>
  );
}
