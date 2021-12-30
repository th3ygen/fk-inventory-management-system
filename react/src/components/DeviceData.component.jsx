import { useEffect, useState } from "react";

import styles from "styles/component/DeviceData.module.scss";

import SimpleLineChart from "components/SimpleLineChart";

function DeviceData(props) {
	const [tds, setTds] = useState([]);
	const [oxy, setOxy] = useState([]);
	const [ph, setPh] = useState([]);
	const [temp, setTemp] = useState([]);
	
	const requestData = async () => {
		const response = await fetch(`http://localhost:8080/api/device/data?id=${props.uid}&limit=10`);
		const data = await response.json();

		if (data && data.length) {
			const tdsData = data.map((d) => ({
				date: new Date(d.timestamp).getTime(),
				value: d.values.tds,
			}));
			const oxyData = data.map((d) => ({
				date: new Date(d.timestamp).getTime(),
				value: d.values.oxy,
			}));
			const phData = data.map((d) => ({
				date: new Date(d.timestamp).getTime(),
				value: d.values.ph,
			}));
			const tempData = data.map((d) => ({
				date: new Date(d.timestamp).getTime(),
				value: d.values.temp,
			}));
			
			setTds(tdsData);
			setOxy(oxyData);
			setPh(phData);
			setTemp(tempData);
		}

	};

	// generate dummy data for all charts
	const generateData = () => {
		const tdsData = [];
		const oxyData = [];
		const phData = [];
		const tempData = [];

		for (let i = 0; i < 20; i++) {
			const newDate = new Date(2021, 0, 1);
			newDate.setDate(newDate.getDate() + i);

			const newTds = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
			const newOxy = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
			const newPh = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
			const newTemp = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

			tdsData.push({
				date: newDate.getTime(),
				value: newTds,
			});

			oxyData.push({
				date: newDate.getTime(),
				value: newOxy,
			});

			phData.push({
				date: newDate.getTime(),
				value: newPh,
			});

			tempData.push({
				date: newDate.getTime(),
				value: newTemp,
			});

			
		}
		/* console.log(tdsData); */
		/* setTds(tdsData);
		setOxy(oxyData);
		setPh(phData);
		setTemp(tempData); */
	};

	useEffect(() => {
		if (props.uid) {
			/* generateData(); */
			requestData();
		}
	}, [props.uid]);

	useEffect(() => {
		if (props.mqtt) {
			props.mqtt.on('message', (topic, message) => {
				const state = message.toString();

				if (state === 'UPDATE') {
					requestData();
				}
			})
		}
	}, [props.mqtt]);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.label}>
					<div className={styles.name}>{props.name}</div>
					<div className={styles.status}></div>
				</div>
			</div>
			<div className={styles.body}>
				<div className={styles.charts}>
					<div className={styles.chart}>
						<div className={styles.label}>
							<div className={styles.name}>pH</div>
							<div className={styles.value}>{(ph.length) && ph[ph.length - 1].value}</div>
						</div>
						<SimpleLineChart
							data={ph}
							/* unique label string generate */
							label={`${Date.now()}${Math.random()}`}
							height={props.chartHeight}
						/>
					</div>
					<div className={styles.chart}>
						<div className={styles.label}>
							<div className={styles.name}>DO</div>
							<div className={styles.value}>{(oxy.length) && oxy[oxy.length - 1].value}</div>
						</div>
						<SimpleLineChart
							data={oxy}
							/* unique label string generate */
							label={`${Date.now()}${Math.random()}`}
							height={props.chartHeight}
						/>
					</div>
					<div className={styles.chart}>
						<div className={styles.label}>
							<div className={styles.name}>Temperature</div>
							<div className={styles.value}>{(temp.length) && temp[temp.length - 1].value}</div>
						</div>
						<SimpleLineChart
							data={temp}
							/* unique label string generate */
							label={`${Date.now()}${Math.random()}`}
							height={props.chartHeight}
						/>
					</div>
					<div className={styles.chart}>
						<div className={styles.label}>
							<div className={styles.name}>Turbidity</div>
							<div className={styles.value}>{(tds.length) && tds[tds.length - 1].value}</div>
						</div>
						<SimpleLineChart
							data={tds}
							/* unique label string generate */
							label={`${Date.now()}${Math.random()}`}
							height={props.chartHeight}
						/>
					</div>

				</div>
				<div className={styles.lastUpdate}>
					<div className={styles.label}>
						Last updated at
					</div>
					<div className={styles.value}>
						{new Date().toLocaleString()}
					</div>	
				</div>
			</div>
		</div>
	);
}

export default DeviceData;
