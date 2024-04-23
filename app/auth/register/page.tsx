import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import maker from "@/public/images/maker.png";
import { Form } from "@/components/Inputs/Form";
import EmailInput from "@/components/Inputs/EmailInput";
import { FormSubmitButton } from "@/components/Inputs/buttons/FormSubmitButton";
import { signUp } from "@/utils/ServerActions/authentication";
import { fetchSiteSetting } from "@/utils/ServerActions/siteSetting";

export default async function Register({
  searchParams,
}: {
  searchParams: { isError: string; message: string };
}) {
  const registerText = await fetchSiteSetting("registerText");
  const logoUrl = await fetchSiteSetting("logoUrl");

  return (
    <div className='flex flex-col items-center flex-1 w-full'>
      <div className='flex flex-col items-center flex-grow w-full gap-5 p-5 bg-center bg-cover justify-evenly'>
        {logoUrl && logoUrl.value ? (
          <img src={logoUrl.value} alt={"Cafe AVA- Logo"} width={100} />
        ) : (
          <Image src={logo} alt={"Cafe AVA- Logo"} width={100} />
        )}
        <Image
          src={maker}
          alt={"ava logo"}
          width={300}
          className='w-full max-w-[300px]'
        />
      </div>
      <div className='flex flex-col items-center justify-center w-full max-w-screen-sm gap-5 p-5 py-16'>
        <h1 className={"font-bold text-3xl"}>Register</h1>
        <p className={"text-center font-medium max-w-screen-sm"}>
          {registerText?.value || "Error loading register message."}
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
            <FormSubmitButton formAction={signUp} pendingText='Signing In...'>
              Sign Up
            </FormSubmitButton>
          </div>
          {process.env.NEXT_PUBLIC_VERCEL_URL! === "http://localhost:3000" && (
            <div className={"flex flex-col"}>
              <Link href={"http://127.0.0.1:54324/"} className={"btn-primary"}>
                Open dev mailbox
              </Link>
              <label>*only visible when in local environment</label>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
}
