async function askAI() {
    console.log("Button clicked");

  if (!question) {
    alert("Please enter your question");
    return;
  }

  setAnswer("Loading...");

  try {
    const response = await fetch("/api/groq", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: question,
      }),
    });

    console.log(response);

    const data = await response.json();
console.log("data");
setAnswer(data.answer);

  } catch (error) {
    console.log("error");
    setAnswer("Something went wrong!");
  }
}