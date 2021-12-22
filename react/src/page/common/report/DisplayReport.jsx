import Table from "components/Table.component";

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
		colWidthPercent: ["60%", "10%", "10%", "20%"],
        centered: [false, true, true, true],
	};

	return (
		<div className={styles.containter}>
			<Table title="Items sold" data={itemsData} perPage={2}></Table>
		</div>
	);
}

export default DisplayReport;
