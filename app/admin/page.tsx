import { LineChart } from "@/components/Charts/LineChart";
import {
  getLoginsCount,
  getStampTimestamps,
} from "@/utils/ServerActions/stats";

export default async function Admin() {
  const timeStamps = await getStampTimestamps();
  const temps = await getLoginsCount();

  return (
    <div>
      <div className={"grid xl:grid-cols-2 gap-5"}>
        <div className={"white-container"}>
          <LineChart
            name={"Stamps Given Each Month"}
            dataset={timeStamps}
            dateCol={"timestamp"}
          />
        </div>
        <div className={"white-container"}>
          <LineChart
            name={"Temp codes generated (user sessions)"}
            dataset={temps}
            dateCol={"created_at"}
          />
        </div>
      </div>
    </div>
  );
}
