import { Form } from "@/components/Inputs/Form";
import { FormSubmitButton } from "@/components/Inputs/buttons/FormSubmitButton";
import TextboxInput from "@/components/Inputs/TextboxInput";
import {
  fetchAllSiteSettings,
  updateSiteSetting,
} from "@/utils/ServerActions/siteSetting";

/**
 * Fetches all site settings and provides functionality to update them.
 * @returns {JSX.Element} A component that displays all site settings and allows them to be updated.
 */
export default async function Page() {
  const settings = await fetchAllSiteSettings();
  return (
    <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"}>
      {settings &&
        settings != null &&
        settings.map((setting) => (
          <div className='flex flex-col justify-between gap-3 white-container'>
            <div>
              <h2>{setting.readableName}</h2>
              <p>{setting.desc}</p>
            </div>
            <Form error={""} isError={false}>
              <input type='hidden' name='key' value={setting.key} />
              <TextboxInput
                showLabel={false}
                inputName={"settingInput"}
                defaultValue={setting.value!}
                isRequired={false}
              />
              <FormSubmitButton
                formAction={updateSiteSetting}
                pendingText='Updating..'
              >
                Save
              </FormSubmitButton>
            </Form>
          </div>
        ))}
    </div>
  );
}
