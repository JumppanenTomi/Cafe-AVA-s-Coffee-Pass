import StampCode from "@/components/QrCodes/stampCode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faTicket,
  faUtensils,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import OverZoomIn from "@/components/Animations/Render/OverZoomIn";
import RollDown from "@/components/Animations/Render/RollDown";
import { Statistics } from "@/components/Statistics";
import FadeIn from "@/components/Animations/Render/FadeIn";
import { fetchSiteSetting } from "@/utils/ServerActions/siteSetting";
import getRole from "@/utils/getRole";
import Stamps from "@/components/stamps/Stamps";
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
    <Link
      {...linkProps}
      className='flex flex-col items-center justify-center gap-2'
    >
      <FontAwesomeIcon icon={icon} className='h-7 sm:h-12' />
      <label>
        {label}{" "}
        {isExternal && (
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} size={"xs"} />
        )}
      </label>
    </Link>
  );
};

export default async function ProtectedPage() {
  const menuUrl = await fetchSiteSetting("menuUrl");
  const userRole = await getRole();

  return (
    <>
      <div className='flex flex-col items-center justify-center flex-grow w-full gap-2 sm:gap-5'>
        <FadeIn duration={0.8} className='w-full'>
          <Statistics />
        </FadeIn>
        <FadeIn
          className='flex flex-row flex-wrap w-full gap-2 justify-evenly white-container'
          duration={0.8}
        >
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
        </FadeIn>
        <div className={"flex flex-col items-center justify-center"}>
          <OverZoomIn className='z-40 white-container-minimal-p' duration={0.8}>
            <StampCode />
          </OverZoomIn>
          <RollDown
            animateTop={[-150, 0]}
            className='flex justify-center w-full px-2 sm:px-4 top-full'
            delay={1}
            duration={0.4}
          >
            <Stamps />
          </RollDown>
        </div>
        {(userRole === "owner" || userRole === "barista") && (
          <Link href={"/admin"} className={"btn-primary"}>
            Admin Dashboard
          </Link>
        )}
      </div>
    </>
  );
}
