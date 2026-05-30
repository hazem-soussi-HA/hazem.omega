import { NextResponse } from "next/server";
import { getAuthSession, saveProgress, getProgress } from "@/lib/supabaseClient";

export async function GET(request: Request) {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json({ progress: [] }, { status: 401 });
  }

  const url = new URL(request.url);
  const courseId = url.searchParams.get("courseId");

  if (!courseId) {
    return NextResponse.json({ progress: [] });
  }

  const progress = await getProgress(session.user.id, courseId);
  return NextResponse.json({ progress });
}

export async function POST(request: Request) {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { courseId, lessonId, completed } = await request.json();

  const success = await saveProgress(session.user.id, courseId, lessonId, completed);

  return NextResponse.json({ success });
}
