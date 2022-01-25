import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

// components
import Table from "components/Table.component";
import TopList from "components/TopList.component";
import DateAxisLineChart from "components/DateAxisLineChart.component";
import NumberWidget from "components/NumberWidget.component";

import StatNumber from "components/StatNumber.component";
import StatWrapper from "components/StatWrapper.component";

import styles from "styles/common/report/DisplayReport.module.scss";
import PageHeader from "components/PageHeader.component";

function DisplayReport() {
	const [user] = useOutletContext();

	const [items, setItems] = useState([]);
	const [mostSoldItem, setMostSoldItem] = useState({});
	const [leastSoldItem, setLeastSoldItem] = useState({});
	const [avrSales, setAvrSales] = useState(0);
	const [totalSoldItems, setTotalSoldItems] = useState(0);
	const [totalSales, setTotalSales] = useState(0);
	const [topItems, setTopItems] = useState([]);
	const [salesData, setSalesData] = useState([]);

	const itemsData = {
		headers: ["Items Name", "Vendor name", "Total sold", "Total sales"],
		colWidthPercent: ["30%", "10%", "10%", "10%"],
		centered: [false, true, true, true],
		actions: [],
	};

	useEffect(() => {
		if (!user) {
			return;
		}

		(async () => {
			let request, response;

			request = await fetch(
				"http://localhost:8080/api/inventory/sold/list",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						authorization: "Bearer " + user.token,
					},
				}
			);

			if (request.status === 200) {
				const data = await request.json();

				let rows = [];
				let tSales = 0;
				let tItems = 0;

				let sold = {};

				data.forEach((item) => {
					tSales += item.total;
					tItems += item.quantity;

					// check if item exists
					if (item.item) {
						// check if the item name exists in the mSold
						if (sold[item.item.name]) {
							// if it exists, add the quantity
							sold[item.item.name] += item.quantity;
						} else {
							sold[item.item.name] = item.quantity;
						}
					}

					rows.push([
						item._id,
						(item.item && item.item.name) || "DELETED:#888",
						item.vendor_name || "DELETED:#888",
						item.quantity,
						item.total.toFixed(2),
					]);
				});

				let mSold = {};
				let lSold = {};
				for (let [key, value] of Object.entries(sold)) {
					if (!mSold.name || value > mSold.value) {
						mSold.name = key;
						mSold.value = value;
					}

					if (!lSold.name || value < lSold.value) {
						lSold.name = key;
						lSold.value = value;
					}
				}

				setMostSoldItem(mSold);
				setLeastSoldItem(lSold);

				setTotalSales(tSales.toFixed(2) || "0");
				setAvrSales((tSales / tItems).toFixed(2) || "0");
				setTotalSoldItems(tItems || "0");
				setItems(rows);
			}
			const mostSold = await fetch(
				"http://localhost:8080/api/report/getMostSold",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						authorization: "Bearer " + user.token,
					},
				}
			);
			if (mostSold.status === 200) {
				const list = await mostSold.json();
				setTopItems(list);
			}

			request = await fetch(
				"http://localhost:8080/api/report/weeklysales",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						authorization: "Bearer " + user.token,
					},
				}
			);

			if (request.status === 200) {
				response = await request.json();
				setSalesData(
					response.map((i) => ({
						date: new Date(i.date).getTime(),
						value: i.value,
					}))
				);
			}
		})();
	}, [user]);

	return (
		<div className={styles.container}>
			<PageHeader
				title="Report"
				brief="Get the overall report for the inventory"
				navs={[]}
			/>
			<div className={styles.statNum}>
				<StatWrapper>
					<StatNumber
						title="Total sold"
						value={totalSoldItems}
						unit="Items"
						icon="FaShoppingCart"
					/>

					<StatNumber
						title="Total sales"
						value={totalSales}
						unit="MYR"
						icon="FaMoneyBillAlt"
					/>

					<StatNumber
						title="Most sold"
						value={mostSoldItem.name}
						icon="FaLevelUpAlt"
						valueSize={"1rem"}
					/>

					<StatNumber
						title="Least sold"
						value={leastSoldItem.name}
						icon="FaLevelDownAlt"
						valueSize={"1rem"}
					/>
				</StatWrapper>
			</div>
			<div className={styles.itemsSoldTable}>
				<Table
					title="Items sold"
					headers={itemsData.headers}
					items={items}
					centered={itemsData.centered}
					colWidthPercent={itemsData.colWidthPercent}
					actions={itemsData.actions}
				/>
			</div>
			<div className={styles.topSoldList}>
				<TopList title="Popular items" data={topItems} />
			</div>
			<div className={styles.profitTrend}>
				<DateAxisLineChart
					title="Average sales per week"
					data={salesData}
					label="Sales"
					height="250px"
				/>
			</div>
		</div>
	);
}

export default DisplayReport;
