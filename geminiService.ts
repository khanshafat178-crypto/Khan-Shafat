
import { GoogleGenAI, Type } from "@google/genai";
import { Student, SubjectMarks } from "./types.ts";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateStudentRemarks = async (student: Student): Promise<string> => {
  try {
    const prompt = `
      As a professional academic counselor, analyze the following student result and provide a short, 
      encouraging 2-sentence feedback/advice for the student.
      
      Student Name: ${student.name}
      Grade: ${student.grade}
      Percentage: ${student.percentage.toFixed(2)}%
      Status: ${student.status}
      Subjects: ${student.marks.map(m => `${m.subjectName}: ${m.theory + m.practical}/${m.maxMarks}`).join(', ')}
      
      The feedback should be personalized and mention specific areas of strength or improvement.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Keep working hard and reach for the stars!";
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "Great effort this semester. Focus on consistent practice for even better results next time.";
  }
};

export const analyzeOldResult = async (base64Image: string, mimeType: string) => {
  try {
    const prompt = `
      Extract the student's information from this old result card. 
      Return the data in a strict JSON format with the following keys:
      - name: string
      - rollNo: string
      - className: string (e.g., '10th', '12th')
      - section: string
      - subjects: array of objects with { subjectName: string, theory: number, practical: number, maxMarks: number }
      
      If a value is not found, use an empty string or 0 for numbers.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { text: prompt },
        {
          inlineData: {
            data: base64Image,
            mimeType: mimeType
          }
        }
      ],
      config: {
        responseMimeType: "application/json",
      }
    });

    const result = JSON.parse(response.text || "{}");
    return result;
  } catch (error) {
    console.error("OCR Analysis Error:", error);
    throw new Error("Failed to scan the result card. Please try a clearer image.");
  }
};
