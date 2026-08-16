export type TransactionType = "school-fees" | "camps-events" | "fundraising";

export type Transaction = {
  id: string;
  type: TransactionType;
  description: string;
  date: string;
  reference: string;
  amount: number;
  status: "posted" | "pending" | "paid";
};

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  time: string;
  category: "fees" | "fundraising" | "events" | "system";
  unread: boolean;
};

export const parentProfile = {
  fullName: "Sarah Naidoo",
  parentCode: "P-10482",
  phone: "+27 82 456 7890",
  email: "sarah.naidoo@email.co.za",
  address: "14 Protea Avenue, Durbanville, Cape Town, 7550",
  school: "Greenfield High School",
  learners: [
    { name: "Ethan Naidoo", grade: "Grade 10", learnerCode: "L-22041" },
    { name: "Mia Naidoo", grade: "Grade 7", learnerCode: "L-22088" },
  ],
};

export const accountSummary = {
  outstandingBalance: 4850,
  currency: "ZAR",
  inArrears: true,
  dueDate: "2026-07-31",
  lastPayment: {
    amount: 2500,
    date: "2026-06-12",
    method: "Netcash Card",
  },
  statementPeriod: "January - July 2026",
};

export const transactions: Transaction[] = [
  {
    id: "tx-sf-01",
    type: "school-fees",
    description: "School fees - Term 1 (Ethan & Mia)",
    date: "2026-01-15",
    reference: "SF-2026-T1",
    amount: 12500,
    status: "posted",
  },
  {
    id: "tx-sf-02",
    type: "school-fees",
    description: "School fees - Term 2 (Ethan & Mia)",
    date: "2026-04-10",
    reference: "SF-2026-T2",
    amount: 12500,
    status: "posted",
  },
  {
    id: "tx-sf-03",
    type: "school-fees",
    description: "Payment received - Netcash",
    date: "2026-02-03",
    reference: "PAY-88421",
    amount: -8000,
    status: "paid",
  },
  {
    id: "tx-sf-04",
    type: "school-fees",
    description: "Payment received - Netcash",
    date: "2026-06-12",
    reference: "PAY-91204",
    amount: -2500,
    status: "paid",
  },
  {
    id: "tx-sf-05",
    type: "school-fees",
    description: "Late payment levy",
    date: "2026-08-01",
    reference: "LEVY-0801",
    amount: 150,
    status: "posted",
  },
  {
    id: "tx-ce-01",
    type: "camps-events",
    description: "Grade 10 Adventure Camp - Ethan",
    date: "2026-03-18",
    reference: "CAMP-G10-26",
    amount: 1850,
    status: "posted",
  },
  {
    id: "tx-ce-02",
    type: "camps-events",
    description: "Inter-house Sports Day lunch pack - Mia",
    date: "2026-05-09",
    reference: "EVT-SPORT-26",
    amount: 120,
    status: "posted",
  },
  {
    id: "tx-ce-03",
    type: "camps-events",
    description: "Payment received - Camp deposit",
    date: "2026-03-20",
    reference: "PAY-89112",
    amount: -500,
    status: "paid",
  },
  {
    id: "tx-fr-01",
    type: "fundraising",
    description: "Annual Fun Run pledge",
    date: "2026-04-22",
    reference: "FR-FUNRUN-26",
    amount: 250,
    status: "posted",
  },
  {
    id: "tx-fr-02",
    type: "fundraising",
    description: "School raffle tickets (x4)",
    date: "2026-06-28",
    reference: "FR-RAFFLE-26",
    amount: 200,
    status: "pending",
  },
  {
    id: "tx-fr-03",
    type: "fundraising",
    description: "Library book drive contribution",
    date: "2026-07-14",
    reference: "FR-LIB-26",
    amount: 100,
    status: "posted",
  },
];

export const transactionGroups: {
  type: TransactionType;
  title: string;
  subtitle: string;
  compulsory?: boolean;
  optional?: boolean;
  conditional?: boolean;
}[] = [
  {
    type: "school-fees",
    title: "School fees",
    subtitle: "Tuition and related school fee charges",
    compulsory: true,
  },
  {
    type: "camps-events",
    title: "Camps & events",
    subtitle: "Only charged when your child is registered for them",
    conditional: true,
  },
  {
    type: "fundraising",
    title: "Fundraising",
    subtitle: "Optional fundraising amounts",
    optional: true,
  },
];

export const notifications: NotificationItem[] = [
  {
    id: "n1",
    title: "Account in arrears",
    body: "Your school fees account is overdue by R 4,850.00. Please pay the outstanding amount to avoid extra charges.",
    time: "Today · 08:12",
    category: "fees",
    unread: true,
  },
  {
    id: "n2",
    title: "Fundraising: Spring Fair raffle",
    body: "Raffle tickets for the Greenfield High Spring Fair are available under Fundraising on your statement.",
    time: "Yesterday · 16:40",
    category: "fundraising",
    unread: true,
  },
  {
    id: "n3",
    title: "Grade 10 camp reminder",
    body: "Ethan still has R 1,350.00 outstanding for Adventure Camp. Payment closes on 20 August 2026.",
    time: "2 Aug · 11:05",
    category: "events",
    unread: false,
  },
  {
    id: "n4",
    title: "Payment received",
    body: "Your Netcash payment of R 2,500.00 on 12 June 2026 has been received.",
    time: "12 Jun · 09:18",
    category: "fees",
    unread: false,
  },
  {
    id: "n5",
    title: "Statement available",
    body: "Your July 2026 statement is ready to view.",
    time: "1 Aug · 07:00",
    category: "system",
    unread: false,
  },
];

export function formatCurrency(amount: number) {
  const absolute = Math.abs(amount);
  const formatted = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 2,
  }).format(absolute);

  return amount < 0 ? `−${formatted}` : formatted;
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-ZA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function groupTotals(type: TransactionType) {
  return transactions
    .filter((t) => t.type === type)
    .reduce((sum, t) => sum + t.amount, 0);
}
