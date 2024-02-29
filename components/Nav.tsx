// Created by Tomi Jumppanen on 29.02.2024

import AuthButton from "@/components/AuthButton";

const Nav = () => {
	return (
		<nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
			<div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm">
				<AuthButton/>
			</div>
		</nav>
	)
}

export default Nav