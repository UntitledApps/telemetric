import React from "react";

interface LoadingIndicatorProps {
  color?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  color = "black",
}) => {
  return (
    <div className="loading-indicator">
      <div className="dot" style={{ backgroundColor: color }}></div>
      <div className="dot" style={{ backgroundColor: color }}></div>
      <div className="dot" style={{ backgroundColor: color }}></div>
    </div>
  );
};

export default LoadingIndicator;
