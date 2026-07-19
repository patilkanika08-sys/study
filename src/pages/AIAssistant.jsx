import { useState } from "react";

function AIAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  function askAI() {
    if (!question) {
      alert("Please enter your question");
      return;
    }

    setAnswer("AI response will appear here after Groq integration...");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>🤖 AI Study Assistant</h1>

      <textarea
        rows="6"
        cols="60"
        placeholder="Ask anything...
Example:
• Explain DBMS
• Create a 7-day Java study plan
• Explain OOP concepts"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <br />
      <br />

      <button onClick={askAI}>Ask AI</button>

      <hr />

      <h2>Answer</h2>

      <div
        style={{
          border: "1px solid gray",
          padding: "15px",
          borderRadius: "8px",
          minHeight: "120px",
        }}
      >
        {answer || "AI answer will appear here..."}
      </div>
    </div>
  );
}

export default AIAssistant;