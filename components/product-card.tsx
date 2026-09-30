'use client';

import Link from 'next/link';
import { Heart, Plus, Sparkles } from 'lucide-react';
import { useCart } from './cart-context';
import type { Product } from '../lib/products';
import { useState } from 'react';

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  return <article className="product-card">
    <div className="product-media">
      <Link href={`/product/${product.slug}`}><img src={product.image} alt={product.name}/></Link>
      <span className="tag">{product.badge ?? 'Sundae pick'}</span>
      <button className="icon-btn heart" aria-label="Wishlist"><Heart size={16}/></button>
    </div>
    <div className="product-info">
      <div className="product-kicker">{product.category}</div>
      <Link href={`/product/${product.slug}`}><h3 className="product-title">{product.name}</h3></Link>
      <p style={{color:'var(--muted)',fontSize:13,lineHeight:1.5,margin:'0 0 14px'}}>{product.short}</p>
      <div className="product-bottom"><div><div style={{fontSize:11,color:'var(--muted)'}}>FLAT PRICE</div><div className="price">₹{product.price.toLocaleString('en-IN')}</div></div><button className="add-mini" onClick={() => { addItem(product); setAdded(true); setTimeout(()=>setAdded(false), 1300); }}>{added ? <><Sparkles size={14}/> Added</> : <><Plus size={14}/> Add</>}</button></div>
    </div>
  </article>
}
