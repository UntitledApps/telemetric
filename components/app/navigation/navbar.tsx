import { Project, SelectedNavItem } from "@/types";

import Avatar from "@/components/ui/avatar/avatar";
import Image from "next/image";
import ProjectSelect from "./projectselect";

interface HeaderProps {
  projects: Project[];
  hasLoaded: boolean;
  onProjectChange: (value: string) => void;
  selectedProject: Project;
  onDestinationSelected: (navItem: SelectedNavItem) => void; // Change type to SelectedNavItem
  selectedIndex: SelectedNavItem; // Change type to SelectedNavItem
}

export function Navbar({
  selectedProject,
  onDestinationSelected,
  selectedIndex,
  projects,
  onProjectChange,
  hasLoaded,
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
        position: "sticky",
        top: 0,
        zIndex: 1000,

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
          borderRadius: "0px",
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
        <ProjectSelect
          projects={projects}
          selectedProject={selectedProject!}
          onProjectChange={onProjectChange}
          hasLoaded={hasLoaded}
        />
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
