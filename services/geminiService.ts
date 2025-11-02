
import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // remove the data:image/jpeg;base64, part
      resolve(result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
  });
};

const processImage = async (base64Image: string, mimeType: string, prompt: string): Promise<string> => {
    // API key is automatically sourced from process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: "AIzaSyBJHzGR1gHAXgTop6CssIE_Tg_wGemyEWw" });

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.0-flash-preview-image-generation",
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64Image,
                            mimeType: "image/png",
                        },
                    },
                    {
                        text: prompt,
                    },
                ],
            },
            config: {
                responseModalities: [Modality.TEXT, Modality.IMAGE],
            },
        });

        console.log("Gemini API response:", response);

        const firstPart = response.candidates?.[0]?.content?.parts?.[0];

        if (firstPart && 'inlineData' in firstPart && firstPart.inlineData) {
            return firstPart.inlineData.data;
        } else {
            const fallbackText = response.text;
            console.error("API response did not contain image data. Fallback text:", fallbackText);
            throw new Error(`Processing failed. The model responded: ${fallbackText || 'No image data returned.'}`);
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to process image with AI. Please try again.");
    }
};

export const generateImageWithPrompt = async (
    base64Image: string,
    mimeType: string,
    prompt: string,
): Promise<string> => {
    return processImage(base64Image, mimeType, prompt);
};
