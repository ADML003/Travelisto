// import { ID, OAuthProvider, Query } from "appwrite";
// import { account, database, appwriteConfig } from "~/appwrite/client";
// import { redirect } from "react-router";

// export const getExistingUser = async (id: string) => {
//   try {
//     const { documents, total } = await database.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.userCollectionId,
//       [Query.equal("accountId", id)]
//     );
//     return total > 0 ? documents[0] : null;
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     return null;
//   }
// };

// export const storeUserData = async () => {
//   try {
//     const user = await account.get();
//     if (!user) throw new Error("User not found");

//     const { providerAccessToken } = (await account.getSession("current")) || {};
//     const profilePicture = providerAccessToken
//       ? await getGooglePicture(providerAccessToken)
//       : null;

//     const createdUser = await database.createDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.userCollectionId,
//       ID.unique(),
//       {
//         accountId: user.$id,
//         email: user.email,
//         name: user.name,
//         imageUrl: profilePicture,
//         joinedAt: new Date().toISOString(),
//       }
//     );

//     if (!createdUser.$id) redirect("/sign-in");
//   } catch (error) {
//     console.error("Error storing user data:", error);
//   }
// };

// const getGooglePicture = async (accessToken: string) => {
//   try {
//     const response = await fetch(
//       "https://people.googleapis.com/v1/people/me?personFields=photos",
//       { headers: { Authorization: `Bearer ${accessToken}` } }
//     );
//     if (!response.ok) throw new Error("Failed to fetch Google profile picture");

//     const { photos } = await response.json();
//     return photos?.[0]?.url || null;
//   } catch (error) {
//     console.error("Error fetching Google picture:", error);
//     return null;
//   }
// };

// export const loginWithGoogle = async () => {
//   try {
//     account.createOAuth2Session(
//       OAuthProvider.Google,
//       `${window.location.origin}/`,
//       `${window.location.origin}/404`
//     );
//   } catch (error) {
//     console.error("Error during OAuth2 session creation:", error);
//   }
// };

// export const logoutUser = async () => {
//   try {
//     await account.deleteSession("current");
//   } catch (error) {
//     console.error("Error during logout:", error);
//   }
// };

// export const getUser = async () => {
//   try {
//     const user = await account.get();
//     if (!user) return redirect("/sign-in");

//     const { documents } = await database.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.userCollectionId,
//       [
//         Query.equal("accountId", user.$id),
//         Query.select(["name", "email", "imageUrl", "joinedAt", "accountId"]),
//       ]
//     );

//     return documents.length > 0 ? documents[0] : redirect("/sign-in");
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     return null;
//   }
// };

// export const getAllUsers = async (limit: number, offset: number) => {
//   try {
//     const { documents: users, total } = await database.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.userCollectionId,
//       [Query.limit(limit), Query.offset(offset)]
//     );

//     if (total === 0) return { users: [], total };

//     return { users, total };
//   } catch (e) {
//     console.log("Error fetching users");
//     return { users: [], total: 0 };
//   }
// };

import { ID, OAuthProvider, Query } from "appwrite";
import { account, database, appwriteConfig } from "~/appwrite/client";
import { redirect } from "react-router";

const isAuthError = (error: unknown) => {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    Number((error as { code?: unknown }).code) === 401
  );
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mobile browsers can take a short moment after OAuth redirect before
// Appwrite session cookies are available in account.get().
export const getCurrentAccount = async (
  maxAttempts = 10,
  retryDelayMs = 300,
) => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const user = await account.get();
      if (user?.$id) return user;
    } catch (error) {
      if (!isAuthError(error)) throw error;

      if (attempt === maxAttempts) {
        return null;
      }

      const backoffDelay = retryDelayMs * Math.min(attempt, 6);
      await wait(backoffDelay);
    }
  }

  return null;
};

// Function to initiate OAuth login with Google
export const loginWithGoogle = async () => {
  try {
    console.log("Initiating Google OAuth login");

    // Get the current origin for redirect URLs
    const origin = typeof window !== "undefined" ? window.location.origin : "";

    await account.createOAuth2Session(
      OAuthProvider.Google,
      `${origin}/auth/callback`,
      `${origin}/sign-in?error=oauth_failed`,
    );
  } catch (error) {
    console.error("Error during OAuth2 session creation:", error);

    // Don't throw the error as it might be expected behavior
    // (user canceling OAuth, etc.)
    if (typeof window !== "undefined") {
      // Optionally show a user-friendly error message
      console.log("OAuth login was cancelled or failed");
    }
  }
};

// Function to store user data after successful login
export const storeUserData = async () => {
  try {
    const user = await account.get();
    if (!user) throw new Error("User not found");

    // Check if user already exists to avoid duplicates
    const existingUser = await getExistingUser(user.$id);
    if (existingUser) return existingUser;

    // Fetch session to get the JWT token
    const { providerAccessToken } = (await account.getSession("current")) || {};
    const profilePicture = providerAccessToken
      ? await getGooglePicture(providerAccessToken)
      : null;

    // Store user data in database
    const createdUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: user.$id,
        email: user.email,
        name: user.name,
        imageUrl: profilePicture,
        joinedAt: new Date().toISOString(),
      },
    );

    if (!createdUser.$id) {
      throw new Error("Failed to create user document");
    }

    return createdUser;
  } catch (error) {
    console.error("Error storing user data:", error);
    throw error;
  }
};

// Helper function to get Google profile picture
const getGooglePicture = async (accessToken: string) => {
  try {
    const response = await fetch(
      "https://people.googleapis.com/v1/people/me?personFields=photos",
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    if (!response.ok) throw new Error("Failed to fetch Google profile picture");

    const { photos } = await response.json();
    return photos?.[0]?.url || null;
  } catch (error) {
    console.error("Error fetching Google picture:", error);
    return null;
  }
};

// Function to get the current user session and retrieve JWT
export const setJwtSession = async () => {
  try {
    const user = await account.get();
    if (!user) {
      return redirect("/sign-in"); // Redirect if no user
    }

    // Get the current session
    const session = await account.getSession("current");

    // You can now use the session to authenticate API calls
    console.log("Session ID:", session?.$id); // Access session ID here

    // Optional: Store session ID if needed
    localStorage.setItem("sessionId", session?.$id || ""); // Or sessionStorage
  } catch (error) {
    console.error("Failed to fetch user or JWT:", error);
    redirect("/sign-in");
  }
};

// Function to log out the user and clear JWT
export const logoutUser = async () => {
  try {
    await account.deleteSession("current");
    // Optional: Clear JWT from storage (if you stored it)
    localStorage.removeItem("jwt");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

// Function to get the existing user from the database
export const getExistingUser = async (id: string) => {
  try {
    const { documents, total } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", id)],
    );
    return total > 0 ? documents[0] : null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

// Function to get all users with pagination
export const getAllUsers = async (limit: number, offset: number) => {
  try {
    const { documents: users, total } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.limit(limit), Query.offset(offset)],
    );

    if (total === 0) return { users: [], total };

    return { users, total };
  } catch (e) {
    console.log("Error fetching users");
    return { users: [], total: 0 };
  }
};

// Function to get the user data from the database by their Appwrite account ID
export const getUser = async () => {
  try {
    const user = await getCurrentAccount();
    if (!user?.$id) throw redirect("/sign-in");

    const { documents } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [
        Query.equal("accountId", user.$id),
        Query.select(["name", "email", "imageUrl", "joinedAt", "accountId"]),
      ],
    );

    if (documents.length === 0) throw redirect("/sign-in");

    return documents[0];
  } catch (error) {
    if (error instanceof Response) throw error;

    if (isAuthError(error)) throw redirect("/sign-in");

    console.error("Error fetching user:", error);
    return null;
  }
};
