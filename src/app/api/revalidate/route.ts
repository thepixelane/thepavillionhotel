import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PATHS = [
  "/",
  "/stay",
  "/booking-options",
  "/events",
  "/dining",
  "/gallery",
  "/contact",
];

function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a, "utf8");
  const bBuf = Buffer.from(b, "utf8");
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

function readProvidedSecret(request: NextRequest): string | null {
  const url = new URL(request.url);
  const query = url.searchParams.get("secret");
  if (query) return query;
  const header = request.headers.get("x-revalidate-secret");
  return header ?? null;
}

function authorize(request: NextRequest): NextResponse | null {
  const configured = process.env.REVALIDATE_SECRET;
  if (!configured) {
    return NextResponse.json(
      { error: "Revalidation is not configured on the server." },
      { status: 503 },
    );
  }
  const provided = readProvidedSecret(request);
  if (!provided || !safeEqual(provided, configured)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

function revalidateAll(): { paths: string[] } {
  for (const path of PATHS) {
    revalidatePath(path);
  }
  revalidatePath("/menu/[slug]", "page");
  return { paths: PATHS };
}

function respond(extras: Record<string, unknown> = {}) {
  const { paths } = revalidateAll();
  return NextResponse.json({
    revalidated: true,
    paths,
    timestamp: new Date().toISOString(),
    ...extras,
  });
}

export async function GET(request: NextRequest) {
  const failure = authorize(request);
  if (failure) return failure;
  return respond();
}

export async function POST(request: NextRequest) {
  const failure = authorize(request);
  if (failure) return failure;
  let payload: unknown = null;
  try {
    if (request.headers.get("content-type")?.includes("application/json")) {
      payload = await request.json();
    }
  } catch {
    payload = null;
  }
  return respond({ payload });
}
