async function trigger() {
  const body = {
    template: "classic",
    download: true,
    resumeData: {
      personal: {
        fullName: "Udit Pardeshi",
        address: "India",
        phone: "1234567890",
        email: "test@example.com",
        dob: "1999-01-01",
        languages: "English"
      },
      education: [],
      experience: [],
      declaration: {
        text: "I hereby declare...",
        place: "India",
        date: "2026-06-10"
      }
    }
  };

  console.log("Sending request to http://localhost:3001/api/generate-pdf...");
  try {
    const res = await fetch("http://localhost:3001/api/generate-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    console.log("Status:", res.status);
    if (!res.ok) {
      console.log("Response body:", await res.text());
    } else {
      const buffer = await res.arrayBuffer();
      console.log("Success! Received PDF buffer of length:", buffer.byteLength);
    }
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}
trigger();
