"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { CATEGORIES_QUERYResult } from "@/sanity.types";

const HeaderMenu = ({ categories }: { categories: CATEGORIES_QUERYResult }) => {
  const pathname = usePathname();

  return (
    <div className="hidden md:inline-flex w-1/3 items-center gap-5 text-sm capitalize font-semibold text-gray-500">
      <Link
        href={`/`}
        className={`hover:text-black hoverEffect relative group ${
          pathname === `/` && ""
        }`}
      >
        Home
        <span
          className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-black hoverEffect group-hover:w-1/2 group-hover:left-0 
                ${pathname === `/` && "w-1/2"}`}
        />
        <span
          className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-black hoverEffect group-hover:w-1/2 group-hover:right-0
                ${pathname === `/` && "w-1/2"}`}
        />
      </Link>

      {categories?.map((category) => (
        <Link
          key={category?._id}
          href={`/Category/${category?.slug?.current}`}
          className={`hover:text-black hoverEffect relative group ${
            pathname === `/Category/${category?.slug?.current}` && ""
          }`}
        >
          {category?.title}
          <span
            className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-black hoverEffect group-hover:w-1/2 group-hover:left-0 
                ${pathname === `/Category/${category?.slug?.current}` && "w-1/2"}`}
          />
          <span
            className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-black hoverEffect group-hover:w-1/2 group-hover:right-0
                ${pathname === `/Category/${category?.slug?.current}` && "w-1/2"}`}
          />
        </Link>
      ))}
    </div>
  );
};

export default HeaderMenu;
