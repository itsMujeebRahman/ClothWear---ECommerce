"use client";

import React, { useEffect, useRef, useState } from "react";
import ProductTab from "./ProductTabBar";
import { productType } from "@/Constants";
import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity.types";
import ProductCard from "./ProductCard";
import NoProductsAvailable from "./NoProductsAvailable";
import { Loader2 } from "lucide-react";
import gsap from "gsap";

const ProductGrid = () => {
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || "");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const query = `*[_type == 'product' && variant == $variant] | order(name asc)`;
  const params = { variant: selectedTab.toLowerCase() };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await client.fetch(query, params);
        setProducts(await response);
      } catch (error) {
        console.log("product fetching error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedTab]);

  useEffect(() => {
    if (!loading && products.length && gridRef.current) {
      const elements = gridRef.current.querySelectorAll(".product-item");
      gsap.from(elements, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });
    }
  }, [loading, products]);

  return (
    <div className="mt-10 flex flex-col items-center gap-0">
      <ProductTab selectedTab={selectedTab} onTabSelect={setSelectedTab} />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10">
          <div className="flex items-center space-x-2 text-blue-400">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-xl font-semibold">
              Loading your cloths....
            </span>
          </div>
        </div>
      ) : (
        <>
          {products?.length ? (
            <div
              ref={gridRef}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 mt-10 w-full"
            >
              {products.map((product: Product) => (
                <div key={product?._id} className="product-item">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <NoProductsAvailable selectedTab={selectedTab} />
          )}
        </>
      )}
    </div>
  );
};

export default ProductGrid;
