import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import logo from "@/public/logo.png";
import { Form } from "@/components/Inputs/Form";
import EmailInput from "@/components/Inputs/EmailInput";
import { FormSubmitButton } from "@/components/Inputs/FormSubmitButton";

export default function Register({
  searchParams,
}: {
  searchParams: { isError: string; message: string };
}) {
  const signUp = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_VERCEL_URL!}/auth/callback`,
      },
    });

    if (error) {
      console.log("error", error);
      return redirect(
        "/auth/register?isError=true&message=Could not authenticate user"
      );
    }

    return redirect(
      "/auth/register?isError=false&message=Check email to continue sign in process"
    );
  };

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <div className="flex flex-col items-center justify-center gap-5 p-5 w-full flex-grow bg-[url('/coffee.jpg')] bg-cover bg-top">
        <Image src={logo} alt={"ava logo"} width={100} />
      </div>
      <div className="flex flex-col items-center justify-center gap-5 py-16 w-full max-w-screen-sm p-5">
        <h1 className={"font-bold text-3xl"}>Register</h1>
        <p className={"text-center font-medium max-w-screen-sm"}>
          Once you have submitted your email, a sign-in link will be sent
          directly to your inbox. Using this link, you can securely access
          website.
        </p>
        <Form
          isError={searchParams.isError == "true"}
          error={searchParams.message}
        >
          <EmailInput />
          <div className={"flex items-center w-full gap-4"}>
            <Link href={"/"} className={"btn-secondary w-full"}>
              Back
            </Link>
            <FormSubmitButton formAction={signUp} pendingText="Signing In...">
              Sign Up
            </FormSubmitButton>
          </div>
          {process.env.NEXT_PUBLIC_VERCEL_URL! === "http://localhost:3000" &&
              <div className={'flex flex-col'}>
                <Link href={"http://127.0.0.1:54324/"} className={'btn-primary'}>Open dev mailbox</Link>
                <label>*only visible when in local environment</label>
              </div>
          }
        </Form>
      </div>
    </div>
  );
}
