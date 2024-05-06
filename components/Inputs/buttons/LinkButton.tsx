import Link from "next/link";

interface LinkButtonProps {
  link: string,
  buttonText: string
}

/**
 * Renders a button that acts as a link.
 *
 * @param link - The URL to navigate to when the button is clicked.
 * @param buttonText - The text to display on the button.
 * @returns The rendered LinkButton component.
 */
export default function LinkButton({link, buttonText}: LinkButtonProps) {
  return (
    <div>
      <Link href={link} className="font-bold no-underline rounded-md bg-btn-background hover:bg-btn-background-hover">
        {buttonText}
      </Link>
    </div>
  )
}