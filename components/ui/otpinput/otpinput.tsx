import React, { useState } from "react";
import "./OtpInput.css";

interface OtpInputProps {
  length: number; // Number of OTP digits
  onChange: (otp: string) => void; // Callback to handle OTP change
}

const OtpInput: React.FC<OtpInputProps> = ({ length, onChange }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    // Move to the next input if the current one is filled
    if (value && index < length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }

    setOtp(newOtp);
    onChange(newOtp.join(""));
  };

  return (
    <div className="otp-input-container">
      {otp.map((value, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type="text"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(e.target.value, index)}
          className="otp-input"
        />
      ))}
    </div>
  );
};

export default OtpInput;
