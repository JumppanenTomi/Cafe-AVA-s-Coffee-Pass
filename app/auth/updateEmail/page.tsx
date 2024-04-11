import Nav from "@/components/navigation/Nav";
import { FormSubmitButton } from "@/components/Inputs/buttons/FormSubmitButton";
import Link from "next/link";
import { Form } from "@/components/Inputs/Form";
import EmailInput from "@/components/Inputs/EmailInput";
import { changeEmail } from "@/utils/ServerActions/user";

let errors = "";
export default function UpdateEmail({
  searchParams,
}: {
  searchParams: { isError: string; message: string };
}) {
  return (
    <div className="flex flex-col items-center flex-1 w-full">
      <Nav />
      <div className="container px-4 mx-auto">
        <Form error={errors} isError={searchParams.isError === "true"}>
          <EmailInput />
          <FormSubmitButton formAction={changeEmail}>Confirm</FormSubmitButton>
          {searchParams?.message && (
            <p className="p-4 mt-4 text-center bg-foreground/10 text-foreground">
              {searchParams.message}
            </p>
          )}
        </Form>
      </div>
      <Link
        href="/client/settings"
        className="flex px-3 py-2 no-underline rounded-md bg-btn-background hover:bg-btn-background-hover"
      >
        Back
      </Link>
    </div>
  );
}
