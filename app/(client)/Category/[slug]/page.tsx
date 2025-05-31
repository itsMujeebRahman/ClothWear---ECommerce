import Container from "@/components/Container";
import { getAllCategories } from "@/sanity/Helpers/query";
import React from "react";
import Title from "@/components/Title";
import CategoryProducts from "@/components/CategoryProducts";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const categories = await getAllCategories();
  return (
    <Container className="py-10">
      <Title className="text-xl">
        Products by Category{" "}
        <span className="font-bold text-green-600 capitalize tracking-wide">
          {slug && slug}
        </span>
      </Title>
      <CategoryProducts categories={categories} slug={slug} />
    </Container>
  );
};

export default CategoryPage;
