'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShoppingBag } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useCart } from '../../components/cart-context';

function makeOrderId(){return `SC${Date.now().toString().slice(-8)}`}

export default function CheckoutPage(){
  const {items,subtotal,clearCart}=useCart();
  const [placed,setPlaced]=useState<{id:string;name:string}|null>(null);
  const shipping=subtotal>=1499?0:99; const total=subtotal+shipping;
  if(placed) return <main className="page"><div className="container"><div className="success"><div className="success-icon"><CheckCircle2 size={30}/></div><h1 className="h2 display" style={{fontSize:52}}>You're in the club.</h1><p style={{fontSize:17,color:'var(--muted)',lineHeight:1.7}}>Thanks {placed.name}. Your COD order <strong>{placed.id}</strong> has been created in this demo storefront.</p><Link href="/" className="btn btn-primary">Back to the shower shelf</Link></div></div></main>;
  if(!items.length) return <main className="page"><div className="container"><div className="success"><div className="success-icon"><ShoppingBag/></div><h1 className="h2 display" style={{fontSize:48}}>Nothing to checkout yet.</h1><Link href="/#products" className="btn btn-primary">Shop body rituals</Link></div></div></main>;
  const submit=async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const form=new FormData(e.currentTarget); const name=String(form.get('name')||'');
    const order={id:makeOrderId(),createdAt:new Date().toISOString(),payment:'COD',customer:Object.fromEntries(form.entries()),items,subtotal,shipping,total};
    try { localStorage.setItem('sundae-last-order',JSON.stringify(order)); await fetch('/api/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(order)}); } catch {}
    clearCart(); setPlaced({id:order.id,name});
  };
  return <main className="page"><div className="container"><div className="breadcrumb"><Link href="/cart">Cart</Link> / Checkout</div><h1 className="h2 display">Checkout</h1><div className="checkout-grid"><div className="list-card"><form className="checkout-form" onSubmit={submit}><div className="field"><label>Full name</label><input name="name" required placeholder="Your name"/></div><div className="field"><label>Mobile number</label><input name="phone" required inputMode="numeric" pattern="[0-9]{10}" placeholder="10-digit mobile"/></div><div className="field"><label>Email (optional)</label><input name="email" type="email" placeholder="you@example.com"/></div><div className="field"><label>Address</label><textarea name="address" required rows={3} placeholder="House / flat / street / area"/></div><div className="field"><label>City</label><input name="city" required placeholder="Mumbai"/></div><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}><div className="field"><label>State</label><input name="state" required placeholder="Maharashtra"/></div><div className="field"><label>PIN code</label><input name="pincode" required inputMode="numeric" pattern="[0-9]{6}" placeholder="400001"/></div></div><div className="cod-box"><strong>Cash on Delivery</strong><div style={{fontSize:12,marginTop:4}}>Pay when your order arrives. Online payments can be added later.</div></div><button className="btn btn-primary" type="submit" style={{width:'100%',marginTop:8}}>Place COD order <ArrowRight size={17}/></button></form></div><aside className="summary-card"><h2 className="summary-title">Your basket</h2>{items.map(i=><div className="summary-line" key={i.slug}><span style={{maxWidth:'70%'}}>{i.name} × {i.quantity}</span><strong>₹{(i.price*i.quantity).toLocaleString('en-IN')}</strong></div>)}<div className="summary-line"><span>Shipping</span><strong>{shipping?'₹99':'FREE'}</strong></div><div className="summary-total"><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div></aside></div></div></main>
}
