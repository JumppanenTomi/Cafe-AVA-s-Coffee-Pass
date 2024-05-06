import Link from "next/link";
import { Form } from "@/components/Inputs/Form";
import EmailInput from "@/components/Inputs/EmailInput";
import { FormSubmitButton } from "@/components/Inputs/buttons/FormSubmitButton";
import { signUp } from "@/utils/ServerActions/authentication";
import { fetchSiteSetting } from "@/utils/ServerActions/siteSetting";
import CheckboxInput from "@/components/Inputs/CheckboxInput";
import LogoContainer from "@/components/logoContainer";

export default async function Register({
  searchParams,
}: {
  searchParams: { isError: string; message: string };
}) {
  const registerText = await fetchSiteSetting("registerText"); //fetches the register text from the database
  const termsOfUseUrl = await fetchSiteSetting("termsOfUseUrl"); //fetches the terms of use url from the database
  const privacyPolicyUrl = await fetchSiteSetting("privacyPolicyUrl"); //fetches the privacy policy url from the database

  return (
    <div className='flex flex-col justify-between flex-1 w-full'>
      <LogoContainer />
      <div className='flex flex-col items-center justify-center gap-5 p-5'>
        <h1>Register</h1>
        <p className={"text-center"}>
          {registerText?.value || "Error loading register message."}
        </p>
        <Form
          isError={searchParams.isError == "true"}
          error={searchParams.message}
        >
          <EmailInput />
          <CheckboxInput isRequired={true}>
            <p>
              * I agree{" "}
              <a
                href={termsOfUseUrl?.value || "#"}
                className={"underline font-bold"}
              >
                terms and conditions
              </a>{" "}
              and{" "}
              <a
                href={privacyPolicyUrl?.value || "#"}
                className={"underline font-bold"}
              >
                privacy policy
              </a>
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
        </Form>
        {/*if the environment is local, show the link to the dev mailbox*/}
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
