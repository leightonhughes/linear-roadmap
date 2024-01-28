import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen flex-col  bg-white">
          <div className="relative z-20 flex flex-col  justify-between  gap-4 py-6 shadow">
            <div className="container flex flex-col gap-2">
              <h1 className="text-lg font-semibold text-slate-700">
                <Link href="/">Roadmap</Link>
              </h1>

              <div className="flex gap-2">
                <Button variant="secondary" size="sm" asChild>
                  <Link href="/">List</Link>
                </Button>
                <Button variant="secondary" size="sm" asChild>
                  <Link href="/status">Status</Link>
                </Button>
                <Button variant="secondary" size="sm" asChild>
                  <Link href="/lead">Assigned</Link>
                </Button>
              </div>
            </div>
          </div>

          <ScrollArea>
            <div className="container mx-auto mt-8 flex flex-col gap-2 pb-4">
              {children}
            </div>
          </ScrollArea>
        </div>
      </body>
    </html>
  );
}
