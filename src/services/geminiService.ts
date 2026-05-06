
import { GoogleGenAI } from "@google/genai";

let genAI: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI {
  if (!genAI) {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    if (!API_KEY) {
      throw new Error("VITE_GEMINI_API_KEY is not set. Please set it in your environment variables.");
    }
    genAI = new GoogleGenAI({ apiKey: API_KEY });
  }
  return genAI;
}

export const getCritique = async (base64Image: string, mimeType: string, questPrompt: string): Promise<string> => {
  try {
    const ai = getGenAI();
    const model = 'gemini-3-flash-preview';

    const imagePart = {
      inlineData: {
        mimeType: mimeType,
        data: base64Image,
      },
    };

    const textPart = {
      text: `The challenge I was attempting: "${questPrompt}"`,
    };

    const response = await ai.models.generateContent({
      model: model,
      contents: [imagePart, textPart],
      config: {
        systemInstruction: `You are a constructive and encouraging art mentor AI named 'Forge'.
        Your goal is to help an aspiring artist improve.
        Critique the submitted artwork based on how well it fulfilled the challenge provided by the artist.
        Focus on core art fundamentals: anatomy, color theory, gesture, composition, storytelling, and value.
        
        Provide specific, actionable feedback in a structured Markdown format.
        The feedback should be broken into three sections:
        
        1. **Strengths:** Start with positive reinforcement. What did they do well? (2-3 bullet points)
        2. **Areas for Improvement:** What are the key areas they could focus on next time? Be specific. (2-3 bullet points)
        3. **Forge's Tip:** Provide one single, powerful tip or exercise they can try next to directly address one of the improvement areas.
        
        Keep the tone supportive, motivating, and clear. Avoid overly technical jargon.`,
        temperature: 0.7,
        topP: 0.95,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating critique:", error);
    throw new Error("Failed to communicate with the Gemini API.");
  }
};
