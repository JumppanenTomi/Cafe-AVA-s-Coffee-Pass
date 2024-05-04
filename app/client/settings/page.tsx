import { createClient } from "@/utils/supabase/server";
import AuthButton from "@/components/Inputs/buttons/AuthButton";
import LinkButton from "@/components/Inputs/buttons/LinkButton";
import GetDataButton from "@/components/Inputs/buttons/GetDataButton";
import BackButton from "@/components/Inputs/buttons/BackButton";
import FadeIn from "@/components/Animations/Render/FadeIn";

export default async function SettingsPage() {
  return (
    <div className='flex flex-col justify-between flex-grow w-full'>
      <FadeIn duration={0.8}>
        <h1 className='mb-10'>Settings</h1>
        <div className='flex flex-col items-start gap-5'>
          <LinkButton
            link='/client/settings/updateEmail'
            buttonText='Update Email address'
          />
          <GetDataButton />
          <AuthButton />
        </div>
      </FadeIn>
      <BackButton />
    </div>
  );
}
