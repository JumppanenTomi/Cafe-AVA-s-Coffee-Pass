import dynamic from "next/dynamic";
import BackButton from "@/components/Inputs/buttons/BackButton";
import FadeIn from "@/components/Animations/Render/FadeIn";

const DynamicMap = dynamic(() => import("@/components/Map"), { ssr: false });

export default function Page() {
  return (
    <div className='flex flex-col flex-grow gap-5'>
      <FadeIn duration={1} className='flex flex-col flex-grow w-full gap-5'>
        <div className={"flex flex-col items-start gap-10 flex-grow"}>
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
        </div>
      </FadeIn>
      <BackButton />
    </div>
  );
}
