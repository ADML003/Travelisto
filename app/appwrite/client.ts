import { Account, Client, Databases, Storage } from "appwrite";

export const appwriteConfig = {
  endpointUrl: import.meta.env.VITE_APPWRITE_API_ENDPOINT,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  apiKey: import.meta.env.VITE_APPWRITE_API_KEY,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  userCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
  tripCollectionId: import.meta.env.VITE_APPWRITE_TRIPS_COLLECTION_ID,
};

// Validate required environment variables
if (!appwriteConfig.endpointUrl || !appwriteConfig.projectId) {
  const missingVars = [];
  if (!appwriteConfig.endpointUrl) missingVars.push("VITE_APPWRITE_API_ENDPOINT");
  if (!appwriteConfig.projectId) missingVars.push("VITE_APPWRITE_PROJECT_ID");
  if (!appwriteConfig.databaseId) missingVars.push("VITE_APPWRITE_DATABASE_ID");
  if (!appwriteConfig.userCollectionId) missingVars.push("VITE_APPWRITE_USERS_COLLECTION_ID");
  if (!appwriteConfig.tripCollectionId) missingVars.push("VITE_APPWRITE_TRIPS_COLLECTION_ID");
  
  console.error(
    `Missing required Appwrite environment variables: ${missingVars.join(", ")}. ` +
    "Please check your .env file or Vercel environment variables."
  );
  
  // In development, show a more helpful error
  if (import.meta.env.DEV) {
    console.error(
      "To fix this:\n" +
      "1. Copy .env.example to .env\n" +
      "2. Update the values with your Appwrite project details\n" +
      "3. Restart the development server"
    );
  }
}

// Warn if endpoint is not HTTPS or is localhost in production (important for cookies on mobile)
if (
  typeof window !== "undefined" &&
  window.location.hostname !== "localhost" &&
  (!appwriteConfig.endpointUrl.startsWith("https://") || appwriteConfig.endpointUrl.includes("localhost"))
) {
  console.warn(
    "[Appwrite] Your endpoint is not HTTPS or is localhost in production. This will break authentication cookies on mobile browsers. Please use a public HTTPS endpoint for Appwrite."
  );
}

const client = new Client()
  .setEndpoint(appwriteConfig.endpointUrl || "")
  .setProject(appwriteConfig.projectId || "");

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);

export { client, account, database, storage };
