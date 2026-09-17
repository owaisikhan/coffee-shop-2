import { shopifyClient } from "@/app/_lib/shopify";

const PRODUCTS_QUERY = `
  query {
    products(first: 20) {
      nodes {
        id
        title
        handle
        images(first: 1) { nodes { url altText } }
        priceRange { minVariantPrice { amount currencyCode } }
      }
    }
  }
`;

export default async function ProductsPage() {
  const { data } = await shopifyClient.request(PRODUCTS_QUERY);
  const products = data.products.nodes;

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((p: any) => (
        <a key={p.id} href={`/products/${p.handle}`}>
          <img src={p.images.nodes[0]?.url} alt={p.title} />
          <h3>{p.title}</h3>
          <p>
            {p.priceRange.minVariantPrice.amount}{" "}
            {p.priceRange.minVariantPrice.currencyCode}
          </p>
        </a>
      ))}
    </div>
  );
}
