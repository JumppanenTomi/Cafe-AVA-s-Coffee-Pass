import Image from "next/image";
import logo from "@/public/images/logo.png";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import { fetchSiteSetting } from "@/utils/ServerActions/siteSetting";

export default async function Nav() {
  const logoUrl = await fetchSiteSetting("logoUrl");

  return (
    <nav className='flex items-center justify-between w-full h-16 bg-background'>
      <Link href={"/client/faq"}>
        <QuestionMarkCircleIcon className={"h-9 w-9"} />
      </Link>
      <Link href={"/client"}>
        {logoUrl && logoUrl.value ? (
          <>
            <Image
              src={logoUrl.value}
              alt={"Logo"}
              width={100}
              height={50}
              layout={"intrinsic"}
            />
          </>
        ) : (
          <Image
            src={logo}
            alt={"Cafe AVA- Logo"}
            width={50}
            height={50}
            loading={"lazy"}
          />
        )}
      </Link>
      <Link href={"/client/settings"}>
        <FontAwesomeIcon icon={faUser} size={"xl"} />
      </Link>
    </nav>
  );
}
