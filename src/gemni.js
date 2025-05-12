// Install the following dependencies first: npm install @google/genai mime
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Replace this with your actual API key
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;  // Use process.env or import.meta.env for production
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // Use your required model name here
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 43,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  return result.response.text();
}


export default run;
