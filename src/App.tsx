import { useEffect, useState } from "react";
import "./App.css";
import formSchema from "./form.json";

interface FieldType {
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: Record<string, string>;
}
type FormType = "contact" | "job_app" | "user_profile";

export default function App() {
  const [selectedForm, setSelectedForm] = useState<FormType>("user_profile");
  const [form, setForm] = useState<any>();
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    setForm(formSchema[selectedForm]);
  }, [selectedForm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData: any) => {
      if (type === "checkbox") {
        const updatedData = { ...prevData, [name]: "" };
        if (checked) {
          updatedData[name] = value;
        }
        return updatedData;
      } else if (type === "file") {
        return {
          ...prevData,
          [name]: e.target.files ? e.target.files[0] : null,
        };
      } else {
        return { ...prevData, [name]: value };
      }
    });
  };

  const handleFormSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedForm(value as FormType);
    setForm(formSchema[value as FormType]);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
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
          <option value="job_app">Job Application</option>
        </select>
      </div>
      <form onSubmit={onSubmit}>
        {form?.fields.map((field: FieldType, index: number) => (
          <div key={index}>
            <label>{field.label}</label>
            {field.type === "checkbox" && field.options ? (
              field.options.map((value: string, index: number) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    name={field.label}
                    value={value}
                    checked={formData[field.label] === value}
                    required={field.required}
                    onChange={handleInputChange}
                  />
                  <label>{value}</label>
                </div>
              ))
            ) : field.type === "file" ? (
              <input
                type="file"
                name={field.label}
                required={field.required}
                onChange={handleInputChange}
              />
            ) : (
              <input
                type={field.type}
                name={field.label}
                placeholder={field.placeholder}
                required={field.required}
                onChange={handleInputChange}
              />
            )}
          </div>
        ))}
        <input type="submit" value="Submit" />
      </form>
    </main>
  );
}
