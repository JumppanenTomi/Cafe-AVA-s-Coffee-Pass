"use server";
import { Tables, TablesUpdate } from "./../../types/supabase";
import { getFormattedDate } from "../getFormattedDate";
import { createClient } from "../supabase/server";
import { getUserId } from "./user";
import { error } from "console";

/**
 * Fetches active vouchers from the server.
 * Active vouchers are vouchers that have a start date before or equal to the current date
 * and an end date after or equal to the current date.
 *
 * @returns A promise that resolves to an array of active vouchers, or undefined if an error occurs.
 */
export const fetchActiveVouchers = async () => {
  const supabase = createClient();
  const currentDate = getFormattedDate(new Date());

  try {
    const { data: vouchers, error } = await supabase
      .from("vouchers")
      .select("*")
      .filter("start_date", "lte", currentDate)
      .filter("end_date", "gte", currentDate);

    if (error) {
      throw new Error(error.message);
    }

    return vouchers;
  } catch (error: any) {
    console.error(`Failed to fetch active vouchers: ${error.message}`);
    return;
  }
};

/**
 * Fetches the number of times a voucher has been used by a specific user.
 *
 * @param voucherId - The ID of the voucher.
 * @returns The number of times the voucher has been used by the user, or 0 if an error occurs.
 */
export const fetchVoucherUsePerUser = async (voucherId: number) => {
  const supabase = createClient();
  const userId = await getUserId();

  try {
    if (!userId) {
      throw new Error("User not found");
    }
    const { count, error } = await supabase
      .from("voucher_logs")
      .select("*", { head: true, count: "exact" })
      .eq("user_id", userId)
      .eq("voucher_id", voucherId);

    if (error) {
      throw new Error(error.message);
    }

    return count ?? 0;
  } catch (error: any) {
    console.error(`Failed to fetch voucher use per user: ${error.message}`);
    return;
  }
};

/**
 * Fetches vouchers from the server based on the provided query, sort, and currentPage.
 *
 * @param query - The search query to filter vouchers by name.
 * @param sort - The field to sort the vouchers by. Prefix with "-" for descending order.
 * @param currentPage - The current page number for pagination.
 * @returns A Promise that resolves to the fetched vouchers data or undefined if an error occurs.
 */
export const fetchVouchers = async (
  query: string,
  sort: string,
  currentPage: number
) => {
  const supabase = createClient(true);
  const isAscending = sort[0] !== "-";
  let sortField = isAscending ? sort : sort.slice(1);
  if (sortField === "vouchers.name") sortField = "vouchers(name)";

  try {
    const { data, error } = await supabase
      .from("voucher_logs")
      .select(`*, vouchers!inner(name)`)
      .ilike("vouchers.name", `%${query}%`)
      .range((currentPage - 1) * 25, currentPage * 25 - 1)
      .order(sortField, { ascending: isAscending });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error: any) {
    console.error(`Failed to fetch vouchers: ${error.message}`);
    return;
  }
};

/**
 * Fetches the count of vouchers from the voucher_logs table.
 *
 * @param query - The query string to filter the vouchers.
 * @returns The count of vouchers.
 */
export const fetchVouchersCount = async (query: string) => {
  const supabase = createClient(true);

  try {
    const { count, error } = await supabase
      .from("voucher_logs")
      .select("*", { count: "exact", head: true });

    if (error) {
      throw new Error(error.message);
    }

    return count ?? 0;
  } catch (error: any) {
    console.error(`Failed to fetch vouchers count: ${error.message}`);
    return 0;
  }
};

/**
 * Deletes vouchers with the specified IDs.
 *
 * @param ids - An array of numbers representing the IDs of the vouchers to delete.
 * @returns A Promise that resolves when the vouchers are successfully deleted.
 * @throws If there is an error while deleting the vouchers.
 */
export const deleteVouchers = async (ids: number[]) => {
  const supabase = createClient(true);

  try {
    const { error } = await supabase
      .from("voucher_logs")
      .delete()
      .in("voucher_log_id", ids);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error: any) {
    console.error(`Failed to delete vouchers: ${error.message}`);
  }
};

/**
 * Creates vouchers in the voucher_logs table.
 *
 * @param formData - The form data containing the user_id and voucher_id.
 * @returns A Promise that resolves to the created vouchers data, or undefined if an error occurs.
 */
export const createVouchers = async (formData: FormData) => {
  const supabase = createClient(true);

  const userId = formData.get("user_id");
  const voucherId = formData.get("voucher_id");

  try {
    //TODO: This might need tweaking, RLS is currently restricting this fuction so it might not work as expected
    if (!userId || !voucherId) {
      throw new Error("Missing user_id or voucher_id");
    }

    const rawFormData = {
      //voucher_log_id: 0,
      //timestamp: null,
      user_id: userId.toString(),
      voucher_id: parseInt(voucherId.toString()),
    };
    const { data, error } = await supabase
      .from("voucher_logs")
      .insert([rawFormData])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error: any) {
    console.error(`Failed to create vouchers: ${error.message}`);
    return;
  }
};

/**
 * Fetches voucher types based on the provided query.
 * @param query - The query string used to filter voucher types by name.
 * @returns A promise that resolves to an array of voucher types matching the query.
 * @throws If there is an error while fetching the voucher types.
 */
export const fetchVoucherTypes = async (query: string) => {
  const supabase = createClient(true);

  try {
    const { data, error } = await supabase
      .from("vouchers")
      .select()
      .ilike("name", `%${query}%`)
      .range(0, 10);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error: any) {
    console.error(`Failed to fetch voucher types: ${error.message}`);
    return;
  }
};


export const updateVoucher = async (id: number, formData: FormData) => {
  try {
    const supabase = createClient(true);
    const rawFormData: TablesUpdate<'voucher_logs'> = {
      user_id: formData.get('user_id') as string,
      voucher_id: parseInt(formData.get('voucher_id') as string) as number,
    };

    const { error } = await supabase
      .from("voucher_logs")
      .update(rawFormData)
      .eq('voucher_log_id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating voucher:', error);
    return null;
  }
}

/**
 * Updates a row in public_voucher_logs table
 * @param uses - New value for the used_per_user column when user redeems a voucher
 * @param user_id - Id of the user who the scanned voucher belongs to
 * @param voucher_id public_voucher_id 
 * @returns Updates the value for used_per_user column
 */
export const updatePublicVoucherLogs = async (uses: number, user_id: string, voucher_id: number) => {
  try {
    const supabase = createClient(true);
    const rawFormData: TablesUpdate<'public_voucher_logs'> = {
      used_per_user: uses
    };

    const { error } = await supabase
      .from('public_voucher_logs')
      .update(rawFormData)
      .eq('user_id', user_id)
      .eq('public_voucher_id', voucher_id);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating public voucher logs:', error)
    return null;
  }
}

// this is for second version of database

const getPrivateVouchers = async () => {
  const supabase = createClient()
  const userId = await getUserId();
  try {
    const { data, error } = await supabase
      .from("all_vouchers")
      .select('*,voucher_type(*)')
      .eq('user_id', `${userId}`);

    if (error) {
      throw new Error(error.message)
    }
    return data
  } catch (error: any) {
    console.error(`Failed to fetch private voucher: ${error.message}`);
    return
  }
}

const getPublicVouchers = async () => {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from("public_vouchers")
      .select('*, voucher_type(*)')

    if (error) {
      throw new Error(error.message)
    }

    return data
  } catch (error: any) {
    console.error(`Failed to fetch public vouchers: ${error.message}`);
  }
}


/**
 * Fetches all public voucher logs
 * @returns An array that contains all rows for public_voucher_logs table
 */
export const getAllPublicVoucherLogs = async () => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from('public_voucher_logs')
      .select('*')

    if (error) {
      throw new Error(error.message);
    }

    return data
  } catch (error: any) {
    console.error(`Failed to fetch all public voucher logs: ${error.message}`)
  }
}

const getPublicVoucherUses = async (voucherId: number) => {
  const userId = await getUserId();

  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from('public_voucher_logs')
      .select('used_per_user')
      .eq('user_id', `${userId}`)
      .eq('public_voucher_id', `${voucherId}`)

    if (error) {
      throw new Error(error.message);
    }
    console.log('logs', data);
    return data;
  } catch (error: any) {
    console.error(`Failed to fetch public vouchers uses: ${error.message}`);

  }
}

export const fetchAllVouchers = async () => {
  try {
    const [privateVouchers, publicVouchers] = await Promise.all([
      getPrivateVouchers(),
      getPublicVouchers(),
    ]);

    if (!privateVouchers || !publicVouchers) {
      throw new Error("Failed to fetch all vouchers");
    }

    await Promise.all(publicVouchers.map(async (pv) => {
      try {
        const used = await getPublicVoucherUses(pv.id) || [];
        pv.used = used.length > 0 ? used[0].used_per_user : 0;
      } catch (error: any) {
        console.error(`Error fetching public voucher uses: ${error.message}`);
        pv.used = 0;
      }
    }));

    const allVouchers = privateVouchers.concat(publicVouchers);
    console.log(allVouchers);
    return allVouchers;
  } catch (error: any) {
    console.error(`Failed to fetch vouchers: ${error.message}`);
    return [];
  }
};
