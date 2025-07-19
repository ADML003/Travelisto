import { Outlet, redirect } from "react-router";
import { MobileSidebar, NavItems, LoadingSpinner } from "../../../components";
import { account } from "~/appwrite/client";
import { getExistingUser, storeUserData } from "~/appwrite/auth";

export async function clientLoader() {
  try {
    const user = await account.get();

    if (!user.$id) return redirect("/sign-in");

    const existingUser = await getExistingUser(user.$id);

    if (existingUser?.status === "user") {
      return redirect("/");
    }

    return existingUser?.$id ? existingUser : await storeUserData();
  } catch (e) {
    console.log("Error in clientLoader", e);
    return redirect("/sign-in");
  }
}

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <MobileSidebar />

      <aside className="w-full max-w-[270px] hidden lg:block fixed left-0 top-0 h-full">
        <div className="w-[270px] h-full border-r border-gray-200 bg-white overflow-hidden">
          <NavItems />
        </div>
      </aside>

      <aside className="children ml-0 lg:ml-[270px]">
        <Outlet />
      </aside>
    </div>
  );
};

export function ClientLoaderFallback() {
  return (
    <div className="min-h-screen bg-light-200 flex items-center justify-center">
      <LoadingSpinner size="lg" text="Verifying admin access..." />
    </div>
  );
}

export default AdminLayout;
