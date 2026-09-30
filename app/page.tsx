'use client';

import Link from 'next/link';
import { ArrowRight, Check, Sparkles, Star } from 'lucide-react';
import { ProductCard } from '../components/product-card';
import { products } from '../lib/products';
import { useCart } from '../components/cart-context';

const categoryCards = [
  {title:'Lime + Coconut', subtitle:'Fresh & hydrating', image:'/assets/products/lime-coconut.png'},
  {title:'Papaya + Pomegranate', subtitle:'Glow & polish', image:'/assets/products/papaya-pomegranate.png'},
  {title:'Turmeric + Saffron', subtitle:'Warm & smooth', image:'/assets/products/turmeric-saffron.png'},
  {title:'Peach + Cherry', subtitle:'Soft & sweet', image:'/assets/products/peach-cherry-blossom.png'},
  {title:'Whipping Creams', subtitle:'Plush moisture', image:'/assets/brand/cream-unicorn.png'},
  {title:'Rainbow Whips', subtitle:'Mood-boosting body care', image:'/assets/brand/cream-swirls.png'},
];

export default function Home() {
  const { addItem } = useCart();
  const featured = products.slice(0,4);
  return <main>
    <section className="hero"><div className="container hero-grid">
      <div className="hero-copy">
        <span className="eyebrow"><Sparkles size={13}/> Body care, but make it fun</span>
        <h1>Your skin's new <span>favourite</span> flavour.</h1>
        <p>Whipped textures, fruity scents and soft-skin finishes designed to turn an ordinary shower into your best little ritual.</p>
        <div className="hero-cta"><Link href="#shop" className="btn btn-primary">Shop the shower <ArrowRight size={17}/></Link><Link href="#ritual" className="btn btn-secondary">Build my ritual</Link></div>
        <div className="hero-points"><span className="hero-point"><Check size={17} color="#5e8c16"/> <b>Playful textures</b></span><span className="hero-point"><Check size={17} color="#5e8c16"/> <b>Body-first routines</b></span><span className="hero-point"><Check size={17} color="#5e8c16"/> <b>COD available</b></span></div>
      </div>
      <div className="hero-art">
        <div className="hero-aura"/>
        <img className="hero-image" src="/assets/brand/scrub-family.png" alt="Sundae Club body scrub collection"/>
        <div className="hero-bubble">TODAY'S MOOD ✦ <strong>SOFT + JUICY</strong></div>
        <img className="float-jar one" src="/assets/products/lime-coconut.png" alt="Lime and coconut scrub"/>
        <img className="float-jar two" src="/assets/brand/cream-unicorn.png" alt="Unicorn fruit whipping cream"/>
      </div>
    </div></section>

    <div className="marquee"><div className="marquee-track">{Array.from({length:2}).flatMap(()=>['GENTLE EXFOLIATION','DEEP HYDRATION','SOFT & SMOOTH SKIN','FRUITY FRAGRANCE','PLAYFUL RITUALS','VEGAN-MOOD ENERGY','SHOWER INDULGE']).map((t,i)=><span key={i}>✦ {t}</span>)}</div></div>

    <section className="section" id="shop"><div className="container">
      <div style={{textAlign:'center'}}><span className="eyebrow">Pick your shower mood</span><h2 className="h2 display">What are you craving today?</h2><p className="sub" style={{margin:'0 auto'}}>Fresh, glow-y, sweet or full dessert mode. Start with the texture or scent that makes you want to jump in the shower.</p></div>
      <div className="category-row">{categoryCards.map((c)=><Link key={c.title} href="#products" className="category"><img src={c.image} alt={c.title}/><b>{c.title}</b><span>{c.subtitle}</span></Link>)}</div>
    </div></section>

    <section className="section" style={{paddingTop:20}} id="products"><div className="container">
      <div className="product-head"><div><span className="eyebrow">Flat ₹999</span><h2 className="h2 display">The shower shelf</h2></div><div className="filters"><span className="filter active">All</span><span className="filter">Scrubs</span><span className="filter">Whipping creams</span></div></div>
      <div className="product-grid">{products.map((p)=><ProductCard key={p.slug} product={p}/>)}</div>
    </div></section>

    <section className="section"><div className="container"><div className="experience">
      <div className="ex-card"><img src="/assets/brand/scrub-family.png" alt="Colourful body scrub textures"/><div className="ex-copy"><div className="mini">Texture obsessed</div><h3>Looks like dessert. Feels like skincare.</h3><p>We want the texture to be part of the experience — creamy, colourful and impossible not to touch.</p><div className="ex-swatch-row"><span className="swatch" style={{background:'#cbe398'}}/><span className="swatch" style={{background:'#f6b27d'}}/><span className="swatch" style={{background:'#ffcadc'}}/><span className="swatch" style={{background:'#f3dd87'}}/></div></div></div>
      <div className="ex-card" style={{background:'#fff1eb'}}><img src="/assets/brand/cream-swirls.png" alt="Rainbow whipped cream texture"/><div className="ex-copy"><div className="mini">Whipped body care</div><h3>Moisture, with main-character energy.</h3><p>From cloud-soft creams to rainbow swirls, every product is built to make the ritual more fun.</p><Link href="/product/unicorn-fruit-whipping-cream" className="btn btn-secondary" style={{background:'#fff'}}>Try a whip <ArrowRight size={17}/></Link></div></div>
    </div></div></section>

    <section className="section" id="ritual"><div className="container"><div className="ritual"><div className="ritual-grid"><div><span className="eyebrow" style={{background:'rgba(255,255,255,.12)',color:'#ffdce6',borderColor:'rgba(255,255,255,.14)'}}>Build a little ritual</span><h2>One scrub. One whip. Zero boring showers.</h2><p>Pair a mood-matching scrub with a whipped body cream and make your 2-step body routine feel like a tiny reward.</p><Link href="/shop" className="btn btn-primary">Shop the pair <ArrowRight size={17}/></Link></div><div className="ritual-list">{[
      ['Fresh start','Lime + Coconut','Cool, clean and juicy'],['Glow hour','Papaya + Pomegranate','Warm, bright and fruity'],['Soft girl shower','Peach + Cherry','Sweet, floral, comforting'],['Dessert mode','Unicorn Fruit','Fluffy, colourful, rich']
    ].map(([a,b,c])=><button key={b} className="ritual-chip" onClick={()=>{const product=products.find(p=>p.name.includes(b.split(' + ')[0])); if(product) addItem(product);}}><strong>{a}</strong><span>{b} • {c}</span></button>)}</div></div></div></div></section>

    <section className="section"><div className="container"><div className="bundle"><div className="bundle-copy"><span className="eyebrow">Club combo</span><h2 className="h2 display">The ultimate shower duo.</h2><p className="sub">Pick any two body rituals. Keep the price simple: ₹999 each. Pair a scrub + whip and you're ready.</p><div className="bundle-price">₹1,998 <span style={{fontSize:13,color:'var(--muted)',fontWeight:700}}>for two</span></div><Link href="/shop" className="btn btn-primary">Pick my duo <ArrowRight size={17}/></Link></div><div className="bundle-art"><img src="/assets/brand/scrub-family.png" alt="Sundae Club body scrub duo"/></div></div></div></section>

    <section className="section" id="reviews"><div className="container"><div style={{textAlign:'center'}}><span className="eyebrow">The club says</span><h2 className="h2 display">Small ritual. Big mood.</h2></div><div className="testimonials">
      {[['“My shower feels like a little treat now. The texture is unreal.”','Aarushi • Mumbai'],['“The lime + coconut one smells like a holiday. I keep reaching for it.”','Rhea • Delhi'],['“I bought it for the colours. Kept it for the soft-skin feel.”','Mehak • Bengaluru']].map(([quote,who])=><div key={who} className="testimonial"><div className="stars"><Star size={15} fill="currentColor"/> <Star size={15} fill="currentColor"/> <Star size={15} fill="currentColor"/> <Star size={15} fill="currentColor"/> <Star size={15} fill="currentColor"/></div><p>{quote}</p><small>{who}</small></div>)}
    </div></div></section>
  </main>
}
