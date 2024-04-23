import SettingsNav from "@/components/navigation/SettingsNav";
import BackButton from "@/components/Inputs/buttons/BackButton";
import FadeIn from "@/components/Animations/Render/FadeIn";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full px-5'>
      <SettingsNav />
      <FadeIn duration={1} className='w-full'>
        <div className='w-auto'>{children}</div>
      </FadeIn>
      <div
        className={"flex items-center absolute bottom-0 left-0 right-0 mx-5"}
      >
        <BackButton />
      </div>
    </div>
  );
}
