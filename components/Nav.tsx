// Created by Tomi Jumppanen on 29.02.2024

import Image from "next/image";
import logo from "@/public/logo.png"
import {faTicket, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Nav = () => {
	return (
		<nav className="w-full flex justify-between items-center h-16 p-5 bg-background">
			<Link href={"/client"}>
				<Image src={logo} alt={"Cafe AVA- Logo"} width={50}/>
			</Link>
			<div className={'w-full flex justify-end items-center gap-4'}>
				<Link href={"/client/vouchers"}>
					<FontAwesomeIcon icon={faTicket} size={"xl"}/>
				</Link>
				<Link href={"/client/settings"}>
					<FontAwesomeIcon icon={faUser} size={"xl"}/>
				</Link>
			</div>
		</nav>
	)
}

export default Nav