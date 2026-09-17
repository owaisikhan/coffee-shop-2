"use client";

import { addToCart } from "@/app/_lib/cart";

export function AddToCartButton({ variantId }: { variantId: string }) {
  return <button onClick={() => addToCart(variantId)}>Add to cart</button>;
}
