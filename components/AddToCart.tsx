"use Client";
import React from "react";
import { Product } from "@/sanity.types";
import { cn } from "@/lib/utils";
import QuantityButtons from "./QuantityButton";
import PriceFormatter from "./PriceFormatter";
import { Button } from "./ui/button";
import useCartStore from "@/Store";
import toast from "react-hot-toast";


interface Props {
  product: Product;
  className?: string;
}

const AddToCart = ({ product, className }: Props) => {
  const { addItem, getItemCount } = useCartStore();
  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;
  return (
    <div className="w-full h-12 flex items-center">
      {itemCount ? (
        <div className="w-full text-sm ">
          <div className="flex item-center justify-between">
            <span className="text-xs text-muted-foreground">Quantity</span>
            <QuantityButtons product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">Subtotal</span>
            <PriceFormatter
              amount={product?.price ? product?.price * itemCount : 0}
            />
          </div>
        </div>
      ) : (
        <Button
          onClick={() => {
            addItem(product);
            toast.success(
              `${product?.name?.substring(0, 12)}...added Succsfully!`
            );
          }}
          disabled={isOutOfStock}
          className={cn(
            "w-full bg-transparent text-black shadow-none border border-black/30 font-semibold tracking-wide hover:text-white cursor-pointer hoverEffect",
            className
          )}
        >
          Add to Cart
        </Button>
      )}
    </div>
  );
};

export default AddToCart;
