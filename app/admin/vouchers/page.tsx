import { fetchVouchers, fetchVouchersCount } from "@/utils/ServerActions/voucher";
import VouchersClient from "./client";
import { fetchUsers } from "@/utils/ServerActions/user";

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

  //TODO: Add better error handling
  const [vouchers, count] = await Promise.all([
    fetchVouchers(query, sort, currentPage) as any,
    fetchVouchersCount(query),
  ]);

  const users = await fetchUsers(1);

  return <VouchersClient vouchers={vouchers} count={count} users={users} query={query} sort={sort} currentPage={currentPage} />;
}