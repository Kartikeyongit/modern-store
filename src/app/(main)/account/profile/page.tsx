"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ArrowLeft, User, Save, Lock, AlertTriangle } from "lucide-react";

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [name, setName] = useState(session?.user?.name || "");
  const [image, setImage] = useState(session?.user?.image || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileMsg, setProfileMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [passwordMsg, setPasswordMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [hasPassword, setHasPassword] = useState(true);

  useEffect(() => {
    fetch("/api/account/has-password")
      .then((res) => res.json())
      .then((data) => setHasPassword(data.hasPassword))
      .catch(() => {});
  }, []);

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

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setProfileMsg(null);

    try {
      const res = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, image }),
      });

      if (res.ok) {
        await update();
        setProfileMsg({ type: "success", text: "Profile updated successfully." });
      } else {
        setProfileMsg({ type: "error", text: "Failed to update profile." });
      }
    } catch {
      setProfileMsg({ type: "error", text: "Something went wrong." });
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: "error", text: "New passwords do not match." });
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/account/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setPasswordMsg({ type: "success", text: "Password changed successfully." });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPasswordMsg({ type: "error", text: data.error || "Failed to change password." });
      }
    } catch {
      setPasswordMsg({ type: "error", text: "Something went wrong." });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    setDeleteMsg(null);
    setShowDeleteModal(false);

    try {
      const res = await fetch("/api/account/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: deletePassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setDeleteMsg({ type: "success", text: "Account deleted. Redirecting..." });
        setTimeout(() => {
          signOut({ callbackUrl: "/" });
        }, 1500);
      } else {
        setDeleteMsg({ type: "error", text: data.error || "Failed to delete account." });
      }
    } catch {
      setDeleteMsg({ type: "error", text: "Something went wrong." });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/account" className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Account
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>

        {/* Profile Info */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="h-6 w-6 text-black" />
            <h2 className="text-lg font-bold text-gray-900">Account Details</h2>
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <Input value={session?.user?.email || ""} disabled className="bg-gray-50 text-gray-500" />
              <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Avatar Image URL</label>
              <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." />
              <p className="text-xs text-gray-400 mt-1">URL to a profile picture.</p>
            </div>

            {profileMsg && (
              <p className={`text-sm ${profileMsg.type === "success" ? "text-green-600" : "text-red-600"}`}>
                {profileMsg.text}
              </p>
            )}

            <Button type="submit" disabled={saving} className="bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-colors">
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="h-6 w-6 text-black" />
            <h2 className="text-lg font-bold text-gray-900">Change Password</h2>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Enter current password" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" required />
            </div>

            {passwordMsg && (
              <p className={`text-sm ${passwordMsg.type === "success" ? "text-green-600" : "text-red-600"}`}>
                {passwordMsg.text}
              </p>
            )}

            <Button type="submit" disabled={saving} className="bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-colors">
              <Lock className="h-4 w-4 mr-2" />
              {saving ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </div>

        {/* Delete Account */}
        <div className="bg-white rounded-2xl shadow-sm border border-red-200 p-6 md:p-8 mt-6">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <h2 className="text-lg font-bold text-gray-900">Delete Account</h2>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>

          {deleteMsg && (
            <p className={`text-sm mb-4 ${deleteMsg.type === "success" ? "text-green-600" : "text-red-600"}`}>
              {deleteMsg.text}
            </p>
          )}

          <div className="space-y-4">
            {hasPassword ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Enter your password to confirm</label>
                <Input type="password" value={deletePassword} onChange={(e) => setDeletePassword(e.target.value)} placeholder="Current password" />
              </div>
            ) : (
              <p className="text-sm text-gray-500">No password required — you signed in with Google.</p>
            )}

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={deleteConfirmed} onChange={(e) => setDeleteConfirmed(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500" />
              <span className="text-sm text-gray-600">
                I understand that this will permanently delete my account, orders, reviews, and address information.
              </span>
            </label>

            <Button
              type="button"
              disabled={(hasPassword && !deletePassword) || !deleteConfirmed || deleting}
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-600 text-white hover:bg-red-700 border-2 border-red-600 transition-colors disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "Delete My Account"}
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently delete your account? All your orders, reviews, and saved addresses will be removed. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)} disabled={deleting}>
              Cancel
            </Button>
            <Button onClick={handleDeleteAccount} disabled={deleting} className="bg-red-600 text-white hover:bg-red-700 border-2 border-red-600">
              {deleting ? "Deleting..." : "Yes, Delete My Account"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
