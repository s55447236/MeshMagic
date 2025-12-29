
import { GoogleGenAI, Type } from "@google/genai";
import { GradientState } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateGradientFromPrompt(prompt: string): Promise<GradientState> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Acting as a world-class UI designer, suggest a sophisticated fluid mesh gradient for: "${prompt}". 
               
               AESTHETIC RULES:
               1. NODE COUNT: Use exactly 4 color points.
               2. FLUIDITY: Each point must have unique 'rx' and 'ry' values (0.5 to 2.5) to create elliptical flow shapes.
               3. CONTRAST: Ensure points vary significantly in size (some large field washes, some sharp accent streaks).
               4. COLOR HARMONY: Use professional designer palettes (Analogous, Complementary, or Split-Complementary).
               
               Respond with a JSON object containing:
               - backgroundColor (hex)
               - points: array of exactly 4 objects {color (hex), x (0-100), y (0-100), size (40-110), rx (0.5-2.5), ry (0.5-2.5)}
               - blur (60-120)
               - flowSpeed (1.0-1.8)
               - flowRange (15-40)`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          backgroundColor: { type: Type.STRING },
          blur: { type: Type.NUMBER },
          flowSpeed: { type: Type.NUMBER },
          flowRange: { type: Type.NUMBER },
          points: {
            type: Type.ARRAY,
            minItems: 4,
            maxItems: 4,
            items: {
              type: Type.OBJECT,
              properties: {
                color: { type: Type.STRING },
                x: { type: Type.NUMBER },
                y: { type: Type.NUMBER },
                size: { type: Type.NUMBER },
                rx: { type: Type.NUMBER },
                ry: { type: Type.NUMBER }
              },
              required: ["color", "x", "y", "size", "rx", "ry"]
            }
          }
        },
        required: ["backgroundColor", "points", "blur", "flowSpeed", "flowRange"]
      },
    },
  });

  const data = JSON.parse(response.text.trim());
  return {
    ...data,
    points: data.points.map((p: any, i: number) => ({ ...p, id: `ai-${i}-${Date.now()}` }))
  };
}
