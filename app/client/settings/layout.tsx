import SettingsNav from "@/components/SettingsNav"
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full px-5">
      <SettingsNav />
      <div className="w-auto">{children}</div>
      <div className={"flex items-center absolute bottom-0 left-0 right-0 mx-5"}>
        <Link href={"/client"} className={'btn-secondary w-full'}>Back</Link>
      </div>
    </div>
  );
}