import Nav from "@/components/Nav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex-1 w-full flex flex-col">
      {children}
    </div>
  );
}