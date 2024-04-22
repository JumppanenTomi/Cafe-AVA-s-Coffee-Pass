import Image from "next/image";
import logo from "@/public/images/logo.png";
import maker from "@/public/images/maker.png";
import {redirect} from "next/navigation";
import {createClient} from "@/utils/supabase/server";
import Link from "next/link";
import SocialLogin from "@/components/Inputs/buttons/SocialLogin";
import {fetchSiteSetting} from "@/utils/ServerActions/siteSetting";

export default async function Index() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/client");
  }

  const greetings = await fetchSiteSetting("welcomeText");
  const logoUrl = await fetchSiteSetting("logoUrl");

  return (
    <div className='flex flex-col items-center flex-1 w-full'>
      <div className='flex flex-col items-center flex-grow w-full gap-5 p-5 bg-center bg-cover justify-evenly'>
        <Image
          src={maker}
          alt={"ava logo"}
          width={300}
          className='w-full max-w-[300px]'
        />
        {logoUrl && logoUrl.value ? (
            <>
              <Image src={logoUrl.value} alt={"Logo"} width={150} height={50} layout={"intrinsic"}/>
            </>
        ) : (
            <Image src={logo} alt={"Cafe AVA- Logo"} width={150} height={50} loading={"lazy"}/>
        )}
      </div>
      <div className='flex flex-col items-center justify-center w-full max-w-screen-sm gap-5 p-5 py-16'>
        <h1 className={"font-bold text-3xl"}>Welcome!</h1>
        <p className={"text-center font-medium max-w-screen-sm"}>
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
  );
}
