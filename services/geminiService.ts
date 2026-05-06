
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this environment, we assume it's set.
  console.warn("API_KEY is not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getCritique = async (base64Image: string, mimeType: string, questPrompt: string): Promise<string> => {
  try {
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
