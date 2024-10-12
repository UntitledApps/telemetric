import React, { useState } from "react";
import "./locationtabs.css";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTabIndex?: number;
  onSelectedTabChanged?: (index: number) => void;
}

const LocationsTab: React.FC<TabsProps> = ({
  tabs,
  activeTabIndex = 0,
  onSelectedTabChanged,
}) => {
  const [activeIndex, setActiveIndex] = useState(activeTabIndex);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="locations-tabs-container">
      <div className="locations-tabs">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`locations-tab ${activeIndex === index ? "active" : ""}`}
            onClick={() => {
              handleTabClick(index);
              if (onSelectedTabChanged) {
                onSelectedTabChanged(index);
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="locations-tab-content">{tabs[activeIndex].content}</div>
    </div>
  );
};

export default LocationsTab;
