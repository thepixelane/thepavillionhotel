import Image from "next/image";
import logo from "@/assets/logo.svg";

export type LoadingLayout = "home" | "immersive" | "cards" | "gallery" | "split" | "article";

function Skeleton({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`loading-skeleton ${className}`} />;
}

function HeadingSkeleton() {
  return (
    <div className="max-w-3xl">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="mt-5 h-12 w-4/5 sm:h-16" />
      <Skeleton className="mt-5 h-4 w-full" />
      <Skeleton className="mt-3 h-4 w-2/3" />
    </div>
  );
}

function CardSkeleton({ horizontal = false }: { horizontal?: boolean }) {
  return (
    <div className={`overflow-hidden border border-line bg-surface ${horizontal ? "lg:grid lg:grid-cols-2" : ""}`}>
      <Skeleton className={horizontal ? "min-h-64 lg:min-h-96" : "aspect-4/3"} />
      <div className="p-6 sm:p-8">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="mt-5 h-9 w-3/4" />
        <Skeleton className="mt-5 h-4 w-full" />
        <Skeleton className="mt-3 h-4 w-5/6" />
        <Skeleton className="mt-7 h-10 w-32" />
      </div>
    </div>
  );
}

function LayoutSkeleton({ layout }: { layout: LoadingLayout }) {
  if (layout === "home") {
    return (
      <div aria-hidden="true">
        <Skeleton className="h-[55svh] w-full" />
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Skeleton className="mx-auto h-36 w-40" />
            <Skeleton className="mx-auto mt-8 h-5 w-11/12" />
            <Skeleton className="mx-auto mt-3 h-5 w-3/4" />
          </div>
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {[0, 1, 2].map((item) => <CardSkeleton key={item} />)}
          </div>
        </div>
      </div>
    );
  }

  if (layout === "immersive") {
    return (
      <div aria-hidden="true">
        <Skeleton className="h-[58svh] w-full" />
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <HeadingSkeleton />
          <div className="mt-12 grid gap-8">
            {[0, 1].map((item) => <CardSkeleton key={item} horizontal />)}
          </div>
        </div>
      </div>
    );
  }

  if (layout === "gallery") {
    return (
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8" aria-hidden="true">
        <HeadingSkeleton />
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {["aspect-square", "aspect-4/5", "aspect-square", "aspect-4/5", "aspect-4/5", "aspect-square", "aspect-4/5", "aspect-square"].map((shape, index) => (
            <Skeleton key={index} className={shape} />
          ))}
        </div>
      </div>
    );
  }

  if (layout === "split") {
    return (
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-2 lg:px-8" aria-hidden="true">
        <div>
          <HeadingSkeleton />
          <Skeleton className="mt-10 h-72 w-full rounded-sm" />
        </div>
        <Skeleton className="min-h-136 w-full rounded-sm" />
      </div>
    );
  }

  if (layout === "article") {
    return (
      <div className="mx-auto max-w-4xl px-5 py-14 lg:px-8" aria-hidden="true">
        <HeadingSkeleton />
        <Skeleton className="mt-10 aspect-video w-full" />
        <div className="mt-10 space-y-4">
          {["w-full", "w-11/12", "w-full", "w-4/5", "w-full", "w-2/3"].map((width, index) => <Skeleton key={index} className={`h-4 ${width}`} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8" aria-hidden="true">
      <HeadingSkeleton />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((item) => <CardSkeleton key={item} />)}
      </div>
    </div>
  );
}

export function SiteLoading({ layout = "cards" }: { layout?: LoadingLayout }) {
  return (
    <main role="status" aria-live="polite" aria-label="Loading page">
      <div className="grid min-h-[42svh] place-items-center bg-bg px-5 py-12">
        <div className="text-center">
          <div className="loading-logo-breathe relative mx-auto h-40 w-44 overflow-hidden rounded-sm border border-line bg-[#f6f6f6] shadow-[0_14px_45px_rgba(20,38,30,0.12)] sm:h-44 sm:w-48">
            <Image src={logo} alt="" fill priority className="object-contain p-3" sizes="192px" />
          </div>
          <div className="loading-dots mt-6 flex items-center justify-center gap-2" aria-hidden="true">
            <span /><span /><span />
          </div>
          <span className="sr-only">Loading The Pavillion Hotel</span>
        </div>
      </div>
      <LayoutSkeleton layout={layout} />
    </main>
  );
}