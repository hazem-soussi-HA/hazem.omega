import { headers } from "next/headers";

export async function createCheckoutSession(priceId: string, userId: string) {
  // Stripe integration placeholder — requires `stripe` npm package
  return {
    url: `/services?checkout=simulated&price=${priceId}&user=${userId}`,
  };
}

export async function handleWebhook() {
  return new Response("OK", { status: 200 });
}
