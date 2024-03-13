import {createClient} from "@/utils/supabase/server";
import Link from "next/link";
import {redirect} from "next/navigation";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: {user},
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
      return redirect("/auth/login");
  };

  return user ? (
      <div className="flex items-center">
        <form action={signOut}>
          <button className="font-bold rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
            Logout
          </button>
        </form>
      </div>
  ) : (
      <div className={"flex items-center gap-4"}>
          <Link href="/auth/login"
                className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">Login</Link>
          <Link href="/auth/register"
                className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">Register</Link>
      </div>

  );
}
