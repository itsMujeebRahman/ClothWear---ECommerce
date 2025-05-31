"use client";

import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import { useState } from "react";
import { TableBody, TableCell, TableRow } from "./ui/table";
import { Tooltip, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import PriceFormatter from "./PriceFormatter";
import { format } from "date-fns";
import { TooltipContent } from "@radix-ui/react-tooltip";
import OrderDetailsDialogue from "./OrderDetailsDialogue";

const OrderComponent = ({ orders }: { orders: MY_ORDERS_QUERYResult }) => {
  const [selectedOrder, setSelectedOrder] = useState<
    MY_ORDERS_QUERYResult[number] | null
  >(null);

  return (
    <>
      <TableBody>
        {orders.map((order) => (
          <TableRow
            key={order?.orderNumber}
            onClick={() => setSelectedOrder(order)}
            className="cursor-pointer hover:bg-gray-100 h-12"
          >
            <TableCell className="font-medium">
              {order.orderNumber?.slice(-10) ?? "N/A"}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {order?.orderDate &&
                format(new Date(order.orderDate), "dd/MM/yyyy")}
            </TableCell>
            <TableCell>{order?.customerName}</TableCell>
            <TableCell className="hidden md:table-cell">
              {order?.email}
            </TableCell>
            <TableCell>
              <PriceFormatter
                amount={order?.totalPrice}
                className="text-black font-medium"
              />
            </TableCell>
            <TableCell>
              {order?.status && (
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold 
                            ${
                              order?.status === "paid"
                                ? "bg-green-100 text-green-800"
                                : " text-yellow-800"
                            }`}
                >
                  {order?.status}
                </span>
              )}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {order?.invoice && (
                <p>{order?.invoice ? order?.invoice?.number : "----"}</p>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <OrderDetailsDialogue
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
};

export default OrderComponent;
