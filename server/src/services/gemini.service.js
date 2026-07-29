import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function extractInvoiceItems(base64Data, mimeType) {
  const prompt = `
You are an AI invoice parser.

Extract every purchasable inventory item from the invoice.

Return ONLY valid JSON.

Example:

[
  {
    "name":"Tomato",
    "category":"Vegetables",
    "quantity":20,
    "unit":"kg",
    "purchasePrice":40,
    "confidence":98
  }
]

Rules:

- Do not wrap JSON in markdown.
- Do not explain.
- Infer category if missing.
- Quantity must be number.
- Price must be number.
- Confidence between 0-100.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: [
      {
        inlineData: {
          mimeType,
          data: base64Data,
        },
      },
      {
        text: prompt,
      },
    ],
  });

  return response.text;
}