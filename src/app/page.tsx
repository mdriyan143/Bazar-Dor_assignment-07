import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import SectionTitle from "@/components/SectionTitle";
import { getProducts } from "@/lib/api";
import { toBn, topMovers } from "@/lib/format";

export default async function Home() {
  const products = await getProducts();
  const risers = topMovers(products, "up");
  const fallers = topMovers(products, "down");

  return (
    <div className="space-y-10">
      <Hero />

      <section>
        <SectionTitle title="আজ দাম বেড়েছে" tone="up" />
        <ProductGrid products={risers} />
      </section>

      <section>
        <SectionTitle title="আজ দাম কমেছে" tone="down" />
        <ProductGrid products={fallers} />
      </section>

      <section>
        <SectionTitle
          id="সব-পণ্য"
          title="সব পণ্য"
          subtitle={`মোট ${toBn(products.length)}টি পণ্য দেখানো হচ্ছে`}
        />
        <ProductGrid products={products} />
      </section>
    </div>
  );
}