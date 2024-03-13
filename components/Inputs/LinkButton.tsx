import Link from "next/link";

interface LinkButtonProps {
  link: string,
  buttonText: string
}

export default function LinkButton({link, buttonText}: LinkButtonProps) {
  return (
    <div>
      <Link href={link} className="rounded-md no-underline bg-btn-background hover:bg-btn-background-hover font-bold">
        {buttonText}
      </Link>
    </div>
  )
}