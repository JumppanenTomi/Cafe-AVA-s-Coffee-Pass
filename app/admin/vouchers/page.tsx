import { fetchUsers } from "../users/server";
import VouchersClient from "./client";
import { fetchVouchers, fetchVouchersCount } from "./server";

export default async function VouchersPage({
  searchParams = {},
}: {
  searchParams?: {
    query?: string;
    sort?: string;
    page?: string;
  };
}) {
  const { query = '', sort = '-voucher_log_id', page } = searchParams;
  const currentPage = Number(page) || 1;

  const [vouchers, count] = await Promise.all([
    fetchVouchers(query, sort, currentPage),
    fetchVouchersCount(query),
  ]);

  const users = await fetchUsers(1);

  return <VouchersClient vouchers={vouchers} count={count} users={users} query={query} sort={sort} currentPage={currentPage} />;
}