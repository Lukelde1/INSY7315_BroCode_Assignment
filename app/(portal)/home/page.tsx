import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { PageHeader } from "@/components/page-header";
import {
  accountSummary,
  formatCurrency,
  formatDate,
  notifications,
  parentProfile,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow="Dashboard"
        title={`Hi, ${parentProfile.fullName.split(" ")[0]}`}
        description={`${parentProfile.school} | Parent code ${parentProfile.parentCode}`}
        actions={
          <Button href="/payment">
            Make a payment
            <ArrowIcon />
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
        <Card className="relative overflow-hidden animate-fade-up stagger-1 !p-0">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-mid to-[#2a4a78]" />
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-brand-blue/30 blur-3xl" />
          <div className="absolute -bottom-16 left-20 h-40 w-40 rounded-full bg-brand-blue/20 blur-3xl" />

          <div className="relative p-6 text-white sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-brand-blue-muted">
                  Outstanding balance
                </p>
                <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                  {formatCurrency(accountSummary.outstandingBalance)}
                </p>
              </div>
              {accountSummary.inArrears ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-[#ef4444] px-3.5 py-1.5 text-xs font-bold tracking-wide text-white shadow-lg shadow-black/25 ring-2 ring-white/90">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-white" />
                  IN ARREARS
                </span>
              ) : (
                <Badge tone="success">Up to date</Badge>
              )}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Meta
                label="Due date"
                value={formatDate(accountSummary.dueDate)}
              />
              <Meta
                label="Last payment"
                value={formatCurrency(accountSummary.lastPayment.amount)}
              />
              <Meta
                label="Paid on"
                value={formatDate(accountSummary.lastPayment.date)}
              />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/payment"
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-brand-navy shadow-lg shadow-black/20 transition hover:bg-[#e7f3fb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
              >
                Pay outstanding balance
              </Link>
              <Link
                href="/statement"
                className="inline-flex items-center justify-center rounded-xl border-2 border-white/70 bg-transparent px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
              >
                View statement
              </Link>
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-6 animate-fade-up stagger-2">
          <Card>
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">
              Learners
            </h2>
            <ul className="mt-4 space-y-3">
              {parentProfile.learners.map((learner) => (
                <li
                  key={learner.learnerCode}
                  className="flex items-center justify-between rounded-xl border border-border/70 bg-brand-blue-soft/35 px-3.5 py-3"
                >
                  <div>
                    <p className="font-semibold text-brand-navy">{learner.name}</p>
                    <p className="text-xs text-muted">{learner.learnerCode}</p>
                  </div>
                  <Badge tone="info">{learner.grade}</Badge>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">
                Quick actions
              </h2>
            </div>
            <div className="mt-4 grid gap-2">
              <QuickLink href="/statement" title="Account statement" subtitle="Fees, camps & fundraising" />
              <QuickLink href="/notifications" title="Notifications" subtitle={`${unread} unread alerts`} />
              <QuickLink href="/profile" title="Update profile" subtitle="Phone, email & address" />
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3 animate-fade-up stagger-3">
        <SummaryTile
          title="School fees"
          detail="Compulsory charges for Term 1 and Term 2"
          accent="from-brand-blue/15 to-transparent"
        />
        <SummaryTile
          title="Camps & events"
          detail="Only charged if your child is enrolled"
          accent="from-teal-500/10 to-transparent"
        />
        <SummaryTile
          title="Fundraising"
          detail="Optional fundraising amounts"
          accent="from-amber-500/10 to-transparent"
        />
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-3">
      <p className="text-xs text-brand-blue-muted">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function QuickLink({
  href,
  title,
  subtitle,
}: {
  href: string;
  title: string;
  subtitle: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-xl border border-transparent px-3 py-2.5 transition hover:border-border hover:bg-brand-blue-soft/50"
    >
      <span>
        <span className="block text-sm font-semibold text-brand-navy">{title}</span>
        <span className="block text-xs text-muted">{subtitle}</span>
      </span>
      <span className="text-brand-blue transition group-hover:translate-x-0.5">→</span>
    </Link>
  );
}

function SummaryTile({
  title,
  detail,
  accent,
}: {
  title: string;
  detail: string;
  accent: string;
}) {
  return (
    <Card className={`relative overflow-hidden bg-gradient-to-br ${accent}`}>
      <h3 className="font-semibold text-brand-navy">{title}</h3>
      <p className="mt-1.5 text-sm text-muted">{detail}</p>
      <Link
        href="/statement"
        className="mt-4 inline-flex text-sm font-semibold text-brand-blue hover:text-brand-blue-dark"
      >
        View on statement →
      </Link>
    </Card>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}
