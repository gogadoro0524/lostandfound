import SWRConfigContext from "@/context/SWRConfigContext";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lost&Found",
  description: "What did you lost?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SWRConfigContext>
        <body>{children}</body>
      </SWRConfigContext>
    </html>
  );
}
