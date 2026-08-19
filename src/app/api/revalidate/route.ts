import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const PATHS = ["/", "/stay", "/events", "/dining", "/gallery", "/contact", "/blog", "/offers", "/services"];

export async function GET() {
  for (const path of PATHS) {
    revalidatePath(path);
  }
  revalidatePath("/blog", "layout");
  return NextResponse.json({ revalidated: true, paths: PATHS, timestamp: new Date().toISOString() });
}
