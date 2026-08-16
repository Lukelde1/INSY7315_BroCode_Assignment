"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { PageHeader } from "@/components/page-header";
import { formatCurrency, parentProfile } from "@/lib/data";

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl">
          <Card>
            <p className="text-sm text-muted">Loading...</p>
          </Card>
        </div>
      }
    >
      <ConfirmationInner />
    </Suspense>
  );
}

function ConfirmationInner() {
  const params = useSearchParams();
  const amount = Number(params.get("amount") ?? "4850");
  const method = params.get("method") === "eft" ? "Instant EFT" : "Card";

  const reference = useMemo(() => {
    const stamp = Date.now().toString().slice(-6);
    return `NC-${stamp}`;
  }, []);

  const paidAt = useMemo(
    () =>
      new Intl.DateTimeFormat("en-ZA", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date()),
    [],
  );

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        eyebrow="Payment complete"
        title="Payment successful"
        description="Your payment went through. You should get a confirmation email shortly."
      />

      <Card className="overflow-hidden !p-0 animate-fade-up">
        <div className="bg-gradient-to-r from-success to-teal-600 px-6 py-8 text-white sm:px-8">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <div>
              <Badge className="bg-white/20 text-white ring-white/25">Success</Badge>
              <h2 className="mt-3 text-2xl font-bold tracking-tight">
                Payment confirmed
              </h2>
              <p className="mt-1 text-sm text-teal-50">
                {formatCurrency(Number.isFinite(amount) ? amount : 0)} paid via {method}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">
            Transaction summary
          </h3>
          <dl className="mt-4 divide-y divide-border/80 rounded-2xl border border-border">
            <Row label="Reference" value={reference} />
            <Row label="Amount" value={formatCurrency(Number.isFinite(amount) ? amount : 0)} />
            <Row label="Method" value={`Netcash - ${method}`} />
            <Row label="Account holder" value={parentProfile.fullName} />
            <Row label="School" value={parentProfile.school} />
            <Row label="Date & time" value={paidAt} />
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/home">Back to home</Button>
            <Button href="/statement" variant="secondary">
              View statement
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="text-sm font-semibold text-brand-navy sm:text-right">
        {value}
      </dd>
    </div>
  );
}
