import { authenticateWithGoodle } from "@/utils/ServerActions/authentication";
import CheckboxInput from "./Inputs/CheckboxInput";

export default function SocialLogin() {
  return (
    <div className={"w-full md:w-4/6"}>
      <form className={"flex flex-col gap-5"}>
        <button
          formAction={authenticateWithGoodle}
          className='w-full btn-primary'
        >
          Sing in with Google
        </button>
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
      </form>
    </div>
  );
}
