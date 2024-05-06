"use client";
import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartDataElement {
  [key: string]: any;
}

interface LineChartProps {
  dataset: ChartDataElement[] | null;
  name: string;
  dateCol: string;
}

/**
 * Counts the number of occurrences by month for a given key in an array of objects.
 *
 * @template T - The type of the objects in the array.
 * @template K - The type of the key in the objects.
 * @param {Array<{ [key: string]: any }>} arr - The array of objects.
 * @param {string} key - The key to count occurrences by.
 * @returns {number[]} - An array containing the count of occurrences for each month (0-11).
 */
const countByMonth = <T extends Record<any, string>, K extends keyof T>(
  arr: {
    [key: string]: any;
  }[],
  key: string
): number[] => {
  const record: Record<number, number> = arr.reduce((acc, curr: any) => {
    // Loop through each record
    const date = new Date(curr[key]); // Convert date string to Date object
    const month = date.getMonth(); // getMonth() returns a value from 0 (January) to 11 (December)
    acc[month] = (acc[month] || 0) + 1; // Increment count of month
    return acc; // Return the accumulator
  }, {} as Record<number, number>); // Initialize accumulator as an empty object
  const result: number[] = []; // Initialize result as an empty array
  for (let i = 0; i < 12; i++) {
    // Loop for every month
    result[i] = record[i] ?? 0; // Fill result with count of each month or 0 if there's no record
  }
  return result; // Return the result
};

const FALLBACK_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Creates an array of month labels based on the provided locale.
 *
 * @param {string} locale - The locale to be used for formatting the month labels.
 * @returns {string[]} - An array of month labels.
 */
const createMonthLabels = (locale: string) => {
  const labels = [];
  for (let monthIndex = 0; monthIndex <= 11; monthIndex++) {
    labels.push(
      new Date(2023, monthIndex).toLocaleString(locale, { month: "long" })
    ); // Create a new Date object for each month and get the month name
  }

  return labels.length === 12 ? labels : FALLBACK_LABELS; // Return the labels or the fallback labels if the length is not 12
};

/**
 * Renders a line chart component.
 *
 * @param {LineChartProps} props - The props for the LineChart component.
 * @returns {JSX.Element} The rendered LineChart component.
 */
export function LineChart({ dataset, name, dateCol }: LineChartProps) {
  if (dataset === null)
    return (
      <div className={"white-container"}>
        <h2>No data to show of item: {name}</h2>
      </div>
    );
  const locale = navigator.language;
  const labels = createMonthLabels(locale);

  const data: ChartData = {
    labels: labels,
    datasets: [
      {
        data: countByMonth(dataset, dateCol),
        borderColor: "#000000",
        backgroundColor: "rgba(0,0,0,0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        text: name,
        display: true,
      },
    },
  };

  return <Line options={options} data={data as any} />;
}
