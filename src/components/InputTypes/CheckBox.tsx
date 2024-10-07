import { BaseFieldProps } from "../../types/Form";

interface CheckboxGroupProps extends BaseFieldProps {
  options: string[];
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  id,
  value,
  options,
}) => (
  <div>
    {options.map((option) => (
      <label key={option}>
        <input
          type="checkbox"
          value={option}
          checked={value?.includes(option)}
          onChange={(e) => {
            const newValue = value ? [...value] : [];
            if (e.target.checked) {
              newValue.push(option);
            } else {
              const index = newValue.indexOf(option);
              if (index > -1) {
                newValue.splice(index, 1);
              }
            }
            onChange(newValue);
          }}
        />
        {option}
      </label>
    ))}
  </div>
);
