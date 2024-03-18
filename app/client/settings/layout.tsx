import SettingsNav from "@/components/SettingsNav"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full px-5">
      <SettingsNav />
      <div className="w-auto">{children}</div>
    </div>
  );
}