import { shopifyClient } from "@/app/_lib/shopify";
import { AddToCartButton } from "@/app/_components/ui/AddToCartButton";

const PRODUCT_QUERY = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      title
      description
      images(first: 5) { nodes { url altText } }
      variants(first: 10) {
        nodes { id title price { amount currencyCode } availableForSale }
      }
    }
  }
`;

export default async function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  const { data } = await shopifyClient.request(PRODUCT_QUERY, {
    variables: { handle: params.handle },
  });
  const product = data.product;
  const firstVariant = product.variants.nodes[0];

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.images.nodes[0]?.url} alt={product.title} />
      <p>{product.description}</p>
      <p>
        {firstVariant.price.amount} {firstVariant.price.currencyCode}
      </p>
      <AddToCartButton variantId={firstVariant.id} />
    </div>
  );
}
