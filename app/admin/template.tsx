import Link from "next/link";
import logo from "@/public/logo.png"
import Image from "next/image";

export default function AdminTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-black rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto">
          <Link href="/admin" className="flex items-center ps-2.5 mb-5">
            <Image src={logo} alt={"Cafe AVA- Logo"} width={50} />
          </Link>
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="#" className="flex items-center py-2 text-black dark:text-white hover:border-t-2 hover:border-b-2 hover:border-black dark:hover:border-white group">
                <span className="flex-1 ms-3 whitespace-nowrap uppercase">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/users" className="flex items-center py-2 text-black dark:text-white hover:border-t-2 hover:border-b-2 hover:border-black dark:hover:border-white group">
                <span className="flex-1 ms-3 whitespace-nowrap uppercase">Users</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/stamps" className="flex items-center py-2 text-black dark:text-white hover:border-t-2 hover:border-b-2 hover:border-black dark:hover:border-white group">
                <span className="flex-1 ms-3 whitespace-nowrap uppercase">Stamps</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center py-2 text-black dark:text-white hover:border-t-2 hover:border-b-2 hover:border-black dark:hover:border-white group">
                <span className="flex-1 ms-3 whitespace-nowrap uppercase">Vouchers</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        {children}
      </div>
    </div>
  );
} 