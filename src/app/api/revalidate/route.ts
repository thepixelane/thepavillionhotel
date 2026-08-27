import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const PATHS = ["/", "/stay", "/booking-options", "/events", "/dining", "/gallery", "/contact", "/blog", "/offers"];

export async function GET() {
  for (const path of PATHS) {
    revalidatePath(path);
  }
  revalidatePath("/blog", "layout");
  return NextResponse.json({ revalidated: true, paths: PATHS, timestamp: new Date().toISOString() });
}
