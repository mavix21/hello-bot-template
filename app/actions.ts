"use server";

import { headers } from "next/headers";

export async function pingTelegramWebhook() {
  const h = await headers();
  const host = h.get("host");
  const protocol = h.get("x-forwarded-proto") ?? "http";
  const url = `${protocol}://${host}/api/webhooks/telegram`;

  await fetch(url, { method: "POST" });
}
