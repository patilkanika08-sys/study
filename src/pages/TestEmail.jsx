import { useState } from "react";

function TestEmail() {
  const [loading, setLoading] = useState(false);

  async function sendEmail() {
    setLoading(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "patilkanika08@gmail.com",
          subject: "Test Email",
          html: "<h2>Hello 👋</h2><p>This email is sent using Resend.</p>",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Email Sent Successfully!");
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Something went wrong!");
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>📧 Test Email</h1>

      <button onClick={sendEmail} disabled={loading}>
        {loading ? "Sending..." : "Send Test Email"}
      </button>
    </div>
  );
}

export default TestEmail;