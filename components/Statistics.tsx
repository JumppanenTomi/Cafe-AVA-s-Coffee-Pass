import { fetchAllStamps, fetchAllUsedStaps } from "@/utils/ServerActions/stamp";

/**
 * Fetches the total number of stamps and used stamps for the current user and displays them in a statistics component.
 * @returns The JSX element representing the statistics component.
 */
export async function Statistics() {
  const stampsTotal = await fetchAllStamps(); //fetch all stamps for the current user
  const usedStamps = await fetchAllUsedStaps(); //fetch all used stamps for the current user

  return (
    <div className='flex flex-row w-full gap-2 text-center justify-evenly white-container'>
      <div>
        <h4>
          <b>Used Stamps</b>
        </h4>
        <h4>{usedStamps}</h4>
      </div>
      <div>
        <h4>
          <b>Total Stamps</b>
        </h4>
        <h4>{stampsTotal}</h4>
      </div>
    </div>
  );
}
