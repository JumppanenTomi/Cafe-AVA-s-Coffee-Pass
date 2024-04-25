import { FormSubmitButton } from "@/components/Inputs/buttons/FormSubmitButton";
import { Form } from "@/components/Inputs/Form";
import EmailInput from "@/components/Inputs/EmailInput";
import { changeEmail } from "@/utils/ServerActions/user";
import BackButton from "@/components/Inputs/buttons/BackButton";

export default function UpdateEmail({
  searchParams,
}: {
  searchParams: { isError: string; message: string };
}) {
  return (
    <>
      <div className='flex flex-col items-center justify-center flex-1 w-full gap-5'>
        <div className='w-full white-container'>
          <Form
            error={searchParams.message}
            isError={searchParams.isError === "true"}
          >
            <EmailInput />
            <FormSubmitButton formAction={changeEmail}>
              Confirm
            </FormSubmitButton>
          </Form>
        </div>
      </div>
      <BackButton customUrl='/client/settings' />
    </>
  );
}
