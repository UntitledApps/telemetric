import { createClient } from "@supabase/supabase-js";
import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google"; // {{ edit_1 }}

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const lora = Lora({ subsets: ["latin"] });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
export const metadata: Metadata = {
  title: "Telemetric",
  description:
    "Telemetric is a privacy-focused analytics platform for your apps, web apps, and websites. Tired of all the mediocre analytics platforms out there? Telemetric is here to change that.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
