import { db } from "@/db";
import { storeSettings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { AdminSettingsClient } from "./settings-client";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await db.query.storeSettings.findFirst({
    where: eq(storeSettings.id, "main"),
  });

  if (!settings) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Settings not found.</p>
      </div>
    );
  }

  return <AdminSettingsClient settings={settings} />;
}
