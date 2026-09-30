'use client';

import { useState } from 'react';
import { ProductCard } from '../../components/product-card';
import { products } from '../../lib/products';

export default function ShopPage(){
  const [filter,setFilter]=useState<'All'|'Body Scrubs'|'Whipping Cream'>('All');
  const shown=filter==='All'?products:products.filter(p=>p.category===filter);
  return <main className="page"><div className="container"><span className="eyebrow">All body rituals</span><h1 className="h2 display">Pick your mood. Pick your texture.</h1><p className="sub">Four fruit-forward scrubs and two whipped creams — all ₹999 while the starter catalogue is live.</p><div className="filters" style={{margin:'24px 0 0'}}>{(['All','Body Scrubs','Whipping Cream'] as const).map(f=><button key={f} className={`filter ${filter===f?'active':''}`} onClick={()=>setFilter(f)}>{f}</button>)}</div><div className="product-grid" style={{marginTop:18}}>{shown.map(p=><ProductCard key={p.slug} product={p}/>)}</div></div></main>
}
