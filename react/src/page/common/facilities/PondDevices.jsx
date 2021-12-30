import { useEffect, useState } from "react";

// components
import Table from "components/Table.component";
import TopList from "components/TopList.component";
import DateAxisLineChart from "components/DateAxisLineChart.component";
import DeviceData from "components/DeviceData.component";

import styles from "styles/common/facilities/PondDevices.module.scss";

function DisplayReport(props) {
	const [labels, setLabels] = useState([]);

	const requestLabels = async () => {
		const response = await fetch("http://localhost:8080/api/device/list");

		const data = await response.json();

		const allLabel = data.map((device) => ({
			label: device.name,
			id: device._id
		}));

		setLabels(allLabel);
	};

	useEffect(() => {
		requestLabels();
	}, []);

	useEffect(() => {
		if (props.mqtt) {
			props.mqtt.on('message', (topic, message) => {
				const state = message.toString();

				if (state === 'NEWDEVICE') {
					requestLabels();
				}
			});
		}
	}, [props.mqtt])

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.text}>
					<div className={styles.title}>Pond devices</div>
					<div className={styles.subtitle}>Monitor each pond devices in real-time</div>
				</div>
			</div>
			<div className={styles.body}>
				{/* <div className={styles.itemsSoldTable}>
					<Table title="Items sold" data={itemsData} />
				</div>
				<div className={styles.topSoldList}>
					<TopList title="Hot items" data={topSold} />
				</div> */}
				<div className={styles.charts}>
					{labels.map((item, x) => (
						<DeviceData
							key={x}
							name={item.label}
							uid={item.id}
							chartHeight={"120px"}
							mqtt={props.mqtt}
						/>
					))}
					{/* <DeviceData 
						name={"Pond 1"}
						chartHeight={"100px"}
					/>
					<DeviceData 
						name={"Pond 2"}
						chartHeight={"100px"}
					/>
					<DeviceData 
						name={"Pond 3"}
						chartHeight={"100px"}
					/>
					<DeviceData 
						name={"Pond 4"}
						chartHeight={"100px"}
					/> */}
					{/* <DateAxisLineChart
						title="Profit trend"
						data={profit}
						label="Profit2"
						height="250px"
					/> */}
				</div>

			</div>
		</div>
	);
}

export default DisplayReport;
