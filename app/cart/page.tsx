'use client';

import Link from 'next/link';
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../../components/cart-context';

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  if (!items.length) {
    return (
      <main className="page">
        <div className="container">
          <div className="success">
            <div className="success-icon"><ShoppingBag /></div>
            <h1 className="h2 display" style={{ fontSize: 48 }}>Your cart is waiting for a little fun.</h1>
            <p className="sub" style={{ margin: '0 auto 22px' }}>
              Add a scrub or a whip and come back here when you're ready to checkout.
            </p>
            <Link href="/#products" className="btn btn-primary">Shop body rituals</Link>
          </div>
        </div>
      </main>
    );
  }

  const shipping = subtotal >= 1499 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <main className="page">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/#products"><ArrowLeft size={14} style={{ verticalAlign: '-2px' }} /> Continue shopping</Link>
        </div>
        <h1 className="h2 display">Your shower shelf</h1>
        <div className="cart-grid">
          <div className="list-card">
            {items.map((item) => (
              <div className="cart-row" key={item.slug}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.category} • ₹{item.price.toLocaleString('en-IN')}</p>
                  <div className="qty">
                    <button onClick={() => updateQuantity(item.slug, item.quantity - 1)}><Minus size={14} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.slug, item.quantity + 1)}><Plus size={14} /></button>
                  </div>
                </div>
                <div>
                  <div className="line-total">₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
                  <button
                    onClick={() => removeItem(item.slug)}
                    style={{ border: 0, background: 'transparent', marginTop: 10, color: 'var(--pink-deep)' }}
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <aside className="summary-card">
            <h2 className="summary-title">Order summary</h2>
            <div className="summary-line"><span>Subtotal</span><strong>₹{subtotal.toLocaleString('en-IN')}</strong></div>
            <div className="summary-line"><span>Shipping</span><strong>{shipping ? '₹99' : 'FREE'}</strong></div>
            <div className="summary-total"><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
            <Link href="/checkout" className="btn btn-primary" style={{ width: '100%', marginTop: 18 }}>Continue to checkout</Link>
            <p style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5, marginTop: 12 }}>
              Cash on delivery is enabled for now.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
