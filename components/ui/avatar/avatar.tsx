// Avatar.js
import { createClient } from "@/utils/supabase/client";
import { Avatar } from "@lemonsqueezy/wedges";
import { useEffect, useRef, useState } from "react";
import "./Avatar.css";

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

  return (
    <Avatar
      alt="Image alt text"
      src="https://images.unsplas.com/photo-1517841905240-472988babdf9?w=250&h=250&auto=format&fit=crop"
    />
  );
};

export default UserAccount;
