import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { image } = req.body;

    const response = await groq.chat.completions.create({
      model: "llama-3.2-90b-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Describe this image in detail.",
            },
            {
              type: "image_url",
              image_url: {
                url: image,
              },
            },
          ],
        },
      ],
    });

    res.status(200).json({
      answer: response.choices[0].message.content,
    });
  } catch (error) {
  console.error("FULL ERROR:", JSON.stringify(error, null, 2));

  res.status(500).json({
    error: error,
    message: error.message,
  });
}
}