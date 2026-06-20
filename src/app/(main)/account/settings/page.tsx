"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Plus, LogOut, Shield } from "lucide-react";
import { signOutAction } from "../actions";

interface Address {
  id: string;
  isDefault: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country?: string;
  label?: string;
}

const emptyAddress = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "United States",
  label: "Home",
};

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyAddress);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/addresses");
      if (res.ok) setAddresses(await res.json());
    } catch {
      console.error("Failed to fetch addresses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) fetchAddresses();
  }, [session]);

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800" />
      </main>
    );
  }

  if (status === "unauthenticated") {
    router.push("/auth/login");
    return null;
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/addresses/${editingId}` : "/api/addresses";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setShowForm(false);
        setEditingId(null);
        setForm(emptyAddress);
        fetchAddresses();
      }
    } catch {
      console.error("Failed to save address");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/addresses/${id}`, { method: "DELETE" });
      if (res.ok) fetchAddresses();
    } catch {
      console.error("Failed to delete address");
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      await fetch(`/api/addresses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isDefault: true }),
      });
      fetchAddresses();
    } catch {
      console.error("Failed to set default address");
    }
  };

  const startEdit = (addr: Address) => {
    setForm({
      firstName: addr.firstName,
      lastName: addr.lastName,
      email: addr.email,
      phone: addr.phone,
      address: addr.address,
      city: addr.city,
      state: addr.state,
      zip: addr.zip,
      country: addr.country || "United States",
      label: addr.label || "Home",
    });
    setEditingId(addr.id);
    setShowForm(true);
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/account" className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Account
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

        {/* Saved Addresses */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-black" />
              <h2 className="text-lg font-bold text-gray-900">Saved Addresses</h2>
            </div>
            {!showForm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyAddress);
                  setShowForm(true);
                }}
                className="text-black"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            )}
          </div>

          {loading ? (
            <div className="space-y-2">
              <div className="h-14 bg-gray-100 rounded-xl animate-pulse" />
              <div className="h-14 bg-gray-100 rounded-xl animate-pulse" />
            </div>
          ) : addresses.length === 0 && !showForm ? (
            <p className="text-sm text-gray-500 text-center py-6">No saved addresses yet.</p>
          ) : (
            <div className="space-y-3">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="flex items-start gap-3 p-4 rounded-xl border border-gray-200"
                >
                  <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {addr.firstName} {addr.lastName}
                      {addr.isDefault && (
                        <Badge className="ml-2 text-xs bg-gray-100 text-gray-600 border-0">Default</Badge>
                      )}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{addr.address}, {addr.city}, {addr.state} {addr.zip}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{addr.phone} · {addr.email}</p>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    {!addr.isDefault && (
                      <button onClick={() => handleSetDefault(addr.id)} className="text-xs text-gray-500 hover:text-black px-2 py-1">
                        Set Default
                      </button>
                    )}
                    <button onClick={() => startEdit(addr)} className="text-xs text-gray-500 hover:text-black px-2 py-1">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(addr.id)} className="text-xs text-red-500 hover:text-red-700 px-2 py-1">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Address Form */}
          {showForm && (
            <form onSubmit={handleSave} className="mt-4 pt-4 border-t space-y-4">
              <h3 className="text-sm font-medium text-gray-700">{editingId ? "Edit Address" : "New Address"}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input placeholder="First Name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
                <Input placeholder="Last Name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                <Input type="tel" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
              </div>
              <Input placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
              <div className="grid grid-cols-4 gap-4">
                <Input className="col-span-2" placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required />
                <Input placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} required />
                <Input placeholder="ZIP" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} required />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-colors text-sm">
                  Save Address
                </Button>
                <Button type="button" variant="ghost" onClick={() => { setShowForm(false); setEditingId(null); setForm(emptyAddress); }}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Account Actions */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-6 w-6 text-black" />
            <h2 className="text-lg font-bold text-gray-900">Account</h2>
          </div>
          <form action={signOutAction}>
            <Button variant="outline" className="text-black hover:text-red-700">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
