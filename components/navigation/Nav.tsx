import Image from "next/image";
import logo from "@/public/images/logo.png";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import getRole from "@/utils/getRole";
import { fetchSiteSetting } from "@/utils/ServerActions/siteSetting";
import maker from "@/public/images/maker.png";

interface NavProps {
  title?: string;
}

export default async function Nav({ title }: NavProps) {
  const logoUrl = await fetchSiteSetting("logoUrl");
  const userRole = await getRole();

  return (
    <nav className='flex items-center justify-between w-full h-16 p-5 bg-background'>
      <Link href={"/client/faq"}>
        <QuestionMarkCircleIcon className={"h-9 w-9"} />
      </Link>
      <Link href={"/client"}>
        {logoUrl && logoUrl.value ? (
            <>
              <Image src={logoUrl.value} alt={"Logo"} width={100} height={50} layout={"intrinsic"}/>
            </>
        ) : (
            <Image src={logo} alt={"Cafe AVA- Logo"} width={50} height={50} loading={"lazy"}/>
        )}
      </Link>
      <div className={"flex justify-end items-center gap-4"}>
        {(userRole === "owner" || userRole === "barista") && (
          <Link href={"/admin"} className={"btn-primary"}>
            Admin Dashboard
          </Link>
        )}
        <Link href={"/client/settings"}>
          <FontAwesomeIcon icon={faUser} size={"xl"} />
        </Link>
      </div>
    </nav>
  );
}
