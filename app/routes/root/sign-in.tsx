import { Link, redirect, useSearchParams } from "react-router";
import { Button } from "../../../components/ui/Button";
import { LoadingSpinner } from "../../../components";
import { loginWithGoogle } from "~/appwrite/auth";
import { account } from "~/appwrite/client";

export async function clientLoader() {
  try {
    const user = await account.get();
    console.log("Sign-in loader - User found:", user?.$id);

    if (user.$id) {
      // User is authenticated, redirect to home page
      return redirect("/");
    }
  } catch (e) {
    // If there's an error getting the user (like 401 unauthorized),
    // it means user is not authenticated, so we stay on sign-in page
    console.log("No authenticated user found, staying on sign-in page");
  }

  // User is not authenticated, stay on sign-in page
  return null;
}

const SignIn = () => {
  const [searchParams] = useSearchParams();
  const oauthError = searchParams.get("error");

  return (
    <main className="auth">
      <section className="size-full glassmorphism flex-center px-6">
        <div className="sign-in-card">
          <header className="header">
            <Link to="/">
              <img
                src="/assets/icons/travelisto-logo-blue.svg"
                alt="Travelisto logo"
                className="size-[50px]"
              />
            </Link>
            <h1 className="p-28-bold text-dark-100">Travelisto</h1>
          </header>

          <article>
            <h2 className="p-28-semibold text-dark-100 text-center">
              Start Your Travel Journey
            </h2>

            <p className="p-18-regular text-center text-gray-100 !leading-7">
              Sign in with Google to manage destinations, itineraries, and user
              activity with ease.
            </p>

            {oauthError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
                <p className="text-red-700 text-sm text-center">
                  {oauthError === "oauth_failed"
                    ? "Sign-in was cancelled or failed. Please try again."
                    : "An error occurred during sign-in. Please try again."}
                </p>
              </div>
            )}
          </article>

          <Button
            type="button"
            className="button-class !h-11 !w-full"
            onClick={loginWithGoogle}
          >
            <img
              src="/assets/icons/google.svg"
              className="size-5"
              alt="google"
            />
            <span className="p-18-semibold text-white">
              Sign in with Google
            </span>
          </Button>
        </div>
      </section>
    </main>
  );
};


export function ClientLoaderFallback() {
  return (
    <div className="min-h-screen bg-light-200 flex items-center justify-center">
      <LoadingSpinner size="lg" text="Checking authentication..." />
    </div>
  );
}

export default SignIn;
