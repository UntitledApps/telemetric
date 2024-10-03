// Avatar.js
import { createClient } from "@/utils/supabase/client";
import { useEffect, useRef, useState } from "react";
import "./Avatar.css";

const Avatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createClient();

  const toggleOverlay = () => {
    setIsOpen(!isOpen);
  };

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const avatarLetter = userEmail ? userEmail[0].toUpperCase() : "U";
  const overlayRef = useRef<HTMLDivElement>(null); // {{ edit_1 }}

  return (
    <div className="avatar-container">
      <div className="avatar" onClick={toggleOverlay}>
        <p>{avatarLetter}</p>
      </div>
      {isOpen && (
        <div className="overlay" ref={overlayRef}>
          <div className="overlay-content">
            <h3>Untitled Apps</h3>
            <p>{userEmail}</p>
            <ul>
              <li>Dashboard</li>
              <li>Account Settings</li>
              <li>Create Team</li>
              <li>Command Menu</li>
              <li>Theme</li>
              <li>Home Page</li>
              <li>Log Out</li>
            </ul>
            <button className="upgrade-button">Upgrade to Pro</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
