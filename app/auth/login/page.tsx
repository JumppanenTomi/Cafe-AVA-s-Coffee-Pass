import { FormSubmitButton } from "@/components/Inputs/buttons/FormSubmitButton";
import EmailInput from "@/components/Inputs/EmailInput";
import { Form } from "@/components/Inputs/Form";
import Link from "next/link";
import { signIn } from "@/utils/ServerActions/authentication";
import { fetchSiteSetting } from "@/utils/ServerActions/siteSetting";
import LogoContainer from "@/components/logoContainer";

export default async function Login({
  searchParams,
}: {
  searchParams: { isError: string; message: string };
}) {
  const logintext = await fetchSiteSetting("loginText");

  return (
    <div className='flex flex-col justify-between flex-1 w-full'>
      <LogoContainer />
      <div className='flex flex-col items-center justify-center gap-5 p-5'>
        <h1>Login</h1>
        <p className={"text-center"}>
          {logintext?.value || "Error loading login message."}
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
            <FormSubmitButton formAction={signIn} pendingText='Signing In...'>
              Sign In
            </FormSubmitButton>
          </div>
        </Form>
        {process.env.NEXT_PUBLIC_VERCEL_URL! === "http://localhost:3000" && (
          <div className={"flex flex-col w-full"}>
            <Link href={"http://127.0.0.1:54324/"} className={"btn-primary"}>
              Open dev mailbox
            </Link>
            <label>*only visible when in local environment</label>
          </div>
        )}
      </div>
    </div>
  );
}
