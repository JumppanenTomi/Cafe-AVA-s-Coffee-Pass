import { authenticateWithGoodle } from "@/utils/ServerActions/authentication";

export default function SocialLogin() {
  return (
    <div className={"flex flex-col w-full md:w-4/6"}>
      <form>
      <button formAction={authenticateWithGoodle} className='w-full btn-primary'>
          Sing in with Google
        </button>
      </form>
    </div>
  );
}
