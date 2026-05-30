import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { expression } = await request.json();
    
    if (!expression) {
      return NextResponse.json({ error: "Expression required" }, { status: 400 });
    }

    // Proxy to MCP server
    const mcpResponse = await fetch(process.env.MCP_SERVER_URL + "/calculator", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expression }),
    });

    const result = await mcpResponse.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to compute expression" },
      { status: 500 }
    );
  }
}
