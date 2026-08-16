"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/logo";
import { Button } from "@/components/button";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("sarah.naidoo@email.co.za");
  const [password, setPassword] = useState("••••••••");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      router.push("/home");
    }, 650);
  }

  return (
    <div className="bg-login-atmosphere relative min-h-screen overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-fade-up text-white">
            <Logo variant="light" href={false} />
            <h1 className="mt-10 max-w-lg text-4xl font-bold tracking-tight sm:text-5xl">
              View and pay school fees online
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-brand-blue-muted">
              Sign in to check your statement, pay outstanding balances, and
              see messages from the school.
            </p>
            <dl className="mt-10 grid max-w-md grid-cols-2 gap-4 text-sm">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <dt className="text-brand-blue-muted">Statements</dt>
                <dd className="mt-1 text-lg font-semibold text-white">Online</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <dt className="text-brand-blue-muted">Payments</dt>
                <dd className="mt-1 text-lg font-semibold text-white">Netcash</dd>
              </div>
            </dl>
          </div>

          <div className="animate-fade-up stagger-2">
            <div className="rounded-[1.75rem] border border-white/15 bg-white p-6 shadow-elevated sm:p-8">
              <div className="mb-7">
                <h2 className="text-2xl font-bold tracking-tight text-brand-navy">
                  Sign in
                </h2>
                <p className="mt-1.5 text-sm text-muted">
                  Enter your email and password to continue.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-brand-navy"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-border bg-brand-blue-soft/40 px-3.5 py-3 text-sm text-brand-navy outline-none transition focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/15"
                    required
                  />
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-brand-navy"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      className="text-xs font-semibold text-brand-blue hover:text-brand-blue-dark"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-border bg-brand-blue-soft/40 px-3.5 py-3 text-sm text-brand-navy outline-none transition focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/15"
                    required
                  />
                </div>

                <label className="flex items-center gap-2.5 text-sm text-muted">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-border text-brand-blue focus:ring-brand-blue"
                  />
                  Keep me signed in on this device
                </label>

                <Button
                  type="submit"
                  className="w-full py-3"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-muted">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-brand-blue hover:text-brand-blue-dark"
                >
                  Sign up
                </Link>
              </p>

              <p className="mt-3 text-center text-xs leading-relaxed text-muted">
                Forgot your login details? Contact the school office for help.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
