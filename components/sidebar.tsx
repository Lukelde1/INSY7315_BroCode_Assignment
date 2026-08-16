"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { parentProfile } from "@/lib/data";

const navItems = [
  {
    href: "/home",
    label: "Home",
    icon: HomeIcon,
  },
  {
    href: "/statement",
    label: "Statement",
    icon: StatementIcon,
  },
  {
    href: "/payment",
    label: "Payment",
    icon: PaymentIcon,
  },
  {
    href: "/notifications",
    label: "Notifications",
    icon: BellIcon,
    badge: 2,
  },
  {
    href: "/profile",
    label: "Profile",
    icon: ProfileIcon,
  },
] as const;

type SidebarProps = {
  onNavigate?: () => void;
};

export function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col bg-brand-navy text-white">
      <div className="border-b border-white/10 px-6 py-6">
        <Logo variant="light" href="/home" />
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-5" aria-label="Main">
        {navItems.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/25"
                  : "text-brand-blue-muted hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon active={active} />
              <span className="flex-1">{item.label}</span>
              {"badge" in item && item.badge ? (
                <span
                  className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[0.68rem] font-semibold ${
                    active
                      ? "bg-white/20 text-white"
                      : "bg-brand-blue text-white"
                  }`}
                >
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-white/10 p-4">
        <div className="rounded-2xl bg-white/6 p-4 ring-1 ring-white/10">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-brand-blue-muted">
            Signed in as
          </p>
          <p className="mt-1.5 truncate text-sm font-semibold text-white">
            {parentProfile.fullName}
          </p>
          <p className="mt-0.5 truncate text-xs text-brand-blue-muted">
            {parentProfile.school}
          </p>
          <Link
            href="/login"
            onClick={onNavigate}
            className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10"
          >
            Sign out
          </Link>
        </div>
      </div>
    </aside>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={active ? 2.2 : 1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.5 10.5 12 4l8.5 6.5M6 9.5V19a1 1 0 0 0 1 1h4.5v-5h1V20H17a1 1 0 0 0 1-1V9.5"
      />
    </svg>
  );
}

function StatementIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={active ? 2.2 : 1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
      />
      <path strokeLinecap="round" d="M8.5 9h7M8.5 12.5h7M8.5 16h4" />
    </svg>
  );
}

function PaymentIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={active ? 2.2 : 1.8}
    >
      <rect x="3" y="6" width="18" height="12" rx="2.5" />
      <path strokeLinecap="round" d="M3 10h18M7 15h3" />
    </svg>
  );
}

function BellIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={active ? 2.2 : 1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.5 16.5h11l-1.2-1.8V11a4.3 4.3 0 1 0-8.6 0v3.7L6.5 16.5Z"
      />
      <path strokeLinecap="round" d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={active ? 2.2 : 1.8}
    >
      <circle cx="12" cy="9" r="3.2" />
      <path
        strokeLinecap="round"
        d="M5.5 19.2c1.4-2.6 3.7-3.9 6.5-3.9s5.1 1.3 6.5 3.9"
      />
    </svg>
  );
}
