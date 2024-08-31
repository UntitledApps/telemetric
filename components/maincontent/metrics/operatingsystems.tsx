"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"; // Assuming you have a progress component

export function OperatingSystemCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Operating Systems</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src="/images/os/macos.png" // replace with actual path to Apple logo
            alt="Apple logo"
            className="w-6 h-6"
          />
          <span>iOS</span>
        </div>
        <div className="flex items-center gap-2">
          <Progress value={100} className="w-full max-w-[200px]" />
          <span className="font-medium">100%</span>
        </div>
      </CardContent>
      <CardContent className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src="/images/os/chromeos.png" // replace with actual path to Apple logo
            alt="Apple logo"
            className="w-6 h-6"
          />
          <span>iOS</span>
        </div>
        <div className="flex items-center gap-2">
          <Progress value={100} className="w-full max-w-[200px]" />
          <span className="font-medium">100%</span>
        </div>
      </CardContent>
      <CardContent className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src="/images/os/linux.png" // replace with actual path to Apple logo
            alt="Apple logo"
            className="w-6 h-6"
          />
          <span>iOS</span>
        </div>
        <div className="flex items-center gap-2">
          <Progress value={100} className="w-full max-w-[200px]" />
          <span className="font-medium">100%</span>
        </div>
      </CardContent>
      <CardContent className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src="/images/os/ios.png" // replace with actual path to Apple logo
            alt="Apple logo"
            className="w-6 h-6"
          />
          <span>iOS</span>
        </div>
        <div className="flex items-center gap-2">
          <Progress value={100} className="w-full max-w-[200px]" />
          <span className="font-medium">100%</span>
        </div>
      </CardContent>
      <CardContent className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src="/images/os/windows.png" // replace with actual path to Apple logo
            alt="Apple logo"
            className="w-6 h-6"
          />
          <span>iOS</span>
        </div>
        <div className="flex items-center gap-2">
          <Progress value={100} className="w-full max-w-[200px]" />
          <span className="font-medium">100%</span>
        </div>
      </CardContent>
      <CardContent className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src="/images/os/android.png" // replace with actual path to Apple logo
            alt="Apple logo"
            className="w-6 h-6"
          />
          <span>iOS</span>
        </div>
        <div className="flex items-center gap-2">
          <Progress value={100} className="w-full max-w-[200px]" />
          <span className="font-medium">100%</span>
        </div>
      </CardContent>
    </Card>
  );
}
