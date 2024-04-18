import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import { Form } from "@/components/Inputs/Form";
import EmailInput from "@/components/Inputs/EmailInput";
import { FormSubmitButton } from "@/components/Inputs/FormSubmitButton";
import { signUp } from "@/utils/ServerActions/authentication";
import CheckboxInput from "@/components/Inputs/CheckboxInput";

export default function Register({
  searchParams,
}: {
  searchParams: { isError: string; message: string };
}) {
  return (
    <div className='flex flex-col items-center flex-1 w-full'>
      <div className="flex flex-col items-center justify-center gap-5 p-5 w-full flex-grow bg-[url('/coffee.jpg')] bg-cover bg-top">
        <Image src={logo} alt={"ava logo"} width={100} />
      </div>
      <div className='flex flex-col items-center justify-center w-full max-w-screen-sm gap-5 p-5 py-16'>
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
          <CheckboxInput isRequired={true}>
            <p>
              * I agree <a href={process.env.TERMS_AND_CONDITIONS_URL} className={'underline font-bold'}>terms and conditions</a> and <a href={process.env.PRIVACY_POLICY_URL} className={'underline font-bold'}>privacy policy</a>
            </p>
          </CheckboxInput>
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
