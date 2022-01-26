import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

// components
import Table from "components/Table.component";
import TopList from "components/TopList.component";
import DateAxisLineChart from "components/DateAxisLineChart.component";
import MultiAverageChart from "components/MultiAverageChart.component";

import styles from "styles/common/facilities/PondDevices.module.scss";

function DisplayReport(props) {
	const [data, setData] = useState([])
	const [data2, setData2] = useState([])

	const generateDummyData = () => {
		const data = [];

		for (let i = 0; i < 10; i++) {
			data.push({
				date: new Date(2020, 0, i + 1).getTime(),
				value: Math.random() * 100,
				value2: Math.random() * 100
			});
		}

		console.log(data);

		return data;
	};

	useEffect(() => {
		setData(generateDummyData());
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.text}>
					<div className={styles.title}>Pond devices</div>
					<div className={styles.subtitle}>Monitor each pond devices in real-time</div>
				</div>
			</div>
			<div className={styles.body}>
				<MultiAverageChart data={data} label="qweqwe" height="300px"/>

			</div>
		</div>
	);
}

export default DisplayReport;
