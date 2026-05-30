import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature") || "";
  // Stripe webhook handling requires the `stripe` npm package
  // See: https://stripe.com/docs/webhooks
  return NextResponse.json({ received: true });
}
