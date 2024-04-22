import Nav from "@/components/navigation/Nav";
import StampCode from "@/components/QrCodes/stampCode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faTicket,
  faUtensils,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import StampCard from "@/components/stamps/StampCard";
import OverZoomIn from "@/components/Animations/Render/OverZoomIn";
import RollDown from "@/components/Animations/Render/RollDown";
import { Statistics } from "@/components/Statistics";
import FadeIn from "@/components/Animations/Render/FadeIn";
import StampsInfo from "@/components/stamps/StampsInfo";
import { fetchSiteSetting } from "@/utils/ServerActions/siteSetting";
type NavigationLinkProps = {
  href: string;
  icon: IconDefinition;
  label: string;
  isExternal?: boolean;
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
  return (
    <>
      <Nav />
      <div className='flex flex-col items-center justify-center flex-grow gap-5'>
        <FadeIn duration={0.8} className='w-full'>
          <Statistics />
        </FadeIn>
        <FadeIn
          className='flex flex-row flex-wrap w-full white-container'
          duration={0.8}
        >
          <HomeLinkItem
            href='/client/vouchers'
            icon={faTicket}
            label='Vouchers'
          />
          <HomeLinkItem
            href='https://cafeava.fi/index.php/menu/'
            icon={faUtensils}
            label='Menu'
            isExternal={true}
          />
        </FadeIn>
        <div className={"flex flex-col items-center justify-center"}>
          <OverZoomIn className='z-40 white-container' duration={0.8}>
            <StampCode />
          </OverZoomIn>
          <RollDown
            animateTop={[-150, 0]}
            className='flex justify-center w-11/12 top-full'
            delay={1}
            duration={0.4}
          >
            <StampCard />
          </RollDown>
        </div>
      </div>
    </>
  );
}
