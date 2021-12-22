// components
import Table from "components/Table.component";
import TopList from "components/TopList.component";

import styles from "styles/common/report/DisplayReport.module.scss";

function DisplayReport() {
	const itemsData = {
		header: ["Header 1", "Header 2", "Header 3", "Header 4"],
		items: [
			["Item 1", "Item 2", "Item 3", "Item 4"],
			["Item 1", "Item 2", "Item 3", "Item 4"],
			["Item 1", "Item 2", "Item 3", "Item 4"],
			["Item 1", "Item 2", "Item 3", "Item 4"],
			["Item 1", "Item 2", "Item 3", "Item 4"],
			["Item 1", "Item 2", "Item 3", "Item 4"],
			["Test", "Item 2", "Item 3", "Item 4"],
			["Item 1", "Item 2", "Item 3", "Item 4"],
			["Item 1", "Item 2", "Item 3", "Item 4"],
			["Item 1", "Item 2", "Item 3", "Item 4"],
			["Item 1", "Item 2", "Item 3", "Item 4"],
			["Item 1", "Item 2", "Item 3", "Item 4"],
			["Item 1", "Item 2", "Item 3", "Item 4"],
			["Item 1", "Item 2", "Item 3", "Item 4"],
			["Item 1", "Item 2", "Item 3", "Item 4"],
			["Item 1", "Item 2", "Item 3", "Item 4"],
			["Item 1", "Item 2", "Item 3", "Item 4"],
			["Item 1", "Item 2", "Item 3", "Item 4"],
			["Item 1", "Item 2", "Item 3", "Item 4"],
			["Item 1", "Item 2", "Item 3", "Item 4"],
			["Item 1", "Item 2", "Item 3", "Item 4"],
			["Item 1", "Item 2", "Item 3", "Item 4"],
			["Item 1", "Item 2", "Item 3", "Item 4"],
			["Item 1", "Item 2", "Item 3", "Item 4"],
			["Item 1", "Item 2", "Item 3", "Item 4"],
			["Item 1", "Item 2", "Item 3", "Item 4"],
			["Item 1", "Item 2", "Item 3", "Item 4"],
			["Item 1", "Item 2", "Item 3", "Item 4"],
			["Item 1", "Item 2", "Item 3", "Item 4"],
			["Item 1", "Item 2", "Item 3", "Item 4"],
			["Item 1", "Item 2", "Item 3", "Item 4"],
		],
		colWidthPercent: ["30%", "10%", "10%", "10%"],
        centered: [false, true, true, true],
	};

	const topSold = [
		{
			'Name': 'Item 1',
			'Total Sold': '10',
		},
		{
			'Name': 'Item 2',
			'Total Sold': '20',
		},
		{
			'Name': 'Item 3',
			'Total Sold': '30',
		},
		{
			'Name': 'Item 4',
			'Total Sold': '40',
		},
		{
			'Name': 'Item 5',
			'Total Sold': '50',
		},
	];

	// sort the topSold array by quantity
	topSold.sort((a, b) => {
		return b.quantity - a.quantity;
	});

	return (
		<div className={styles.container}>
			<div className={styles.itemsSoldTable}>
				<Table title="Items sold" data={itemsData} />
			</div>
			<div className={styles.topSoldList}>
				<TopList title="Hot items" data={topSold} />
			</div>
		</div>
	);
}

export default DisplayReport;
