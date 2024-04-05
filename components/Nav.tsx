// Created by Tomi Jumppanen on 29.02.2024

import Image from "next/image";
import logo from "@/public/logo.png"
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";
import getRole from "@/utils/getRole";

interface NavProps {
	title?: string,
}

export default async function Nav ({title}: NavProps) {
	const userRole = await getRole()

	return (
		<nav className="w-full flex justify-between items-center h-16 p-5 bg-background">
			<Link href={"/client"}>
				<Image src={logo} alt={"Cafe AVA- Logo"} width={50}/>
			</Link>
			<div className={'w-full flex justify-end items-center gap-4'}>
				{(userRole === 'owner' || userRole === 'barista') && <Link href={'/admin'} className={'btn-primary'}>Admin Dashboard</Link>}
				<Link href={"/client/settings"}>
					<FontAwesomeIcon icon={faUser} size={"xl"}/>
				</Link>
			</div>
		</nav>
	)
}

