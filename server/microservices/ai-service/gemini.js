import { GEMINI_API_KEY, GEMINI_MODEL } from "../../common/config.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// For text-only input, use the gemini-pro model
const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

export async function runPrompt(prompt) {
  // Generate content
  const result = await model.generateContent(prompt);
  // Get the response
  const response = result.response;
  // Get the text from the response
  const text = response.text();
  return text;
}
