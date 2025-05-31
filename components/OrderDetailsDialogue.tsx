import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import { FC } from "react";
import { Button } from "./ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import PriceFormatter from "./PriceFormatter";
import Link from "next/link";

interface Props {
  order: MY_ORDERS_QUERYResult[number] | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailsDialogue: FC<Props> = ({ order, isOpen, onClose }) => {
  if (!order) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-4xl !max-h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Order Details - {order?.orderNumber}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-1">
          <p>
            <strong>Customer:</strong> {order?.customerName}
          </p>
          <p>
            <strong>Email:</strong> {order?.email}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {order?.orderDate &&
              new Date(order?.orderDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="capitalize text-green-600 font-medium">
              {order.status}
            </span>
          </p>
          <p>
            <strong>Invoice Number:</strong> {order?.invoice?.number}
          </p>
          {order?.invoice && (
            <Button
              className="bg-transparent border text-black/80 mt-2 hover:text-black hover:border-black hover:bg-black/10 hoverEffect "
              variant="outline"
            >
              {order?.invoice?.hosted_invoice_url && (
                <Link href={order?.invoice?.hosted_invoice_url} target="blank">
                  Download Invoice
                </Link>
              )}
            </Button>
          )}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order?.products?.map((product, index) => (
              <TableRow key={index}>
                <TableCell className="flex items-center gap-2">
                  {product?.product?.images && (
                    <Image
                      src={urlFor(product?.product?.images[0]).url()}
                      alt="ProductImage"
                      width={50}
                      height={50}
                      className="border rounded-sm w-14 h-14 object-contain"
                    />
                  )}
                  {product?.product && (
                    <p className="line-clamp-1">{product?.product?.name}</p>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {product.quantity}
                </TableCell>
                {product?.product?.price && product?.quantity && (
                  <TableCell>
                    <PriceFormatter
                      amount={product?.product?.price * product?.quantity}
                      className="text-black font-medium"
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 text-right flex items-center justify-end">
          <div className="w-44 flex flex-col gap-1">
            
            {order?.amountDiscount !== 0 && (
              <div className="flex items-center justify-between w-full">
                <strong>SubTotal </strong>
                <PriceFormatter
                  amount={
                    (order?.totalPrice as number) +
                    (order?.amountDiscount as number)
                  }
                />
              </div>
            )}

            {order?.amountDiscount! == 0 && (
              <div className="flex items-center justify-between w-full">
                <strong>Discount</strong>
                <PriceFormatter amount={order?.amountDiscount} />
              </div>
            )}

            <div className="flex items-center justify-between w-full">
              <strong>Total :</strong>
              <PriceFormatter
                amount={order?.totalPrice}
                className="text-black font-bold"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialogue;
