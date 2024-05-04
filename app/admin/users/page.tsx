import { fetchUsersInPages, findUser } from "@/utils/ServerActions/user";
import UsersClient from "./client";
import getRole from "@/utils/getRole";

export default async function UsersPage({
  searchParams = {},
}: {
  searchParams?: {
    query?: string;
    sort?: string;
    page?: string;
  };
}) {
  const { query = "", sort = "-created_at", page } = searchParams;
  const currentPage = parseInt(page || "1");

  const { users, count } = await fetchUsersInPages(currentPage, 25, sort);
  const { users: filteredUsers, count: filteredCount } = await findUser(
    sort,
    query
  );

  console.log(await getRole());

  return (
    <UsersClient
      users={query !== "" ? filteredUsers : users}
      count={query !== "" ? filteredCount : count}
      query={query}
      sort={sort}
      currentPage={currentPage}
    />
  );
}
