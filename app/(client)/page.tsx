
import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import ProductGrid from "@/components/ProductsGrid";
export default function Home() {
  return (
    <div>
      <Container className="py-6">
        <HomeBanner/>
        <ProductGrid />
      </Container>
    </div>
  );
}
