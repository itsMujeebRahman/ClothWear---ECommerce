import AddToCart from "@/components/AddToCart";
import Container from "@/components/Container";
import ImageView from "@/components/ImageView";
import PriceView from "@/components/PriceView";
import {
  BoxIcon,
  FileQuestion,
  Heart,
  ListOrderedIcon,
  Share,
} from "lucide-react";
import { getProductBySlug } from "@/sanity/Helpers/query";
import { notFound } from "next/navigation";

import React from "react";
import ProductCharacteristics from "@/components/ProductCharactristics";
//rendering on server side

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return notFound();
  }

  return (
    <Container className="py-10 flex flex-col md:flex-row gap-10">
      {product?.images && <ImageView images={product?.images} />}
      <div className=" w-full md:w-1/2 flex flex-col gap-5">
        {" "}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 ">
            {product?.name}
          </h2>
          <PriceView
            price={product?.price}
            discount={product?.discount}
            className="text-lg font-bold"
          />
        </div>
        {product?.stock && (
          <p className="bg-green-100 w-24 text-center text-green-600 text-sm py-2.5 font-semibold rounded-lg ">
            In Stock
          </p>
        )}
        <p className="text-sm text-gray-600 tracking-wide">
          {product?.description}
        </p>
        <div className="flex items-center gap-2.5 lg:gap-3 ">
          <AddToCart
            product={product}
            className="bg-black/80 text-white hover:bg-black hoverEffect"
          />
          <button className="border-2 border-black/30 text-black/60 px-2.5 py-1.5 rounded hover:text:black hover:border-black hoverEffect">
            <Heart className="w-5 h-5 " />
          </button>
        </div>
        <ProductCharacteristics product={product} />
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5 -mt-2">
          <div className="flex item-center gap-2 text-sm txt-black hover:text-red-600 hoverEffect">
            <BoxIcon className="w-5 h-5" />
            <p> Comapre Color</p>
          </div>

          <div className="flex item-center gap-2 text-sm txt-black hover:text-red-600 hoverEffect">
            <FileQuestion className="w-5 h-5" />
            <p> Ask a Qustion</p>
          </div>

          <div className="flex item-center gap-2 text-sm txt-black hover:text-red-600 hoverEffect">
            <ListOrderedIcon className="w-5 h-5" />
            <p>delivery & Return</p>
          </div>

          <div className="flex item-center gap-2 text-sm txt-black hover:text-red-600 hoverEffect">
            <Share className="w-5 h-5" />
            <p>Share</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-5 ">
          <div className="border border-gray-300 hover:border-gray-500 text-center p-3 hoverEffect rounded">
            <p className="text-bas font-semibold text-black">Free Shipping</p>
            <p className="text-sm text-gray-500">
              Free Shipping over order $120
            </p>
          </div>

          <div className="border border-gray-300 hover:border-gray-500  text-center p-3 hoverEffect rounded">
            <p className="text-bas font-semibold text-black">
              Flexible Payment
            </p>
            <p className="text-sm text-gray-500">
              Pay with Multiple Credit Cards
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SingleProductPage;
