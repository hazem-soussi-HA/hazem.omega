import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = supabaseUrl
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export async function getAuthSession() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function getProgress(userId: string, courseId: string) {
  if (!supabase) return [];
  const { data } = await supabase
    .from("course_progress")
    .select("*")
    .eq("user_id", userId)
    .eq("course_id", courseId);
  return data || [];
}

export async function saveProgress(
  userId: string,
  courseId: string,
  lessonId: string,
  completed: boolean
) {
  if (!supabase) return false;
  const { error } = await supabase.from("course_progress").upsert({
    user_id: userId,
    course_id: courseId,
    lesson_id: lessonId,
    completed,
    completed_at: completed ? new Date().toISOString() : null,
  });
  return !error;
}
