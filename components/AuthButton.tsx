import { signOut } from "@/utils/ServerActions/authentication";

export default async function AuthButton() {

  return (
    <div className='flex items-center'>
      <form action={signOut}>
        <button className='btn-secondary'>Logout</button>
      </form>
    </div>
  );
}
