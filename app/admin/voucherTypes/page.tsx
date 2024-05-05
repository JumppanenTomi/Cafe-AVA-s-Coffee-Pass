import VoucherTypesClient from "./client";
import { fetchVoucherTypes, fetchVoucherTypesCount } from "@/utils/ServerActions/voucher_types";

/**
 * Fetches and displays a list of voucher types based on the provided search parameters.
 * @param {Object} searchParams - The search parameters.
 * @param {string} searchParams.query - The search query string.
 * @param {string} searchParams.sort - The sort order.
 * @param {string} searchParams.page - The current page number.
 * @returns {JSX.Element} A VoucherTypesClient component with the list of voucher types.
 */
export default async function VoucherTypesPage({
  searchParams = {},
}: {
  searchParams?: {
    query?: string;
    sort?: string;
    page?: string;
  };
}) {
  const { query = "", sort = "-id", page } = searchParams;
  const currentPage = Number(page) || 1;

  const [voucherTypes, count] = await Promise.all([
    fetchVoucherTypes(query, sort, currentPage) as any,
    fetchVoucherTypesCount(query),
  ]);
  
  return (
    <VoucherTypesClient
      voucherTypes={voucherTypes}
      count={count}
      query={query}
      sort={sort}
      currentPage={currentPage}
    />
  );
}
