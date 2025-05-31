import React from "react";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import { Input } from "./ui/input";
import { QuickLinksData, CategoriesData } from "@/Constants";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <Container>
        <FooterTop />
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4 ">
            <Logo className="italic">CLOTHSWEAR</Logo>
            <p className="text-gray-600 txt-sm">
              Discover curated furniture collections at Tulos, blending style
              and comfort to elevate your living spaces.
            </p>
            <SocialMedia
              className="text-black/60"
              iconClassName="hover:border-black hover:text-black"
              tooltipClassName="bg-black text-white"
            />
          </div>
          <div>
            <h3 className="font-semibold text-black mb-4">Quick Links</h3>
            <div className="flex flex-col gap-3">
              {QuickLinksData?.map((item) => (
                <Link
                  key={item?.title}
                  href={item?.href}
                  className="text-gray-600 hover:text-black text-sm font-medium hoverEffect "
                >
                  {item?.title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-black mb-4">Categories</h3>
            <div className="flex flex-col gap-3">
              {CategoriesData?.map((item) => (
                <Link
                  key={item?.href}
                  href={`/category${item?.href}`}
                  className="text-gray-600 hover:text-black text-sm font-medium hoverEffect"
                >
                  {item?.title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-black mb-4">Newsletter</h3>
            <p className="text-gray-600 text-sm mb-4">
              Subscribe to our newsletter to receive updates and exclusive
              offers
            </p>
            <form className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-non focus:ring-2 focus:ring-gray-200"
              />
              <button
                type="submit"
                className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </Container>
      <div className="border-t flex items-center justify-center text-gray-600 p-6 text-sm">
        © 2025 Tulos. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
