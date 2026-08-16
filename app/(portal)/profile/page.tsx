"use client";

import { useState } from "react";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { PageHeader } from "@/components/page-header";
import { parentProfile } from "@/lib/data";

export default function ProfilePage() {
  const [phone, setPhone] = useState(parentProfile.phone);
  const [email, setEmail] = useState(parentProfile.email);
  const [address, setAddress] = useState(parentProfile.address);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2800);
    }, 500);
  }

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        eyebrow="Account"
        title="Profile"
        description="Update your phone number, email and address."
      />

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Card className="animate-fade-up h-fit">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-navy text-xl font-bold text-white">
              {parentProfile.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h2 className="text-lg font-bold text-brand-navy">
                {parentProfile.fullName}
              </h2>
              <p className="text-sm text-muted">{parentProfile.parentCode}</p>
            </div>
          </div>

          <dl className="mt-6 space-y-3 text-sm">
            <div>
              <dt className="text-muted">School</dt>
              <dd className="mt-0.5 font-medium text-brand-navy">
                {parentProfile.school}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Learners</dt>
              <dd className="mt-2 space-y-2">
                {parentProfile.learners.map((learner) => (
                  <div
                    key={learner.learnerCode}
                    className="flex items-center justify-between rounded-xl bg-brand-blue-soft/50 px-3 py-2"
                  >
                    <span className="font-medium text-brand-navy">
                      {learner.name}
                    </span>
                    <Badge tone="info">{learner.grade}</Badge>
                  </div>
                ))}
              </dd>
            </div>
          </dl>
        </Card>

        <Card className="animate-fade-up stagger-2">
          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label
                htmlFor="phone"
                className="mb-1.5 block text-sm font-medium text-brand-navy"
              >
                Phone number
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-border bg-brand-blue-soft/30 px-3.5 py-3 text-sm text-brand-navy outline-none transition focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/15"
              />
            </div>

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border bg-brand-blue-soft/30 px-3.5 py-3 text-sm text-brand-navy outline-none transition focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/15"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="mb-1.5 block text-sm font-medium text-brand-navy"
              >
                Residential address
              </label>
              <textarea
                id="address"
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full resize-y rounded-xl border border-border bg-brand-blue-soft/30 px-3.5 py-3 text-sm text-brand-navy outline-none transition focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/15"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save changes"}
              </Button>
              {saved ? (
                <span className="text-sm font-medium text-success animate-fade-in">
                  Changes saved
                </span>
              ) : null}
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
