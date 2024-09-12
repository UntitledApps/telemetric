import React from "react";

interface Props {
  // Define your component's props here
}

const DataExplorer: React.FC<Props> = (props) => {
  return (
    <div
      className="text-center p-4"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <h1 className="text-2xl font-bold">Coming Soon</h1>
      <p className="mt-2 text-lg text-gray-600">
        This feature is in planning. Submit your toughts in the discord
      </p>
    </div>
  );
};

export default DataExplorer;
