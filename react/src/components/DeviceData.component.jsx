import { useState } from "react";

import styles from "styles/component/DeviceData.module.scss";

import SimpleLineChart from "components/SimpleLineChart";

function DeviceData(props) {
	const profitData = [
		{
			date: new Date(2021, 0, 1).getTime(),
			value: 100,
		},
		{
			date: new Date(2021, 0, 2).getTime(),
			value: 320,
		},
		{
			date: new Date(2021, 0, 3).getTime(),
			value: 216,
		},
		{
			date: new Date(2021, 0, 4).getTime(),
			value: 150,
		},
		{
			date: new Date(2021, 0, 5).getTime(),
			value: 156,
		},
		{
			date: new Date(2021, 0, 6).getTime(),
			value: 199,
		},
		{
			date: new Date(2021, 0, 7).getTime(),
			value: 114,
		},
		{
			date: new Date(2021, 0, 8).getTime(),
			value: 269,
		},
		{
			date: new Date(2021, 0, 9).getTime(),
			value: 90,
		},
		{
			date: new Date(2021, 0, 10).getTime(),
			value: 300,
		},
		{
			date: new Date(2021, 0, 11).getTime(),
			value: 150,
		},
		{
			date: new Date(2021, 0, 12).getTime(),
			value: 110,
		},
		{
			date: new Date(2021, 0, 13).getTime(),
			value: 185,
		},
	];

	const [data, setData] = useState(profitData);

	return (
		<div className={styles.container}>
			<SimpleLineChart
				title="Profit trend"
				data={data}
				label="Profit3"
				height="75px"
			/>
			<SimpleLineChart
				title="Profit trend"
				data={data}
				label="Profit4"
				height="75px"
			/>
			<SimpleLineChart
				title="Profit trend"
				data={data}
				label="Profit5"
				height="75px"
			/>
			<SimpleLineChart
				title="Profit trend"
				data={data}
				label="Profit6"
				height="75px"
			/>
		</div>
	);
}

export default DeviceData;
