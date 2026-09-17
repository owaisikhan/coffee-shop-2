import { shopifyClient } from "@/app/_lib/shopify";

const CREATE_CART = `
  mutation cartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart { checkoutUrl }
    }
  }
`;

export async function addToCart(variantId: string) {
  const { data } = await shopifyClient.request(CREATE_CART, {
    variables: { lines: [{ merchandiseId: variantId, quantity: 1 }] },
  });
  window.location.href = data.cartCreate.cart.checkoutUrl;
}
