export type ProductCategory = 'Body Scrubs' | 'Whipping Cream';

export type Product = {
  slug: string;
  name: string;
  short: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  accent: string;
  badge?: string;
  benefits: string[];
};

export const products: Product[] = [
  {
    slug: 'papaya-pomegranate-body-scrub',
    name: 'Papaya + Pomegranate Body Scrub',
    short: 'Glow-up scrub for soft, smooth skin.',
    description: 'A juicy-feeling body scrub built for feel-good shower rituals. Use on damp skin, massage gently, and rinse for skin that feels polished and soft.',
    price: 999,
    category: 'Body Scrubs',
    image: '/assets/products/papaya-pomegranate.png',
    accent: '#ffbd89',
    badge: 'Glow pick',
    benefits: ['Gentle exfoliation', 'Fresh fruity scent', 'Soft-skin finish', 'Daily-routine friendly']
  },
  {
    slug: 'lime-coconut-body-scrub',
    name: 'Lime + Coconut Body Scrub',
    short: 'Fresh, tropical, creamy-smooth.',
    description: 'A refreshing scrub inspired by lime and coconut. Made for the part of your shower that feels more like a little vacation.',
    price: 999,
    category: 'Body Scrubs',
    image: '/assets/products/lime-coconut.png',
    accent: '#d7ebad',
    badge: 'Fresh pick',
    benefits: ['Gentle exfoliation', 'Tropical fragrance', 'Smooth-feeling skin', 'Sensory shower ritual']
  },
  {
    slug: 'turmeric-saffron-body-scrub',
    name: 'Turmeric + Saffron Body Scrub',
    short: 'Warm, bright, buttery-soft.',
    description: 'A warm-toned body scrub for a polished, comfortable skin feel. An easy self-care ritual for post-work showers and slow weekends.',
    price: 999,
    category: 'Body Scrubs',
    image: '/assets/products/turmeric-saffron.png',
    accent: '#f3dc82',
    badge: 'Ritual pick',
    benefits: ['Creamy texture', 'Gentle exfoliation', 'Smooth finish', 'Self-care moment']
  },
  {
    slug: 'peach-cherry-blossom-body-scrub',
    name: 'Peach + Cherry Blossom Body Scrub',
    short: 'Soft, sweet, dessert-like shower vibes.',
    description: 'A soft floral-fruity body scrub made for people who want their shower to feel playful, pretty and seriously satisfying.',
    price: 999,
    category: 'Body Scrubs',
    image: '/assets/products/peach-cherry-blossom.png',
    accent: '#f7c8d5',
    badge: 'Sweet pick',
    benefits: ['Playful fragrance', 'Gentle polish', 'Creamy feel', 'Fun everyday ritual']
  },
  {
    slug: 'unicorn-fruit-whipping-cream',
    name: 'Unicorn Fruit Whipping Cream',
    short: 'Fluffy, colorful, deeply moisturizing.',
    description: 'A whipped body butter texture designed to make moisturizing feel fun. Smooth onto clean, slightly damp skin for a soft, comfort-first finish.',
    price: 999,
    category: 'Whipping Cream',
    image: '/assets/brand/cream-unicorn.png',
    accent: '#f6cadc',
    badge: 'Bestseller',
    benefits: ['Whipped texture', 'Moisture-lock feel', 'Soft skin finish', 'Dessert-like ritual']
  },
  {
    slug: 'rainbow-whip-body-cream',
    name: 'Rainbow Whip Body Cream',
    short: 'Pastel swirls. Plush moisture. Instant mood.',
    description: 'A colorful whipped cream-style moisturizer made for the most playful part of your routine. Rich, plush and made to layer into your after-shower ritual.',
    price: 999,
    category: 'Whipping Cream',
    image: '/assets/brand/cream-swirls.png',
    accent: '#cfe8f6',
    badge: 'Mood booster',
    benefits: ['Whipped cream feel', 'Comforting moisture', 'Playful pastel texture', 'Everyday body care']
  }
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
