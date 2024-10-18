

import { Project, SelectedNavItem } from "@/types";

// import { logout } from "@/app/dashboard/auth/actions";
// import { Avatar, AvatarFallback } from "@/components/shadcn/avatar";
// import { Button } from "@/components/shadcn/button";
// import { Dialog } from "@/components/shadcn/dialog";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/shadcn/dropdown-menu";
// import { Project, SelectedNavItem } from "@/types";
// import { createClient } from "@/utils/supabase/client"; // Adjust the import path as necessary
// import { CircleUserRound, Ellipsis, Link, LogOut } from "lucide-react";
// import { useEffect, useState } from "react";
// import { AccountDialog } from "../account/accountdialog";

interface NavigationProps {
  selectedNavItem: SelectedNavItem;
  handleNavItemClick: (navItem: SelectedNavItem) => void;
  handleProjectChange: (projectId: string) => void;
  projects: Project[];
  selectedProject: Project | null;
}

export function UserProfile({ handleNavItemClick }: NavigationProps) {
  //   const [userEmail, setUserEmail] = useState<string | null>(null);
  //   const [initials, setInitials] = useState<string>("");
  //   useEffect(() => {
  //     async function fetchUser() {
  //       const supabase = createClient();
  //       const { data, error } = await supabase.auth.getUser();
  //       if (data?.user?.email) {
  //         setUserEmail(data.user.email);
  //         const emailInitials = data.user.email
  //           .split("@")[0]
  //           .split(".")
  //           .map((name) => name[0])
  //           .join("")
  //           .toUpperCase();
  //         setInitials(emailInitials);
  //       }
  //     }
  //     fetchUser();
  //   }, []);
  //   return (
  //     <Dialog>
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button
  //             variant="ghost"
  //             className="flex h-14 items-center   gap-3 mx-4  px-2"
  //           >
  //             <Avatar>
  //               <AvatarFallback>U</AvatarFallback>
  //             </Avatar>
  //             <p className="text-muted-foreground text-sm font-medium overflow-hidden text-ellipsis whitespace-nowrap flex-1">
  //               {userEmail}
  //             </p>
  //             <Ellipsis className="h-4 w-4 text-muted-foreground" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="start" className="w-60">
  //           <DropdownMenuItem
  //             onClick={() => {
  //               window.open(
  //                 "https://telemetric.untitledapps.net?showHomePage=true",
  //                 "_blank"
  //               );
  //             }}
  //             style={{ gap: "5px" }}
  //           >
  //             <Link className="h-4 w-4" />
  //             Homepage
  //           </DropdownMenuItem>
  //           <DropdownMenuItem
  //             onClick={() => {
  //               handleNavItemClick(SelectedNavItem.PROFILE);
  //             }}
  //             style={{ gap: "5px" }}
  //           >
  //             <CircleUserRound className="h-4 w-4" />
  //             Profile
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem
  //             onClick={() => {
  //               logout();
  //             }}
  //             style={{ gap: "5px" }}
  //           >
  //             <LogOut className="h-4 w-4" />
  //             Logout
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //       <AccountDialog />
  //     </Dialog>
  //   );
}
