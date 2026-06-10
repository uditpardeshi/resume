import { createHash } from 'node:crypto';
import process from 'node:process';

// Load env variables manually
const token = "8588901499:AAHyKYvBUUetadCBKxVzEkoUEGSmspVctf0";
const chatId = "5839440895";

async function runTest() {
  console.log("Starting Telegram send test...");
  console.log("Token:", token);
  console.log("Chat ID:", chatId);

  // Generate a dummy PDF buffer (e.g. simple text)
  const pdfBuf = Buffer.from("%PDF-1.4 ... dummy content ...");
  const filename = "test-resume.pdf";
  const fullName = "Test User";

  try {
    const formData = new FormData();
    formData.append("chat_id", chatId);

    // Create a Blob from the PDF buffer
    const blob = new Blob([pdfBuf], { type: "application/pdf" });
    
    // Append the document file to the form data
    formData.append("document", blob, filename);
    formData.append("caption", `New resume downloaded by ${fullName}`);

    console.log("Sending request to Telegram API...");
    const start = Date.now();
    const res = await fetch(`https://api.telegram.org/bot${token}/sendDocument`, {
      method: "POST",
      body: formData,
    });

    console.log(`Response status: ${res.status} ${res.statusText}`);
    const resText = await res.text();
    console.log("Response body:", resText);
    console.log(`Time taken: ${Date.now() - start}ms`);
  } catch (error) {
    console.error("Error during test:", error);
  }
}

runTest();
