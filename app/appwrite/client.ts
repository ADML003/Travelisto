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

const client = new Client()
  .setEndpoint(appwriteConfig.endpointUrl || "")
  .setProject(appwriteConfig.projectId || "");

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);

export { client, account, database, storage };
