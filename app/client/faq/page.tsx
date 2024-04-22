import dynamic from "next/dynamic";
import BackButton from "@/components/Inputs/buttons/BackButton";
import Nav from "@/components/navigation/Nav";
import FadeIn from "@/components/Animations/Render/FadeIn";

const DynamicMap = dynamic(() => import("@/components/Map"), { ssr: false });

export default function Page() {
  return (
    <FadeIn duration={1} className='w-full'>
      <div className={"flex flex-col items-start gap-10"}>
        <Nav />
        <h1>Frequently Asked Questions</h1>
        <section
          className={"white-container flex flex-col gap-5 overflow-x-hidden"}
        >
          <h2>1. Where is Cafe AVA located?</h2>
          <p>
            Cafe AVA is located in the heart of Kallio. The precise address is{" "}
            <b>Läntinen Papinkatu 2, 00530 Helsinki</b>
          </p>
          <DynamicMap />
        </section>
        <BackButton />
      </div>
    </FadeIn>
  );
}
