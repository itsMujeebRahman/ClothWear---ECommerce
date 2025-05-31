import { cn } from "@/lib/utils";
import React from "react";
import Link from "next/link";

interface Props{
    children:React.ReactNode;
    className?: string;
}

const Logo = ({children, className }: Props) =>{
  return (
    <Link href={"/"}>
      <h2 className={cn("text-2xl text-black font-black tracking-wider uppercase", className)}>{children}</h2>
    </Link>
  );
};

export default Logo;
