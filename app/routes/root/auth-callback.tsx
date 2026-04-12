import { redirect } from "react-router";
import { getCurrentAccount } from "~/appwrite/auth";
import { LoadingSpinner } from "../../../components";

export async function clientLoader() {
  const user = await getCurrentAccount(15, 350);

  if (user?.$id) {
    return redirect("/");
  }

  return redirect("/sign-in?error=session_unavailable");
}

const AuthCallback = () => {
  return (
    <main className="min-h-screen bg-light-200 flex items-center justify-center px-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <LoadingSpinner size="lg" text="Finalizing sign-in..." />
        <p className="text-gray-600 text-sm">
          Please wait while we verify your account session.
        </p>
      </div>
    </main>
  );
};

export default AuthCallback;
