import { GEMINI_API_KEY, GEMINI_MODEL } from "../../common/config.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

export async function runPrompt(prompt) {
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  return text;
}
