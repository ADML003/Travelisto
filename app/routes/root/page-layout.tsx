import { Outlet, redirect, useNavigate } from "react-router";
import { getExistingUser, logoutUser, storeUserData } from "~/appwrite/auth";
import { account } from "~/appwrite/client";
import RootNavbar from "../../../components/RootNavbar";
import { LoadingSpinner } from "../../../components";

export async function clientLoader() {
  try {
    console.log("Page layout loader - Getting user");
    const user = await account.get();
    console.log("Page layout loader - User:", user?.$id);

    if (!user.$id) {
      console.log("No user ID, redirecting to sign-in");
      return redirect("/sign-in");
    }

    console.log("Checking for existing user in database");
    const existingUser = await getExistingUser(user.$id);
    console.log("Existing user:", existingUser?.$id);

    if (existingUser?.$id) {
      console.log("Returning existing user");
      return existingUser;
    } else {
      console.log("Storing new user data");
      try {
        // Store user data and then return the user
        await storeUserData();
        // After storing, get the user again
        const newUser = await getExistingUser(user.$id);
        console.log("New user stored:", newUser?.$id);
        return newUser || user;
      } catch (storeError) {
        console.error("Error storing user data:", storeError);
        // If we can't store user data, still return the authenticated user
        // to prevent redirect loops
        return user;
      }
    }
  } catch (e) {
    console.error("Error in page layout loader:", e);
    // Only redirect to sign-in if it's clearly an authentication error
    if (e && typeof e === "object" && "code" in e && e.code === 401) {
      return redirect("/sign-in");
    }
    // For other errors, try to continue with a fallback
    console.log("Non-auth error, trying to continue...");
    throw e; // Let React Router handle other errors
  }
}

const PageLayout = () => {
  return (
    <div className="bg-light-200">
      <RootNavbar />
      <Outlet />
    </div>
  );
};

export function ClientLoaderFallback() {
  return (
    <div className="min-h-screen bg-light-200 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" text="Authenticating..." />
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            Verifying your session...
          </p>
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="min-h-screen bg-light-200 flex items-center justify-center">
      <div className="text-center p-6">
        <h2 className="text-xl font-semibold text-red-600 mb-4">
          Authentication Error
        </h2>
        <p className="text-gray-600 mb-4">
          There was a problem with authentication. Please try signing in again.
        </p>
        <button
          onClick={() => window.location.href = '/sign-in'}
          className="bg-primary-100 text-white px-4 py-2 rounded hover:bg-primary-200 transition-colors"
        >
          Go to Sign In
        </button>
      </div>
    </div>
  );
}

export default PageLayout;
