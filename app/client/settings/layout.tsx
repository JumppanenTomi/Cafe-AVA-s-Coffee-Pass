import Nav from "@/components/Nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <Nav />
      <div className="w-auto px-5">{children}</div>
    </div>
  );
}