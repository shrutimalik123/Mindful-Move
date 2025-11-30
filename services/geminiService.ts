import { GoogleGenAI, Type } from "@google/genai";
import { ClassSession, ClassType, Intensity, Platform, FilterState } from "../types";

const apiKey = process.env.API_KEY || '';

// Mock data fallback if API key is missing or fails, to ensure app is usable in preview without key initially
const MOCK_DATA: ClassSession[] = [
  {
    id: '1',
    title: 'Morning Flow for Anxiety Relief',
    instructor: 'Sarah Jenkins',
    type: ClassType.YOGA,
    durationMinutes: 20,
    intensity: Intensity.LOW,
    platform: Platform.ONLINE_FREE,
    imageUrl: 'https://picsum.photos/seed/yoga1/600/400',
    description: 'A gentle vinyasa flow designed to ground your nervous system and start the day with clarity.',
    mentalBenefit: 'Anxiety Reduction & Grounding',
    tags: ['Vinyasa', 'Morning', 'Anxiety'],
    rating: 4.9
  },
  {
    id: '2',
    title: 'Core Stability & Confidence',
    instructor: 'Marco Diaz',
    type: ClassType.PILATES,
    durationMinutes: 45,
    intensity: Intensity.HIGH,
    platform: Platform.ONLINE_PAID,
    imageUrl: 'https://picsum.photos/seed/pilates1/600/400',
    description: 'Build inner and outer strength with this challenging reformer-style mat class.',
    mentalBenefit: 'Empowerment & Focus',
    tags: ['Core', 'Strength', 'Mat Pilates'],
    rating: 4.8
  },
  {
    id: '3',
    title: 'Sunset Tai Chi',
    instructor: 'Master Li',
    type: ClassType.TAI_CHI,
    durationMinutes: 30,
    intensity: Intensity.LOW,
    platform: Platform.LOCAL,
    location: 'Central Park, NY',
    imageUrl: 'https://picsum.photos/seed/taichi1/600/400',
    description: 'Connect with nature and your breath in this outdoor evening session.',
    mentalBenefit: 'Balance & Harmony',
    tags: ['Outdoor', 'Qi Gong', 'Beginner'],
    rating: 5.0
  }
];

export const fetchRecommendations = async (filters: FilterState): Promise<ClassSession[]> => {
  if (!apiKey) {
    console.warn("No API Key provided, returning mock data.");
    return new Promise(resolve => setTimeout(() => resolve(MOCK_DATA), 800));
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
      Generate a list of 6-9 realistic mindful movement classes based on the following user criteria:
      User Search/Mood: "${filters.searchQuery || 'General well-being'}"
      Preferred Types: ${filters.selectedTypes.length > 0 ? filters.selectedTypes.join(', ') : 'Any'}
      Max Duration: ${filters.maxDuration} minutes
      Intensity: ${filters.intensity || 'Any'}

      The classes should feel real, diverse (Online and Local mix), and specifically highlight mental/emotional benefits.
      For images, use https://picsum.photos/seed/{random_string}/600/400.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              instructor: { type: Type.STRING },
              type: { type: Type.STRING, enum: Object.values(ClassType) },
              durationMinutes: { type: Type.INTEGER },
              intensity: { type: Type.STRING, enum: Object.values(Intensity) },
              platform: { type: Type.STRING, enum: Object.values(Platform) },
              imageUrl: { type: Type.STRING },
              description: { type: Type.STRING },
              mentalBenefit: { type: Type.STRING },
              tags: { type: Type.ARRAY, items: { type: Type.STRING } },
              location: { type: Type.STRING },
              price: { type: Type.STRING },
              rating: { type: Type.NUMBER },
            },
            required: ['id', 'title', 'instructor', 'type', 'durationMinutes', 'intensity', 'platform', 'imageUrl', 'description', 'mentalBenefit', 'rating']
          }
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      return data as ClassSession[];
    }
    return MOCK_DATA;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return MOCK_DATA;
  }
};