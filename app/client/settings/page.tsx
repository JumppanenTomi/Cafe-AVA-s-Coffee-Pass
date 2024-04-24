import { createClient } from "@/utils/supabase/server";
import AuthButton from "@/components/Inputs/buttons/AuthButton";
import LinkButton from "@/components/Inputs/buttons/LinkButton";
import GetDataButton from "@/components/Inputs/buttons/GetDataButton";
import BackButton from "@/components/Inputs/buttons/BackButton";
import SettingsNav from "@/components/navigation/SettingsNav";

export default async function SettingsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className='flex flex-col justify-between flex-grow w-full gap-10'>
      <div>
        <SettingsNav />
        <div className='flex flex-col items-start gap-5'>
          <LinkButton
            link='/auth/updateEmail'
            buttonText='Update Email address'
          />
          <GetDataButton />
          <AuthButton />
        </div>
      </div>
      <BackButton />
    </div>
  );
}
