"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { PageHeader } from "@/components/page-header";
import { accountSummary, formatCurrency, parentProfile } from "@/lib/data";

type Method = "card" | "eft";

export default function PaymentPage() {
  const router = useRouter();
  const [amount, setAmount] = useState(
    accountSummary.outstandingBalance.toFixed(2),
  );
  const [method, setMethod] = useState<Method>("card");
  const [submitting, setSubmitting] = useState(false);

  const parsedAmount = useMemo(() => {
    const value = Number(amount);
    return Number.isFinite(value) ? value : 0;
  }, [amount]);

  const valid = parsedAmount > 0;

  function handlePay(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setSubmitting(true);
    const params = new URLSearchParams({
      amount: parsedAmount.toFixed(2),
      method,
    });
    router.push(`/payment/netcash?${params.toString()}`);
  }

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        eyebrow="Payments"
        title="Make a payment"
        description="Enter the amount and choose card or EFT, then continue to Netcash."
      />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="animate-fade-up">
          <form onSubmit={handlePay} className="space-y-6">
            <div>
              <label
                htmlFor="amount"
                className="mb-1.5 block text-sm font-medium text-brand-navy"
              >
                Payment amount (ZAR)
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-sm font-semibold text-muted">
                  R
                </span>
                <input
                  id="amount"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-xl border border-border bg-brand-blue-soft/30 py-3.5 pl-9 pr-3.5 text-lg font-semibold text-brand-navy outline-none transition focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/15"
                  required
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <AmountChip
                  label="Full balance"
                  onClick={() =>
                    setAmount(accountSummary.outstandingBalance.toFixed(2))
                  }
                />
                <AmountChip label="R 1,000" onClick={() => setAmount("1000.00")} />
                <AmountChip label="R 2,500" onClick={() => setAmount("2500.00")} />
              </div>
            </div>

            <fieldset>
              <legend className="mb-2 text-sm font-medium text-brand-navy">
                Payment method
              </legend>
              <div className="grid gap-3 sm:grid-cols-2">
                <MethodOption
                  selected={method === "card"}
                  onSelect={() => setMethod("card")}
                  title="Card"
                  subtitle="Visa / Mastercard via Netcash"
                  icon={<CardIcon />}
                />
                <MethodOption
                  selected={method === "eft"}
                  onSelect={() => setMethod("eft")}
                  title="EFT"
                  subtitle="Instant EFT via Netcash"
                  icon={<EftIcon />}
                />
              </div>
            </fieldset>

            <div className="rounded-2xl border border-border bg-slate-50/80 p-4 text-sm text-muted">
              You will be redirected to Netcash to finish this payment.
            </div>

            <Button
              type="submit"
              className="w-full py-3.5 text-base"
              disabled={!valid || submitting}
            >
              {submitting ? "Opening Netcash..." : "Pay with Netcash"}
            </Button>
          </form>
        </Card>

        <div className="space-y-6 animate-fade-up stagger-2">
          <Card>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              Account summary
            </p>
            <p className="mt-3 text-3xl font-bold text-brand-navy">
              {formatCurrency(accountSummary.outstandingBalance)}
            </p>
            <div className="mt-3">
              {accountSummary.inArrears ? (
                <Badge tone="danger">IN ARREARS</Badge>
              ) : (
                <Badge tone="success">Up to date</Badge>
              )}
            </div>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Parent</dt>
                <dd className="font-medium text-brand-navy">
                  {parentProfile.fullName}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">School</dt>
                <dd className="text-right font-medium text-brand-navy">
                  {parentProfile.school}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Paying now</dt>
                <dd className="font-semibold text-brand-blue">
                  {formatCurrency(parsedAmount)}
                </dd>
              </div>
            </dl>
          </Card>

          <Card className="bg-gradient-to-br from-brand-blue-soft/80 to-white">
            <h3 className="font-semibold text-brand-navy">About Netcash</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Payments are processed through Netcash. The school will update
              your account once the payment has gone through.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

function AmountChip({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-brand-navy transition hover:border-brand-blue hover:bg-brand-blue-soft"
    >
      {label}
    </button>
  );
}

function MethodOption({
  selected,
  onSelect,
  title,
  subtitle,
  icon,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`rounded-2xl border px-4 py-4 text-left transition ${
        selected
          ? "border-brand-blue bg-brand-blue-soft ring-4 ring-brand-blue/15"
          : "border-border bg-white hover:border-brand-blue/50 hover:bg-brand-blue-soft/40"
      }`}
    >
      <span className="flex items-start gap-3">
        <span
          className={`mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl ${
            selected ? "bg-brand-blue text-white" : "bg-slate-100 text-brand-navy"
          }`}
        >
          {icon}
        </span>
        <span>
          <span className="block text-sm font-semibold text-brand-navy">
            {title}
          </span>
          <span className="mt-0.5 block text-xs text-muted">{subtitle}</span>
        </span>
      </span>
    </button>
  );
}

function CardIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path strokeLinecap="round" d="M3 10h18" />
    </svg>
  );
}

function EftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 17h16M7 17V9.5L12 6l5 3.5V17" />
      <path strokeLinecap="round" d="M10 17v-3h4v3" />
    </svg>
  );
}
