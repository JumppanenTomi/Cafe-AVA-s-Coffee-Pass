import { fetchUsers2, fetchUsersCount } from "@/utils/ServerActions/user";
import UsersClient from "./client";

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
  const currentPage = Number(page) || 1;

  const [users, count] = await Promise.all([
    fetchUsers2(query, sort, currentPage),
    fetchUsersCount(query),
  ]);

  return (
    <UsersClient
      users={users}
      count={count}
      query={query}
      sort={sort}
      currentPage={currentPage}
    />
  );
}
