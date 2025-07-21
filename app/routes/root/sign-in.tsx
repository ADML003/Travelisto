import { Link, redirect } from "react-router";
import { Button } from "../../../components/ui/Button";
import { LoadingSpinner } from "../../../components";
import { loginWithGoogle } from "~/appwrite/auth";
import { account } from "~/appwrite/client";

export async function clientLoader() {
  try {
    const user = await account.get();
    console.log("Sign-in loader - User found:", user?.$id);

    if (user.$id) {
      // Force a full reload to ensure session cookies are picked up (especially on mobile)
      if (typeof window !== "undefined") {
        window.location.href = "/";
        return null;
      }
      return redirect("/");
    }
  } catch (e) {
    // If unauthorized, redirect to sign-in
    // Appwrite 401 errors have a 'type' property and a message
    if (e && typeof e === "object" && "code" in e && e.code === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/sign-in";
        return null;
      }
      return redirect("/sign-in");
    }
    // Optionally log or handle other errors
    console.log("No authenticated user found", e);
  }

  return null;
}

const SignIn = () => {
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
