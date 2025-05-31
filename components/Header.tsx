import React from "react";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import Container from "./Container";
import MobileMenu from "./mobileMenu";
import CartIcon from "./CartIcon";
import SearchBar from "./SearchBar";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";
import { ClerkLoaded, SignedIn, UserButton } from "@clerk/nextjs";
import { ListOrdered } from "lucide-react";
import Link from "next/link";
import { getAllCategories, getMyOrders } from "@/sanity/Helpers/query";
import { auth } from "@clerk/nextjs/server";

const Header = async () => {
  const user = await currentUser();
  const {userId} = await auth()
  const categories = await getAllCategories();
  let orders=null
  if(userId){
    orders = await getMyOrders(userId)
  }

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-b-gray-200 py-5">
      <Container className="flex items-center justify-between gap-7 lightColor">
        <HeaderMenu categories={categories} />
        <div className="w-auto md:w1/3 flex items-center justify-center gap-2.5">
          <MobileMenu />
          <Logo className="italic ">ClothsWear</Logo>
        </div>
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />
          <ClerkLoaded>
            <SignedIn>
              <Link href={"/orders"} className="group relative">
                <ListOrdered className="w-5 h-5 hover:text-black text-gray-500 hoverEffect" />
                <span
                  className="absolute -top-1 -right-1 bg-black text-white h-3.5 w-3.5 
                    rounded-full text-xs font-semibold flex items-center justify-center"
                >
                  {orders?.length? orders?.length: 0}
                </span>
              </Link>
              <span
                className="inline-flex items-center justify-center border-3 rounded-full 
              hover:border-black hoverEffect"
              >
                <UserButton />
              </span>
            </SignedIn>
            {!user && (
              <SignInButton mode="modal">
                <button className="text-sm font-semibold hover:text-black hoverEffect text-gray-500">
                  Login
                </button>
              </SignInButton>
            )}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default Header;
