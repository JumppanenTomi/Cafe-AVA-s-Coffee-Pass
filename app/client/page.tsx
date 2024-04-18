import Nav from "@/components/Nav";
import StampCode from "@/components/QrCodes/stampCode";
import { Statistics } from "@/components/Statistics";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faTicket,
  faUtensils,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import StampCard from "@/components/StampCard";
import StampsInfo from "@/components/StampsInfo";
import { fetchSiteSetting } from "@/utils/ServerActions/siteSetting";
type NavigationLinkProps = {
  href: string;
  icon: IconDefinition;
  label: string;
  isExternal?: boolean;
};

const HomeLinkItem: React.FC<NavigationLinkProps> = ({
  href,
  icon,
  label,
  isExternal = false,
}) => {
  const linkProps = isExternal ? { target: "_blank", href } : { href };

  return (
    <div className='flex flex-col items-center justify-center flex-grow'>
      <Link
        {...linkProps}
        className='flex flex-col items-center justify-center gap-2'
      >
        <FontAwesomeIcon icon={icon} size='3x' />
        <h2>
          {label}{" "}
          {isExternal && (
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} size={"xs"} />
          )}
        </h2>
      </Link>
    </div>
  );
};

export default async function ProtectedPage() {
  const menuUrl = await fetchSiteSetting("menuUrl");
  return (
    <>
      <Nav />
      <div className='flex flex-col items-center justify-center flex-grow gap-5'>
        <Statistics />
        <div className='flex flex-row flex-wrap w-full white-container'>
          <HomeLinkItem
            href='/client/vouchers'
            icon={faTicket}
            label='Vouchers'
          />
          <HomeLinkItem
            href={menuUrl?.value || "/error"}
            icon={faUtensils}
            label='Menu'
            isExternal={true}
          />
        </div>
        <div className={"flex flex-col items-center justify-center"}>
          <div className={"w-full flex justify-end mb-2"}>
            <StampsInfo />
          </div>
          <div className={"white-container z-40 flex items-end flex-col"}>
            <StampCode />
          </div>
          <div className={"w-11/12 flex justify-center"}>
            <StampCard />
          </div>
        </div>
      </div>
    </>
  );
}
