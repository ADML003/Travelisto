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
  console.error(
    "Missing required Appwrite environment variables. Please check your .env file."
  );
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
  .setEndpoint(appwriteConfig.endpointUrl)
  .setProject(appwriteConfig.projectId);

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);

export { client, account, database, storage };
