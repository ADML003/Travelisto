import { type ActionFunctionArgs, data } from "react-router";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { parseMarkdownToJson, parseTripData } from "~/lib/utils";
import { appwriteConfig, database } from "~/appwrite/client";
import { ID } from "appwrite";
import { createProduct } from "~/lib/stripe";

export const action = async ({ request }: ActionFunctionArgs) => {
  const {
    country,
    numberOfDays,
    travelStyle,
    interests,
    budget,
    groupType,
    userId,
  } = await request.json();

  // Validate input
  if (
    !country ||
    !numberOfDays ||
    !travelStyle ||
    !interests ||
    !budget ||
    !groupType ||
    !userId
  ) {
    console.error("Missing required fields:", {
      country,
      numberOfDays,
      travelStyle,
      interests,
      budget,
      groupType,
      userId,
    });
    return data({ error: "All fields are required" }, { status: 400 });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const unsplashApiKey = process.env.UNSPLASH_ACCESS_KEY!;

  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    if (!process.env.UNSPLASH_ACCESS_KEY) {
      throw new Error("UNSPLASH_ACCESS_KEY is not configured");
    }

    console.log("Starting trip generation for:", {
      country,
      numberOfDays,
      travelStyle,
      interests,
      budget,
      groupType,
    });

    const prompt = `Generate a ${numberOfDays}-day travel itinerary for ${country} based on the following user information:
        Budget: '${budget}'
        Interests: '${interests}'
        TravelStyle: '${travelStyle}'
        GroupType: '${groupType}'
        Return the itinerary and lowest estimated price in a clean, non-markdown JSON format with the following structure:
        {
        "name": "A descriptive title for the trip",
        "description": "A brief description of the trip and its highlights not exceeding 100 words",
        "estimatedPrice": "Lowest average price for the trip in USD, e.g.$price",
        "duration": ${numberOfDays},
        "budget": "${budget}",
        "travelStyle": "${travelStyle}",
        "country": "${country}",
        "interests": ${interests},
        "groupType": "${groupType}",
        "bestTimeToVisit": [
          '🌸 Season (from month to month): reason to visit',
          '☀️ Season (from month to month): reason to visit',
          '🍁 Season (from month to month): reason to visit',
          '❄️ Season (from month to month): reason to visit'
        ],
        "weatherInfo": [
          '☀️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
          '🌦️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
          '🌧️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
          '❄️ Season: temperature range in Celsius (temperature range in Fahrenheit)'
        ],
        "location": {
          "city": "name of the city or region",
          "coordinates": [latitude, longitude],
          "openStreetMap": "link to open street map"
        },
        "itinerary": [
        {
          "day": 1,
          "location": "City/Region Name",
          "activities": [
            {"time": "Morning", "description": "🏰 Visit the local historic castle and enjoy a scenic walk"},
            {"time": "Afternoon", "description": "🖼️ Explore a famous art museum with a guided tour"},
            {"time": "Evening", "description": "🍷 Dine at a rooftop restaurant with local wine"}
          ]
        },
        ...
        ]
    }`;

    console.log("Sending request to Gemini AI...");
    const textResult = await genAI
      .getGenerativeModel({ model: "gemini-1.5-flash" })
      .generateContent([prompt]);

    console.log("Received response from Gemini AI");
    const responseText = textResult.response.text();
    console.log("Raw response:", responseText);

    const trip = parseMarkdownToJson(responseText);

    if (!trip || typeof trip !== "object") {
      throw new Error("Invalid trip data generated from AI");
    }

    console.log("Trip data generated successfully, fetching images...");

    const imageResponse = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        country
      )} ${encodeURIComponent(interests)} ${encodeURIComponent(
        travelStyle
      )}&client_id=${unsplashApiKey}`
    );

    if (!imageResponse.ok) {
      console.error(
        "Failed to fetch images from Unsplash:",
        imageResponse.status,
        imageResponse.statusText
      );
      // Continue without images rather than failing
    }

    let imageUrls: string[] = [];
    try {
      const imageData = await imageResponse.json();
      imageUrls =
        imageData.results
          ?.slice(0, 3)
          ?.map((result: any) => result.urls?.regular)
          ?.filter(Boolean) || [];
    } catch (imageError) {
      console.error("Error processing image data:", imageError);
      // Continue without images
    }

    console.log("Creating trip document in database...");

    const result = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.tripCollectionId,
      ID.unique(),
      {
        tripDetail: JSON.stringify(trip),
        createdAt: new Date().toISOString(),
        imageUrls,
        userId,
      }
    );

    console.log("Trip document created successfully:", result.$id);

    const tripDetail = parseTripData(result.tripDetail) as Trip;
    const tripPrice =
      parseInt(tripDetail.estimatedPrice.replace(/[^0-9]/g, ""), 10) || 100; // Default to 100 if parsing fails

    console.log("Creating payment link...");

    const paymentLink = await createProduct(
      tripDetail.name,
      tripDetail.description,
      imageUrls,
      tripPrice,
      result.$id
    );

    console.log("Payment link created successfully");

    await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.tripCollectionId,
      result.$id,
      {
        payment_link: paymentLink.url,
      }
    );

    console.log("Trip generation completed successfully:", result.$id);
    return data({ id: result.$id });
  } catch (e) {
    console.error("Error generating travel plan: ", e);
    if (e instanceof Error) {
      console.error("Error message:", e.message);
      console.error("Error stack:", e.stack);

      // Provide more specific error messages
      if (e.message.includes("GEMINI_API_KEY")) {
        return data(
          { error: "AI service is not configured properly" },
          { status: 500 }
        );
      }

      if (e.message.includes("UNSPLASH_ACCESS_KEY")) {
        return data(
          { error: "Image service is not configured properly" },
          { status: 500 }
        );
      }

      if (e.message.includes("Invalid trip data")) {
        return data(
          { error: "Failed to generate valid trip data. Please try again." },
          { status: 500 }
        );
      }

      if (
        e.message.includes("database") ||
        e.message.includes("createDocument")
      ) {
        return data(
          { error: "Failed to save trip data. Please try again." },
          { status: 500 }
        );
      }

      if (
        e.message.includes("createProduct") ||
        e.message.includes("payment")
      ) {
        return data(
          { error: "Failed to create payment link. Please try again." },
          { status: 500 }
        );
      }
    }

    return data(
      { error: "Failed to generate travel plan. Please try again." },
      { status: 500 }
    );
  }
};
