import { Header } from "../../../components";
import { DataTable } from "../../../components/ui/DataTable";
import { cn, formatDate } from "~/lib/utils";
import { getAllUsers } from "~/appwrite/auth";
import type { Route } from "./+types/all-users";

export const loader = async () => {
  const { users, total } = await getAllUsers(10, 0);

  return { users, total };
};

const AllUsers = ({ loaderData }: Route.ComponentProps) => {
  const { users } = loaderData;

  return (
    <main className="all-users wrapper">
      <Header
        title="Manage Users"
        description="Filter, sort, and access detailed user profiles"
      />

      <DataTable
        data={users}
        columns={[
          {
            key: "name",
            header: "Name",
            render: (_, user: UserData) => (
              <div className="flex items-center gap-1.5 px-4">
                <img
                  src={user.imageUrl}
                  alt="user"
                  className="rounded-full size-8 aspect-square"
                  referrerPolicy="no-referrer"
                />
                <span>{user.name}</span>
              </div>
            ),
          },
          {
            key: "email",
            header: "Email Address",
          },
          {
            key: "joinedAt",
            header: "Date Joined",
            render: (joinedAt: string) => formatDate(joinedAt),
          },
          {
            key: "status",
            header: "Type",
            render: (_, user: UserData) => (
              <article
                className={cn(
                  "status-column",
                  user.status === "user" ? "bg-success-50" : "bg-light-300"
                )}
              >
                <div
                  className={cn(
                    "size-1.5 rounded-full",
                    user.status === "user" ? "bg-success-500" : "bg-gray-500"
                  )}
                />
                <h3
                  className={cn(
                    "font-inter text-xs font-medium",
                    user.status === "user"
                      ? "text-success-700"
                      : "text-gray-500"
                  )}
                >
                  {user.status}
                </h3>
              </article>
            ),
          },
        ]}
      />
    </main>
  );
};
export default AllUsers;
