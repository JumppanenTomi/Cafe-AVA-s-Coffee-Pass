import { signOut } from "@/utils/ServerActions/authentication";

/**
 * Renders a button component for logging out.
 *
 * @returns The rendered button component.
 */
export default async function AuthButton() {
  return (
    <div className='flex items-center'>
      <form action={signOut}>
        <button className='btn-secondary'>Logout</button>
      </form>
    </div>
  );
}
