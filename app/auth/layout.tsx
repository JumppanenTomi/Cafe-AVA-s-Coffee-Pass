import FadeIn from "@/components/Animations/Render/FadeIn";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <FadeIn
      duration={1}
      className='flex flex-col items-center flex-grow w-full max-w-screen-sm'
    >
      {children}
    </FadeIn>
  );
}
