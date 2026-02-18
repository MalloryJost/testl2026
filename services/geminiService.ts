
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => {
  const apiKey = (typeof process !== 'undefined' && process.env?.API_KEY) || "";
  return new GoogleGenAI({ apiKey });
};

export const fetchDailyVerse = async (): Promise<{ verse: string; reference: string; reflection: string }> => {
  const ai = getAI();
  const date = new Date().toDateString();
  
  try {
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

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Error fetching daily verse:", error);
    return {
      verse: "The Lord is my shepherd; I shall not want.",
      reference: "Psalm 23:1",
      reflection: "In the desert of Lent, remember that God provides all we truly need."
    };
  }
};

export const generateJournalPrompt = async (entries: string[]): Promise<string> => {
  const ai = getAI();
  const context = entries.slice(-3).join('\n');
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on these recent Lenten journal entries, provide a thoughtful reflection prompt to help the user grow spiritually today. Context: ${context || 'Beginning the journey.'}`,
    });

    return response.text || "How has your sacrifice challenged you today?";
  } catch (error) {
    console.error("Error generating prompt:", error);
    return "Reflect on how your Lenten penance is bringing you closer to God today.";
  }
};
