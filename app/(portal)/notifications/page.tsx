import type { Metadata } from "next";
import { Badge } from "@/components/badge";
import { Card } from "@/components/card";
import { PageHeader } from "@/components/page-header";
import { notifications } from "@/lib/data";

export const metadata: Metadata = {
  title: "Notifications",
};

const categoryTone = {
  fees: "danger",
  fundraising: "warning",
  events: "info",
  system: "neutral",
} as const;

const categoryLabel = {
  fees: "Fees",
  fundraising: "Fundraising",
  events: "Events",
  system: "System",
} as const;

export default function NotificationsPage() {
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        eyebrow="Inbox"
        title="Notifications"
        description={`${unread} unread. Messages about fees, fundraising and school events.`}
      />

      <div className="space-y-3">
        {notifications.map((item, index) => (
          <Card
            key={item.id}
            className={`animate-fade-up stagger-${Math.min(index + 1, 4)} transition hover:shadow-elevated ${
              item.unread
                ? "border-brand-blue/30 bg-gradient-to-r from-brand-blue-soft/60 to-white"
                : ""
            }`}
          >
            <div className="flex items-start gap-4">
              <span
                className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  item.unread
                    ? "bg-brand-blue text-white"
                    : "bg-slate-100 text-brand-navy"
                }`}
              >
                <BellIcon />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-semibold text-brand-navy">{item.title}</h2>
                  {item.unread ? (
                    <span className="h-2 w-2 rounded-full bg-brand-blue" aria-label="Unread" />
                  ) : null}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Badge tone={categoryTone[item.category]}>
                    {categoryLabel[item.category]}
                  </Badge>
                  <span className="text-xs text-muted">{item.time}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.5 16.5h11l-1.2-1.8V11a4.3 4.3 0 1 0-8.6 0v3.7L6.5 16.5Z"
      />
      <path strokeLinecap="round" d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  );
}
