import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

// components
import Table from "components/Table.component";
import TopList from "components/TopList.component";
import DateAxisLineChart from "components/DateAxisLineChart.component";
import MultiAverageChart from "components/MultiAverageChart.component";
import StatWrapper from "components/StatWrapper.component";
import StatNumber from "components/StatNumber.component";

import styles from "styles/common/facilities/PondDevices.module.scss";
import exStyles from "styles/common/visualization/Visualization.module.scss";

function DisplayReport(props) {
	const [data, setData] = useState([]);
	const [data2, setData2] = useState([]);

	const generateDummyData = () => {
		const data = [];

		for (let i = 0; i < 10; i++) {
			data.push({
				date: new Date(2020, 0, i + 1).getTime(),
				value: Math.random() * 100,
				value2: Math.random() * 100,
				value3: Math.random() * 100,
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
					<div className={styles.title}>Averages</div>
					<div className={styles.subtitle}>
						Average value for each data recorded from the ponds
					</div>
				</div>
			</div>
			<div className={exStyles.body}>
				<div className={exStyles.avrTable}>
					<div className={exStyles.header}>
						<div className={exStyles.title}>Device name</div>
						<div className={exStyles.title}>pH</div>
						<div className={exStyles.title}>DO</div>
						<div className={exStyles.title}>Temp</div>
						<div className={exStyles.title}>Turbidity</div>
						<div className={exStyles.title}>Data count</div>
					</div>
					<div className={exStyles.data}>
						{Array(6)
							.fill(0)
							.map((_, i) => (
								<div className={exStyles.dataRow}>
									<div className={exStyles.dataCell}>
										Pond 1
									</div>
									<div className={exStyles.dataCell}>7.5</div>
									<div className={exStyles.dataCell}>7.5</div>
									<div className={exStyles.dataCell}>7.5</div>
									<div className={exStyles.dataCell}>7.5</div>
									<div className={exStyles.dataCell}>7</div>
								</div>
							))}
					</div>
				</div>

				<StatWrapper>
					<StatNumber
						title="Highest pH"
						value={10}
						unit="pH"
						icon="FaLevelUpAlt"
					/>

					<StatNumber
						title="Highest DO"
						value={10}
						unit="mg/l"
						icon="FaLevelUpAlt"
					/>

					<StatNumber
						title="Highest Temp"
						value={10}
						icon="FaLevelUpAlt"
						unit="℃"
					/>

					<StatNumber
						title="Highest Turbidity"
						value={10}
						unit="mg/l"
						icon="FaLevelUpAlt"
					/>
				</StatWrapper>
				<div className={exStyles.averages}>
					<div className={exStyles.item}>
						<div className={exStyles.title}>Average pH</div>
						<div className={exStyles.chart}>
							<MultiAverageChart
								series={[
									{
										name: "Pond #1",
										field: "value",
									},
									{
										name: "Pond #2",
										field: "value2",
									},
									{
										name: "Pond #3",
										field: "value3",
									},
								]}
								label="averagePH"
								height="300px"
							/>
						</div>
					</div>
					<div className={exStyles.item}>
						<div className={exStyles.title}>Average DO</div>
						<div className={exStyles.chart}>
							<MultiAverageChart
								series={[
									{
										name: "Pond #1",
										field: "value",
									},
									{
										name: "Pond #2",
										field: "value2",
									},
									{
										name: "Pond #3",
										field: "value3",
									},
								]}
								label="averageDO"
								height="300px"
							/>
						</div>
					</div>
					<div className={exStyles.item}>
						<div className={exStyles.title}>
							Average Temperature
						</div>
						<div className={exStyles.chart}>
							<MultiAverageChart
								series={[
									{
										name: "Pond #1",
										field: "value",
									},
									{
										name: "Pond #2",
										field: "value2",
									},
									{
										name: "Pond #3",
										field: "value3",
									},
								]}
								label="averageTemp"
								height="300px"
							/>
						</div>
					</div>
					<div className={exStyles.item}>
						<div className={exStyles.title}>Average Turbidity</div>
						<div className={exStyles.chart}>
							<MultiAverageChart
								series={[
									{
										name: "Pond #1",
										field: "value",
									},
									{
										name: "Pond #2",
										field: "value2",
									},
									{
										name: "Pond #3",
										field: "value3",
									},
								]}
								label="averageTDS"
								height="300px"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DisplayReport;