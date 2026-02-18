
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const fetchDailyVerse = async (): Promise<{ verse: string; reference: string; reflection: string }> => {
  const ai = getAI();
  const date = new Date().toDateString();
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Provide a Catholic Bible verse suitable for Lenten reflection for today: ${date}. Include the full text of the verse, its reference (e.g., John 3:16), and a short 2-sentence spiritual reflection.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          verse: { type: Type.STRING },
          reference: { type: Type.STRING },
          reflection: { type: Type.STRING }
        },
        required: ["verse", "reference", "reflection"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const generateJournalPrompt = async (entries: string[]): Promise<string> => {
  const ai = getAI();
  const context = entries.slice(-3).join('\n');
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on these recent Lenten journal entries, provide a thoughtful reflection prompt to help the user grow spiritually today. Context: ${context || 'Beginning the journey.'}`,
  });

  return response.text;
};
