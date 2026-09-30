'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Product } from '../lib/products';

type CartItem = Product & { quantity: number };

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sundae-cart');
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('sundae-cart', JSON.stringify(items));
  }, [items]);

  const value = useMemo(() => ({
    items,
    addItem: (product: Product, quantity = 1) => setItems((current) => {
      const existing = current.find((item) => item.slug === product.slug);
      if (existing) {
        return current.map((item) => item.slug === product.slug ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...current, { ...product, quantity }];
    }),
    removeItem: (slug: string) => setItems((current) => current.filter((item) => item.slug !== slug)),
    updateQuantity: (slug: string, quantity: number) => setItems((current) => quantity <= 0 ? current.filter((item) => item.slug !== slug) : current.map((item) => item.slug === slug ? { ...item, quantity } : item)),
    clearCart: () => setItems([]),
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
