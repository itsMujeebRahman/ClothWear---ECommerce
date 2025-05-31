"use client";
import { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import useCartStore from "@/Store";
import { useUser, useAuth } from "@clerk/nextjs";
import Container from "@/components/Container";
import NoAccessToCart from "@/components/NoAccessToCart";
import EmptyCart from "@/components/EmptyCart";
import { Heart, ShoppingBag, Trash } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from "@radix-ui/react-tooltip";
import PriceFormatter from "@/components/PriceFormatter";
import QuantityButtons from "@/components/QuantityButton";
import { Button } from "@/components/ui/button";
import paypalLogo from "@/Images/paypalLogo.png";
import {
  createCheckoutSession,
  Metadata,
} from "@/Actions/createCheckoutSession";

const CartPage = () => {
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isSignedIn } = useAuth();
  const {
    deleteCartProduct,
    getItemCount,
    getTotalPrice,
    getSubTotalPrice,
    resetCart,
    getGroupedItem,
  } = useCartStore();
  const { user } = useUser();
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return <Loading />;
  }
  const cartProducts = getGroupedItem();

  const handleResetCart = () => {
    const confirmed = window.confirm("Are you sure to reset your cart ?");
    if (confirmed) {
      resetCart();
      toast.success("your cart reset successfully");
    }
  };

  const handleDeleteProduct = (id: string) => {
    deleteCartProduct(id);
    toast.success("Product Deleteed Successfully");
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Unknown",
        clerkUserId: user!.id,
        
      };
      const checkoutUrl = await createCheckoutSession(cartProducts, metadata);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error Creating CheckOut Session", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 pb-52 md:pb-10">
      {isSignedIn ? (
        <Container>
          {cartProducts?.length ? (
            <>
              <div className="flex items-center gap-2 py-5 ">
                <ShoppingBag />
                <h1 className="text-2xl font-semibold">Shopping Cart</h1>
              </div>
              <div className="grid lg:grid-cols-3 md:gap-8">
                {/*products*/}
                <div className="lg:col-span-2 rounded-lg">
                  <div className="border bg-white rounded-md ">
                    {cartProducts?.map(({ product }) => {
                      const itemCount = getItemCount(product?._id);
                      return (
                        <div
                          key={product?._id}
                          className="border-b p-2.5 last:border-b-0 flex item-center justify-betwen gap-5"
                        >
                          <div className="flex flex-1 itms-center gap-2 h-36 md:h-44">
                            {product?.images && (
                              <Link
                                href={`/Products/${product?.slug?.current}`}
                                className="border p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group "
                              >
                                <Image
                                  src={urlFor(product?.images[0]).url()}
                                  alt="productImage"
                                  width={500}
                                  height={500}
                                  loading="lazy"
                                  className="w-32 md:w-40 h-32 md:h-40 object-cover 
                                  group-hover:scale-105 overflow-hidden hoverEffect"
                                />
                              </Link>
                            )}
                            <div className="h-full flex flex-1 items-start flex-col justify-between py-1">
                              <div className="spac-y-1.5">
                                <h2 className="font-semibold line-clamp-1">
                                  {product?.name}
                                </h2>
                                <p className="text-sm text-gray-500 font-medium">
                                  {product?.intro}
                                </p>
                                <p className="text-sm capitalize">
                                  Variant:{" "}
                                  <span className="font-smibold">
                                    {product.variant}
                                  </span>
                                </p>
                                <p className="text-sm capitalize">
                                  Status:{" "}
                                  <span className="font-semibold">
                                    {product.status}
                                  </span>
                                </p>
                              </div>
                              <div className="text-gray-500 flex items-center gap-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Heart className="w-4 h-4 md:w-5 md:h-5 hover:text-green-600" />
                                      <TooltipContent className="font-sm bg-green-500 text-white rounded-full px-2 py-1">
                                        Add to Favorite
                                      </TooltipContent>
                                    </TooltipTrigger>
                                  </Tooltip>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Trash
                                        onClick={() =>
                                          handleDeleteProduct(product?._id)
                                        }
                                        className="w-4 h-4 md:w-5 md:h-5 hover:text-red-600"
                                      />
                                      <TooltipContent className="font-sm bg-red-500 text-white rounded-full px-2 py-1">
                                        Delete Product
                                      </TooltipContent>
                                    </TooltipTrigger>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                            <div
                              className="flex flex-col items-start justify-between h-36 
                            md:h-44 p-0.5 md:p-1"
                            >
                              <PriceFormatter
                                amount={(product?.price as number) * itemCount}
                                className=" font-bold text-lg"
                              />
                              <QuantityButtons product={product} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <Button
                      onClick={handleResetCart}
                      className="m-5 font-semibold hoverEffect border hover:border-red-500 
                      hover:bg-white hover:text-red-500"
                      variant={"destructive"}
                    >
                      Reset Cart
                    </Button>
                  </div>
                </div>
                {/*summery*/}
                <div className="lg:col-span-1">
                  <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">
                      Order Summery
                    </h2>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Sub Total</span>
                        <PriceFormatter amount={getSubTotalPrice()} />
                      </div>
                      <div className="flex justify-between">
                        <span>Discount</span>
                        <PriceFormatter
                          amount={getSubTotalPrice() - getTotalPrice()}
                        />
                      </div>
                      <div className="flex justify-between border-t pt-5">
                        <span>Total</span>
                        <PriceFormatter
                          amount={getTotalPrice()}
                          className="text-lg font-bold text-black"
                        />
                      </div>
                      <Button
                        onClick={handleCheckout}
                        disabled={loading}
                        className="w-full rounded-full font-semibold tracking-wide"
                        size="lg"
                      >
                        {loading ? "Processing" : "Proceed to Checkout"}
                      </Button>
                      <Link
                        href={"/"}
                        className="flex item-center justify-center py-2 border border-black/50 
                        rounded-full hover:border-black hover:bg-black/10 hoverEffect "
                      >
                        <Image
                          src={paypalLogo}
                          alt="paypalLogo"
                          className="w-20"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
                {/* ordersummery for mobile view */}
                <div className="md:hidden fixed bottom-0 left-0 w-full bg-white pt-2">
                  <div className="p-4 rounded-lg border mx-4">
                    <h2 className="text-xl font-semibold mb-4">
                      Order Summery
                    </h2>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Sub Total</span>
                        <PriceFormatter amount={getSubTotalPrice()} />
                      </div>
                      <div className="flex justify-between">
                        <span>Discount</span>
                        <PriceFormatter
                          amount={getSubTotalPrice() - getTotalPrice()}
                        />
                      </div>
                      <div className="flex justify-between border-t pt-5">
                        <span>Total</span>
                        <PriceFormatter
                          amount={getTotalPrice()}
                          className="text-lg font-bold text-black"
                        />
                      </div>
                      <Button
                        onClick={handleCheckout}
                        disabled={loading}
                        className="w-full rounded-full font-semibold tracking-wide"
                        size="lg"
                      >
                        {loading ? "Processing" : "Proceed to Checkout"}
                      </Button>
                      <Link
                        href={"/"}
                        className="flex item-center justify-center py-2 border border-black/50 
                        rounded-full hover:border-black hover:bg-black/10 hoverEffect "
                      >
                        <Image
                          src={paypalLogo}
                          alt="paypalLogo"
                          className="w-20"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccessToCart />
      )}
    </div>
  );
};
export default CartPage;
