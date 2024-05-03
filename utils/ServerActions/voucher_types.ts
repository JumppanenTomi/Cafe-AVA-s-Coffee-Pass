"use server";
import { TablesInsert, TablesUpdate } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";

/**
 * Fetches voucher types from the database.
 * @param {string} query - The search query.
 * @param {string} sort - The sort order.
 * @param {number} currentPage - The current page number.
 * @returns {Promise} The fetched data.
 */
export const fetchVoucherTypes = async (query: string, sort: string, currentPage: number) => {
  try {
    const supabase = createClient(true);
    const isAscending = sort[0] !== "-";
    let sortField = isAscending ? sort : sort.slice(1);

    const { data, error } = await supabase
      .from("vouchers")
      .select()
      .ilike('name', `%${query}%`)
      .range((currentPage - 1) * 25, currentPage * 25 - 1)
      .order(sortField, { ascending: isAscending });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching voucher types:', error);
    return [];
  }
};

/**
 * Fetches the count of voucher types from the database.
 * @param {string} query - The search query.
 * @returns {Promise} The count of voucher types.
 */
export const fetchVoucherTypesCount = async (query: string) => {
  try {
    const supabase = createClient(true);
    const { count, error } = await supabase
      .from("vouchers")
      .select("*", { count: "exact", head: true });

    if (error) throw error;
    return count ?? 0;
  } catch (error) {
    console.error('Error fetching voucher types count:', error);
    return 0;
  }
};

/**
 * Deletes voucher types from the database.
 * @param {number[]} ids - The ids of the voucher types to delete.
 * @returns {Promise} A promise that resolves when the deletion is complete.
 */
export const deleteVoucherTypes = async (ids: number[]) => {
  try {
    const supabase = createClient(true);
    const { error } = await supabase
      .from("vouchers")
      .delete()
      .in("voucher_id", ids);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting voucher types:', error);
    return error;
  }
};

// /**
//  * Creates a new voucher type in the database.
//  * @param {FormData} formData - The form data for the new voucher type.
//  * @returns {Promise} The created voucher type.
//  */
// export const createVoucherType = async (formData: FormData) => {
//   try {
//     const supabase = createClient(true);
//     const rawFormData: TablesInsert<"vouchers">={
//       name: formData.get('name') as string,
//       description: formData.get('description') as string || null,
//       start_date: formData.get('start_date') as string,
//       end_date: formData.get('end_date') as string,
//       uses_per_user: parseInt(formData.get('uses_per_user') as string) || null,
//       stamps_required: parseInt(formData.get('stamps_required') as string),
//     };

//     const { data, error } = await supabase
//       .from("vouchers")
//       .insert(rawFormData)
//       .select();

//     if (error) throw error;
//     return data;
//   } catch (error) {
//     console.error('Error creating voucher type:', error);
//     return null;
//   }
// }

// /**
//  * Updates a voucher type in the database.
//  * @param {number} id - The id of the voucher type to update.
//  * @param {FormData} formData - The form data for the updated voucher type.
//  * @returns {Promise} A promise that resolves when the update is complete.
//  */
// export const updateVoucherType = async (id: number, formData: FormData) => {
//   try {
//     const supabase = createClient(true);
//     const rawFormData: TablesUpdate<"vouchers">={
//       name: formData.get('name') as string,
//       description: formData.get('description') as string || null,
//       start_date: formData.get('start_date') as string,
//       end_date: formData.get('end_date') as string,
//       uses_per_user: parseInt(formData.get('uses_per_user') as string) || null,
//       stamps_required: parseInt(formData.get('stamps_required') as string),
//     };

//     const { error } = await supabase
//       .from("vouchers")
//       .update(rawFormData)
//       .eq('voucher_id', id);

//     if (error) throw error;
//   } catch (error) {
//     console.error('Error updating voucher type:', error);
//     throw error;
//   }
// }