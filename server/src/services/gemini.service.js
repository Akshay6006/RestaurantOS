import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function generate(model, prompt, base64Data, mimeType) {
  const MAX_RETRIES = 3;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`Gemini Request (Attempt ${attempt})`);

      const response = await ai.models.generateContent({
        model,
        contents: [
          {
            role: "user",
            parts: [
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
          },
        ],
      });

      let text = response.text || "";

      console.log("========== GEMINI RESPONSE ==========");
      console.log(text);
      console.log("====================================");

      // Remove markdown if Gemini returns it
      text = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      return text;
    } catch (error) {
      console.error(`Gemini Attempt ${attempt} Failed`);

      if (error.status === 503 && attempt < MAX_RETRIES) {
        console.log("Gemini is busy. Retrying...");
        await sleep(attempt * 2000);
        continue;
      }

      console.error("========== GEMINI ERROR ==========");
      console.error(error);

      throw error;
    }
  }
}

// ================= INVENTORY AI =================

export async function extractInvoiceItems(base64Data, mimeType) {
  const prompt = `
You are an OCR + Inventory Extraction AI.

Read the invoice carefully.

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

- Return JSON only.
- No markdown.
- No explanation.
- Never invent products.
- quantity must be numeric.
- purchasePrice must be numeric.
- confidence must be between 0-100.
`;

  return await generate(
    "gemini-3.6-flash",
    prompt,
    base64Data,
    mimeType
  );
}

// ================= EXPENSE AI =================

export async function extractReceiptData(base64Data, mimeType) {
  const prompt = `
You are an expert OCR and accounting AI.

Analyze the uploaded receipt or invoice.

Read every visible word carefully.

Return ONLY valid JSON.

Schema:

{
  "receiptType":"general_expense",
  "vendor":"",
  "invoiceNumber":"",
  "expenseDate":"",
  "paymentMethod":"",
  "currency":"",
  "subtotal":0,
  "tax":0,
  "discount":0,
  "amount":0,
  "category":"",
  "items":[
    {
      "name":"",
      "quantity":0,
      "unitPrice":0,
      "total":0
    }
  ]
}

Rules:

- Return ONLY JSON.
- No markdown.
- No explanation.
- amount = Grand Total.
- subtotal = before tax.
- tax = tax amount.
- discount = discount amount.
- Detect vendor/store/company.
- Detect invoice number.
- Detect payment method.
- Detect invoice date.
- Detect currency.
- Extract every purchased item.
- If something is missing use null.
- If category is missing infer one of:

Grocery
Vegetables
Dairy
Meat
Seafood
Bakery
Beverage
Utilities
Maintenance
Rent
Fuel
Cleaning
Packaging
Office Supplies
Miscellaneous

Dates should be YYYY-MM-DD.
`;

  return await generate(
    "gemini-3.6-flash",
    prompt,
    base64Data,
    mimeType
  );
}

// ================= AI INSIGHTS =================

export async function generateRestaurantInsights(data) {
  const prompt = `
You are an expert Restaurant Business Consultant.

Analyze this restaurant data:

${JSON.stringify(data, null, 2)}

Generate ONLY valid JSON.

Schema:

{
  "summary": "",
  "strengths": [
    "",
    "",
    ""
  ],
  "risks": [
    "",
    ""
  ],
  "recommendation": "",
  "healthScore": 0
}

Rules:

- Return JSON only.
- No markdown.
- No explanation.
- Summary should be 2-3 sentences.
- Give practical business advice.
- Health score must be between 0 and 100.
`;

  return await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
}