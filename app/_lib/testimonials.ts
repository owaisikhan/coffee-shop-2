export type Testimonial = {
  quote: string;
  name: string;
  avatar?: string;
  rating: number;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I Have Been Coming In Since The Bike Shop Days. The Batch Brew Is Still The Best Three Pounds I Spend All Week.",
    name: "Marta Reyes",
    avatar: "/assets/img-avatar.png",
    rating: 5,
  },
  {
    quote:
      "They Print The Farm And The Week It Was Roasted On The Bag. I Have Never Had To Guess How Old My Beans Are.",
    name: "Daniel Okonjo",
    avatar: "/assets/img-avatar.png",
    rating: 5,
  },
  {
    quote:
      "Ordered A Kilo For The Office On A Thursday. It Arrived Rested, Not Fresh Off The Drum, Which Is The Whole Point.",
    name: "Priya Raman",
    avatar: "/assets/img-avatar.png",
    rating: 4,
  },
];
