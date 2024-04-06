// Created by Tomi Jumppanen on 29.02.2024

import Image from "next/image";
import logo from "@/public/logo.png"
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {QuestionMarkCircleIcon} from "@heroicons/react/20/solid";

interface NavProps {
	title?: string,
}

const Nav = ({title}: NavProps) => {
	return (
		<nav className="w-full flex justify-between items-center h-16 p-5 bg-background">
			<Link href={'/client/faq'}>
				<QuestionMarkCircleIcon className={'h-9 w-9'}/>
			</Link>
			<Link href={"/client"}>
				<Image src={logo} alt={"Cafe AVA- Logo"} width={50}/>
			</Link>
			<div className={'flex justify-end items-center gap-4'}>
				<Link href={"/client/settings"}>
					<FontAwesomeIcon icon={faUser} size={"xl"}/>
				</Link>
			</div>
		</nav>
	)
}

export default Nav