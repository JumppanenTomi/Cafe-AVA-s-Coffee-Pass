import { fetchVouchers, fetchVouchersCount } from "@/utils/ServerActions/voucher";
import VouchersClient from "./client";

/**
 * Fetches and displays a list of vouchers based on the provided search parameters.
 * @param {Object} searchParams - The search parameters.
 * @param {string} searchParams.query - The search query string.
 * @param {string} searchParams.sort - The sort order.
 * @param {string} searchParams.page - The current page number.
 * @returns {JSX.Element} A VouchersClient component with the list of vouchers.
 */
export default async function VouchersPage({
  searchParams = {},
}: {
  searchParams?: {
    query?: string;
    sort?: string;
    page?: string;
  };
}) {
  // Extract search parameters
  const { query = '', sort = '-id', page } = searchParams;
  const currentPage = Number(page) || 1;

  //TODO: Add better error handling
  const [vouchers, count] = await Promise.all([
    fetchVouchers(query, sort, currentPage) as any,
    fetchVouchersCount(query),
  ]);


  return <VouchersClient vouchers={vouchers} count={count} query={query} sort={sort} currentPage={currentPage} />;
}