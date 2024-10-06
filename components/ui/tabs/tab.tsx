import Link from "next/link";
import React from "react";
import "./navbar.css";
interface NavItem {
  icon: React.ReactNode;
  text: string;
}

interface NavSection {
  header: string;
  items: NavItem[];
}

interface NavbarProps {
  sections: NavSection[];
  onDestinationSelected: (index: number) => void;
  selectedIndex: number;
}

export const Tab: React.FC<NavbarProps> = ({
  sections,
  onDestinationSelected,
  selectedIndex,
}) => {
  return (
    <nav className="navbar">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="nav-section">
          <h3>{section.header}</h3>
          {section.items.map((item, itemIndex) => {
            const globalIndex = sectionIndex * section.items.length + itemIndex;
            return (
              <Link
                key={globalIndex}
                href="#"
                onClick={() => {
                  onDestinationSelected(globalIndex);
                }}
                className={`nav-item ${
                  selectedIndex === globalIndex ? "active" : ""
                }`}
              >
                {item.icon}
                <span className="nav-text">{item.text}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
};
