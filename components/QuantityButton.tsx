import { Product } from "@/sanity.types";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import useCartStore from "@/Store";
import toast from "react-hot-toast";
import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  product: Product;
  className?: string;
  borderStyle?: string;
}

const QuantityButtons = ({ product, className, borderStyle }: Props) => {
  const { addItem, getItemCount, removeItem } = useCartStore();
  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;

  const handleRemoveProduct = () => {
    removeItem(product?._id);
    if (itemCount > 1) {
      toast.success("Quantity Decrased Successfully");
    } else {
      toast.success(`${product?.name?.substring(0, 12)} Rmoved Successfully`);
    }
  };
  return (
    <div
      className={twMerge(
        "flex items-center  gap-1 text-base pb-1",
        borderStyle,
        className
      )}
    >
      <Button
        onClick={handleRemoveProduct}
        disabled={itemCount === 0 || isOutOfStock}
        variant="outline"
        size="icon"
        className="w-6 h-6"
      >
        <Minus />
      </Button>
      <span className="font-semibold w-8 text-center">{itemCount}</span>
      <Button
        onClick={() => {
          addItem(product);
          toast.success(
            `${product?.name?.substring(0, 12)}...added Succsfully!`
          );
        }}
        variant="outline"
        size="icon"
        className="w-6 h-6 cursor-pointer"
      >
        <Plus />
      </Button>
    </div>
  );
};

export default QuantityButtons;
