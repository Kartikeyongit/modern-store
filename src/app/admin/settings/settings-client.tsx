"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";

interface Settings {
  id: string;
  storeName: string;
  supportEmail: string;
  shippingThreshold: number;
  shippingRate: number;
  taxRate: number;
  currency: string;
}

export function AdminSettingsClient({ settings: initial }: { settings: Settings }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          shippingThreshold: Number(form.shippingThreshold),
          shippingRate: Number(form.shippingRate),
          taxRate: Number(form.taxRate),
        }),
      });
      if (!res.ok) throw new Error("Failed to save");
      const data = await res.json();
      setForm(data);
      setMessage({ type: "success", text: "Settings saved successfully." });
    } catch {
      setMessage({ type: "error", text: "Failed to save settings." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Store Settings</h1>
        <p className="text-gray-500 mt-1">Manage your store configuration.</p>
      </div>

      <div className="space-y-6">
        {/* Store Information */}
        <div className="bg-white rounded-xl border p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Store Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name</Label>
              <Input
                id="storeName"
                value={form.storeName}
                onChange={(e) => setForm({ ...form, storeName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                id="supportEmail"
                type="email"
                value={form.supportEmail}
                onChange={(e) => setForm({ ...form, supportEmail: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Shipping & Tax */}
        <div className="bg-white rounded-xl border p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Shipping & Tax</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="shippingThreshold">Free Shipping Over ($)</Label>
              <Input
                id="shippingThreshold"
                type="number"
                min="0"
                step="0.01"
                value={form.shippingThreshold}
                onChange={(e) => setForm({ ...form, shippingThreshold: e.target.value as unknown as number })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shippingRate">Shipping Rate ($)</Label>
              <Input
                id="shippingRate"
                type="number"
                min="0"
                step="0.01"
                value={form.shippingRate}
                onChange={(e) => setForm({ ...form, shippingRate: e.target.value as unknown as number })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                min="0"
                step="0.1"
                value={form.taxRate * 100}
                onChange={(e) => setForm({ ...form, taxRate: Number(e.target.value) / 100 })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Input
                id="currency"
                value={form.currency}
                onChange={(e) => setForm({ ...form, currency: e.target.value })}
              />
            </div>
          </div>
        </div>

        {message && (
          <div
            className={cn(
              "text-sm px-4 py-2 rounded-lg",
              message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            )}
          >
            {message.text}
          </div>
        )}

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving} className="bg-gray-800 text-white hover:bg-black">
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}
