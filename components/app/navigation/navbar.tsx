"use client";

import { Project, SelectedNavItem } from "@/types";

import Avatar from "@/components/ui/avatar/avatar";
import Image from "next/image";

interface HeaderProps {
  selectedProject: Project | null;
  onDestinationSelected: (navItem: SelectedNavItem) => void; // Change type to SelectedNavItem
  selectedIndex: SelectedNavItem; // Change type to SelectedNavItem
}

export function Navbar({
  selectedProject,
  onDestinationSelected,
  selectedIndex,
}: HeaderProps) {
  // Check if the selected project has a metadata type of 'app'
  const showEnvironmentSelect = selectedProject?.type === "app";

  return (
    <header
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        flex: "1",

        gap: "8px",
        width: "100%",
        backgroundColor: "var(--on-dominant)",
        borderBottom: "1px solid var(--outline)",
        color: "var(--text-primary)",
        padding: "8px",
        height: "100%",
      }}
    >
      <Image
        src="/images/logo.png"
        alt="Logo"
        style={{
          borderRadius: "12px",
          border: "2px solid #DAEBFD",
          cursor: "pointer",
          boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.06)",
        }}
        onClick={() => {
          onDestinationSelected(SelectedNavItem.PROJECTS);
        }}
        width={30}
        height={30}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "start",
          flex: "1",
          gap: "8px",
          padding: "8px",
        }}
      >
        <select
          style={{
            padding: "4px 8px",
            borderRadius: "4px",
            border: "1px solid #e5e5e5",
            backgroundColor: "white",
            fontSize: "14px",
            cursor: "pointer",

            color: "#333",
          }}
          onChange={(e) =>
            onDestinationSelected(e.target.value as SelectedNavItem)
          }
          value={selectedIndex}
        >
          <option value={SelectedNavItem.PROJECTS}>Projects</option>
          <option value={SelectedNavItem.METRICS}>Metrics</option>
          <option value={SelectedNavItem.ACCOUNT}>Account</option>
        </select>
      </div>
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          width: "100%",
        }}
      ></div>

      {/* <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">
                <MessageCircle className="mr-2 h-4 w-4" />
                Feedback
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-46">
              <DropdownMenuItem
                onClick={() =>
                  window.open("https://x.com/i/communities/1834566987483082773")
                }
              >
                <Image
                  src="/images/x.svg"
                  alt="X"
                  className="mr-2 h-4 w-4"
                  width={16}
                  height={16}
                />
                In the X Community
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => window.open("mailto:team@untitledapps.net")}
              >
                <Mail className="mr-2 h-4 w-4" />
                Per E-Mail
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
      {/* </Dialog>
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">Support/Help</Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-46">
              <DropdownMenuItem
                onClick={() =>
                  window.open(
                    "https://x.com/messages/compose?recipient_id=1680911613988073473"
                  )
                }
              >
                <Image
                  src="/images/x.svg"
                  alt="X"
                  className="mr-2 h-4 w-4"
                  width={16}
                  height={16}
                />
                Send me an DM on X
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => window.open("mailto:team@untitledapps.net")}
              >
                <Mail className="mr-2 h-4 w-4" />
                Per E-Mail
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Dialog> */}

      <Avatar
        onClick={() => {
          onDestinationSelected(SelectedNavItem.ACCOUNT);
        }}
      />
    </header>
  );
}
