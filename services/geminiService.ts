import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateMarketingCopy = async (topic: string): Promise<string> => {
  try {
    const ai = getClient();
    const modelId = 'gemini-2.5-flash'; 

    const prompt = `
      Actúa como un experto en marketing inmobiliario de lujo internacional.
      Escribe un texto persuasivo, moderno y comercial de máximo 80 palabras sobre: "${topic}".
      El contexto es el proyecto "Anaiwa Eco Reserva" en la Zona Norte de Cartagena de Indias.
      Enfócate en el retorno de inversión, plusvalía, turismo y estilo de vida.
      Usa un tono inspirador y profesional.
      No uses markdown, solo texto plano.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    return response.text || "No se pudo generar el contenido.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error al conectar con la IA. Por favor verifica tu llave API.";
  }
};
