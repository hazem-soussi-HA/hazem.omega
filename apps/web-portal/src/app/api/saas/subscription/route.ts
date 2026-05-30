import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/supabaseClient";

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ subscribed: false, plan: "free" });
    }

    // In production, query Supabase
    return NextResponse.json({
      subscribed: true,
      plan: "premium",
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    });
  } catch {
    return NextResponse.json({ subscribed: false, plan: "free" });
  }
}
