import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ ok:false, message:'Invalid order payload' }, { status:400 });
  // Demo backend endpoint: in production, connect this handler to PostgreSQL/Supabase.
  return NextResponse.json({ ok:true, orderId: body.id, mode:'COD' });
}
