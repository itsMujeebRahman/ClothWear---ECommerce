"use client";
import { Loader2, Search } from "lucide-react";
import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import React, { useCallback, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { X } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity.types";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PriceView from "./PriceView";
import AddToCart from "./AddToCart";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const fetchProducts = useCallback(async () => {
    if (!search) {
      setProducts([]);
      return;
    }

    setLoading(true);
    try {
      const query = `*[_type == "product" && name match $search] | order(name asc)`;
      const params = { search: `${search}*` };
      const response = await client.fetch(query, params);
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [search]);

  // Debounce input changes to reduce API calls
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchProducts();
    }, 300); // Delay of 300ms
    return () => clearTimeout(debounceTimer);
  }, [search, fetchProducts]);

  return (
    <Dialog open={showSearch} onOpenChange={() => setShowSearch(!showSearch)}>
      <DialogTrigger onClick={() => setShowSearch(!showSearch)}>
        <Search className="w-5  h-5 hover:text-black text-gray-500 hoverEffect" />
      </DialogTrigger>
      <DialogContent className="!w-[70vw] !max-w-[90vw] !min-h-[90vh] !max-h-[90vh] flex flex-col overflow-hidden ">
        <DialogHeader>
          <DialogTitle className="mb-1">Product Searchbar</DialogTitle>
          <form className="relative" onSubmit={(e) => e.preventDefault()}>
            <Input
              placeholder="Search your Product here "
              className="flex-1 rounded-md py-5 border border:ring-1 border-gray-500 "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <X
                onClick={() => setSearch("")}
                className="w-4 h-4 absolute top-3 right-12 hover:text-red-600 hoverEffect"
              />
            )}
            <button
              type="submit"
              className={`absolute right-0 top-0 w-10 h-full flex items-center justify-center
              rounded-tr-md rounded-br-md hover:bg-gray-500 hover:text-white hoverEffect ${search ? "bg-black text-white" : "bg-black/10"}`}
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </DialogHeader>
        <div className="w-full h-full overflow-y-scroll border border-black/20 rounded-md">
          <div>
            {loading ? (
              <p className="flex items-center px-6 py-10 gap-1 text-center text-yellow-600 font-semibold">
                <Loader2 className="w-5 h-5 animate-spin" />
                Searching for products...
              </p>
            ) : products.length ? (
              products.map((product: Product) => (
                <div
                  key={product?._id}
                  className="bg-white overflow-hidden border-b last:border-b-0"
                >
                  <div className="flex items-center p-1">
                    <Link
                      href={`/product/${product?.slug?.current}`}
                      className="h-20 w-20 md:h-24 md:w-24 flx-shrink-0 border 
                      border-black/20 rounded-md overflow-hidden group"
                      onClick={() => setShowSearch(false)}
                    >
                      {product?.images && (
                        <Image
                          width={200}
                          height={200}
                          src={urlFor(product?.images[0]).url()}
                          alt="productImage"
                          className="objct-cover w-full h-full group-hover:scale:110 hovrEffect"
                        />
                      )}
                    </Link>
                    <div className="px-4 py-2 flex-grow ">
                      <Link
                        href={`/product/${product?.slug?.current}`}
                        onClick={() => setShowSearch(false)}
                      >
                        <h3 className="text-sm md:text-lg font-semibold text-gray-800 line-clamp-1">
                          {product?.name}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-1">
                          {product?.intro}
                        </p>
                      </Link>
                      <PriceView
                        price={product?.price}
                        discount={product?.discount}
                        className="md:text-lg"
                      />
                    </div>
                    <div className="w-60 mt-1">
                      <AddToCart product={product} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 font-semibold tracking-wide">
                {search && !loading ? (
                  <p>
                    Nothing Match with the keyword{" "}
                    <span className="underline text-red-600">{search}</span>.
                    Please try somthing else
                  </p>
                ) : (
                  <p className=" text-green-600 flex items-center justify-center gap-1">
                    <Search className="w-5 h-5" />
                    Search and explore your products from ClothsWear
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBar;
