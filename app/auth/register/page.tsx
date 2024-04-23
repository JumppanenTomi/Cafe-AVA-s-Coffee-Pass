import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import maker from "@/public/images/maker.png";
import { Form } from "@/components/Inputs/Form";
import EmailInput from "@/components/Inputs/EmailInput";
import { FormSubmitButton } from "@/components/Inputs/buttons/FormSubmitButton";
import { signUp } from "@/utils/ServerActions/authentication";
import { fetchSiteSetting } from "@/utils/ServerActions/siteSetting";
import CheckboxInput from "@/components/Inputs/CheckboxInput";

export default async function Register({
  searchParams,
}: {
  searchParams: { isError: string; message: string };
}) {
  const registerText = await fetchSiteSetting("registerText");
  const logoUrl = await fetchSiteSetting("logoUrl");

  return (
    <div className='flex flex-col items-center flex-1 w-full'>
      <div className="flex flex-col items-center justify-center gap-5 p-5 w-full flex-grow bg-[url('/coffee.jpg')] bg-cover bg-top">
        <Image src={logo} alt={"ava logo"} width={100} />
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
                <Image
                  src={logoUrl.value}
                  alt={"Logo"}
                  width={150}
                  height={50}
                  layout={"intrinsic"}
                />
              </>
            ) : (
              <Image
                src={logo}
                alt={"Cafe AVA- Logo"}
                width={150}
                height={50}
                loading={"lazy"}
              />
            )}
          </div>
        </div>
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
          <CheckboxInput isRequired={true}>
            <p>
              * I agree{" "}
              <a
                href={process.env.TERMS_AND_CONDITIONS_URL}
                className={"underline font-bold"}
              >
                terms and conditions
              </a>{" "}
              and{" "}
              <a
                href={process.env.PRIVACY_POLICY_URL}
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
