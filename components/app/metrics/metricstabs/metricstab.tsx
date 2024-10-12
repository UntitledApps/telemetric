import React, { useState } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Chart from "../charts/chart";
import "./metricstab.css";
interface Tab {
  label: string;
  activities: any[];
  count: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTabIndex?: number;
  onSelectedTabChanged?: (index: number) => void;
  selectedTimeRange: string;
  loading: boolean;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTabIndex = 0,
  onSelectedTabChanged,
  selectedTimeRange,
  loading,
}) => {
  const [activeIndex, setActiveIndex] = useState(activeTabIndex);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="tabs-container">
      <div className="tabs">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab ${activeIndex === index ? "active" : ""}`}
            onClick={() => {
              handleTabClick(index);
              if (onSelectedTabChanged) {
                onSelectedTabChanged(index);
              }
            }}
          >
            {tab.label}
            <p
              style={{
                fontSize: "35px",
                fontWeight: "600",
              }}
            >
              {loading ? (
                <Skeleton
                  baseColor="var(--subtitle)"
                  highlightColor="var(--secondary)"
                  width={50}
                />
              ) : (
                tab.count
              )}
            </p>
          </button>
        ))}
      </div>
      <div className="tab-content">
        <Chart
          activities={tabs[activeIndex].activities}
          selectedTimeRange={selectedTimeRange}
        />
      </div>
    </div>
  );
};

export default Tabs;
