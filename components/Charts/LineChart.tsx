'use client'
import React from 'react';
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
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {countByMonth} from "@/utils/stats";

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

const FALLBACK_LABELS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', "September", "October", "November", "December"];

const createMonthLabels = (locale: string) => {
	const labels = [];
	for (let monthIndex = 0; monthIndex <= 11; monthIndex++) {
		labels.push(new Date(2023, monthIndex).toLocaleString(locale, {month: 'long'}));
	}

	return labels.length === 12 ? labels : FALLBACK_LABELS;
}

export function LineChart({dataset, name, dateCol}: LineChartProps) {
	if (dataset === null) return <div className={'white-container'}><h2>No data to show of item: {name}</h2></div>
	const locale = navigator.language;
	const labels = createMonthLabels(locale);

	const data: ChartData = {
		labels: labels,
		datasets: [
			{
				data: countByMonth(dataset, dateCol),
				borderColor: '#000000',
				backgroundColor: 'rgba(0,0,0,0.5)',
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

	return <Line options={options} data={data as any}/>
}