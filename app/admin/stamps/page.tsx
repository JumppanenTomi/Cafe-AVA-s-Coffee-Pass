import StampsClient from "./client";
import { fetchStamps, fetchStampsCount } from "@/utils/ServerActions/stamp";

/**
 * Fetches and displays stamps based on provided search parameters.
 * @param {Object} searchParams - The search parameters for fetching stamps.
 * @param {string} searchParams.query - The search query string.
 * @param {string} searchParams.sort - The sort order.
 * @param {string} searchParams.page - The current page number.
 * @returns {JSX.Element} A StampsClient component with fetched data.
 */
export default async function StampsPage({
  searchParams = {},
}: {
  searchParams?: {
    query?: string;
    sort?: string;
    page?: string;
  };
}) {
  const { query = "", sort = "-stamp_log_id", page } = searchParams;
  const currentPage = Number(page) || 1;

  const [stamps, count] = await Promise.all([
    fetchStamps(query, sort, currentPage),
    fetchStampsCount(query),
  ]);

  return (
    <StampsClient
      stamps={stamps}
      count={count}
      query={query}
      sort={sort}
      currentPage={currentPage}
    />
  );
}
