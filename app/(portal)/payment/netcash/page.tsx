"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/card";
import { Logo } from "@/components/logo";

export default function NetcashRedirectPage() {
  return (
    <Suspense
      fallback={
        <RedirectShell>
          <p className="text-sm text-muted">Opening Netcash...</p>
        </RedirectShell>
      }
    >
      <NetcashRedirectInner />
    </Suspense>
  );
}

function NetcashRedirectInner() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const amount = params.get("amount") ?? "4850.00";
    const method = params.get("method") ?? "card";
    const timer = window.setTimeout(() => {
      router.push(
        `/payment/confirmation?amount=${encodeURIComponent(amount)}&method=${encodeURIComponent(method)}`,
      );
    }, 2200);
    return () => window.clearTimeout(timer);
  }, [params, router]);

  return (
    <RedirectShell>
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue-soft">
        <span className="h-8 w-8 animate-pulse-soft rounded-full border-[3px] border-brand-blue border-t-transparent" />
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-brand-navy">
        Redirecting to Netcash...
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Please wait while we send you to the Netcash payment page.
      </p>
      <div className="mt-8 h-1.5 overflow-hidden rounded-full bg-brand-blue-muted">
        <div className="h-full w-2/3 animate-pulse-soft rounded-full bg-brand-blue" />
      </div>
    </RedirectShell>
  );
}

function RedirectShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-2">
      <div className="mb-8">
        <Logo href={false} />
      </div>
      <Card className="w-full text-center animate-fade-up">{children}</Card>
      <p className="mt-6 text-xs text-muted">Netcash payment - Saspac Parent Portal</p>
    </div>
  );
}
