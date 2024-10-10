import * as React from "react";
import "./select.css";

interface SelectProps {
  options: string[]; // Array of option values
  itemNames: string[]; // Array of corresponding display names
  selectedOption: string | null; // Currently selected option
  onOptionChange: (value: string) => void; // Callback for option change
}

const Select: React.FC<SelectProps> = ({
  options,
  itemNames,
  selectedOption,
  onOptionChange,
}) => {
  return (
    <select
      value={selectedOption || ""} // Set the selected value
      onChange={(e) => onOptionChange(e.target.value)}
      className="select"
    >
      {options.map((option, index) => (
        <option key={option} value={option}>
          {itemNames[index]} {/* Display corresponding name */}
        </option>
      ))}
    </select>
  );
};

export default Select;
