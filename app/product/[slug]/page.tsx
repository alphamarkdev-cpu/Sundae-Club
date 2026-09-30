'use client';

import Link from 'next/link';
import { Check, Minus, Plus, ShoppingBag } from 'lucide-react';
import { getProduct, products } from '../../../lib/products';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '../../../components/cart-context';
import { useMemo, useState } from 'react';

export default function ProductPage() {
  const params = useParams<{slug:string}>();
  const product = getProduct(params.slug);
  const { addItem } = useCart();
  const router = useRouter();
  const [qty,setQty]=useState(1);
  const related = useMemo(()=>products.filter(p=>p.slug!==params.slug && p.category===product?.category).slice(0,2),[params.slug,product?.category]);
  if (!product) return <main className="page"><div className="container"><h1>Product not found</h1><Link href="/" className="btn btn-primary">Back home</Link></div></main>;
  return <main className="page"><div className="container">
    <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/#products">Shop</Link> / {product.name}</div>
    <div className="product-detail"><div className="detail-image"><img src={product.image} alt={product.name}/></div><div className="detail-copy"><span className="eyebrow">{product.category}</span><h1>{product.name}</h1><p style={{fontSize:18,fontWeight:700}}>{product.short}</p><div className="detail-price">₹{product.price.toLocaleString('en-IN')}</div><p className="detail-desc">{product.description}</p><div className="feature-line">{product.benefits.map(b=><span className="feature" key={b}><Check size={13} style={{verticalAlign:'-2px',marginRight:6}}/>{b}</span>)}</div><div style={{marginTop:24,display:'flex',gap:12,alignItems:'center',flexWrap:'wrap'}}><div className="qty"><button onClick={()=>setQty(Math.max(1,qty-1))}><Minus size={16}/></button><span>{qty}</span><button onClick={()=>setQty(qty+1)}><Plus size={16}/></button></div><button className="btn btn-primary" onClick={()=>addItem(product,qty)}><ShoppingBag size={17}/> Add to cart</button><button className="btn btn-secondary" onClick={()=>{addItem(product,qty); router.push('/checkout')}}>Buy now</button></div><div className="cod-box"><strong>COD checkout available.</strong><div style={{fontSize:12,marginTop:4}}>No online payment required for this demo store.</div></div></div></div>
    {related.length>0 && <section style={{marginTop:70}}><h2 className="h2 display" style={{fontSize:42}}>You may also crave</h2><div className="product-grid">{related.map(p=><div key={p.slug}>{/* compact related card */}<Link href={`/product/${p.slug}`} className="category" style={{display:'block'}}><img src={p.image} alt={p.name}/><b>{p.name}</b><span>₹{p.price.toLocaleString('en-IN')} • {p.short}</span></Link></div>)}</div></section>}
  </div></main>
}
