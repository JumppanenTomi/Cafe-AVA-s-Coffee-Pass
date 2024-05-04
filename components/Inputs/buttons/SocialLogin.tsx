import { authenticateWithGoodle } from "@/utils/ServerActions/authentication";
import CheckboxInput from "../CheckboxInput";
import { fetchSiteSetting } from "@/utils/ServerActions/siteSetting";

export default async function SocialLogin() {
  const termsOfUseUrl = await fetchSiteSetting("termsOfUseUrl");
  const privacyPolicyUrl = await fetchSiteSetting("privacyPolicyUrl");
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
      </form>
    </div>
  );
}
