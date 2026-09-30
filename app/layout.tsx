import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '../components/cart-context';
import { Header, Footer } from '../components/site-shell';

export const metadata: Metadata = {
  title: 'Sundae Club | Body Rituals',
  description: 'Playful body scrubs and whipped body care for fun shower rituals.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><CartProvider><Header/>{children}<Footer/></CartProvider></body></html>;
}
