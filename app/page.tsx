import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import SocialLogin from "@/components/Inputs/buttons/SocialLogin";
import FadeIn from "@/components/Animations/Render/FadeIn";
import { fetchSiteSetting } from "@/utils/ServerActions/siteSetting";
import LogoContainer from "@/components/logoContainer";

export default async function Index() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/client");
  }

  const greetings = await fetchSiteSetting("welcomeText");

  return (
    <FadeIn duration={1} className='flex flex-grow max-w-screen-sm'>
      <div className='flex flex-col justify-between flex-1 max-h-full'>
        <LogoContainer />
        <div className='flex flex-col items-center justify-center gap-5 p-5'>
          <h1>Welcome!</h1>
          <p className={"text-center"}>
            {greetings?.value || "Error loading welcome message."}
          </p>
          <SocialLogin />
          <div className={"flex flex-wrap w-full md:w-4/6 gap-5 items-center"}>
            <hr className={"flex-grow border-black"} />
            <p>or</p>
            <hr className={"flex-grow border-black"} />
          </div>
          <div className={"flex items-center w-full gap-4"}>
            <Link href='/auth/login' className='w-full btn-primary'>
              Login
            </Link>
            <Link href='/auth/register' className='w-full btn-secondary'>
              Register
            </Link>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
