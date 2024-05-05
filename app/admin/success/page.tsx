import Link from "next/link";

/**
 * Renders a success message after an action has been run successfully.
 * @returns {JSX.Element} A component that displays a success message and a link to return to the admin panel.
 */
export default async function Success() {
  return (
    <div className="flex-1 w-full flex flex-col gap-5 items-center justify-center p-5">
      <div className={"white-container flex items-center flex-col gap-5"}>
        <h1 className={"font-medium text-xl"}>Success!</h1>
        <p>Action run successfully.</p>
      </div>
      <Link href={"/admin"} className={"btn-primary"}>
        Back to admin panel
      </Link>
    </div>
  );
}
