import { useState, useEffect } from "react";

// components
import Table from "components/Table.component";
import TopList from "components/TopList.component";
import DateAxisLineChart from "components/DateAxisLineChart.component";
import NumberWidget from "components/NumberWidget.component";

import StatNumber from "components/StatNumber.component";
import StatWrapper from "components/StatWrapper.component";

import styles from "styles/common/report/DisplayReport.module.scss";

function DisplayReport() {
	const [items, setItems] = useState([]);
	const [mostSoldItem, setMostSoldItem] = useState({});
	const [leastSoldItem, setLeastSoldItem] = useState({});
	const [avrSales, setAvrSales] = useState(0);
	const [totalSoldItems, setTotalSoldItems] = useState(0);
	const [totalSales, setTotalSales] = useState(0);
	const [topItems, setTopItems] = useState([]);

	const itemsData = {
		headers: ["Items Name", "Vendor name", "Total sales", "Total income"],
		colWidthPercent: ["30%", "10%", "10%", "10%"],
		centered: [false, true, true, true],
		actions: [
			
		],
	};

	const stats = [
		{
			title: "Total Accounts",
			value: "12,000",
			label: "Orders",
		},
		{
			title: "Total Managers",
			value: "12,000",
			label: "Managers",
		},
		{
			title: "Total Staffs",
			value: "12,000",
			label: "Staffs",
		},
		{
			title: "Total Staffs",
			value: "12,000",
			label: "Staffs",
		},
	];

	const topSold = [
		{
			Name: "Item 5",
			"Total Sold": "50",
		},
		{
			Name: "Item 1",
			"Total Sold": "10",
		},
		{
			Name: "Item 2",
			"Total Sold": "20",
		},
		{
			Name: "Item 3",
			"Total Sold": "30",
		},
		{
			Name: "Item 4",
			"Total Sold": "40",
		},
	];

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

	const [profit, setProfit] = useState(profitData);
	const [count, setCount] = useState(1);

	const testClick = () => {
		let newData = profit;

		newData.push({
			date: new Date(2021, 0, 13 + count).getTime(),
			value: Math.floor(Math.random() * 100),
		});

		setProfit(newData);
		console.log("click");

		setCount(count + 1);
	};

	useEffect(() => {
		(async () => {
			const request = await fetch(
				"http://localhost:8080/api/inventory/sold/list"
			);

			if (request.status === 200) {
				const data = await request.json();

				let rows = [];
				let tSales = 0;
				let tItems = 0;

				/* 
					{
						"_id": "61d9251b046fe704e0ff65be",
						"item_ID": "61d7f6512f46700ce02e565d",
						"quantity": 2,
						"total": 26,
						"item": {
							"_id": "61d7f6512f46700ce02e565d",
							"vendor_ID": "61d7ea0bc1e4b29d22a55723",
							"name": "Fried water",
							"unit_price": 13,
							"barcode_ID": "12345678",
							"barcode_encoding": "code-39"
						},
						"vendor": {
							"_id": "61d7ea0bc1e4b29d22a55723",
							"company_name": "UMP 5 star"
						}
					},
				*/

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
						(item.vendor && item.vendor.company_name) ||
							"DELETED:#888",
						item.quantity,
						item.total.toFixed(2)
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

				setTotalSales(tSales.toFixed(2));
				setAvrSales((tSales / tItems).toFixed(2));
				setTotalSoldItems(tItems);
				setItems(rows);
			}
			const mostSold = await fetch(
				"http://localhost:8080/api/report/getMostSold"
			);
			if (mostSold.status===200){
				const list = await mostSold.json()
				setTopItems (list)
			}

		})();
	}, []);

	// sort the topSold array by quantity
	topSold.sort((a, b) => {
		return a.quantity - b.quantity;
	});

	return (
		<div className={styles.container}>
			<div className={styles.stats}>
				{/* <NumberWidget
					title="Total sold"
					value={totalSoldItems}
					label="Items"
					style={{ fontSize: "18px" }}
				/>
				<NumberWidget
					title="Total sales"
					value={totalSales}
					label="RM"
					style={{ fontSize: "18px" }}
				/>
				<NumberWidget
					title="Average sales"
					value={avrSales}
					label="RM"
					style={{ fontSize: "18px" }}
				/>
				<NumberWidget
					title="Most sold"
					value={mostSoldItem.name}
					label="Item"
					style={{ fontSize: "14px" }}
				/>
				<NumberWidget
					title="Least sold"
					value={leastSoldItem.name}
					label="Item"
					style={{ fontSize: "14px" }}
				/> */}
			</div>
			<div className={styles.statNum}>
				<StatWrapper >
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
				<TopList title="Hot items" data={topItems} />
			</div>
			<div className={styles.profitTrend} onClick={testClick}>
				<DateAxisLineChart
					title="Sales trend"
					data={profit}
					label="Sales"
					height="250px"
				/>
			</div>
		</div>
	);
}

export default DisplayReport;
