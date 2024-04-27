import Image from "next/image";
import logo from "@/public/images/logo.png";
import maker from "@/public/images/maker.png";
import { fetchSiteSetting } from "@/utils/ServerActions/siteSetting";

export default async function LogoContainer() {
  const logoUrl = await fetchSiteSetting("logoUrl");

  return (
    <div className='flex flex-col items-center justify-center flex-1 flex-shrink w-full gap-16 p-5 bg-center bg-cover'>
      <Image
        src={maker}
        alt={"ava logo"}
        width={300}
        className='max-w-[300px] w-[60%]'
      />
      {logoUrl && logoUrl.value ? (
        <>
          <Image
            src={logoUrl.value}
            alt={"Logo"}
            width={120}
            height={50}
            layout={"intrinsic"}
            className='max-w-[120px] w-[30%]'
          />
        </>
      ) : (
        <Image
          src={logo}
          alt={"Cafe AVA- Logo"}
          width={120}
          height={50}
          loading={"lazy"}
          className='max-w-[120px] w-[30%]'
        />
      )}
    </div>
  );
}
