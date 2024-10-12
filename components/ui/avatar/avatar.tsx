// Avatar.js
import { createClient } from "@/utils/supabase/client";

import { useEffect, useRef, useState } from "react";
import "./avatar.css";

const UserAccount = ({ onClick }: { onClick?: () => void }) => {
  // {{ edit_1 }}
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

  return <div>{avatarLetter}</div>;
};

export default UserAccount;
