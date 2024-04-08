import Nav from "@/components/Nav";
import StampCode from "@/components/QrCodes/stampCode";
import { Statistics } from "@/components/Statistics";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowUpRightFromSquare,
	faTicket,
	faUtensils,
	IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import StampCard from "@/components/StampCard";
type NavigationLinkProps = {
	href: string;
	icon: IconDefinition;
	label: string;
	isExternal?: boolean;
};

const HomeLinkItem: React.FC<NavigationLinkProps> = ({ href, icon, label, isExternal = false }) => {
	const linkProps = isExternal
		? { target: "_blank", href }
		: { href };

	return (
		<div className='flex-grow flex justify-center items-center flex-col'>
			<Link {...linkProps} className='flex gap-2 justify-center items-center flex-col'>
				<FontAwesomeIcon icon={icon} size='3x' />
				<h2>{label} {isExternal && <FontAwesomeIcon icon={faArrowUpRightFromSquare} size={"xs"} />}</h2>
			</Link>
		</div>
	);
};

export default async function ProtectedPage() {
	return (
		<>
			<Nav />
			<div className="flex flex-col items-center justify-center gap-5 flex-grow">
				<Statistics />
				<div className='white-container w-full flex-row flex flex-wrap'>
					<HomeLinkItem href='/client/vouchers' icon={faTicket} label='Vouchers' />
					<HomeLinkItem href='https://cafeava.fi/index.php/menu/' icon={faUtensils} label='Menu' isExternal={true} />
				</div>
				<div className={'flex flex-col items-center justify-center'}>
					<div className={'white-container z-40'}>
						<StampCode />
					</div>
					<div className={'w-11/12 flex justify-center'}>
						<StampCard />
					</div>
				</div>
			</div>
		</>
	);
}
