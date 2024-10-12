import React from "react";
import "./dialog.css"; // Optional: Add your styles here

interface DialogProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ onClose, children }) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
