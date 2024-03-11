// Created by Tomi Jumppanen on 29.02.2024

import AuthButton from "@/components/AuthButton";
import Image from "next/image";
import logo from "@/public/logo.png"

const Nav = () => {
	return (
		<nav className="w-full flex justify-between h-16 bg-background">
			<div className="justify-center items-center p-3 text-sm">
				<Image src={logo} alt={"Cafe AVA- Logo"} width={50} height={40}/>
			</div>
			<div className="justify-center items-center p-3 text-sm">
				<AuthButton/>
			</div>
		</nav>
	)
}

export default Nav