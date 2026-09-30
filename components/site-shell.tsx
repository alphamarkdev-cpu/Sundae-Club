'use client';

import Link from 'next/link';
import { ArrowUpRight, Search, ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from './cart-context';

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="topbar"><div className="container inner"><span>Free shipping on ₹1499+</span><span>Made for fun shower rituals</span><span>COD available</span><span>Easy returns</span></div></div>
      <header className="nav">
        <div className="container nav-inner">
          <Link href="/" aria-label="Sundae Club home"><img src="/assets/brand/sundae-logo.png" className="logo" alt="Sundae Club" /></Link>
          <nav className="nav-links">
            <Link href="/">Home</Link><Link href="/shop">Shop</Link><Link href="/#ritual">Build a ritual</Link><Link href="/#about">About</Link>
          </nav>
          <div className="nav-actions">
            <button className="icon-btn" aria-label="Search"><Search size={18}/></button>
            <Link className="icon-btn" href="/cart" aria-label="Cart"><ShoppingBag size={18}/><span className="badge">{count}</span></Link>
            <button className="icon-btn mobile-menu" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X size={18}/> : <Menu size={18}/>}</button>
          </div>
        </div>
        {open && <div style={{borderTop:'1px solid var(--border)'}}><div className="container" style={{padding:'10px 0 18px',display:'grid',gap:8}}>
          <Link href="/" onClick={() => setOpen(false)}>Home</Link><Link href="/shop" onClick={() => setOpen(false)}>Shop</Link><Link href="/#ritual" onClick={() => setOpen(false)}>Build a ritual</Link><Link href="/#about" onClick={() => setOpen(false)}>About</Link>
        </div></div>}
      </header>
    </>
  );
}

export function Footer() {
  return <footer className="footer" id="about"><div className="container"><div className="footer-grid">
    <div><img src="/assets/brand/sundae-logo.png" alt="Sundae Club" style={{width:170, filter:'brightness(0) invert(1)', marginBottom:14}}/><p className="muted">Body rituals that feel like dessert. Playful textures, fruity moods and a shower routine you actually look forward to.</p></div>
    <div><strong>Shop</strong><div className="footer-links" style={{marginTop:14}}><Link href="/#shop">Body scrubs</Link><Link href="/#shop">Whipping creams</Link><Link href="/#ritual">Build a ritual</Link></div></div>
    <div><strong>Help</strong><div className="footer-links" style={{marginTop:14}}><Link href="/cart">Cart</Link><Link href="/checkout">Checkout</Link><Link href="/#reviews">Reviews</Link></div></div>
    <div><strong>Follow the club</strong><div className="footer-links" style={{marginTop:14}}><a href="#">Instagram ↗</a><a href="#">Pinterest ↗</a><a href="#">Email us ↗</a></div></div>
  </div><div className="footer-bottom"><span>© 2026 Sundae Club Body Rituals</span><span>Demo storefront • COD checkout enabled</span></div></div></footer>
}
