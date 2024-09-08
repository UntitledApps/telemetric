"use client";

import { logout } from "@/app/login/actions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/client"; // Adjust the import path as necessary
import { Headset, LogOut, Mail, Settings } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { AccountDialog } from "./accountdialog";

export function AccountWidget() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [initials, setInitials] = useState<string>("");

  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();

      if (data?.user?.email) {
        setUserEmail(data.user.email);
        const emailInitials = data.user.email
          .split("@")[0]
          .split(".")
          .map((name) => name[0])
          .join("")
          .toUpperCase();
        setInitials(emailInitials);
      }
    }

    fetchUser();
  }, []);

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Avatar>
              <AvatarFallback
                style={{
                  backgroundColor: "#000000",
                  color: "#ffffff",
                }}
              >
                {initials || "??"}
              </AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <DialogTrigger
              style={{
                gap: "5px",
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Settings className="h-4 w-4" /> Settings
            </DialogTrigger>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Headset className="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  style={{ gap: "5px" }}
                  onClick={() => {
                    window.open("mailto:team@untitledapps.net", "_blank");
                  }}
                >
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  style={{ gap: "5px" }}
                  onClick={() => {
                    window.open("https://x.com/CarlosDev33", "_blank");
                  }}
                >
                  <Image
                    src="/images/x.svg"
                    alt="Message"
                    width={12}
                    height={12}
                  />
                  <span>DM me on X</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              logout();
            }}
            style={{ gap: "5px" }}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AccountDialog />
    </Dialog>
  );
}
