import { faTicket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function SettingsNav() {
  return (
    <div className="flex flex-row mt-5 mb-10">
      <div className="w-full flex flex-row">
        <h1 className="font-bold text-2xl md:text-center sm:text-start">Settings</h1>
      </div>
      <div className={'w-full flex justify-end items-center gap-4'}>
				<Link href={"/client/settings"}>
					<FontAwesomeIcon icon={faUser} size={"xl"} />
				</Link>
			</div>
    </div>
  )
}