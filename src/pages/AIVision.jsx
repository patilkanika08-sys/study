import { useState } from "react";

function AIVision() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState("");

  function handleImage(e) {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  async function analyzeImage() {
  if (!image) {
    alert("Please select an image");
    return;
  }

  setResult("Analyzing image...");

  const reader = new FileReader();

  reader.readAsDataURL(image);

  reader.onloadend = async () => {
    try {
      const response = await fetch("/api/groq-vision", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: reader.result,
        }),
      });

      const data = await response.json();

      setResult(data.answer);
    } catch (error) {
      console.log(error);
      setResult("Something went wrong!");
    }
  };
}

  return (
    <div style={{ padding: "20px" }}>
      <h1>📷 AI Vision</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
      />

      <br />
      <br />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          width="300"
          style={{ borderRadius: "10px" }}
        />
      )}

      <br />
      <br />

      <button onClick={analyzeImage}>
        Analyze Image
      </button>

      <hr />

      <h2>Result</h2>

      <div
        style={{
          border: "1px solid gray",
          padding: "15px",
          minHeight: "100px",
          borderRadius: "10px",
        }}
      >
        {result || "Result will appear here..."}
      </div>
    </div>
  );
}

export default AIVision;