import { productType } from "@/Constants";
import React from "react";
import { Button } from "./ui/button";
import { Repeat } from "lucide-react";

interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const ProductTab = ({ selectedTab, onTabSelect }: Props) => {
  return (
    <div className="flex items-center justify-center gap-1.5 text-sm font-semibold">
      <div className="flex item-center gap-1.5">
        {productType?.map((item) => (
          <Button
            key={item?.title}
            onClick={() => onTabSelect(item.title)}
            className={`relative overflow-hidden px-5 py-4.5 rounded-full bg-white text-black border-2 border-solid font-medium group
            ${selectedTab === item?.title && "bg-black text-white"}`}
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              {item?.title}
            </span>
            <span
              className="absolute inset-0 bg-black text-white scale-0 group-hover:scale-100 transition-transform 
            duration-300 ease-out origin-center rounded-lg"
            />
          </Button>
        ))}
      </div>
      <button className="border-2 border-solid rounded-full hover:text-white hover:bg-black hoverEffect p-2">
        <Repeat className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ProductTab;
