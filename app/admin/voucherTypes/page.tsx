import VoucherTypesClient from "./client";
import { fetchVoucherTypes, fetchVoucherTypesCount } from "@/utils/ServerActions/voucher_types";

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
