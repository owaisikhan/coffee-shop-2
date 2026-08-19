// Single source of truth for everything drinkable on the site. The featured
// cards, the price list and the search dialog all read from here, so a price
// or a name only ever has to change in one place.

export type Drink = {
  name: string;
  price: string;
  /** Which price-list column it belongs to. */
  group: "Espresso Bar" | "Filter And Beans";
  /** Filter-tab category, for the drinks featured as cards. */
  cat?: "Black" | "Espresso" | "Doppio";
  image?: string;
  video?: string;
};

export const DRINKS: Drink[] = [
  {
    name: "Espresso",
    price: "3.00",
    group: "Espresso Bar",
    cat: "Doppio",
    image: "/assets/img-espresso.png",
    video: "/uploads/espresso-loop.mp4",
  },
  { name: "Doppio", price: "3.60", group: "Espresso Bar" },
  {
    name: "Cappuccino",
    price: "4.20",
    group: "Espresso Bar",
    cat: "Espresso",
    image: "/assets/img-cappuccino.png",
    video: "/uploads/cappuccino-loop.mp4",
  },
  { name: "Flat White", price: "4.40", group: "Espresso Bar" },
  {
    name: "Iced Latte",
    price: "4.80",
    group: "Espresso Bar",
    cat: "Espresso",
    image: "/assets/img-iced-coffee.png",
    video: "/uploads/iced-latte-loop.mp4",
  },
  {
    name: "Batch Brew",
    price: "3.40",
    group: "Filter And Beans",
    cat: "Black",
    image: "/assets/img-hero-cup.png",
    video: "/uploads/batch-brew-loop.mp4",
  },
  { name: "Pour Over, Single Origin", price: "5.20", group: "Filter And Beans" },
  { name: "Cold Brew, On Tap", price: "4.60", group: "Filter And Beans" },
  { name: "Beans, 250g Bag", price: "16.00", group: "Filter And Beans" },
  { name: "Beans, 1kg Bag", price: "54.00", group: "Filter And Beans" },
];

/** A drink with the artwork needed to render it as a card. */
export type FeaturedDrink = Drink & {
  image: string;
  video: string;
  cat: NonNullable<Drink["cat"]>;
};

const hasArtwork = (d: Drink): d is FeaturedDrink =>
  Boolean(d.image && d.video && d.cat);

/** The drinks shown as cards in "Best Selling Item". */
export const FEATURED: FeaturedDrink[] = [
  ...DRINKS.filter(hasArtwork),
  {
    name: "Americano",
    price: "3.20",
    group: "Espresso Bar",
    cat: "Black",
    image: "/assets/img-americano.png",
    video: "/uploads/americano-loop.mp4",
  },
  {
    name: "Latte",
    price: "4.40",
    group: "Espresso Bar",
    cat: "Espresso",
    image: "/assets/img-latte-art.png",
    video: "/uploads/latte-loop.mp4",
  },
];

export const MENU_GROUPS = ["Espresso Bar", "Filter And Beans"] as const;

export function drinksInGroup(group: string) {
  return DRINKS.filter((d) => d.group === group);
}

export function searchDrinks(query: string): Drink[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return DRINKS.filter(
    (d) => d.name.toLowerCase().includes(q) || d.group.toLowerCase().includes(q)
  );
}

export const FARMS = [
  { farm: "La Esperanza", origin: "Huila, Colombia", varietal: "Caturra", paid: "4.10 / lb" },
  { farm: "Finca El Roble", origin: "Huila, Colombia", varietal: "Pink Bourbon", paid: "5.40 / lb" },
  { farm: "Gatomboya", origin: "Kirinyaga, Kenya", varietal: "SL28, SL34", paid: "6.20 / lb" },
  { farm: "Kiangoi", origin: "Kirinyaga, Kenya", varietal: "Ruiru 11", paid: "4.80 / lb" },
  { farm: "Konga", origin: "Sidama, Ethiopia", varietal: "Heirloom", paid: "5.05 / lb" },
  { farm: "Bombe", origin: "Sidama, Ethiopia", varietal: "Heirloom", paid: "5.60 / lb" },
  { farm: "Shantawene", origin: "Sidama, Ethiopia", varietal: "Heirloom", paid: "5.75 / lb" },
  { farm: "Hunkute", origin: "Sidama, Ethiopia", varietal: "Heirloom", paid: "4.95 / lb" },
  { farm: "Mikuba", origin: "Huila, Colombia", varietal: "Castillo", paid: "4.25 / lb" },
];
