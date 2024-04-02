import SettingsNav from "@/components/SettingsNav"
import Link from "next/link";
import BackButton from "@/components/BackButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full px-5">
      <SettingsNav />
      <div className="w-auto">{children}</div>
      <div className={"flex items-center absolute bottom-0 left-0 right-0 mx-5"}>
        <BackButton/>
      </div>
    </div>
  );
}