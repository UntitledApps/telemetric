import React, { useState } from "react";

interface DropdownProps {
  label: string;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>{label}</button>
      {isOpen && (
        <div className="absolute bg-white border rounded shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
