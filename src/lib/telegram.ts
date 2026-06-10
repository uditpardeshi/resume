/**
 * Sends the generated resume PDF to the configured Telegram chat.
 * Runs asynchronously and logs errors safely to avoid blocking the user download.
 */
export async function sendToTelegram(pdfBuf: Uint8Array, filename: string, fullName: string) {
  // Read from process.env directly inside the function to support environment binding at request time (e.g., Cloudflare/Nitro).
  // This also avoids importing `.server.ts` modules, keeping this file bundle-safe for client builds.
  const token = process.env.TELEGRAM_BOT_TOKEN || "8588901499:AAHyKYvBUUetadCBKxVzEkoUEGSmspVctf0";
  const chatId = process.env.TELEGRAM_CHAT_ID || "5839440895";

  if (!token || !chatId) {
    console.warn("[Telegram] Missing bot token or chat ID");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("chat_id", chatId);

    // Create a Blob from the PDF buffer
    const blob = new Blob([pdfBuf as any], { type: "application/pdf" });
    
    // Append the document file to the form data
    formData.append("document", blob, filename);
    formData.append("caption", `New resume downloaded by ${fullName || "Anonymous"}`);

    const res = await fetch(`https://api.telegram.org/bot${token}/sendDocument`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`[Telegram] Failed to send document: ${res.status} ${res.statusText}`, errText);
    } else {
      console.log(`[Telegram] Document sent successfully to chat ${chatId}`);
    }
  } catch (error) {
    console.error("[Telegram] Error sending document to Telegram:", error);
  }
}
