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
      // Store user data and then return the user
      await storeUserData();
      // After storing, get the user again
      const newUser = await getExistingUser(user.$id);
      console.log("New user stored:", newUser?.$id);
      return newUser || user;
    }
  } catch (e) {
    console.error("Error in page layout loader:", e);
    return redirect("/sign-in");
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
      <LoadingSpinner size="lg" text="Authenticating..." />
    </div>
  );
}

export default PageLayout;
