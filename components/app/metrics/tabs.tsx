import React, { useState } from "react";

interface Tab {
  label: string;
  content: React.ReactNode;
  count: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTabIndex?: number;
  onSelectedTabChanged?: (index: number) => void;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTabIndex = 0,
  onSelectedTabChanged,
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
                fontSize: "30px",
                fontWeight: "700",
              }}
            >
              {tab.count}
            </p>
          </button>
        ))}
      </div>
      <div className="tab-content">{tabs[activeIndex].content}</div>

      <style jsx>{`
        .tabs-container {
          display: flex;
          flex-direction: column;
          flex: 1;
          position: sticky;
          top: 0;
          z-index: 10;
          background-color: var(--on-dominant);
          height: 500px;
        }
        .tabs-count {
          font-size: 30px;
          font-weight: 700;
          color: var(--secondary);
        }
        .tabs-count.active {
          color: var(--accent);
        }

        .tabs {
          display: flex;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          border: 1px solid var(--outline);
        }
        .tab {
          width: 200px;
          max-width: 200px;
          text-align: start;
          font-size: 14px;
          align-items: start;
          justify-content: start;
          padding: 8px;
          display: flex;
          align-items: start;
          justify-content: start;
          flex-direction: column;
          gap: 4px;

          font-weight: 500;
          flex: 1;
          padding: 10px;
          background: var(--dominant);
          border: none;
          cursor: pointer;
          color: var(
            --unselected
          ); /* Use your unselected text color variable */
          transition: backgrounsd 0.3s, color 0.3s;

          text-color: var(--secondary);
          font-size: 16px;
          font-weight: 500;
        }
        .tab.active {
          border-bottom: 5px solid var(--secondary); /* Use your accent color variable */
          font-weight: bold;
          color: var(--secondary);

          text-color: var(--secondary);

          font-weight: 500;
          background: var(--on-dominant);
        }
        .tab-content {
          padding: 20px;
          background: var(
            --dominant
          ); /* Use your dominant background color variable */
        }
      `}</style>
    </div>
  );
};

export default Tabs;
