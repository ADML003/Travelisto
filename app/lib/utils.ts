import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string): string => {
  return dayjs(dateString).format("MMMM DD, YYYY");
};

export function parseMarkdownToJson(markdownText: string): unknown | null {
  const regex = /```json\n([\s\S]+?)\n```/;
  const match = markdownText.match(regex);

  if (match && match[1]) {
    try {
      let jsonString = match[1].trim();

      // First, try to parse as-is
      try {
        return JSON.parse(jsonString);
      } catch (initialError) {
        console.log("Initial parse failed, attempting to fix common issues...");

        // Fix common AI-generated JSON issues
        // 1. Fix malformed "time": "Evening": "text" pattern (double colons)
        //    This pattern is common in AI-generated JSON where the time and description are not properly formatted.
        jsonString = jsonString.replace(
          /{"time":\s*"([^"]+)":\s*"([^"]+)"}/g,
          '{"time": "$1", "description": "$2"}'
        );

        // 2. Fix standalone "Evening": "text" patterns in activities arrays
        jsonString = jsonString.replace(
          /"(Morning|Afternoon|Evening)":\s*"([^"]+)"/g,
          '{"time": "$1", "description": "$2"}'
        );

        // 3. Ensure proper comma separation in arrays
        jsonString = jsonString.replace(/}\s*\n\s*{/g, "},\n        {");

        // 4. Fix missing commas before closing array brackets
        jsonString = jsonString.replace(/"\s*}\s*\]/g, '"}]');

        console.log("Attempting to parse cleaned JSON...");
        return JSON.parse(jsonString);
      }
    } catch (error) {
      console.error("Error parsing JSON after cleanup attempts:", error);
      console.error("Original JSON:", match[1]);
      return null;
    }
  }
  console.error("No valid JSON found in markdown text.");
  return null;
}

export function parseTripData(
  jsonString: string | null | undefined
): Trip | null {
  try {
    // Handle null, undefined, or empty string
    if (!jsonString || jsonString.trim() === "") {
      console.warn("parseTripData: No data provided");
      return null;
    }

    const data: Trip = JSON.parse(jsonString);
    return data;
  } catch (error) {
    console.error("Failed to parse trip data:", error);
    console.error("Input was:", jsonString);
    return null;
  }
}

export function getFirstWord(input: string = ""): string {
  return input.trim().split(/\s+/)[0] || "";
}

export const calculateTrendPercentage = (
  countOfThisMonth: number,
  countOfLastMonth: number
): TrendResult => {
  if (countOfLastMonth === 0) {
    return countOfThisMonth === 0
      ? { trend: "no change", percentage: 0 }
      : { trend: "increment", percentage: 100 };
  }

  const change = countOfThisMonth - countOfLastMonth;
  const percentage = Math.abs((change / countOfLastMonth) * 100);

  if (change > 0) {
    return { trend: "increment", percentage };
  } else if (change < 0) {
    return { trend: "decrement", percentage };
  } else {
    return { trend: "no change", percentage: 0 };
  }
};

export const formatKey = (key: keyof TripFormData) => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};
