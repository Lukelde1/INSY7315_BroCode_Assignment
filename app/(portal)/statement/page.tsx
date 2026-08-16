import type { Metadata } from "next";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { PageHeader } from "@/components/page-header";
import {
  accountSummary,
  formatCurrency,
  formatDate,
  groupTotals,
  transactionGroups,
  transactions,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Statement",
};

export default function StatementPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow="Account"
        title="Statement"
        description={`Period: ${accountSummary.statementPeriod}. School fees, camps and fundraising are listed below.`}
        actions={
          <>
            <Button href="/payment">Pay now</Button>
            <Button variant="secondary" type="button">
              Download PDF
            </Button>
          </>
        }
      />

      <Card className="mb-6 animate-fade-up stagger-1">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted">Current outstanding balance</p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-brand-navy">
              {formatCurrency(accountSummary.outstandingBalance)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {accountSummary.inArrears ? (
              <Badge tone="danger">IN ARREARS</Badge>
            ) : null}
            <Badge tone="info">Due {formatDate(accountSummary.dueDate)}</Badge>
          </div>
        </div>
      </Card>

      <div className="space-y-6">
        {transactionGroups.map((group, index) => {
          const rows = transactions.filter((t) => t.type === group.type);
          const total = groupTotals(group.type);

          return (
            <Card
              key={group.type}
              padding={false}
              className={`overflow-hidden animate-fade-up stagger-${Math.min(index + 2, 4)}`}
            >
              <div className="flex flex-col gap-3 border-b border-border/80 bg-brand-blue-soft/40 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-bold text-brand-navy">
                      {group.title}
                    </h2>
                    {group.compulsory ? (
                      <Badge tone="info">Compulsory</Badge>
                    ) : null}
                    {group.conditional ? (
                      <Badge tone="warning">Conditional</Badge>
                    ) : null}
                    {group.optional ? (
                      <Badge tone="neutral">Optional</Badge>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-muted">{group.subtitle}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted">
                    Section total
                  </p>
                  <p
                    className={`text-lg font-bold ${
                      total > 0 ? "text-brand-navy" : "text-success"
                    }`}
                  >
                    {formatCurrency(total)}
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-50/80 text-xs uppercase tracking-wide text-muted">
                    <tr>
                      <th className="px-5 py-3 font-semibold sm:px-6">Date</th>
                      <th className="px-5 py-3 font-semibold sm:px-6">Description</th>
                      <th className="hidden px-5 py-3 font-semibold sm:table-cell sm:px-6">
                        Reference
                      </th>
                      <th className="px-5 py-3 font-semibold sm:px-6">Status</th>
                      <th className="px-5 py-3 text-right font-semibold sm:px-6">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/70">
                    {rows.map((row) => (
                      <tr
                        key={row.id}
                        className="transition-colors hover:bg-brand-blue-soft/30"
                      >
                        <td className="whitespace-nowrap px-5 py-3.5 text-muted sm:px-6">
                          {formatDate(row.date)}
                        </td>
                        <td className="px-5 py-3.5 font-medium text-brand-navy sm:px-6">
                          {row.description}
                        </td>
                        <td className="hidden whitespace-nowrap px-5 py-3.5 text-muted sm:table-cell sm:px-6">
                          {row.reference}
                        </td>
                        <td className="px-5 py-3.5 sm:px-6">
                          <StatusBadge status={row.status} />
                        </td>
                        <td
                          className={`whitespace-nowrap px-5 py-3.5 text-right font-semibold sm:px-6 ${
                            row.amount < 0 ? "text-success" : "text-brand-navy"
                          }`}
                        >
                          {formatCurrency(row.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: "posted" | "pending" | "paid" }) {
  if (status === "paid") return <Badge tone="success">Paid</Badge>;
  if (status === "pending") return <Badge tone="warning">Pending</Badge>;
  return <Badge tone="neutral">Posted</Badge>;
}
