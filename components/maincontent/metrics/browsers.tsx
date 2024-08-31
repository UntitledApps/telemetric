"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"; // Assuming you have a progress component

export function Browsers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Browsers</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src="/images/browsers/brave.png" // replace with actual path to Apple logo
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
            src="/images/browsers/chrome.png" // replace with actual path to Apple logo
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
            src="/images/browsers/edge.png" // replace with actual path to Apple logo
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
            src="/images/browsers/firefox.png" // replace with actual path to Apple logo
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
            src="/images/browsers/opera.png" // replace with actual path to Apple logo
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
            src="/images/browsers/safari.png" // replace with actual path to Apple logo
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
            src="/images/browsers/vivaldi.png" // replace with actual path to Apple logo
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
            src="/images/browsers/duckduckduckgobrowser.png" // replace with actual path to Apple logo
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
            src="/images/browsers/tor.png" // replace with actual path to Apple logo
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
            src="/images/browsers/samsung.png" // replace with actual path to Apple logo
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
