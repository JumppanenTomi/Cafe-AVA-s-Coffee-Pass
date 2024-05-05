import { fetchUsersInPages, findUser } from "@/utils/ServerActions/user";
import UsersClient from "./client";
import getRole from "@/utils/getRole";

/**
 * Fetches and displays a list of users based on the provided search parameters.
 * @param {Object} searchParams - The search parameters.
 * @param {string} searchParams.query - The search query string.
 * @param {string} searchParams.sort - The sort order.
 * @param {string} searchParams.page - The current page number.
 * @returns {JSX.Element} A UsersClient component with the list of users.
 */
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
