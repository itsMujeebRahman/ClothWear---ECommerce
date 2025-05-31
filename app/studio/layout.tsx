import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ClothWearBackend",
  description: "Created by Next Js",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
