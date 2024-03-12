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
      <div className="flex items-center gap-4">
        Hey, {user.email}!
        <form action={signOut}>
          <button className="btn-secondary">
            Logout
          </button>
        </form>
      </div>
  ) : (
      <div className={"flex items-center w-full gap-4"}>
          <Link href="/auth/login"
                className="btn-primary w-full">Login</Link>
          <Link href="/auth/register"
                className="btn-secondary w-full">Register</Link>
      </div>

  );
}
