import Table from "./Table";
import { createClient } from "@/utils/supabase/server";

export default async function Users() {
  const supabase = createClient(true);

  const { data: { users }, error } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 1000
  })

  return (
    <Table users={users} />
  )
}