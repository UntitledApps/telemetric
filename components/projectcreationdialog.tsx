import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@radix-ui/react-label";
import React from "react";
import { Input } from "./ui/input";

const ProjectCreationDialog: React.FC = () => {
  // Implement your component logic here

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create a New Project</DialogTitle>
        <DialogDescription>
          Fill in the details to create a new project.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div>
          <Label htmlFor="project-name" className="text-right">
            Project Name
          </Label>
          <Input
            id="project-name"
            placeholder="Enter project name"
            className="col-span-3"
          />
          <p className="text-sm text-gray-500">Can be changed later.</p>
        </div>
        <div
          style={{
                      gap: "10px",
                      display: "flex",
                      flexDirection: "column",
                        alignItems: "flex-start",
          }}
        >
          <Label htmlFor="project-type" className="text-right">
            Project Type
          </Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">App</SelectItem>
                <SelectItem value="banana">Website/Webapp</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <HoverCard>
                      <HoverCardTrigger style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                          cursor: "pointer",
                          fontSize: "12px",
                        textDecoration: "underline",
                      }}>
                          What to choose?</HoverCardTrigger>
            <HoverCardContent>
              <p className="text-sm text-gray-500">
                <br />
                For Mobile Apps made with React Native, Flutter or Native
                iOS/Android select App.
                <br /> <br />
                For Websites or Webapps select Website/Webapp. An example of an
                web app would be a Next JS or Gatsby JS project.
                <br /> <br />
                If your project has both a mobile app and a website/webapp, for
                example if your app is built using Flutter, create two seperate
                projects.
              </p>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Create Project</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default ProjectCreationDialog;
