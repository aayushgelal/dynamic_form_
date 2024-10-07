import { useState } from "react";
import { CheckboxGroup } from "./InputTypes/CheckBox";
import { Select } from "./InputTypes/SelectProps";
import { TextArea } from "./InputTypes/TextArea";
import { TextInput } from "./InputTypes/TextInput";

export const MyForm: React.FC = () => {
  const [value, setValue] = useState("");
  const handleChange = (e: any) => {
    setValue(e);
  };

  return (
    <div>
      <TextInput
        id="email"
        type="email"
        value={value}
        onChange={handleChange}
        placeholder="Enter your email"
        required
      />

      <TextArea
        id="description"
        value=""
        onChange={handleChange}
        placeholder="Enter description"
      />

      <Select
        id="country"
        value=""
        options={["USA", "Canada", "UK"]}
        onChange={handleChange}
      />

      <CheckboxGroup
        id="interests"
        value={[]}
        options={["Sports", "Music", "Travel"]}
        onChange={handleChange}
      />
    </div>
  );
};
