import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `You are a helpful AI assistant in a collaborative workspace chat. 
Keep your responses concise, friendly, and relevant to the context of a design and development team.
Do not use markdown formatting excessively, keep it clean.`;

export const sendMessageToGemini = async (
  history: Message[],
  newMessage: string
): Promise<string> => {
  try {
    // We only send the last 10 messages to keep context window manageable
    const recentHistory = history.slice(-10).map((msg) => ({
      role: msg.sender.isBot ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: recentHistory,
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "I'm having trouble thinking right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error connecting to the AI service.";
  }
};

export const summarizeConversation = async (
  messages: Message[]
): Promise<string> => {
  try {
    const transcript = messages
      .map((m) => `${m.sender.name}: ${m.content}`)
      .join("\n");
    const prompt = `Summarize the following conversation in 2-3 bullet points:\n\n${transcript}`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || "Could not summarize.";
  } catch (error) {
    console.error("Gemini Summarize Error:", error);
    return "Failed to summarize.";
  }
};

export const improveTone = async (text: string): Promise<string> => {
  try {
    const prompt = `Rewrite the following text to be more professional, friendly, and clear:\n\n"${text}"`;
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text?.replace(/^"|"$/g, '') || text;
  } catch (error) {
    return text;
  }
};

export const translateText = async (text: string, targetLang: string = "French"): Promise<string> => {
  try {
    const prompt = `Translate the following text to ${targetLang}:\n\n"${text}"`;
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || text;
  } catch (error) {
    return text;
  }
};