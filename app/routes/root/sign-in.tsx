import { Link, redirect } from "react-router";
import { Button } from "../../../components/ui/Button";
import { LoadingSpinner } from "../../../components";
import { loginWithGoogle } from "~/appwrite/auth";
import { account } from "~/appwrite/client";

export async function clientLoader() {
  try {
    const user = await account.get();

    if (user.$id) return redirect("/");
  } catch (e) {
    console.log("Error fetching user", e);
  }
}

const SignIn = () => {
  return (
    <main className="auth">
      {/* Floating decorative elements */}
      <div className="floating-element-1">🧳</div>
      <div className="floating-element-2">🗺️</div>
      <div className="floating-element-3">🎒</div>

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
