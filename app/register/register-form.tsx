"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/logo";
import { Button } from "@/components/button";

const schools = [
  "Greenfield High School",
  "Rondebosch Boys High",
  "Laerskool Stellenbosch",
  "Curro Durbanville",
  "Cape Recife High School",
];

const inputClass =
  "w-full rounded-xl border border-border bg-brand-blue-soft/40 px-3.5 py-3 text-sm text-brand-navy outline-none transition focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/15";

export function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    idNumber: "",
    school: schools[0],
    learnerCode: "",
    address: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (error) setError("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!form.acceptTerms) {
      setError("Please accept the terms to continue.");
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      router.push("/home");
    }, 700);
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
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="animate-fade-up text-white lg:sticky lg:top-10">
            <Logo variant="light" href={false} />
            <h1 className="mt-10 max-w-lg text-4xl font-bold tracking-tight sm:text-5xl">
              Register as a parent
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-brand-blue-muted">
              Create an account so you can view fee statements, make payments,
              and get updates about your children.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-brand-blue-muted">
              <li className="flex items-start gap-2.5">
                <CheckIcon />
                Link your account with a learner or admission code
              </li>
              <li className="flex items-start gap-2.5">
                <CheckIcon />
                See school fees, camps, and fundraising on one statement
              </li>
              <li className="flex items-start gap-2.5">
                <CheckIcon />
                Pay online using Netcash
              </li>
            </ul>
          </div>

          <div className="animate-fade-up stagger-2">
            <div className="rounded-[1.75rem] border border-white/15 bg-white p-6 shadow-elevated sm:p-8">
              <div className="mb-7">
                <h2 className="text-2xl font-bold tracking-tight text-brand-navy">
                  Sign up
                </h2>
                <p className="mt-1.5 text-sm text-muted">
                  Fill in your details below.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="First name" htmlFor="firstName">
                    <input
                      id="firstName"
                      autoComplete="given-name"
                      value={form.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                      className={inputClass}
                      required
                    />
                  </Field>
                  <Field label="Last name" htmlFor="lastName">
                    <input
                      id="lastName"
                      autoComplete="family-name"
                      value={form.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                      className={inputClass}
                      required
                    />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Email address" htmlFor="reg-email">
                    <input
                      id="reg-email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className={inputClass}
                      required
                    />
                  </Field>
                  <Field label="Mobile number" htmlFor="phone">
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+27 82 000 0000"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className={inputClass}
                      required
                    />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="South African ID number" htmlFor="idNumber">
                    <input
                      id="idNumber"
                      inputMode="numeric"
                      autoComplete="off"
                      placeholder="13-digit ID number"
                      value={form.idNumber}
                      onChange={(e) => update("idNumber", e.target.value)}
                      className={inputClass}
                      required
                      minLength={13}
                      maxLength={13}
                    />
                  </Field>
                  <Field label="School" htmlFor="school">
                    <select
                      id="school"
                      value={form.school}
                      onChange={(e) => update("school", e.target.value)}
                      className={inputClass}
                      required
                    >
                      {schools.map((school) => (
                        <option key={school} value={school}>
                          {school}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field
                  label="Learner / admission code"
                  htmlFor="learnerCode"
                  hint="Ask the school for this code if you do not have it"
                >
                  <input
                    id="learnerCode"
                    autoComplete="off"
                    placeholder="e.g. L-22041"
                    value={form.learnerCode}
                    onChange={(e) => update("learnerCode", e.target.value)}
                    className={inputClass}
                    required
                  />
                </Field>

                <Field label="Residential address" htmlFor="address">
                  <textarea
                    id="address"
                    rows={2}
                    autoComplete="street-address"
                    value={form.address}
                    onChange={(e) => update("address", e.target.value)}
                    className={`${inputClass} resize-y`}
                    required
                  />
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Password" htmlFor="reg-password">
                    <input
                      id="reg-password"
                      type="password"
                      autoComplete="new-password"
                      value={form.password}
                      onChange={(e) => update("password", e.target.value)}
                      className={inputClass}
                      required
                      minLength={8}
                    />
                  </Field>
                  <Field label="Confirm password" htmlFor="confirmPassword">
                    <input
                      id="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      value={form.confirmPassword}
                      onChange={(e) => update("confirmPassword", e.target.value)}
                      className={inputClass}
                      required
                      minLength={8}
                    />
                  </Field>
                </div>

                <label className="flex items-start gap-2.5 text-sm text-muted">
                  <input
                    type="checkbox"
                    checked={form.acceptTerms}
                    onChange={(e) => update("acceptTerms", e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-border text-brand-blue focus:ring-brand-blue"
                  />
                  <span>
                    I confirm that my details are correct and I agree to the
                    terms of use.
                  </span>
                </label>

                {error ? (
                  <p className="rounded-xl bg-danger-soft px-3.5 py-2.5 text-sm font-medium text-danger">
                    {error}
                  </p>
                ) : null}

                <Button type="submit" className="w-full py-3" disabled={loading}>
                  {loading ? "Creating account..." : "Create account"}
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-muted">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-brand-blue hover:text-brand-blue-dark"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-medium text-brand-navy"
      >
        {label}
      </label>
      {children}
      {hint ? <p className="mt-1.5 text-xs text-muted">{hint}</p> : null}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 8 14l7.5-8" />
    </svg>
  );
}
