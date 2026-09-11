import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json(
    { agentId: process.env.MARTHA_ELEVENLABS_AGENT_ID || null },
    { headers: { "Cache-Control": "no-store" } },
  );
}
