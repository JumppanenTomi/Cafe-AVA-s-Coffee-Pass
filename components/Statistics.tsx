import { fetchAllStamps, fetchAllUsedStaps } from "@/utils/ServerActions/stamp";

export async function Statistics() {
  const stampsTotal = await fetchAllStamps();
  const usedStamps = await fetchAllUsedStaps();

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
